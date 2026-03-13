
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import prisma from '../src/lib/prisma';
import { generateToolVariantBatch } from '../src/lib/gemini-seo';

async function main() {
  console.log('🚀 Iniciando refresco de contenido de variantes pSEO...');
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY no encontrada en .env.local');
    process.exit(1);
  }

  try {
    const allVariants = await prisma.toolVariant.findMany({
      select: {
        id: true,
        toolBase: true,
        slug: true,
        bottomContent: true
      }
    });

    const thinVariants = allVariants.filter(v => 
      !v.bottomContent || v.bottomContent.length < 1500
    );

    console.log(`🔍 Se han encontrado ${thinVariants.length} variantes que necesitan actualización.`);

    if (thinVariants.length === 0) {
      console.log('✅ Todas las variantes tienen suficiente profundidad.');
      return;
    }

    const groups: Record<string, string[]> = {};
    thinVariants.forEach(v => {
      if (!groups[v.toolBase]) groups[v.toolBase] = [];
      const keyword = v.slug.replace(`${v.toolBase}-`, '').replace(/-/g, ' ');
      groups[v.toolBase].push(keyword);
    });

    // Procesamos solo un par de variantes por grupo para probar la profundidad y evitar cuotas
    for (const [baseTool, keywords] of Object.entries(groups)) {
      const batch = keywords.slice(0, 2); 
      console.log(`\n⚙️  Actualizando lote de prueba para [${baseTool}] (${batch.length} keywords)...`);
      try {
        await generateToolVariantBatch(baseTool, batch);
        console.log(`✅ ¡Lote completado para ${baseTool}!`);
      } catch (err) {
        console.error(`❌ Error en lote ${baseTool}:`, err);
      }
    }

    console.log('\n✨ Refresco de variantes finalizado.');
  } catch (error) {
    console.error('Error fatal durante el refresco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
