import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
  });
  console.log(`Total artículos: ${articles.length}`);
  articles.forEach(a => {
    console.log(`[${a.publishedAt}] ${a.title} (${a.slug}) - target: ${a.targetToolUrl}`);
  });
}

main().finally(() => prisma.$disconnect());
