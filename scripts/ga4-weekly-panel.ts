import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as dotenv from 'dotenv';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ path: '.env', quiet: true });

const DIMENSIONS = [
  'sessionDefaultChannelGroup',
  'sessionSourceMedium',
  'landingPagePlusQueryString',
  'country',
  'city',
  'deviceCategory',
  'browser',
  'operatingSystem',
  'screenResolution',
] as const;

const METRICS = [
  'sessions',
  'totalUsers',
  'engagedSessions',
  'screenPageViews',
  'averageSessionDuration',
] as const;

const INTERNAL_PATHS = new Set(['/revision-seo']);
const AUTOMATION_PATHS = new Set(['/cmd_sco']);

type Segment = 'organic' | 'real_non_organic' | 'automation' | 'internal';

type TrafficRow = {
  channel: string;
  sourceMedium: string;
  landing: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  operatingSystem: string;
  screenResolution: string;
  sessions: number;
  users: number;
  engagedSessions: number;
  views: number;
  averageSessionDuration: number;
  segment: Segment;
  classificationReason: string;
};

type SegmentTotals = {
  sessions: number;
  users: number;
  engagedSessions: number;
  views: number;
  durationWeightedBySessions: number;
};

type PeriodReport = {
  startDate: string;
  endDate: string;
  rows: TrafficRow[];
  segments: Record<Segment, SegmentTotals>;
};

type Options = {
  endDate?: string;
  output?: string;
  monetagRevenue?: number;
  monetagImpressions?: number;
  currency: string;
};

function parseNumber(value: string | null | undefined): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseOptionalNumber(value: string | undefined, flag: string): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${flag} debe ser un numero igual o superior a cero.`);
  }
  return parsed;
}

function parseOptions(argv: string[]): Options {
  const options: Options = { currency: 'USD' };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];

    if (argument === '--end-date') {
      options.endDate = value;
      index += 1;
    } else if (argument === '--output') {
      options.output = value;
      index += 1;
    } else if (argument === '--monetag-revenue') {
      options.monetagRevenue = parseOptionalNumber(value, argument);
      index += 1;
    } else if (argument === '--monetag-impressions') {
      options.monetagImpressions = parseOptionalNumber(value, argument);
      index += 1;
    } else if (argument === '--currency') {
      options.currency = value?.toUpperCase() ?? '';
      index += 1;
    } else {
      throw new Error(`Argumento desconocido: ${argument}`);
    }
  }

  if (!options.currency) throw new Error('--currency requiere un valor.');
  return options;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseDate(value: string, label: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} debe usar el formato YYYY-MM-DD.`);
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || formatDate(date) !== value) {
    throw new Error(`${label} no es una fecha valida.`);
  }
  return date;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function getPeriods(endDateOption?: string) {
  const today = new Date();
  const defaultEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1));
  const currentEnd = endDateOption ? parseDate(endDateOption, '--end-date') : defaultEnd;
  const currentStart = addDays(currentEnd, -6);
  const previousEnd = addDays(currentStart, -1);
  const previousStart = addDays(previousEnd, -6);

  return {
    current: { startDate: formatDate(currentStart), endDate: formatDate(currentEnd) },
    previous: { startDate: formatDate(previousStart), endDate: formatDate(previousEnd) },
  };
}

function parseLanding(value: string): URL | null {
  if (!value || value === '(not set)') return null;
  try {
    return new URL(value, 'https://cajautil.com');
  } catch {
    return null;
  }
}

function hasExplicitMarker(landing: URL | null, marker: string): boolean {
  return landing?.searchParams.get('caja_traffic') === marker;
}

function isKnownSyntheticFingerprint(row: Omit<TrafficRow, 'segment' | 'classificationReason'>): boolean {
  if (row.sessions < 3) return false;

  const userRatio = row.users / row.sessions;
  const engagementRate = row.engagedSessions / row.sessions;
  const landing = parseLanding(row.landing);

  return (
    row.channel === 'Direct' &&
    landing?.pathname === '/' &&
    row.country === 'Spain' &&
    row.city === 'Barcelona' &&
    row.device === 'mobile' &&
    row.browser === 'Chrome' &&
    row.operatingSystem === 'iOS' &&
    row.screenResolution === '414x896' &&
    userRatio >= 0.75 &&
    engagementRate <= 0.25
  );
}

