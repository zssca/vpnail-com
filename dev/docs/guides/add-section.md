# Playbook · Add Section

**Use when:** Inserting a new section into an existing feature.

1) **Define purpose** — What problem does the section solve? List required fields (title, stats, list, CTA).
2) **Create folder** — `features/marketing/<feature>/sections/<section>/` with `index.tsx`, `data.ts`, optional `types.ts`.
3) **Populate data** — Export typed content. Keep arrays sortable and copy on-brand.
4) **Build UI** — Use shared layouts/components; default to Server Components. Add `'use client'` only when interaction is required.
   - Prefer Tailwind utilities and shadcn/ui primitives (`Button`, `Badge`, `Form` fields) for consistent spacing and a11y.
   - Wrap navigation in `<Link>` so router prefetch works (matches shadcn/ui pagination guidance).
5) **Integrate** — Import the section into `<feature>/page.tsx` in the desired order.
6) **Validate** — Run lint, verify responsive layout, and maintain heading hierarchy.

Promote any reusable logic to shared components to avoid duplication.
