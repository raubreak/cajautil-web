import { execFile } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const SITE_URL = 'https://cajautil.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_FILE_NAME = '831a5ec4462e7369d725a8cdec1e2506.txt';
const FETCH_TIMEOUT_MS = 15_000;
const PROMOTION_ATTEMPTS = 12;
const PROMOTION_RETRY_MS = 5_000;
const execFileAsync = promisify(execFile);

interface SitemapEntry {
  url: string;
  lastModified: string | null;
}

interface CliOptions {
  dryRun: boolean;
  requestedUrls: string[];
  changedFrom?: string;
  expectedSitemap?: string;
  githubDeployment?: number | 'latest';
}

interface GitHubDeployment {
  id: number;
  environment: string;
  sha: string;
}

interface GitHubDeploymentStatus {
  state: string;
  environment_url: string | null;
}

interface DeploymentRange {
  currentSha: string;
  previousSha?: string;
}

function decodeXml(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function extractSitemapEntries(xml: string): SitemapEntry[] {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
    const loc = match[1].match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastModified = match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? null;

    if (!loc) {
      throw new Error('El sitemap contiene una entrada sin <loc>.');
    }

    return {
      url: decodeXml(loc.trim()),
      lastModified: lastModified?.trim() ?? null,
    };
  });
}

function parseOptions(argumentsList: string[]): CliOptions {
  const options: CliOptions = { dryRun: false, requestedUrls: [] };

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];

    if (argument === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (argument === '--changed-from' || argument === '--expected-sitemap') {
      const value = argumentsList[index + 1];

      if (!value || value.startsWith('--')) {
        throw new Error(`Falta el valor de ${argument}.`);
      }

      if (argument === '--changed-from') {
        options.changedFrom = value;
      } else {
        options.expectedSitemap = value;
      }

      index += 1;
      continue;
    }

    if (argument === '--github-deployment') {
      const value = argumentsList[index + 1];

      if (!value || value.startsWith('--')) {
        throw new Error('Falta el valor de --github-deployment.');
      }

      const deploymentId = Number(value);
      options.githubDeployment = value === 'latest' ? 'latest' : deploymentId;

      if (options.githubDeployment !== 'latest' && !Number.isSafeInteger(deploymentId)) {
        throw new Error(`ID de despliegue de GitHub no valido: ${value}`);
      }

      index += 1;
      continue;
    }

    if (argument.startsWith('--')) {
      throw new Error(`Opcion de IndexNow desconocida: ${argument}`);
    }

    options.requestedUrls.push(argument);
  }

  if (options.githubDeployment && (options.changedFrom || options.expectedSitemap)) {
    throw new Error('--github-deployment no se puede combinar con URLs de sitemap manuales.');
  }

  return options;
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...init,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

async function fetchSitemap(url: string): Promise<SitemapEntry[]> {
  const response = await fetchWithTimeout(url, { redirect: 'follow' });

  if (!response.ok) {
    throw new Error(`No se pudo leer ${url}: HTTP ${response.status}`);
  }

  const entries = extractSitemapEntries(await response.text());

  if (entries.length === 0 || entries.length > 10_000) {
    throw new Error(`Cantidad de URLs no valida en ${url}: ${entries.length}`);
  }

  return entries;
}

function sitemapSignature(entries: SitemapEntry[]): string {
  return entries
    .map(({ url, lastModified }) => `${url}\t${lastModified ?? ''}`)
    .sort()
    .join('\n');
}

async function waitForProductionPromotion(expectedSitemap: string): Promise<SitemapEntry[]> {
  const expectedEntries = await fetchSitemap(expectedSitemap);
  const expectedSignature = sitemapSignature(expectedEntries);

  for (let attempt = 1; attempt <= PROMOTION_ATTEMPTS; attempt += 1) {
    const productionEntries = await fetchSitemap(SITEMAP_URL);

    if (sitemapSignature(productionEntries) === expectedSignature) {
      return productionEntries;
    }

    if (attempt < PROMOTION_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, PROMOTION_RETRY_MS));
    }
  }

  throw new Error(
    `El dominio canonico no sirve el sitemap del despliegue tras ${PROMOTION_ATTEMPTS} intentos.`,
  );
}