function classifyRow(
  row: Omit<TrafficRow, 'segment' | 'classificationReason'>,
): Pick<TrafficRow, 'segment' | 'classificationReason'> {
  const landing = parseLanding(row.landing);
  const pathname = landing?.pathname ?? '';

  if (hasExplicitMarker(landing, 'automation') || AUTOMATION_PATHS.has(pathname)) {
    return { segment: 'automation', classificationReason: 'Marcador o ruta explicita de automatizacion' };
  }

  if (
    hasExplicitMarker(landing, 'internal') ||
    INTERNAL_PATHS.has(pathname) ||
    landing?.searchParams.has('deploy') ||
    landing?.searchParams.has('gtm_latency')
  ) {
    return { segment: 'internal', classificationReason: 'Marcador, ruta o parametro interno/QA' };
  }

  if (isKnownSyntheticFingerprint(row)) {
    return { segment: 'automation', classificationReason: 'Huella sintetica historica de alta confianza' };
  }

  if (row.channel === 'Organic Search') {
    return { segment: 'organic', classificationReason: 'Canal predeterminado Organic Search' };
  }

  return { segment: 'real_non_organic', classificationReason: 'Sin senales conservadoras de automatizacion' };
}

function emptyTotals(): SegmentTotals {
  return { sessions: 0, users: 0, engagedSessions: 0, views: 0, durationWeightedBySessions: 0 };
}

function aggregateSegments(rows: TrafficRow[]): Record<Segment, SegmentTotals> {
  const totals: Record<Segment, SegmentTotals> = {
    organic: emptyTotals(),
    real_non_organic: emptyTotals(),
    automation: emptyTotals(),
    internal: emptyTotals(),
  };

  for (const row of rows) {
    const target = totals[row.segment];
    target.sessions += row.sessions;
    target.users += row.users;
    target.engagedSessions += row.engagedSessions;
    target.views += row.views;
    target.durationWeightedBySessions += row.averageSessionDuration * row.sessions;
  }

  return totals;
}

async function fetchPeriod(
  client: BetaAnalyticsDataClient,
  propertyId: string,
  startDate: string,
  endDate: string,
): Promise<PeriodReport> {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: DIMENSIONS.map((name) => ({ name })),
    metrics: METRICS.map((name) => ({ name })),
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 100_000,
  });

  const responseRows = response.rows ?? [];
  if ((response.rowCount ?? 0) > responseRows.length) {
    throw new Error(`GA4 devolvio ${responseRows.length} de ${response.rowCount} filas; el panel no generara totales parciales.`);
  }

  const rows = responseRows.map((row) => {
    const dimensions = row.dimensionValues ?? [];
    const metrics = row.metricValues ?? [];
    const baseRow = {
      channel: dimensions[0]?.value ?? '(not set)',
      sourceMedium: dimensions[1]?.value ?? '(not set)',
      landing: dimensions[2]?.value ?? '(not set)',
      country: dimensions[3]?.value ?? '(not set)',
      city: dimensions[4]?.value ?? '(not set)',
      device: dimensions[5]?.value ?? '(not set)',
      browser: dimensions[6]?.value ?? '(not set)',
      operatingSystem: dimensions[7]?.value ?? '(not set)',
      screenResolution: dimensions[8]?.value ?? '(not set)',
      sessions: parseNumber(metrics[0]?.value),
      users: parseNumber(metrics[1]?.value),
      engagedSessions: parseNumber(metrics[2]?.value),
      views: parseNumber(metrics[3]?.value),
      averageSessionDuration: parseNumber(metrics[4]?.value),
    };

    return { ...baseRow, ...classifyRow(baseRow) };
  });

  return { startDate, endDate, rows, segments: aggregateSegments(rows) };
}

function sumTotals(...totals: SegmentTotals[]): SegmentTotals {
  return totals.reduce(
    (result, current) => ({
      sessions: result.sessions + current.sessions,
      users: result.users + current.users,
      engagedSessions: result.engagedSessions + current.engagedSessions,
      views: result.views + current.views,
      durationWeightedBySessions: result.durationWeightedBySessions + current.durationWeightedBySessions,
    }),
    emptyTotals(),
  );
}

