import prisma from '../src/lib/prisma';

const ARTICLE_SLUG = 'simulador-de-prestamos-tu-guia-definitiva-2024';
const FIXED_TITLE = 'Simulador de Prestamos: Tu Guia Definitiva';

async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: ARTICLE_SLUG },
    select: { id: true, slug: true, title: true },
  });

  if (!article) {
    console.log(`No se encontro el articulo ${ARTICLE_SLUG}.`);
    return;
  }

  if (article.title === FIXED_TITLE) {
    console.log(`El articulo ${ARTICLE_SLUG} ya tiene el titulo corregido.`);
    return;
  }

  await prisma.article.update({
    where: { id: article.id },
    data: { title: FIXED_TITLE },
  });

  console.log(`Titulo corregido: ${article.title} -> ${FIXED_TITLE}`);
}

main()
  .catch((error) => {
    console.error('Error corrigiendo el titulo del articulo:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