async function githubRequest<T>(pathname: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GITHUB_TOKEN es obligatorio para resolver despliegues de GitHub.');
  }

  const response = await fetchWithTimeout(`https://api.github.com${pathname}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API rechazo ${pathname}: HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function getSuccessfulDeploymentUrl(
  repository: string,
  deploymentId: number,
): Promise<string | null> {
  const statuses = await githubRequest<GitHubDeploymentStatus[]>(
    `/repos/${repository}/deployments/${deploymentId}/statuses?per_page=10`,
  );
  const successfulStatus = statuses.find(
    (status) => status.state === 'success' && status.environment_url,
  );

  return successfulStatus?.environment_url?.replace(/\/$/, '') ?? null;
}

async function resolveDeploymentRange(
  requestedDeployment: number | 'latest',
): Promise<DeploymentRange> {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    throw new Error('GITHUB_REPOSITORY es obligatorio para resolver despliegues.');
  }

  const deployments = await githubRequest<GitHubDeployment[]>(
    `/repos/${repository}/deployments?environment=Production&per_page=100`,
  );

  if (deployments.length === 0) {
    throw new Error('GitHub no devolvio despliegues de produccion.');
  }

  const requestedIndex =
    requestedDeployment === 'latest'
      ? 0
      : deployments.findIndex((deployment) => deployment.id === requestedDeployment);

  if (requestedIndex < 0) {
    throw new Error(`No se encontro el despliegue ${requestedDeployment} en produccion.`);
  }

  let currentIndex = requestedIndex;
  let currentUrl: string | null = null;

  while (currentIndex < deployments.length && !currentUrl) {
    if (requestedDeployment !== 'latest' && currentIndex !== requestedIndex) {
      break;
    }

    currentUrl = await getSuccessfulDeploymentUrl(repository, deployments[currentIndex].id);

    if (!currentUrl) {
      currentIndex += 1;
    }
  }

  if (!currentUrl) {
    throw new Error(`El despliegue ${requestedDeployment} no tiene un estado success con URL.`);
  }

  let previousUrl: string | null = null;
  let previousIndex: number | null = null;

  for (let index = currentIndex + 1; index < deployments.length && !previousUrl; index += 1) {
    previousUrl = await getSuccessfulDeploymentUrl(repository, deployments[index].id);

    if (previousUrl) {
      previousIndex = index;
    }
  }

  return {
    currentSha: deployments[currentIndex].sha,
    ...(previousIndex !== null ? { previousSha: deployments[previousIndex].sha } : {}),
  };
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveImport(importer: string, specifier: string): Promise<string | null> {
  if (!specifier.startsWith('.') && !specifier.startsWith('@/')) {
    return null;
  }

  const unresolved = specifier.startsWith('@/')
    ? path.join(process.cwd(), 'src', specifier.slice(2))
    : path.resolve(path.dirname(path.join(process.cwd(), importer)), specifier);
  const candidates = [
    unresolved,
    ...['.ts', '.tsx', '.js', '.jsx', '.css'].map((extension) => `${unresolved}${extension}`),
    ...['.ts', '.tsx', '.js', '.jsx'].map((extension) =>
      path.join(unresolved, `index${extension}`),
    ),
  ];

  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return path.relative(process.cwd(), candidate).replaceAll(path.sep, '/');
    }
  }

  return null;
}

async function getSourceDependencies(filePath: string): Promise<string[]> {
  const source = await readFile(filePath, 'utf8');
  const specifiers = [
    ...source.matchAll(/(?:from\s+|import\s*)['"]([^'"]+)['"]/g),
    ...source.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g),
  ].map((match) => match[1]);
  const relativePath = path.relative(process.cwd(), filePath).replaceAll(path.sep, '/');
  const dependencies = await Promise.all(
    specifiers.map((specifier) => resolveImport(relativePath, specifier)),
  );

  return dependencies.filter((dependency): dependency is string => dependency !== null);
}

function urlsForRouteEntry(routeEntry: string, sitemapUrls: string[]): string[] {
  const relativeRoute = routeEntry
    .replace(/^src\/app\//, '')
    .replace(/\/(?:page|layout)\.[^.]+$/, '')
    .replace(/^(?:page|layout)\.[^.]+$/, '');

  if (relativeRoute === '' && routeEntry.includes('/layout.')) {
    return sitemapUrls;
  }

  if (relativeRoute === '') {
    return sitemapUrls.filter((url) => new URL(url).pathname === '/');
  }

  const segments = relativeRoute
    .split('/')
    .filter((segment) => !segment.startsWith('(') && !segment.startsWith('@'));
  const dynamicIndex = segments.findIndex((segment) => segment.startsWith('['));

  if (dynamicIndex >= 0) {
    const prefix = `/${segments.slice(0, dynamicIndex).join('/')}/`;
    return sitemapUrls.filter((url) => new URL(url).pathname.startsWith(prefix));
  }

  const routePath = `/${segments.join('/')}`;
  return sitemapUrls.filter((url) => new URL(url).pathname === routePath);
}

async function selectChangedUrlsFromGit(
  currentEntries: SitemapEntry[],
  range: DeploymentRange,
): Promise<string[]> {
  if (!range.previousSha) {
    return currentEntries.map((entry) => entry.url);
  }

  const { stdout } = await execFileAsync('git', [
    'diff',
    '--name-only',
    '--diff-filter=ACDMRT',
    `${range.previousSha}..${range.currentSha}`,
  ]);
  const changedFiles = stdout
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean);

  if (changedFiles.length === 0) {
    return [];
  }

  const sitemapUrls = currentEntries.map((entry) => entry.url);
  const changedSet = new Set(changedFiles);
  let packageScriptsOnly = false;

  if (changedSet.has('package.json') && !changedSet.has('package-lock.json')) {
    const [previousPackage, currentPackage] = await Promise.all(
      [range.previousSha, range.currentSha].map(async (revision) => {
        const { stdout: packageJson } = await execFileAsync('git', [
          'show',
          `${revision}:package.json`,
        ]);
        const parsedPackage = JSON.parse(packageJson) as Record<string, unknown>;
        delete parsedPackage.scripts;
        return parsedPackage;
      }),
    );
    packageScriptsOnly = JSON.stringify(previousPackage) === JSON.stringify(currentPackage);
  }

  const sourceFiles = (await readdir(path.join(process.cwd(), 'src'), { recursive: true }))
    .filter((file) => /\.(?:ts|tsx|js|jsx|css)$/.test(file))
    .map((file) => `src/${file.replaceAll(path.sep, '/')}`);
  const routeEntries = sourceFiles.filter((file) => /src\/app\/(?:.*\/)?(?:page|layout)\.(?:ts|tsx|js|jsx)$/.test(file));
  const dependencyCache = new Map<string, string[]>();
  const affectedUrls = new Set<string>();
  const coveredChanges = new Set<string>();

  async function collectDependencies(file: string, collected = new Set<string>()): Promise<Set<string>> {
    if (collected.has(file)) {
      return collected;
    }

    collected.add(file);
    let dependencies = dependencyCache.get(file);

    if (!dependencies) {
      dependencies = await getSourceDependencies(path.join(process.cwd(), file));
      dependencyCache.set(file, dependencies);
    }

    for (const dependency of dependencies) {
      await collectDependencies(dependency, collected);
    }

    return collected;
  }

  for (const routeEntry of routeEntries) {
    const dependencies = await collectDependencies(routeEntry);
    const matchingChanges = [...dependencies].filter((dependency) => changedSet.has(dependency));

    if (matchingChanges.length === 0) {
      continue;
    }

    matchingChanges.forEach((file) => coveredChanges.add(file));
    urlsForRouteEntry(routeEntry, sitemapUrls).forEach((url) => affectedUrls.add(url));
  }

  const ignoredChanges = changedFiles.filter(
    (file) =>
      file.startsWith('docs/') ||
      file.startsWith('scripts/') ||
      file.startsWith('.github/') ||
      file.startsWith('.agents/') ||
      file.startsWith('.opencode/') ||
      file === 'AGENTS.md' ||
      (file === 'package.json' && packageScriptsOnly) ||
      file === 'src/app/sitemap.ts' ||
      file === 'src/app/robots.ts',
  );
  const unexplainedChanges = changedFiles.filter(
    (file) => !coveredChanges.has(file) && !ignoredChanges.includes(file),
  );

  if (unexplainedChanges.length > 0) {
    console.log(
      `IndexNow: ${unexplainedChanges.length} cambios globales o no mapeados; se notificara todo el sitemap.`,
    );
    return sitemapUrls;
  }

  console.log(
    `IndexNow: ${changedFiles.length} archivos cambiados afectan ${affectedUrls.size} URLs indexables.`,
  );
  return [...affectedUrls];
}

function selectChangedUrls(
  currentEntries: SitemapEntry[],
  previousEntries: SitemapEntry[],
): string[] {
  const previousByUrl = new Map(previousEntries.map((entry) => [entry.url, entry.lastModified]));

  return currentEntries
    .filter((entry) => {
      const previousLastModified = previousByUrl.get(entry.url);
      return previousLastModified === undefined || previousLastModified !== entry.lastModified;
    })
    .map((entry) => entry.url);
}

async function validateProductionResources(key: string, urls: string[]): Promise<void> {
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error('La clave IndexNow local no cumple el formato oficial.');
  }

  const keyLocation = `${SITE_URL}/${KEY_FILE_NAME}`;
  const keyResponse = await fetchWithTimeout(keyLocation, { redirect: 'manual' });

  if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
    throw new Error(`La clave publica IndexNow no coincide en ${keyLocation}.`);
  }

  const results = await Promise.all(
    urls.map(async (url) => {
      const response = await fetchWithTimeout(url, { method: 'HEAD', redirect: 'manual' });
      return { url, status: response.status };
    }),
  );
  const invalidResult = results.find((result) => result.status !== 200);

  if (invalidResult) {
    throw new Error(
      `La URL actualizada no esta disponible sin redireccion: ${invalidResult.url} (HTTP ${invalidResult.status}).`,
    );
  }
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const key = (
    await readFile(path.join(process.cwd(), 'public', KEY_FILE_NAME), 'utf8')
  ).trim();

  const deploymentRange = options.githubDeployment
    ? await resolveDeploymentRange(options.githubDeployment)
    : undefined;

  const sitemapEntries = options.expectedSitemap
    ? await waitForProductionPromotion(options.expectedSitemap)
    : await fetchSitemap(SITEMAP_URL);
  const sitemapUrlByNormalizedUrl = new Map(
    sitemapEntries.map((entry) => [new URL(entry.url).toString(), entry.url]),
  );

  let urls: string[];

  if (options.requestedUrls.length > 0) {
    urls = options.requestedUrls.map((url) => {
      const normalizedUrl = new URL(url, SITE_URL).toString();
      return sitemapUrlByNormalizedUrl.get(normalizedUrl) ?? normalizedUrl;
    });
  } else if (deploymentRange) {
    urls = await selectChangedUrlsFromGit(sitemapEntries, deploymentRange);
  } else if (options.changedFrom) {
    urls = selectChangedUrls(sitemapEntries, await fetchSitemap(options.changedFrom));
  } else {
    urls = sitemapEntries.map((entry) => entry.url);
  }

  urls = [...new Set(urls)];

  if (urls.length === 0) {
    console.log('IndexNow: el despliegue no contiene URLs indexables nuevas o actualizadas.');
    return;
  }

  if (urls.length > 10_000) {
    throw new Error(`Cantidad de URLs no valida para IndexNow: ${urls.length}`);
  }

  for (const url of urls) {
    const parsedUrl = new URL(url);

    if (parsedUrl.origin !== SITE_URL) {
      throw new Error(`El sitemap contiene una URL fuera del host canonico: ${url}`);
    }

    if (!sitemapEntries.some((entry) => entry.url === url)) {
      throw new Error(`La URL no aparece en el sitemap indexable: ${url}`);
    }
  }

  await validateProductionResources(key, urls);

  if (options.dryRun) {
    const urlLabel = urls.length === 1 ? 'URL canonica actualizada preparada' : 'URLs canonicas actualizadas preparadas';
    console.log(`IndexNow validado: ${urls.length} ${urlLabel}.`);
    urls.forEach((url) => console.log(`- ${url}`));
    return;
  }

  const response = await fetchWithTimeout(INDEXNOW_ENDPOINT, {
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
