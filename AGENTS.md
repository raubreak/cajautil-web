# AGENTS.md

Repository guide for coding agents working in `utilidades-web`.

## 1) Project Snapshot

- Stack: Next.js App Router (`next@16`), React 19, TypeScript strict, Tailwind CSS v4.
- Data: Prisma + PostgreSQL (`prisma/schema.prisma`).
- Main goal: utility pages + programmatic SEO + AdSense readiness.
- Deployment: Vercel (production from Git).

## 2) Rule Sources You Must Respect

- Primary agent rules: `.agents/rules.md`.
- SEO workflows:
  - `.agents/workflows/add-new-tool.md`
  - `.agents/workflows/seo-analytics-growth.md`
- Custom skill: `.agents/skills/adsense-readiness-ops/SKILL.md`.

Important: No Cursor rules were found in `.cursor/rules/` or `.cursorrules`.
Important: No Copilot instructions were found in `.github/copilot-instructions.md`.

## 3) Build / Lint / Test Commands

### Install

- `npm ci`

### Local dev

- `npm run dev`

### Production build

- `npm run build`
- `npm run start`

### Lint

- Full lint: `npm run lint`
- Repo-wide lint fallback: `npx eslint .`
- Single file lint: `npx eslint src/app/some-page/page.tsx`
- Multi-file lint: `npx eslint "src/app/**/page.tsx"`

### Type-check

- `npx tsc --noEmit`

### Prisma

- Generate client: `npx prisma generate`
- Create/apply local migration: `npx prisma migrate dev`
- Apply production migrations: `npx prisma migrate deploy`
- `postinstall` already runs Prisma generate.

### Data/SEO scripts

- GA4 audit: `npx tsx scripts/ga4-audit.ts`
- Mass pSEO variants: `npx tsx scripts/massPSEO.ts`
- Refresh thin variants: `npx tsx scripts/refresh-variants.ts`
- Seed variants: `npx tsx scripts/seedVariants.ts`
- Deepen articles: `npx tsx scripts/deepen-articles.ts`
- Repair generated content: `npx tsx scripts/repair-generated-content.ts`
- Fix stale article title: `npx tsx scripts/fix-stale-article-title.ts`

### Analytics / Search Console access

- Google Analytics 4 access is already wired through the repo script `scripts/ga4-audit.ts` and environment variables loaded from `.env.local` / `.env` at runtime.
- Google Search Console access uses the same service-account setup referenced by `GOOGLE_APPLICATION_CREDENTIALS`; the service account must already be added as a user in the target Search Console property.
- Exact connection method for any LLM/agent using the service account:
  1. load env vars with `dotenv` from `.env.local` first and `.env` as fallback,
  2. read the service-account JSON path from `GOOGLE_APPLICATION_CREDENTIALS`,
  3. parse that JSON locally to obtain `client_email`, `private_key` and `token_uri`,
  4. build a signed JWT with `RS256`,
  5. exchange that JWT at `token_uri` for an OAuth access token,
  6. call the target Google API with `Authorization: Bearer <token>`.
- Required OAuth scopes by service:
  - GA4 Data API: `https://www.googleapis.com/auth/analytics.readonly`
  - Search Console API: `https://www.googleapis.com/auth/webmasters.readonly`
- Required API targets by service:
  - GA4 Data API base: `https://analyticsdata.googleapis.com/v1beta/`
  - Search Console API base: `https://www.googleapis.com/webmasters/v3/`
- Required property identifiers in this repo:
  - Search Console site: `sc-domain:cajautil.com`
  - GA4 property: use the property ID already referenced by repo scripts/env; prefer `scripts/ga4-audit.ts` instead of hardcoding a new one.
- Minimal Search Console flow:
  1. get bearer token with scope `webmasters.readonly`,
  2. verify access with `GET /sites`,
  3. query `POST /sites/sc-domain:cajautil.com/searchAnalytics/query`,
  4. request dimensions like `page`, `query`, or `page,query` for the last 28 days.
- Minimal GA4 flow:
  1. prefer running `npx tsx scripts/ga4-audit.ts`,
  2. if a one-off is needed, get bearer token with scope `analytics.readonly`,
  3. call the GA4 Data API `runReport` endpoint for the configured property,
  4. request metrics such as sessions, screenPageViews, totalUsers and dimensions such as date or pagePath when relevant.
