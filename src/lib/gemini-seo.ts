import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';
import slugify from 'slugify';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const HERRAMIENTAS = [
  { nombre: "Generador de Firmas de Email", url: "/generador-firmas-email" },
  { nombre: "Calculadora de Calorías", url: "/calculadora-calorias" },
  { nombre: "Cronómetro Online", url: "/cronometro" },
  { nombre: "Simulador de Préstamos", url: "/calculadora-prestamos" },
  { nombre: "Generador de Hashtags", url: "/generador-hashtags" },
  { nombre: "Temporizador", url: "/temporizador" },
  { nombre: "Extractor de Colores", url: "/extractor-colores" },
  { nombre: "Ruleta Aleatoria", url: "/ruleta-aleatoria" },
  { nombre: "Compresor WebP", url: "/compresor-webp" },
  { nombre: "Calculadora de Interés Compuesto", url: "/calculadora-interes-compuesto" },
];

/**
 * Genera una imagen para el artículo usando Nano Banana (Gemini 2.5 Flash Image)
 */
async function generateArticleImage(imagePrompt: string, slug: string): Promise<string | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    const result = await model.generateContent(imagePrompt);
    const response = result.response;
    
    // Extraemos los datos de la imagen (formato esperado en el SDK de 2026)
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (!part?.inlineData?.data) return null;

    const buffer = Buffer.from(part.inlineData.data, 'base64');
    const fileName = `${slug}-${Date.now()}.webp`;
    const publicPath = '/images/articles';
    const fullDirPath = path.join(process.cwd(), 'public', publicPath);
    const fullFilePath = path.join(fullDirPath, fileName);

    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
    }

    fs.writeFileSync(fullFilePath, buffer);
    return `${publicPath}/${fileName}`;
  } catch (error) {
    console.error("Error generando imagen con Gemini:", error);
    return null;
  }
}

export async function generateProgrammaticArticle(force = false) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Falta GEMINI_API_KEY');
  }
  
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (dbError) {
    throw new Error('Error crítico de Base de Datos inalcanzable.');
  }

  if (!force) {
    const setting = await prisma.setting.findUnique({ where: { key: 'POST_INTERVAL_DAYS' } });
    const intervalDays = setting ? parseInt(setting.value, 10) : parseInt(process.env.POST_INTERVAL_DAYS || '1', 10);
    
    if (intervalDays > 0) {
      const lastArticle = await prisma.article.findFirst({
        orderBy: { publishedAt: 'desc' },
      });

      if (lastArticle) {
        const diffMs = Date.now() - new Date(lastArticle.publishedAt).getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        
        if (diffDays < (intervalDays - 0.5)) {
          return { skipped: true, message: `Omitido: no han pasado ${intervalDays} días.` };
        }
      }
    }
  }

  const herramientaDestino = HERRAMIENTAS[Math.floor(Math.random() * HERRAMIENTAS.length)];

  const systemPrompt = `Eres un experto redactor SEO y copywriter tecnológico. 
Tu misión es escribir UN artículo de blog fascinante, educativo y resolutivo sobre un tema actual relacionado con: ${herramientaDestino.nombre}.

REQUISITOS DEL ARTÍCULO:
- Formato: EXCLUSIVAMENTE Markdown.
- Título: Atractivo y clicable.
- Incluye también un 'image_prompt': una descripción detallada en inglés para generar una imagen de portada fotorrealista y moderna que ilustre el tema.

REQUISITOS ADICIONALES DEL OUTPUT:
Responde ÚNICAMENTE con un JSON válido:
{
  "title": "Título del artículo",
  "content": "Contenido en Markdown...",
  "tags": "tag1, tag2",
  "image_prompt": "Detailed AI image prompt in English..."
}`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(systemPrompt);
  const responseText = result.response.text();

  const cleanJsonString = responseText.replace(/```json\n?|```/g, '').trim();
  const articleData = JSON.parse(cleanJsonString);

  let baseSlug = slugify(articleData.title, { lower: true, strict: true });
  let finalSlug = baseSlug;
  
  // Generar Imagen
  const imageUrl = await generateArticleImage(articleData.image_prompt, baseSlug);

  const savedArticle = await prisma.article.create({
    data: {
      title: articleData.title || 'Artículo generado',
      slug: finalSlug,
      content: articleData.content || '',
      tags: articleData.tags || 'herramientas, utilidades',
      targetToolUrl: herramientaDestino.url,
      coverImagePrompt: articleData.image_prompt,
      coverImageUrl: imageUrl
    }
  });

  revalidatePath('/revision-seo');
  revalidatePath('/'); 

  return { skipped: false, article: savedArticle };
}

export async function generateToolVariantBatch(baseTool: string, keywords: string[]) {
  if (!process.env.GEMINI_API_KEY) throw new Error('Falta GEMINI_API_KEY');
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const results = [];

  for (const kw of keywords) {
    const prompt = `Eres un experto en SEO. Genera una variante de '${baseTool}' para: '${kw}'.
    
    Responde ÚNICAMENTE con JSON:
    {
      "seoTitle": "...",
      "h1": "...",
      "seoDescription": "...",
      "topContent": "...",
      "bottomContent": "..."
    }`;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJson = text.replace(/```json\n?|```/g, '').trim();
      const data = JSON.parse(cleanJson);
      let slug = slugify(`${baseTool}-${kw}`, { lower: true, strict: true });
      
      const variant = await prisma.toolVariant.upsert({
        where: { slug },
        update: { ...data, toolBase: baseTool },
        create: { ...data, slug, toolBase: baseTool }
      });
      results.push(variant);
    } catch (e) {
      console.error(`Error en variante ${kw}:`, e);
    }
  }
  return results;
}
