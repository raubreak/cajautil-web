import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';
import { AIProvider } from './ai-provider';
import { getArticleDescription, sanitizeArticleTags, sanitizeMarkdownContent } from './contentSanitizers';
import slugify from 'slugify';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

interface GeneratedArticlePayload {
  title: string | null;
  metaDescription: string | null;
  content: string | null;
  tags: string | null;
  image_prompt: string | null;
}

const CURRENT_YEAR = new Date().getFullYear();

function normalizeStaleYear(text: string | null | undefined): string | null {
  if (!text) return null;

  return text.replace(/\b(20\d{2})\b/g, (match, rawYear) => {
    const year = Number.parseInt(rawYear, 10);

    if (Number.isNaN(year)) return match;
    if (year >= CURRENT_YEAR) return match;

    return String(CURRENT_YEAR);
  });
}

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
  if (process.env.DISABLE_PROGRAMMATIC_CONTENT !== 'false') {
    return {
      skipped: true,
      message: 'Generacion programatica desactivada para proteger la revision de AdSense.',
    };
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Falta GEMINI_API_KEY');
  }
  
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
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
- No uses años pasados en el título ni en la meta descripción. Si el tema necesita un año por contexto, usa solo ${CURRENT_YEAR} y asegúrate de que el contenido lo justifique.

- Responde ÚNICAMENTE con un JSON válido y bien estructurado.
- MUY IMPORTANTE: Si necesitas incluir comillas dentro de un texto, usa comillas simples (') o asegúrate de escaparlas perfectamente como \\".
- No uses saltos de línea reales dentro de los valores del JSON, sustitúyelos por la secuencia \\n.
Estructura obligatoria:
{
  "title": "Título del artículo",
  "metaDescription": "Resumen persuasivo...",
  "content": "Contenido extenso en Markdown...",
  "tags": "tag1, tag2",
  "image_prompt": "Detailed AI image prompt in English..."
}
¡Verifica que el JSON sea válido antes de enviar la respuesta!`;

  const ai = AIProvider.getInstance();
  const result = await ai.generateText(systemPrompt);
  const responseText = result.text;

  let articleData: GeneratedArticlePayload | null = null;
  const cleanJsonString = responseText.replace(/```json\n?|```/g, '').trim();

  try {
      articleData = JSON.parse(cleanJsonString) as GeneratedArticlePayload;
  } catch (e) {
    console.error("JSON standard falló. Iniciando recuperación quirúrgica...", e);
    
    // Intento 2: Extraer campos individuales mediante Regex (Rescate de Datos)
    // Buscamos patrones del tipo "llave": "valor" incluso si hay problemas de escapado
      const extract = (key: string) => {
        // Esta regex busca la llave y captura todo hasta la siguiente coma seguida de otra llave o el cierre del objeto
        const regex = new RegExp(`"${key}"\\s*:\\s*"([\\s\\S]*?)"(?=\\s*,?\\s*"(?:title|metaDescription|content|tags|image_prompt)"\\s*:|\\s*\\}$)`, 'i');
        const match = cleanJsonString.match(regex);
        return match ? match[1] : null;
      };

    articleData = {
      title: extract('title'),
      metaDescription: extract('metaDescription'),
      content: extract('content'),
      tags: extract('tags'),
      image_prompt: extract('image_prompt')
    };

    if (!articleData.title || !articleData.content) {
      throw new Error(`Fallo total de parseo y recuperación: ${responseText.substring(0, 200)}...`);
    }

    // Limpieza de caracteres de escape literales que podrían haber quedado si el regex capturó de más
    if (articleData.content) {
      articleData.content = articleData.content
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t');
    }
  }

  // Limpieza defensiva: por si el modelo sigue incrustando el título H1 al principio del markdown
    if (articleData.content) {
      articleData.content = sanitizeMarkdownContent(
        articleData.content
          .replace(/^#\s+.*$/m, '')
          .trim(),
      );
    }

  if (!articleData) {
    throw new Error('No se pudo construir el payload del articulo.');
  }

  const cleanTitle = normalizeStaleYear(articleData.title)?.replace(/\s+/g, ' ').trim() || 'Artículo generado';
  const cleanContent = sanitizeMarkdownContent(articleData.content || '');
  const cleanTags = sanitizeArticleTags(articleData.tags).join(', ');
  const cleanMetaDescription = getArticleDescription(normalizeStaleYear(articleData.metaDescription), cleanContent);
  const cleanImagePrompt = articleData.image_prompt?.replace(/\s+/g, ' ').trim() || null;

  const baseSlug = slugify(cleanTitle, { lower: true, strict: true });
  const finalSlug = baseSlug;
  
  // Generar Imagen
  const imageUrl = cleanImagePrompt ? await generateArticleImage(cleanImagePrompt, baseSlug) : null;

  const savedArticle = await prisma.article.create({
    data: {
      title: cleanTitle,
      slug: finalSlug,
      content: cleanContent,
      metaDescription: cleanMetaDescription,
      tags: cleanTags || 'herramientas, utilidades',
      targetToolUrl: herramientaDestino.url,
      coverImagePrompt: cleanImagePrompt,
      coverImageUrl: imageUrl
    }
  });

  revalidatePath('/revision-seo');
  revalidatePath('/'); 

  return { skipped: false, article: savedArticle };
}

export async function generateToolVariantBatch(baseTool: string, keywords: string[]) {
  if (process.env.DISABLE_PROGRAMMATIC_CONTENT !== 'false') {
    throw new Error('Las variantes programaticas estan desactivadas para proteger la revision de AdSense.');
  }

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
      
      let data;
      const cleanJson = text.replace(/```json\n?|```/g, '').trim();
      
      try {
        data = JSON.parse(cleanJson);
      } catch {
        console.warn(`JSON falló para variante ${kw}, rescatando datos...`);
        const extract = (key: string) => {
          const regex = new RegExp(`"${key}"\\s*:\\s*"([\\s\\S]*?)"(?=\\s*,?\\s*"[a-zA-Z0-9]+"\\s*:|\\s*\\}$)`, 'i');
          const match = cleanJson.match(regex);
          return match ? match[1] : null;
        };
        
        data = {
          seoTitle: extract('seoTitle'),
          h1: extract('h1'),
          seoDescription: extract('seoDescription'),
          topContent: extract('topContent'),
          bottomContent: extract('bottomContent'),
          functionalConfig: { initialValues: {} } // Fallback básico
        };

        if (data.bottomContent) {
          data.bottomContent = data.bottomContent.replace(/\\"/g, '"').replace(/\\n/g, '\n');
        }
      }

      const slug = slugify(`${baseTool}-${kw}`, { lower: true, strict: true });
      
      const variant = await prisma.toolVariant.upsert({
        where: { slug },
        update: { ...data, toolBase: baseTool, functionalConfig: data.functionalConfig || {} },
        create: { ...data, slug, toolBase: baseTool, functionalConfig: data.functionalConfig || {} }
      });
      results.push(variant);
    } catch (e) {
      console.error(`Error en variante ${kw}:`, e);
    }
  }
  return results;
}
