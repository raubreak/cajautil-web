# Skill: adsense-readiness-ops

## Purpose

Operational checklist for AdSense readiness work and safe deployment workflow.

Use this skill when:

- auditing pages before AdSense review,
- improving trust/legal/content signals,
- validating metadata/indexability,
- preparing a production deployment.

## Mandatory guardrails

1. Never apply direct changes in production.
2. Every change must be made in code, committed to a branch, and deployed from Git.
3. Keep legal/cookie/privacy copy aligned with actual tracking and ad scripts.
4. Avoid absolute privacy claims when third-party analytics/ads are active.

## Execution workflow

1. Baseline checks
   - verify `ads.txt`, `robots.txt`, `sitemap.xml`, canonical tags, and core metadata.
2. Content quality pass
   - identify thin pages and add practical explanatory sections, FAQs, and internal links.
3. Trust and policy pass
   - ensure about/contact/legal pages are complete and consistent.
4. Data validation
   - cross-check Search Console + GA4 signals for impressions, CTR, and top landing pages.
5. Release process
   - commit changes, push to remote, deploy via Git/Vercel, then run post-deploy QA.

## Post-deploy QA

- validate title/description/canonical/OG/Twitter for sample URLs,
- confirm private routes are `noindex`,
- verify production is serving latest deployment,
- avoid manual hotfixes in platform UI.

## Output format

- Provide prioritized blockers first.
- Include exact file paths touched.
- End with deployment status and next actions.