- When an agent is asked to review GA4 or GSC, it should prefer existing scripts first. If no GSC script exists yet, it may use a local Node one-off that:
  1. loads env vars via `dotenv`,
  2. reads the JSON key path from `GOOGLE_APPLICATION_CREDENTIALS`,
  3. requests an OAuth token for `https://www.googleapis.com/auth/webmasters.readonly`,
  4. queries the Search Console API for `sc-domain:cajautil.com`.
- Do not print secrets, private keys, raw credential JSON, or `.env` contents in output.
- Never paste the full service-account JSON, raw JWT, bearer token, or credential file contents into logs, commits, or chat output.
- Safe default workflow when analytics are requested:
  1. run `npx tsx scripts/ga4-audit.ts`,
  2. verify Search Console site access with the service account,
  3. query pages and queries for the last 28 days,
  4. identify high-impression / low-CTR opportunities,
  5. apply only low-risk on-page fixes backed by the data.
- If credentials are missing or the property is inaccessible, stop and report the blockage instead of improvising.

## 4) Testing Status (Read Carefully)

- There is currently no configured unit/integration test framework.
- There is no `npm test` script.
- There are no `*.test.*` / `*.spec.*` files in the repository.

When asked to run a “single test”, use one of these practical equivalents:

1. Single-file lint: `npx eslint <file>`
2. Focused type check: `npx tsc --noEmit` (project-wide, no file filter configured)
3. Targeted script execution when relevant (for example GA4 script)

If you add a real test framework later, update this file with exact single-test commands.

## 5) Architecture Map

- `src/app/`:
  - App Router pages, layouts, metadata, API routes.
  - Dynamic pSEO route: `src/app/[toolSlug]/page.tsx`.
  - Articles routes: `src/app/articulos/`.
- `src/components/`: UI and tool client components.
- `src/lib/`: Prisma client, AI provider, SEO generation logic.
- `scripts/`: operational scripts (SEO/analytics/content jobs).
- `prisma/schema.prisma`: DB schema.

## 6) Code Style Guidelines

### TypeScript & types

- `tsconfig` uses `strict: true`; keep code type-safe.
- Prefer explicit interfaces/types for props and structured data.
- Avoid `any`; if unavoidable, isolate and narrow quickly.
- Use `import type { ... }` for type-only imports when possible.

### Imports

- Prefer absolute alias imports from `@/*` inside app code.
- Keep imports grouped by:
  1) framework/libs, 2) internal modules, 3) relative modules.
- Remove unused imports (eslint catches this).

### Naming conventions

- React components: `PascalCase` (`GeneradorQRClient`).
- Variables/functions: `camelCase`.
- Route folders/slugs: `kebab-case` (`calculadora-sueldo-neto`).
- Constants: `UPPER_SNAKE_CASE` for true constants; otherwise descriptive camelCase.

### Formatting

- Follow existing file style; do not reformat unrelated lines.
- Keep JSX readable and split long props/objects across lines.
- Prefer small helper functions for repeated transformations.

### Client vs server boundaries

- Add `"use client"` only where React client hooks/events are required.
- Keep server-only logic (DB, secret-dependent logic) in server files.
- Do not import server-only modules into client components.

### Next.js metadata / SEO

- Every public route should expose solid metadata:
  - `title`, `description`, `alternates.canonical`.
  - Add `openGraph` + `twitter` for important pages.
- Dynamic routes must generate canonical URLs from actual slugs.
- Keep Schema.org JSON-LD consistent with visible content and real URLs.

### Error handling

- Wrap async I/O (DB/API) in `try/catch`.
- Return safe messages to users; log detailed errors server-side.
- For API routes, use `NextResponse.json(..., { status })` with clear statuses.

### Prisma patterns

- Reuse shared client from `src/lib/prisma.ts` in app code.
- Avoid creating many Prisma clients in request paths.
- Validate assumptions before writes (existence checks where needed).

### Security & privacy

- Never commit secrets (`.env*`, credentials JSON).
- `ga4-key.json` is local-only and gitignored.
- Keep admin/cron endpoints protected and non-indexable when private.

## 7) Content/SEO Rules from Existing Agent Policy

- AI model stability: use current Gemini model IDs only.
- Long JSON parsing: include fallback extraction logic for AI outputs.
- Content quality: long-form, useful, structured, FAQ-rich for SEO pages.
- Internal links should be context-aware and useful.
- Generated article titles and metadata must not ship with stale past years; use the current year only when truly needed, otherwise keep them evergreen.

