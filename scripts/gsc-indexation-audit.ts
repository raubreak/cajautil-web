import { createSign } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ path: '.env', quiet: true });

const SITE_URL = 'https://cajautil.com';
const SITE_PROPERTY = 'sc-domain:cajautil.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INSPECTION_ENDPOINT = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
const READONLY_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const BATCH_SIZE = 4;
const REQUEST_TIMEOUT_MS = 20_000;

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
  token_uri: string;
};

type InspectionRow = {
  url: string;
  verdict?: string;
  coverageState?: string;
  indexingState?: string;
  pageFetchState?: string;
  lastCrawlTime?: string;
  googleCanonical?: string;
  userCanonical?: string;
  error?: string;
};

function encodeJson(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function decodeXmlText(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    );
}

async function getGoogleErrorDetail(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as {
      error?: string | { message?: string; status?: string };
      error_description?: string;
    };
    const error = payload.error;
    const status = typeof error === 'object' ? error.status : error;
    const message = typeof error === 'object' ? error.message : payload.error_description;
    return [status, message].filter(Boolean).join(': ').slice(0, 300);
  } catch {
    return '';
  }
}

async function getCredentials(): Promise<ServiceAccountCredentials> {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialsPath) {
    throw new Error('Falta GOOGLE_APPLICATION_CREDENTIALS.');
  }

  const absolutePath = path.resolve(process.cwd(), credentialsPath);
  const credentials = JSON.parse(
    await readFile(absolutePath, 'utf8'),
  ) as Partial<ServiceAccountCredentials>;

  if (!credentials.client_email || !credentials.private_key || !credentials.token_uri) {
    throw new Error('El archivo de credenciales no contiene los campos requeridos.');
  }

  return credentials as ServiceAccountCredentials;
}

async function getAccessToken(credentials: ServiceAccountCredentials): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const unsignedToken = `${encodeJson({ alg: 'RS256', typ: 'JWT' })}.${encodeJson({
    iss: credentials.client_email,
    scope: READONLY_SCOPE,
    aud: credentials.token_uri,
    iat: now,
    exp: now + 3600,
  })}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  const assertion = `${unsignedToken}.${signer.sign(credentials.private_key, 'base64url')}`;

  const response = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!response.ok) {
    const detail = await getGoogleErrorDetail(response);
    throw new Error(
      `No se pudo autenticar con Google: HTTP ${response.status}${detail ? ` (${detail})` : ''}.`,
    );
  }

  const payload = (await response.json()) as { access_token?: string };
  if (!payload.access_token) {
    throw new Error('Google no devolvio un token de acceso.');
  }

  return payload.access_token;
}

async function getSitemapUrls(): Promise<string[]> {
  const response = await fetch(SITEMAP_URL, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`No se pudo leer el sitemap: HTTP ${response.status}.`);
  }

  const xml = await response.text();
  if (!/<(?:\w+:)?urlset(?:\s|>)/.test(xml) || /<(?:\w+:)?sitemapindex(?:\s|>)/.test(xml)) {
    throw new Error('El recurso configurado no es un sitemap urlset valido.');
  }

  const urls = [...xml.matchAll(/<(?:\w+:)?loc>([^<]+)<\/(?:\w+:)?loc>/g)].map(
    (match) => decodeXmlText(match[1].trim()),
  );
  if (urls.length === 0) {
    throw new Error('El sitemap no contiene URLs.');
  }

  for (const url of urls) {
    if (new URL(url).origin !== SITE_URL) {
      throw new Error(`El sitemap contiene una URL fuera del dominio canonico: ${url}`);
    }
  }

  return urls;
}

async function inspectUrl(url: string, accessToken: string): Promise<InspectionRow> {
  const response = await fetch(INSPECTION_ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      inspectionUrl: url,
      siteUrl: SITE_PROPERTY,
      languageCode: 'es-ES',
    }),
  });

  if (!response.ok) {
    const detail = await getGoogleErrorDetail(response);
    return {
      url,
      error: `GSC HTTP ${response.status}${detail ? ` (${detail})` : ''}`,
    };
  }

  const payload = (await response.json()) as {
    inspectionResult?: {
      indexStatusResult?: Omit<InspectionRow, 'url' | 'error'>;
    };
  };
  const index = payload.inspectionResult?.indexStatusResult ?? {};
  if (!index.verdict || !index.coverageState) {
    return { url, error: 'Respuesta GSC incompleta' };
  }

  return {
    url,
    verdict: index.verdict,
    coverageState: index.coverageState,
    indexingState: index.indexingState,
    pageFetchState: index.pageFetchState,
    lastCrawlTime: index.lastCrawlTime,
    googleCanonical: index.googleCanonical,
    userCanonical: index.userCanonical,
  };
}

async function main() {
  const [credentials, urls] = await Promise.all([getCredentials(), getSitemapUrls()]);
  const accessToken = await getAccessToken(credentials);
  const rows: InspectionRow[] = [];

  for (let index = 0; index < urls.length; index += BATCH_SIZE) {
    rows.push(
      ...(await Promise.all(
        urls.slice(index, index + BATCH_SIZE).map((url) => inspectUrl(url, accessToken)),
      )),
    );
  }

  const summary = rows.reduce<Record<string, number>>((counts, row) => {
    const state = row.coverageState ?? row.error ?? 'Sin estado';
    counts[state] = (counts[state] ?? 0) + 1;
    return counts;
  }, {});
  const failures = rows.filter((row) => row.error);
  if (failures.length > 0) {
    const errors = failures.reduce<Record<string, number>>((counts, row) => {
      const error = row.error ?? 'Error desconocido';
      counts[error] = (counts[error] ?? 0) + 1;
      return counts;
    }, {});
    throw new Error(
      `Fallaron ${failures.length} de ${rows.length} inspecciones: ${JSON.stringify(errors)}`,
    );
  }

  const indexed = rows.filter((row) => row.verdict === 'PASS').length;

  console.log(
    JSON.stringify(
      {
        site: SITE_PROPERTY,
        sitemap: SITEMAP_URL,
        inspected: rows.length,
        indexed,
        indexationRate: Number(((indexed / rows.length) * 100).toFixed(1)),
        summary,
        rows,
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Auditoria GSC fallida: ${message}`);
  process.exitCode = 1;
});
