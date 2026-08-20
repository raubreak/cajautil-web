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
  externalSources: number;
  internalArticleLinks: number;
  targetToolLinked: boolean;
  relatedArticleSlugs: string[];
  invalidRelatedArticleSlugs: string[];
};

const MIN_WORDS = 250;

function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function buildAudit(): ArticleAudit[] {
  const articleSlugs = new Set(editorialArticles.map((article) => article.slug));

  return editorialArticles.map((article) => {
    const markdownLinks = [...article.content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);

    return {
      slug: article.slug,
      title: article.title,
      words: countWords(article.content),
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      reviewed: new Date(article.updatedAt).getTime() > new Date(article.publishedAt).getTime(),
      externalSources: markdownLinks.filter((url) => url.startsWith('https://')).length,
      internalArticleLinks: markdownLinks.filter((url) => url.startsWith('/articulos/')).length,
      targetToolLinked: markdownLinks.includes(article.targetToolUrl),
      relatedArticleSlugs: article.relatedArticleSlugs,
      invalidRelatedArticleSlugs: article.relatedArticleSlugs.filter(
        (slug, index, slugs) =>
          slug === article.slug ||
          !articleSlugs.has(slug) ||
          slugs.indexOf(slug) !== index,
      ),
    };
  });
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
  const withoutExternalSources = audit.filter((item) => item.externalSources === 0);
  const withoutTargetToolLink = audit.filter((item) => !item.targetToolLinked);
  const withRelatedReading = audit.filter((item) => item.relatedArticleSlugs.length > 0);
  const invalidRelatedReferences = audit.flatMap((item) => item.invalidRelatedArticleSlugs);

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
    `- Articulos sin fuentes externas: ${withoutExternalSources.length}`,
    `- Articulos sin enlace contextual a su herramienta: ${withoutTargetToolLink.length}`,
    `- Articulos con lecturas relacionadas: ${withRelatedReading.length}`,
    `- Referencias relacionadas invalidas o autorreferentes: ${invalidRelatedReferences.length}`,
    '',
    '## Cola editorial',
    '',
    ...audit.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()).map((item) => `- ${item.slug} | ${item.words} palabras | ${item.externalSources} fuentes | ${item.internalArticleLinks} enlaces editoriales | ${item.relatedArticleSlugs.length} lecturas relacionadas | actualizado ${item.updatedAt}`),
    '',
    '## Workflow recomendado',
    '',
    '1. Editar el contenido en `src/lib/editorialArticles.ts`.',
    '2. Revisar que cada articulo aporte ejemplos, limites y contexto real.',
    '3. Escalonar revisiones usando `updatedAt` cuando haya una mejora manual relevante.',
    '4. Ejecutar `npm run editorial:audit` para detectar fechas, fuentes, enlaces o relaciones invalidas.',
    '5. Validar con `npx eslint` y `npx tsc --noEmit` antes de subir a Git.',
  ].join('\n');
}

function validateAudit(audit: ArticleAudit[]) {
  const invalidRelations = audit.filter((item) => item.invalidRelatedArticleSlugs.length > 0);
  const missingSources = audit.filter((item) => item.externalSources === 0);
  const missingToolLinks = audit.filter((item) => !item.targetToolLinked);

  if (invalidRelations.length || missingSources.length || missingToolLinks.length) {
    throw new Error(
      `Auditoria editorial bloqueada: ${invalidRelations.length} relaciones invalidas, ${missingSources.length} articulos sin fuentes y ${missingToolLinks.length} sin enlace a herramienta.`,
    );
  }
}

async function main() {
  const audit = buildAudit();
  const report = buildMarkdownReport(audit);
  const shouldWriteReport = process.argv.includes('--write-report');

  console.log(report);
  validateAudit(audit);

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
