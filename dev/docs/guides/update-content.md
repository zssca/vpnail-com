# Playbook · Update Content

**Use when:** Editing copy, stats, or assets without structural changes.

1) **Locate data file** — Typically `features/.../sections/.../data.ts` or `features/.../data/*` for collections.
2) **Cross-check config** — Business info lives in `lib/config/site.config.ts`; adjust there if needed.
3) **Edit content** — Update strings, arrays, media paths; keep formatting consistent.
   - If slugs change or entries are added/removed, update helpers feeding `generateStaticParams` so static paths stay accurate.
4) **Proof** — Check tone/grammar and brand fit.
5) **Preview** — Run dev server; check desktop + mobile.
6) **Document** — Note major messaging shifts and flag any routes to `revalidatePath`/`revalidateTag` so reviewers cover cache refresh in QA.

Never edit copy directly in components; always update the data source.
