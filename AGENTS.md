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
- Single file lint: `npx eslint src/app/some-page/page.tsx`
- Multi-file lint: `npx eslint "src/app/**/page.tsx"`

### Type-check

- `npx tsc --noEmit`

### Prisma

- Generate client: `npx prisma generate`
- `postinstall` already runs Prisma generate.

### Data/SEO scripts

- GA4 audit: `npx tsx scripts/ga4-audit.ts`
- Mass pSEO variants: `npx tsx scripts/massPSEO.ts`
- Refresh thin variants: `npx tsx scripts/refresh-variants.ts`
- Seed variants: `npx tsx scripts/seedVariants.ts`
- Deepen articles: `npx tsx scripts/deepen-articles.ts`
- Fix stale article title: `npx tsx scripts/fix-stale-article-title.ts`

### Analytics / Search Console access

- Google Analytics 4 access is already wired through the repo script `scripts/ga4-audit.ts` and environment variables loaded from `.env.local` / `.env` at runtime.
- Google Search Console access uses the same service-account setup referenced by `GOOGLE_APPLICATION_CREDENTIALS`; the service account must already be added as a user in the target Search Console property.
- When an agent is asked to review GA4 or GSC, it should prefer existing scripts first. If no GSC script exists yet, it may use a local Node one-off that:
  1. loads env vars via `dotenv`,
  2. reads the JSON key path from `GOOGLE_APPLICATION_CREDENTIALS`,
  3. requests an OAuth token for `https://www.googleapis.com/auth/webmasters.readonly`,
  4. queries the Search Console API for `sc-domain:cajautil.com`.
- Do not print secrets, private keys, raw credential JSON, or `.env` contents in output.
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
- All changes must go through code + commit + push.
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
