import prisma from '../src/lib/prisma';
import {
  getArticleDescription,
  sanitizeArticleTags,
  sanitizeMarkdownContent,
} from '../src/lib/contentSanitizers';

async function main() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      slug: true,
      content: true,
      metaDescription: true,
      tags: true,
    },
  });

  let updated = 0;

  for (const article of articles) {
    const cleanContent = sanitizeMarkdownContent(article.content);
    const cleanTags = sanitizeArticleTags(article.tags).join(', ');
    const cleanMetaDescription = getArticleDescription(article.metaDescription, cleanContent);

    if (
      cleanContent !== article.content ||
      cleanTags !== article.tags ||
      cleanMetaDescription !== (article.metaDescription ?? '')
    ) {
      await prisma.article.update({
        where: { id: article.id },
        data: {
          content: cleanContent,
          tags: cleanTags,
          metaDescription: cleanMetaDescription,
        },
      });

      updated += 1;
      console.log(`Actualizado: ${article.slug}`);
    }
  }

  console.log(`Revision completada. Articulos actualizados: ${updated}.`);
}

main()
  .catch((error) => {
    console.error('Error reparando contenido generado:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
