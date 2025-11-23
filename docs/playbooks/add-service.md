# Playbook · Add Service

**Use when:** Introducing a new service offering (card, detail page, pricing snippet).

1. **Collect data fields** – Name, summary, benefits, CTA target, image requirements.
2. **Update central data** – Modify `features/marketing/services/data/services.ts` (or equivalent) to include the new service object.
   - Export updated helper arrays (e.g., `serviceParams`) so `generateStaticParams` continues to pre-render detail routes (Next.js `generateStaticParams` docs, v15.1.8).
3. **Section updates** – If the new service requires unique copy, create/adjust sections (hero, highlights, FAQs) via the section playbook.
4. **Detail pages** – For dynamic routes, add a new data file under `features/marketing/services/data/services/<slug>.ts` and ensure the slug is exported.
   - Keep slug exports typed so `generateStaticParams` stays type-safe and deterministic.
5. **Navigation** – Update config files if the service appears in menus or CTAs.
6. **QA** – Verify list ordering, card layout, and links. Run lighthouse on the services page.
7. **Caching** – Confirm any supporting server actions or fetches call `revalidatePath('/services')` (and the detail slug) after a mutation to keep static data fresh (Next.js caching docs, v15.1.8).

Replicate this workflow in any repo with service catalogs by swapping file paths.
