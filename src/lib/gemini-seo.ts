import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';
import slugify from 'slugify';
import { revalidatePath } from 'next/cache';

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

export async function generateProgrammaticArticle(force = false) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Falta GEMINI_API_KEY');
  }
  // 0. Pre-flight DB Check: asegurar que conectamos bien a Postgres antes de consumir la API de Google
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (dbError) {
    throw new Error('Error crítico de Base de Datos inalcanzable (o apuntando todavía a SQLite cacheado previo). Por seguridad cancelamos para evitar consumir cuota de Gemini.');
  }

  // 1. Control de frecuencia
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
        
        if (diffDays < (intervalDays - 0.5)) { // Margen de 12h para permitir "catch up" al cron si el anterior fue tarde
          return { skipped: true, message: `Omitido: no han pasado ${intervalDays} días.` };
        }
      }
    }
  }

  // 2. Elegir herramienta objetivo
  const herramientaDestino = HERRAMIENTAS[Math.floor(Math.random() * HERRAMIENTAS.length)];

  const systemPrompt = `Eres un experto redactor SEO y copywriter tecnológico. 
Tu misión es escribir UN artículo de blog fascinante, educativo y resolutivo sobre un tema actual o curiosidad de uso que esté DENTRO del siguiente nicho de herramienta: ${herramientaDestino.nombre}.
El artículo será publicado en 'CajaUtil.com' y la meta es aportar valor al usuario e invitarle de forma nativa a usar la utilidad relacionada.

REQUISITOS DEL ARTÍCULO:
- Formato: EXCLUSIVAMENTE Markdown (con títulos h2, h3, listas, negritas).
- Longitud: Entre 600 y 900 palabras.
- Tono: Profesional pero cercano y ameno. Español neutro (España).
- Título: Debe ser clicable y atractivo, pero NUNCA incluyas un h1 (#) al inicio. Yo me encargo del h1. Empieza directamente con el texto o un h2.
- Al final, incluye de forma MUY sutil una invitación a probar nuestra herramienta gratuita relacionada.

REQUISITOS ADICIONALES DEL OUTPUT:
Debes responder ÚNICAMENTE con un JSON válido parseable. Sin markdown decorativo para el JSON (\`\`\`json). El formato exacto debe ser:
{
  "title": "El título del artículo atractivo (sin hashtags)",
  "content": "El contenido entero del artículo en Markdown...",
  "tags": "tag1, tag2, tag3"
}`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(systemPrompt);
  const responseText = result.response.text();

  const cleanJsonString = responseText.replace(/```json\n?|```/g, '').trim();
  
  interface GeneratedArticle {
    title: string;
    content: string;
    tags: string;
  }
  
  const articleData: GeneratedArticle = JSON.parse(cleanJsonString);

  let baseSlug = slugify(articleData.title, { lower: true, strict: true });
  let finalSlug = baseSlug;
  let counter = 1;
  
  while (await prisma.article.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const savedArticle = await prisma.article.create({
    data: {
      title: articleData.title || 'Artículo generado',
      slug: finalSlug,
      content: articleData.content || '',
      tags: articleData.tags || 'herramientas, utilidades',
      targetToolUrl: herramientaDestino.url,
    }
  });

  revalidatePath('/revision-seo');
  revalidatePath('/'); 

  return { skipped: false, article: savedArticle };
}

/**
 * SEO Programático: Generación masiva de variantes de herramientas
 */
export async function generateToolVariantBatch(baseTool: string, keywords: string[]) {
  if (!process.env.GEMINI_API_KEY) throw new Error('Falta GEMINI_API_KEY');
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const results = [];

  for (const kw of keywords) {
    const prompt = `Eres un experto en SEO y marketing. Genera una variante de la herramienta base '${baseTool}' enfocada a la intención de búsqueda: '${kw}'.
    
    Responde ÚNICAMENTE con un JSON (sin markdown):
    {
      "seoTitle": "Título SEO optimizado (max 60 caracteres)",
      "h1": "Título H1 atractivo para la página",
      "seoDescription": "Meta descripción sugerente (max 155 caracteres)",
      "topContent": "Breve introducción de 2 párrafos motivadora sobre por qué usar esta calculadora para ${kw}.",
      "bottomContent": "Texto largo explicativo (800 palabras) en Markdown sobre ${kw}, consejos, FAQ y relevancia de la herramienta."
    }`;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJson = text.replace(/```json\n?|```/g, '').trim();
      const data = JSON.parse(cleanJson);

      let slug = slugify(`${baseTool}-${kw}`, { lower: true, strict: true });
      
      const variant = await prisma.toolVariant.upsert({
        where: { slug },
        update: {
          ...data,
          toolBase: baseTool
        },
        create: {
          ...data,
          slug,
          toolBase: baseTool
        }
      });
      results.push(variant);
    } catch (e) {
      console.error(`Error generando variante para ${kw}:`, e);
    }
  }

  return results;
}
