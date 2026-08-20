import { readFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://cajautil.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_FILE_NAME = '831a5ec4462e7369d725a8cdec1e2506.txt';

function extractSitemapUrls(xml: string): string[] {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
}

async function main() {
  const key = (
    await readFile(path.join(process.cwd(), 'public', KEY_FILE_NAME), 'utf8')
  ).trim();
  const sitemapResponse = await fetch(SITEMAP_URL);

  if (!sitemapResponse.ok) {
    throw new Error(`No se pudo leer ${SITEMAP_URL}: HTTP ${sitemapResponse.status}`);
  }

  const sitemapUrls = extractSitemapUrls(await sitemapResponse.text());
  const requestedUrls = process.argv.slice(2).filter((argument) => argument !== '--dry-run');
  const urls = requestedUrls.length
    ? requestedUrls.map((url) => new URL(url, SITE_URL).toString())
    : sitemapUrls;

  if (urls.length === 0 || urls.length > 10_000) {
    throw new Error(`Cantidad de URLs no valida para IndexNow: ${urls.length}`);
  }

  for (const url of urls) {
    const parsedUrl = new URL(url);

    if (parsedUrl.origin !== SITE_URL) {
      throw new Error(`El sitemap contiene una URL fuera del host canonico: ${url}`);
    }

    if (!sitemapUrls.includes(url)) {
      throw new Error(`La URL no aparece en el sitemap indexable: ${url}`);
    }
  }

  if (process.argv.includes('--dry-run')) {
    console.log(`IndexNow validado: ${urls.length} URLs canonicas preparadas.`);
    return;
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key,
      keyLocation: `${SITE_URL}/${KEY_FILE_NAME}`,
      urlList: urls,
    }),
  });

  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow rechazo el envio: HTTP ${response.status}`);
  }

  const status = response.status === 200 ? 'recibido' : 'aceptado, validacion pendiente';
  console.log(`IndexNow ${status}: ${urls.length} URLs notificadas (HTTP ${response.status}).`);
}

main().catch((error) => {
  console.error('IndexNow fallo:', error);
  process.exit(1);
});
