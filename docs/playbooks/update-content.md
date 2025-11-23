# Playbook · Update Content

**Use when:** Editing copy, stats, or assets without structural changes.

1. **Locate data file** – Usually `features/.../sections/.../data.ts` or `features/.../data/*` for collections.
2. **Cross-check config** – If change involves business info, edit `lib/config/site.config.ts` instead.
3. **Edit content** – Update strings, arrays, and media paths. Keep formatting consistent.
   - If you rename slugs or add/remove entries, adjust any exported param helpers feeding `generateStaticParams` so static paths stay accurate (Next.js `generateStaticParams` docs, v15.1.8).
4. **Proof** – Read aloud or use a grammar tool. Confirm tone matches `stack/07-a11y-brand.md`.
5. **Preview** – Run dev server, inspect desktop + mobile breakpoints.
6. **Document** – Note major messaging shifts in the PR/task to alert marketing stakeholders.
   - Mention whether cached routes require `revalidatePath` so reviewers cover it in QA (Next.js caching docs, v15.1.8).

Never edit copy directly in components; always update the data source.
