# Playbook · SEO Pass

**Use when:** Auditing or updating on-page SEO before release.

1) **Metadata** — Review `seo.ts`. Title ≤ 60 chars, description ≤ 155 chars, canonical set.
2) **Headings** — Single H1, logical H2/H3 order, keyword coverage without stuffing.
3) **Internal links** — Add contextual links to relevant features/services.
4) **Structured data** — Inject/update JSON-LD (FAQ, LocalBusiness, Service) via utilities.
5) **Images** — Descriptive alt text, OG image present and sized correctly.
6) **Performance** — Run Lighthouse; fix CLS/FCP regressions.
   - Ensure SEO-critical data is fetched inside cached routes (`'use cache'`) with tags or `cacheLife` so the page stays in the Full Route Cache.
7) **Sitemaps** — In `sitemap.ts`, Next.js 16 passes `id` as a `Promise`; `const resolvedId = await id` before deriving offsets.

Log findings in the PR/task so stakeholders know the SEO checklist was performed.
