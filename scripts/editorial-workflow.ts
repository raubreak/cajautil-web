import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { editorialArticles } from '../src/lib/editorialArticles';

type ArticleAudit = {
  slug: string;
  title: string;
  words: number;
  publishedAt: string;
  updatedAt: string;
  reviewed: boolean;
};

const MIN_WORDS = 250;

function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function buildAudit(): ArticleAudit[] {
  return editorialArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    words: countWords(article.content),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    reviewed: new Date(article.updatedAt).getTime() > new Date(article.publishedAt).getTime(),
  }));
}

function groupByDate(values: string[]): Map<string, number> {
  return values.reduce((map, value) => {
    map.set(value, (map.get(value) ?? 0) + 1);
    return map;
  }, new Map<string, number>());
}

function buildMarkdownReport(audit: ArticleAudit[]): string {
  const duplicatePublishedDates = [...groupByDate(audit.map((item) => item.publishedAt)).entries()].filter(([, count]) => count > 1);
  const duplicateUpdatedDates = [...groupByDate(audit.map((item) => item.updatedAt)).entries()].filter(([, count]) => count > 1);
  const underTarget = audit.filter((item) => item.words < MIN_WORDS);
  const reviewedCount = audit.filter((item) => item.reviewed).length;

  return [
    '# Editorial Workflow Audit',
    '',
    `- Fecha: ${new Date().toISOString()}`,
    `- Articulos auditados: ${audit.length}`,
    `- Articulos con revision posterior a publicacion: ${reviewedCount}`,
    `- Objetivo minimo de palabras: ${MIN_WORDS}`,
    '',
    '## Hallazgos',
    '',
    `- Fechas de publicacion repetidas: ${duplicatePublishedDates.length}`,
    `- Fechas de actualizacion repetidas: ${duplicateUpdatedDates.length}`,
    `- Articulos por debajo del objetivo: ${underTarget.length}`,
    '',
    '## Cola editorial',
    '',
    ...audit.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()).map((item) => `- ${item.slug} | ${item.words} palabras | actualizado ${item.updatedAt}`),
    '',
    '## Workflow recomendado',
    '',
    '1. Editar el contenido en `src/lib/editorialArticles.ts`.',
    '2. Revisar que cada articulo aporte ejemplos, limites y contexto real.',
    '3. Escalonar revisiones usando `updatedAt` cuando haya una mejora manual relevante.',
    '4. Ejecutar `npm run editorial:audit` para detectar fechas duplicadas y piezas flojas.',
    '5. Validar con `npx eslint` y `npx tsc --noEmit` antes de subir a Git.',
  ].join('\n');
}

async function main() {
  const audit = buildAudit();
  const report = buildMarkdownReport(audit);
  const shouldWriteReport = process.argv.includes('--write-report');

  console.log(report);

  if (!shouldWriteReport) {
    return;
  }

  const reportsDir = path.join(process.cwd(), 'docs', 'seo-reports');
  const fileName = `${new Date().toISOString().slice(0, 10)}-editorial-audit.md`;

  await mkdir(reportsDir, { recursive: true });
  await writeFile(path.join(reportsDir, fileName), `${report}\n`, 'utf8');

  console.log(`\nReporte guardado en docs/seo-reports/${fileName}`);
}

main().catch((error) => {
  console.error('Editorial workflow failed:', error);
  process.exit(1);
});
