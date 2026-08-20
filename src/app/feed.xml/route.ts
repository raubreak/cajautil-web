import { editorialArticles } from '@/lib/editorialArticles';

const SITE_URL = 'https://cajautil.com';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
    };

    return entities[character];
  });
}

export function GET() {
  const articles = [...editorialArticles].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  const lastBuildDate = new Date(articles[0].updatedAt).toUTCString();
  const items = articles.map((article) => {
    const url = `${SITE_URL}/articulos/${article.slug}`;

    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.updatedAt).toUTCString()}</pubDate>
    </item>`;
  });

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Guías prácticas de CajaUtil.com</title>
    <link>${SITE_URL}/articulos</link>
    <description>Guías sobre finanzas personales, herramientas digitales, seguridad y productividad.</description>
    <language>es-ES</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
