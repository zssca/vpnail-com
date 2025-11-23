# Playbook · SEO Pass

**Use when:** Auditing or updating on-page SEO before release.

1. **Metadata** – Review `seo.ts` for the page. Ensure title ≤ 60 chars, description ≤ 155 chars, canonical set.
2. **Headings** – Confirm single H1, logical H2/H3 order, keyword coverage without stuffing.
3. **Internal links** – Add contextual links to relevant features/services.
4. **Structured data** – Inject or update JSON-LD (FAQ, LocalBusiness, Service) via utilities.
5. **Images** – Provide descriptive alt text, ensure hero OG image exists.
6. **Performance** – Run Lighthouse or WebPageTest; fix glaring CLS/FCP issues.
   - Double-check that SEO-critical data (metadata queries, hero stats) uses `cache: 'force-cache'`/`fetchCache` so Next.js doesn’t downgrade the page to dynamic rendering (Next.js caching docs, v15.1.8).
7. **Sitemaps** – When editing `sitemap.ts`, remember Next.js 16 passes `id` as a `Promise`; `const resolvedId = await id` before deriving offsets (Next.js 16 upgrade guide).

Log findings in the PR/task so stakeholders know the SEO checklist was performed.