function ratio(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator;
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function decimal(value: number): string {
  return value.toFixed(2);
}

function integer(value: number): string {
  return Math.round(value).toLocaleString('es-ES');
}

function change(current: number, previous: number): string {
  if (previous === 0) return current === 0 ? '0,0%' : 'N/A';
  const result = ((current - previous) / previous) * 100;
  return `${result > 0 ? '+' : ''}${result.toFixed(1).replace('.', ',')}%`;
}

function averageDuration(totals: SegmentTotals): number {
  return ratio(totals.durationWeightedBySessions, totals.sessions);
}

function landingPath(value: string): string {
  const landing = parseLanding(value);
  return landing?.pathname ?? value;
}

function aggregateByLanding(rows: TrafficRow[]) {
  const landings = new Map<string, SegmentTotals>();
  for (const row of rows) {
    if (row.segment === 'automation' || row.segment === 'internal') continue;
    const key = landingPath(row.landing);
    const current = landings.get(key) ?? emptyTotals();
    current.sessions += row.sessions;
    current.users += row.users;
    current.engagedSessions += row.engagedSessions;
    current.views += row.views;
    current.durationWeightedBySessions += row.averageSessionDuration * row.sessions;
    landings.set(key, current);
  }

  return [...landings.entries()]
    .sort((left, right) => right[1].views - left[1].views || right[1].sessions - left[1].sessions)
    .slice(0, 10);
}

function aggregateByChannel(rows: TrafficRow[]) {
  const channels = new Map<string, SegmentTotals>();
  for (const row of rows) {
    if (row.segment === 'automation' || row.segment === 'internal') continue;
    const current = channels.get(row.channel) ?? emptyTotals();
    current.sessions += row.sessions;
    current.users += row.users;
    current.engagedSessions += row.engagedSessions;
    current.views += row.views;
    current.durationWeightedBySessions += row.averageSessionDuration * row.sessions;
    channels.set(row.channel, current);
  }

  return [...channels.entries()].sort((left, right) => right[1].sessions - left[1].sessions);
}

function escapeCell(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function monetagSection(options: Options, real: SegmentTotals): string[] {
  if (options.monetagRevenue === undefined) {
    return [
      '## Monetag',
      '',
      'No se aportaron ingresos de Monetag. El panel no estima ni inventa revenue.',
      '',
      `- Inventario valido medido: **${integer(real.views)} paginas vistas**.`,
      `- Sesiones reales medidas: **${integer(real.sessions)}**.`,
      `- Paginas por sesion real: **${decimal(ratio(real.views, real.sessions))}**.`,
      '- Para calcular Page RPM y Session RPM, ejecuta el panel con `--monetag-revenue <importe> --currency USD`.',
    ];
  }

  const revenue = options.monetagRevenue;
  const money = new Intl.NumberFormat('es-ES', { style: 'currency', currency: options.currency }).format(revenue);
  const pageRpm = ratio(revenue * 1000, real.views);
  const sessionRpm = ratio(revenue * 1000, real.sessions);
  const lines = [
    '## Monetag',
    '',
    `- Ingresos declarados: **${money}**.`,
    `- Page RPM sobre inventario valido: **${pageRpm.toFixed(2)} ${options.currency}**.`,
    `- Session RPM real: **${sessionRpm.toFixed(2)} ${options.currency}**.`,
  ];

  if (options.monetagImpressions !== undefined) {
    const ecpm = ratio(revenue * 1000, options.monetagImpressions);
    lines.push(`- Impresiones Monetag declaradas: **${integer(options.monetagImpressions)}**.`);
    lines.push(`- eCPM declarado: **${ecpm.toFixed(2)} ${options.currency}**.`);
  }

  return lines;
}

function recommendations(current: PeriodReport, options: Options): string[] {
  const organic = current.segments.organic;
  const real = sumTotals(organic, current.segments.real_non_organic);
  const measured = sumTotals(real, current.segments.automation, current.segments.internal);
  const automationShare = ratio(current.segments.automation.sessions, measured.sessions);
  const result: string[] = [];

  if (automationShare >= 0.1) {
    result.push('Revisar las fuentes de automatizacion: superan el 10% de las sesiones medidas y distorsionan cualquier RPM sin limpiar.');
  }
  if (organic.sessions === 0) {
    result.push('Mantener el foco en indexacion y autoridad: no hubo sesiones organicas medidas esta semana.');
  }
  if (real.views < 100) {
    result.push('No aumentar todavia la presion publicitaria: con menos de 100 paginas vistas reales semanales, el ingreso incremental sera minimo y el riesgo UX/SEO sera desproporcionado.');
  }
  if (ratio(real.engagedSessions, real.sessions) < 0.4 && real.sessions > 0) {
    result.push('Mejorar retencion y uso de herramientas antes de escalar anuncios; la tasa de engagement real esta por debajo del 40%.');
  }
  if (options.monetagRevenue === undefined) {
    result.push('Incorporar el ingreso semanal exportado de Monetag para medir Page RPM y Session RPM sobre trafico valido.');
  }
  if (result.length === 0) {
    result.push('Mantener la configuracion y comparar RPM, engagement e inventario valido durante otra semana antes de aumentar formatos.');
  }

  return result;
}

function renderMarkdown(current: PeriodReport, previous: PeriodReport, options: Options): string {
  const currentReal = sumTotals(current.segments.organic, current.segments.real_non_organic);
  const previousReal = sumTotals(previous.segments.organic, previous.segments.real_non_organic);
  const currentMeasured = sumTotals(currentReal, current.segments.automation, current.segments.internal);
  const previousMeasured = sumTotals(previousReal, previous.segments.automation, previous.segments.internal);
  const topLandings = aggregateByLanding(current.rows);
  const channels = aggregateByChannel(current.rows);
  const automatedRows = current.rows
    .filter((row) => row.segment === 'automation' || row.segment === 'internal')
    .sort((left, right) => right.sessions - left.sessions)
    .slice(0, 10);

  const lines = [
    '# Panel semanal GA4 y monetizacion',
    '',
    `Periodo actual: **${current.startDate} a ${current.endDate}**. Comparativa: **${previous.startDate} a ${previous.endDate}**.`,
    '',
    '> Los segmentos son excluyentes. "Real total" suma organico y real no organico; excluye automatizacion probable e interno/QA. GA4 solo representa usuarios que aceptaron analitica.',
    '',
    '## Resumen ejecutivo',
    '',
    '| KPI | Semana actual | Semana anterior | Variacion |',
    '|-----|--------------:|----------------:|----------:|',
    `| Sesiones medidas | ${integer(currentMeasured.sessions)} | ${integer(previousMeasured.sessions)} | ${change(currentMeasured.sessions, previousMeasured.sessions)} |`,
    `| Sesiones reales | ${integer(currentReal.sessions)} | ${integer(previousReal.sessions)} | ${change(currentReal.sessions, previousReal.sessions)} |`,
    `| Sesiones organicas | ${integer(current.segments.organic.sessions)} | ${integer(previous.segments.organic.sessions)} | ${change(current.segments.organic.sessions, previous.segments.organic.sessions)} |`,
    `| Automatizadas probables | ${integer(current.segments.automation.sessions)} | ${integer(previous.segments.automation.sessions)} | ${change(current.segments.automation.sessions, previous.segments.automation.sessions)} |`,
    `| Internas / QA | ${integer(current.segments.internal.sessions)} | ${integer(previous.segments.internal.sessions)} | ${change(current.segments.internal.sessions, previous.segments.internal.sessions)} |`,
    `| Paginas vistas reales | ${integer(currentReal.views)} | ${integer(previousReal.views)} | ${change(currentReal.views, previousReal.views)} |`,
    `| Engagement real | ${percent(ratio(currentReal.engagedSessions, currentReal.sessions))} | ${percent(ratio(previousReal.engagedSessions, previousReal.sessions))} | - |`,
    `| Paginas por sesion real | ${decimal(ratio(currentReal.views, currentReal.sessions))} | ${decimal(ratio(previousReal.views, previousReal.sessions))} | - |`,
    '',
    '## Segmentos',
    '',
    '| Segmento | Sesiones | Usuarios | Vistas | Engagement | Duracion media |',
    '|----------|---------:|---------:|-------:|-----------:|---------------:|',
    ...([
      ['Organico', current.segments.organic],
      ['Real no organico', current.segments.real_non_organic],
      ['Automatizado probable', current.segments.automation],
      ['Interno / QA', current.segments.internal],
    ] as const).map(
      ([label, totals]) =>
        `| ${label} | ${integer(totals.sessions)} | ${integer(totals.users)} | ${integer(totals.views)} | ${percent(ratio(totals.engagedSessions, totals.sessions))} | ${decimal(averageDuration(totals))} s |`,
    ),
    '',
    '## Canales reales',
    '',
    '| Canal | Sesiones | Vistas | Engagement |',
    '|-------|---------:|-------:|-----------:|',
    ...(channels.length
      ? channels.map(
          ([channel, totals]) =>
            `| ${escapeCell(channel)} | ${integer(totals.sessions)} | ${integer(totals.views)} | ${percent(ratio(totals.engagedSessions, totals.sessions))} |`,
        )
      : ['| Sin datos | 0 | 0 | 0,0% |']),
    '',
    '## Landings con inventario valido',
    '',
    '| Landing | Sesiones | Vistas | Paginas/sesion | Engagement |',
    '|---------|---------:|-------:|---------------:|-----------:|',
    ...(topLandings.length
      ? topLandings.map(
          ([landing, totals]) =>
            `| \`${escapeCell(landing)}\` | ${integer(totals.sessions)} | ${integer(totals.views)} | ${decimal(ratio(totals.views, totals.sessions))} | ${percent(ratio(totals.engagedSessions, totals.sessions))} |`,
        )
      : ['| Sin datos | 0 | 0 | 0,00 | 0,0% |']),
    '',
    ...monetagSection(options, currentReal),
    '',
    '## Trafico excluido del inventario',
    '',
    '| Tipo | Landing | Huella | Sesiones | Motivo |',
    '|------|---------|--------|---------:|--------|',
    ...(automatedRows.length
      ? automatedRows.map(
          (row) =>
            `| ${row.segment === 'automation' ? 'Automatizado' : 'Interno/QA'} | \`${escapeCell(row.landing)}\` | ${escapeCell(`${row.city}; ${row.device}/${row.browser}/${row.operatingSystem}/${row.screenResolution}`)} | ${integer(row.sessions)} | ${escapeCell(row.classificationReason)} |`,
        )
      : ['| Sin trafico excluido | - | - | 0 | - |']),
    '',
    '## Acciones recomendadas',
    '',
    ...recommendations(current, options).map((recommendation) => `- ${recommendation}`),
    '',
    '## Reglas de medicion',
    '',
    '- Las verificaciones automatizadas deben abrir una URL con `?caja_traffic=automation`.',
    '- Las comprobaciones humanas internas deben usar `?caja_traffic=internal`.',
    '- El panel conserva el dato bruto en GA4, pero lo excluye de sesiones y paginas vistas reales.',
    '- La huella historica solo se clasifica como automatizada cuando acumula al menos 3 sesiones, ratio usuario/sesion >= 75% y engagement <= 25%.',
    '- Los ingresos de Monetag son datos declarados mediante CLI; no se infieren desde GA4.',
    '',
  ];

  return lines.join('\n');
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error('Falta GA4_PROPERTY_ID en .env.local o .env.');
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('Falta GOOGLE_APPLICATION_CREDENTIALS en el entorno.');
  }

  const periods = getPeriods(options.endDate);
  const client = new BetaAnalyticsDataClient();
  const [current, previous] = await Promise.all([
    fetchPeriod(client, propertyId, periods.current.startDate, periods.current.endDate),
    fetchPeriod(client, propertyId, periods.previous.startDate, periods.previous.endDate),
  ]);
  const report = renderMarkdown(current, previous, options);

  if (options.output) {
    const outputPath = path.resolve(process.cwd(), options.output);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, report, 'utf8');
    console.log(`Panel semanal guardado en ${path.relative(process.cwd(), outputPath)}`);
  } else {
    console.log(report);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Panel semanal GA4 fallido: ${message}`);
  process.exitCode = 1;
});