## 8) Git & Deployment Workflow (Mandatory)

- Never patch production manually.
- All production changes must go through code + Git history + deploy from Vercel/Git.
- Do not create commits or push automatically; only do so when the user explicitly requests it.
- Production deploys must be traceable to Git history.
- Keep commits focused; avoid mixing unrelated concerns.

## 9) Agent Working Checklist

Before coding:

- Read relevant files and nearby patterns.
- Confirm route type (static, dynamic, API, server action).

Before finishing:

- Run lint on changed files at minimum.
- Run `npm run build` for substantial changes.
- Verify metadata/canonical correctness when touching pages.
- Summarize risks, follow-ups, and any skipped validation.

## 10) Errores Conocidos y Soluciones

> Esta sección es mantenida automáticamente por la tarea diaria `daily-seo-review-ga4-gsc`.
> Cuando un agente encuentre un error durante la revisión de GA4 / GSC o en cualquier script SEO,
> DEBE registrarlo aquí antes de terminar la sesión. El objetivo es que ningún error se repita.

| Fecha | Script / Paso | Error | Causa raíz | Solución aplicada | Estado |
|-------|--------------|-------|------------|-------------------|--------|
| 2026-03-24 | `npx tsx scripts/ga4-audit.ts` — PASO 1 | `EPERM: operation not permitted /tmp/tsx-*/pipe` | El sandbox bloquea la creación de pipes IPC que usa tsx para su modo watch/IPC | Workaround: compilar con `tsc --module commonjs` + ejecutar el `.js` resultante con `NODE_PATH=./node_modules node` | ✅ Workaround activo |
| 2026-03-24 | `npm install @esbuild/linux-x64` | `403 Forbidden` en npm registry | Los `node_modules` del proyecto fueron instalados en macOS (`darwin-x64`); el sandbox corre Linux y el registro npm rechaza el paquete | Requiere `npm ci` ejecutado en entorno Linux nativo (máquina local o CI). No solucionable desde el sandbox automáticamente. | ⚠️ Pendiente — intervención manual |
| 2026-03-24 | GA4 API — PASO 1 | `Error: 14 UNAVAILABLE: Name resolution failed for dns:analyticsdata.googleapis.com:443` | El sandbox tiene proxy `socks5h://` configurada pero `@grpc/grpc-js` no soporta ese esquema. El DNS externo está bloqueado. | La tarea no puede consultar GA4 desde el sandbox. Ejecutar en entorno con red externa (local/CI). Ver recomendaciones en reporte diario. | ⚠️ Pendiente — limitación de red del sandbox |
| 2026-03-24 | GSC REST API — PASO 2 | `getaddrinfo EAI_AGAIN www.googleapis.com` | DNS externo bloqueado en el sandbox para conexiones HTTP/HTTPS directas | Ídem que GA4 — ejecutar fuera del sandbox | ⚠️ Pendiente — limitación de red del sandbox |

### Protocolo de registro de errores

1. Detectar el error con su mensaje completo (sin exponer secrets ni claves).
2. Identificar la causa raíz (credenciales, dependencia faltante, cambio de API, etc.).
3. Aplicar la solución o documentar los pasos necesarios si requiere intervención manual.
4. Actualizar la tabla anterior con la fila correspondiente.
5. Si el error es crítico y bloquea la tarea, notificar en el reporte diario y marcar como ⚠️ Pendiente.

## 11) Tarea Programada SEO Diaria

- **ID de tarea:** `daily-seo-review-ga4-gsc`
- **Horario:** Todos los días a las 09:00 (hora local)
- **Propósito:** Revisar métricas de GA4 y Google Search Console, detectar oportunidades SEO y aplicar mejoras de bajo riesgo de forma automática.
- **Reportes generados:** `docs/seo-reports/YYYY-MM-DD-seo-daily.md`
- **Flujo de la tarea:**
  1. Ejecuta `npx tsx scripts/ga4-audit.ts`
  2. Consulta GSC para `sc-domain:cajautil.com` (últimos 28 días)
  3. Identifica páginas con alto potencial (altas impresiones, bajo CTR, posición 4–15)
  4. Aplica mejoras on-page seguras (solo metadata/JSON-LD) con lint + tsc verificados
  5. Guarda reporte diario y registra errores en la sección 10 de este archivo
