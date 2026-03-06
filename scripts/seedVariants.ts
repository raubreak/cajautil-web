import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const variants = [
    {
      slug: 'calculadora-prestamos-coche',
      toolBase: 'calculadora-prestamos',
      seoTitle: 'Calculadora de Préstamos para Comprar Coche 2026 | CajaUtil',
      h1: 'Simulador de Préstamos para tu Coche',
      seoDescription: 'Calcula tu préstamo de coche fácilmente. Descubre cuánto pagarás cada mes y los intereses totales financiando tu vehículo.',
      topContent: 'Si vas a comprar un vehículo nuevo o de segunda mano, utiliza nuestra **calculadora de préstamos para coche**. Ajusta el importe y el interés para saber qué cuota mensual te queda.',
      bottomContent: '### ¿Cómo funciona el simulador de préstamos de Coche?\n\nAl introducir el dinero que te pedirá el concesionario o el banco, junto con el interés promedio actual de los préstamos auto (normalmente entre el 5% y el 9%), obtendrás la amortización exacta. Financiar un coche es una de las decisiones más importantes después de una hipoteca. ¡No te dejes engañar por los intereses compuestos!'
    },
    {
      slug: 'calculadora-prestamos-reformas',
      toolBase: 'calculadora-prestamos',
      seoTitle: 'Simulador de Préstamo para Reformas y Hogar | CajaUtil',
      h1: 'Calculadora de Préstamos para Reformas',
      seoDescription: 'Calcula la cuota mensual de tu préstamo para reforma de hogar. Simula capital, intereses y cuadro de amortización gratis.',
      topContent: 'Reforma tu casa con seguridad financiera. Nuestra **calculadora de préstamos para reformas** te permite ver las cuotas exactas que pagarás mes a mes al pedir dinero al banco.',
      bottomContent: '### Consejos para pedir un préstamo de Reforma\n\nLas obras siempre acaban costando un 10-20% más de lo presupuestado. Es recomendable que al usar este simulador, calcules la cuota con un importe ligeramente superior al presupuesto inicial del contratista.'
    }
  ];

  for (const variant of variants) {
    await prisma.toolVariant.upsert({
      where: { slug: variant.slug },
      update: variant,
      create: variant,
    });
    console.log(`Variante upserted: ${variant.slug}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
