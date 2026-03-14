
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function deepenArticle(article: any) {
  console.log(`\n🚀 Ampliando: [${article.title}]...`);
  
  const prompt = `Eres un experto redactor SEO. Tengo este artículo que es un poco corto (~${article.content.split(/\s+/).length} palabras) y quiero convertirlo en una GUÍA DE EXPERTO de más de 1500 palabras.

CONTENIDO ACTUAL:
${article.content}

TU MISIÓN:
1. Re-escribir y ampliar el contenido para que sea fascinante, educativo y muy profundo.
2. Mínimo 1500 palabras.
3. Usa una estructura profesional con H2 y H3.
4. Incluye:
   - Casos de uso prácticos.
   - Una sección "Consejos de Experto" (E-E-A-T).
   - Un FAQ de al menos 6 preguntas detalladas.
   - Una conclusión potente.
5. Genera una "metaDescription" persuasiva (max 155 caracteres).

Responde ÚNICAMENTE en JSON:
{
  "metaDescription": "...",
  "content": "Contenido extendido en Markdown..."
}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json\n?|```/g, '').trim();
    const data = JSON.parse(cleanJson);

    await prisma.article.update({
      where: { id: article.id },
      data: {
        content: data.content,
        metaDescription: data.metaDescription
      }
    });
    console.log(`✅ [${article.title}] actualizado con éxito.`);
  } catch (err) {
    console.error(`❌ Error en [${article.title}]:`, err);
  }
}

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { metaDescription: null },
        { metaDescription: '' }
      ]
    }
  });

  console.log(`Se han encontrado ${articles.length} artículos para optimizar.`);
  
  for (const article of articles) {
    await deepenArticle(article);
    // Pequeño delay para no saturar la API
    await new Promise(r => setTimeout(r, 2000));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
