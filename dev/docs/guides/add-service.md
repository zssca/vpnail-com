# Playbook · Add Service

**Use when:** Introducing a new service offering (card, detail page, pricing snippet).

1) **Collect data fields** — Name, summary, benefits, CTA target, imagery requirements.
2) **Update central data** — Modify `features/marketing/services/data/services.ts` (or equivalent) to include the new service object.
   - Export updated helper arrays (e.g., `serviceParams`) so `generateStaticParams` continues to pre-render detail routes.
3) **Section updates** — If the service needs bespoke copy, add/adjust sections (hero, highlights, FAQs) via the section playbook.
4) **Detail pages** — For dynamic routes, add `features/marketing/services/data/services/<slug>.ts` and ensure the slug is exported and typed for `generateStaticParams`.
5) **Navigation** — Update nav/CTA configs if the service surfaces there.
6) **QA** — Verify list ordering, card layout, internal links; run Lighthouse on the services page.
7) **Caching** — After mutations, call `revalidatePath('/services')` and `revalidatePath('/services/<slug>')` (or use `revalidateTag` on tagged fetches) so cached routes stay fresh.

Replicate this workflow in any repo with service catalogs by swapping file paths.
