import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { generateToolVariantBatch } from '../src/lib/gemini-seo';
import prisma from '../src/lib/prisma';

// Mapeo Maestro de Herramientas y sus palabras clave Long-Tail
// Puedes ampliar estas listas en cualquier momento.
const SEO_STRATEGY = [
  {
    baseTool: 'calculadora-prestamos',
    keywords: [
      'coche nuevo',
      'coche segunda mano',
      'reformas integrales',
      'estudios universitarios',
      'viajes',
      'bodas y celebraciones',
      'muebles',
      'tratamiento dental',
      'autónomos',
      'reunificación de deudas'
    ]
  },
  {
    baseTool: 'calculadora-iva',
    keywords: [
      'autónomos',
      'facturas',
      'coches de segunda mano',
      'vivienda nueva',
      'obras y reformas',
      'hostelería',
      'servicios digitales',
      'canarias igic',
      'productos alimenticios básicos',
      'alquiler de locales comerciales',
      'artistas y creadores de contenido',
      'exportaciones e importaciones',
      'dietas y gastos de viaje',
      'vehículos híbridos y eléctricos'
    ]
  }
];

async function main() {
  console.log('🚀 Iniciando Motor de Generación Masiva (pSEO)...');
  console.log('==================================================');

  for (const group of SEO_STRATEGY) {
    console.log(`\n⚙️  Procesando Base: [${group.baseTool}]`);
    console.log(`📋 Keywords detectadas: ${group.keywords.length}`);
    
    // Llamamos a nuestro motor de base de datos e IA
    try {
      // Como Gemini puede tardar un poco y tiene Rate Limits, 
      // si son muchas keys quizás convenga hacerlas de 1 en 1 o en batch,
      // 'generateToolVariantBatch' ya recorre el array secuencialmente en un for loop.
      const start = Date.now();
      const results = await generateToolVariantBatch(group.baseTool, group.keywords);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      
      console.log(`✅ ¡Completado! Generadas ${results.length} URLs en ${elapsed} segundos.`);
      
    } catch (error) {
      console.error(`❌ Error procesando el grupo [${group.baseTool}]:`, error);
    }
  }

  console.log('\n🎉 Generación Masiva Finalizada.');
  console.log('🔗 Recuerda que el Sitemap ya está actualizado automáticamente.');
}

main()
  .catch((e) => {
    console.error('Error fatal detectado:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
