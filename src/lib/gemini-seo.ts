import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';
import { AIProvider } from './ai-provider';
import slugify from 'slugify';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

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
 * Genera una imagen para el artículo usando Gemini Image (Nano Banana 2/Pro según disponibilidad o el que tenga soporte)
 */
async function generateArticleImage(imagePrompt: string, slug: string): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) return null;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  try {
    // Usando el modelo de imagen explícitamente solicitado para ahorrar tokens
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    const result = await model.generateContent(imagePrompt);
    const response = result.response;
    
    // Extraemos los datos de la imagen (formato esperado en el SDK de 2026)
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (!part?.inlineData?.data) return null;

    const buffer = Buffer.from(part.inlineData.data, 'base64');
    const fileName = `${slug}-${Date.now()}.webp`;

    // Si tenemos configurado Vercel Blob, subimos la imagen al Bucket
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`articles/${fileName}`, buffer, {
        access: 'public', // Este Bucket DEBE estar configurado como Público en Vercel
        contentType: 'image/webp',
      });
      return blob.url; // Retorna la URL del CDN
    }

    // Fallback: Guardado en Local (temporal en Vercel, persistente en Localhost)
    // Evitar errors de Vercel si intenta ejecutar esto en un entorno sin persistencia
    if (process.env.VERCEL) {
       console.warn("Vercel environment detected without BLOB config. Skipping local fs write.");
       return null; 
    }

    const publicPath = '/images/articles';
    const fullDirPath = path.join(process.cwd(), 'public', publicPath);
    const fullFilePath = path.join(fullDirPath, fileName);

    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
    }

    fs.writeFileSync(fullFilePath, buffer);
    return `${publicPath}/${fileName}`;
  } catch (error) {
    console.error("Error generando/guardando imagen con Gemini o Blob:", error);
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
- Longitud: Mínimo 1500 palabras de valor real (sin paja).
- Formato: EXCLUSIVAMENTE Markdown. ¡MUY IMPORTANTE!: NO incluyas el título principal (# H1) dentro del contenido del Markdown, empieza directamente por los párrafos introductorios o un H2 (##).
- Estructura: 
    1. Introducción profunda.
    2. Mínimo 4 secciones con H2 y H3 detallando el "Cómo", "Por qué" y casos de uso.
    3. Sección "Consejos de Experto" (E-E-A-T).
    4. Sección FAQ completa (mínimo 6 preguntas de usuario real).
    5. Conclusión.
- Título: Atractivo, clicable y optimizado SEO (max 60 caracteres).
- Meta Descripción: Un resumen persuasivo que invite al clic (max 155 caracteres).
- Incluye también un 'image_prompt': una descripción detallada en inglés para generar una imagen de portada fotorrealista y moderna.

REQUISITOS ADICIONALES DEL OUTPUT:
- Responde ÚNICAMENTE con un JSON válido. 
- MUY IMPORTANTE: Escapa perfectamente las comillas dobles (") dentro de las cadenas de texto usando \\".
- No uses saltos de línea literales dentro de las propiedades, usa la secuencia de escape \\n.
Estructura obligatoria:
{
  "title": "Título del artículo",
  "metaDescription": "Resumen persuasivo...",
  "content": "Contenido extenso en Markdown...",
  "tags": "tag1, tag2",
  "image_prompt": "Detailed AI image prompt in English..."
}
¡Asegúrate de que el JSON sea estrictamente válido antes de terminar!`;

  const ai = AIProvider.getInstance();
  const result = await ai.generateText(systemPrompt);
  const responseText = result.text;

  let articleData;
  try {
    // Intento de limpieza de JSON (especialmente para contenidos largos que suelen romper comillas o escapes)
    const cleanJsonString = responseText
      .replace(/```json\n?|```/g, '')
      .trim();
    
    articleData = JSON.parse(cleanJsonString);
  } catch (e) {
    console.error("Error inicial de JSON. Aplicando parseo robusto...", e);
    // Parseo robusto: intentamos extraer el primer bloque {} si el modelo añadió texto extra
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        articleData = JSON.parse(jsonMatch[0].replace(/\\n/g, "\\n").replace(/\\"/g, "\\\""));
      } catch (e2) {
        throw new Error(`Fallo crítico en el formato JSON generado por la IA tras 1500+ palabras: ${responseText.substring(0, 100)}...`);
      }
    } else {
      throw new Error("La IA no devolvió un objeto JSON válido.");
    }
  }

  // Limpieza defensiva: por si el modelo sigue incrustando el título H1 al principio del markdown
  if (articleData.content) {
    articleData.content = articleData.content.replace(/^#\s+.*$/m, '').trim();
  }

  let baseSlug = slugify(articleData.title, { lower: true, strict: true });
  let finalSlug = baseSlug;
  
  // Generar Imagen
  const imageUrl = await generateArticleImage(articleData.image_prompt, baseSlug);

  const savedArticle = await prisma.article.create({
    data: {
      title: articleData.title || 'Artículo generado',
      slug: finalSlug,
      content: articleData.content || '',
      metaDescription: articleData.metaDescription || '',
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
  const results = [];

  for (const kw of keywords) {
    const prompt = `Eres un experto redactor SEO y especialista en la herramienta: '${baseTool}'. 
    Tu misión es generar contenido de ALTO VALOR y profundidad para una variante específica: '${kw}'.
    
    El contenido debe ser extenso (mínimo 800-1000 palabras de valor real), educativo y diseñado para AYUDAR al usuario, no solo para posicionar.
    
    ESTRUCTURA REQUERIDA PARA 'bottomContent' (Markdown):
    1. Introducción detallada: Por qué esta variante de la herramienta es útil para '${kw}'.
    2. Guía de uso paso a paso: Cómo obtener el máximo provecho de la herramienta en este escenario.
    3. Casos de uso prácticos: 3 ejemplos reales de cuándo usar la herramienta para '${kw}'.
    4. Sección de consejos expertos: 3-5 'pro-tips' que demuestren conocimiento profundo.
    5. FAQ (Preguntas Frecuentes): Mínimo 5 preguntas y respuestas detalladas que los usuarios suelen tener sobre '${kw}' y '${baseTool}'. Use el formato '### P: ... \n R: ...'.
    
    REQUISITOS ADICIONALES:
    - seoTitle: Atractivo y optimizado (max 60 carac).
    - h1: Título principal claro y directo.
    - seoDescription: Resumen que invite al clic (max 155 carac).
    - topContent: Un párrafo introductorio (2-3 frases) muy directo.
    
    Responde ÚNICAMENTE con JSON válido (escapa saltos de línea con \\n):
    {
      "seoTitle": "...",
      "h1": "...",
      "seoDescription": "...",
      "topContent": "...",
      "bottomContent": "...",
      "functionalConfig": {
         "comentario": "Configuración óptima para la herramienta basada en el contexto",
         "initialValues": {
            "key": "valor"
         }
      }
    }`;

    try {
      const ai = AIProvider.getInstance();
      const result = await ai.generateText(prompt);
      const text = result.text;
      const cleanJson = text.replace(/```json\n?|```/g, '').trim();
      const data = JSON.parse(cleanJson);
      let slug = slugify(`${baseTool}-${kw}`, { lower: true, strict: true });
      
      const variant = await prisma.toolVariant.upsert({
        where: { slug },
        update: { ...data, toolBase: baseTool, functionalConfig: data.functionalConfig },
        create: { ...data, slug, toolBase: baseTool, functionalConfig: data.functionalConfig }
      });
      results.push(variant);
    } catch (e) {
      console.error(`Error en variante ${kw}:`, e);
    }
  }
  return results;
}
