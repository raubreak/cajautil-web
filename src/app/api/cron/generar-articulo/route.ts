import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';
import slugify from 'slugify';
import { revalidatePath } from 'next/cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Lista de herramientas para enlazar aleatoriamente en cada post
const HERRAMIENTAS = [
  { nombre: "Generador de Firmas de Email", url: "/generador-firmas-email" },
  { nombre: "Calculadora de Calorías", url: "/calculadora-calorias" },
  { nombre: "Cronómetro Online", url: "/cronometro" },
  { nombre: "Simulador de Préstamos", url: "/calculadora-prestamos" },
  { nombre: "Generador de Hashtags", url: "/generador-hashtags" },
  { nombre: "Temporizador", url: "/temporizador" },
  { nombre: "Extractor de Colores", url: "/extractor-colores" },
  { nombre: "Ruleta Aleatoria", url: "/ruleta-aleatoria" },
  { nombre: "Compresor WebP", url: "/compresor-webp" },
];

export async function GET(req: NextRequest) {
  try {
    // 1. Verificación de Seguridad Cron Job
    // Vercel Cron inyecta un header 'x-vercel-cron', y también podemos pasar un secret por URL
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // Si no estamos en desarrollo y no coincide el cron secret, denegar.
    if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Falta GEMINI_API_KEY' }, { status: 500 });
    }

    // 2. Control de Frecuencia mediante Variable de Entorno
    const intervalDays = parseInt(process.env.POST_INTERVAL_DAYS || '1', 10);
    
    if (intervalDays > 0) {
      const lastArticle = await prisma.article.findFirst({
        orderBy: { publishedAt: 'desc' },
      });

      if (lastArticle) {
        const diffMs = Date.now() - new Date(lastArticle.publishedAt).getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        
        // Damos un margen de 2 horas (0.08 días) por posibles desajustes de ejecución cron
        if (diffDays < (intervalDays - 0.08)) {
          return NextResponse.json({ 
            success: true, 
            message: `Ejecución omitida: Aún no han pasado ${intervalDays} días desde el último post.` 
          });
        }
      }
    }

    // 3. Seleccionar una herramienta objetivo al azar para este artículo
    const herramientaDestino = HERRAMIENTAS[Math.floor(Math.random() * HERRAMIENTAS.length)];

    // 3. Prompt para Gemini
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
  "tags": "tag1, tag2, tag3",
  "image_keyword": "Una sola palabra clave en INGLÉS que describa el artículo para buscar una foto en Unsplash. Ejemplo: 'fitness' o 'money' o 'office'"
}`;

    // 4. Llamada a Gemini 1.5 Flash (más rápido y barato para tareas repetitivas simples)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    // Limpiar posible formato markdown que rodee al JSON
    const cleanJsonString = responseText.replace(/```json\n?|```/g, '').trim();
    
    // 5. Parsear Respuesta
    interface GeneratedArticle {
      title: string;
      content: string;
      tags: string;
      image_keyword: string;
    }
    
    const articleData: GeneratedArticle = JSON.parse(cleanJsonString);

    // 6. Configurar la Imagen (Unsplash Source API o similar)
    // Usaremos un servicio gratuito generico temporal (como source.unsplash) 
    // Nota: source.unsplash está discontinuado, pero imágenes random de unsplash funcionan con:
    const coverUrl = `https://images.unsplash.com/featured/1200x630/?${encodeURIComponent(articleData.image_keyword)},minimalist`;

    // 7. Generar Slug Único
    let baseSlug = slugify(articleData.title, { lower: true, strict: true });
    let finalSlug = baseSlug;
    let counter = 1;
    
    // Comprobar si existe el slug para añadir sufijo
    while (await prisma.article.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 8. Guardar en Base de Datos (Vercel Postgres via Prisma)
    const savedArticle = await prisma.article.create({
      data: {
        title: articleData.title,
        slug: finalSlug,
        content: articleData.content,
        tags: articleData.tags,
        coverImageUrl: coverUrl,
        targetToolUrl: herramientaDestino.url,
      }
    });

    // 9. Revalidar posibles cachés
    revalidatePath('/revision-seo');
    revalidatePath('/'); // Si en algún momento mostramos posts en la home.

    return NextResponse.json({ 
      success: true, 
      message: 'Artículo generado correctamente',
      article: savedArticle.slug 
    });

  } catch (error) {
    console.error('Error generando artículo Cron:', error);
    return NextResponse.json({ error: 'Error interno generando artículo' }, { status: 500 });
  }
}
