# Playbook · Add Section

**Use when:** Inserting a new section into an existing feature.

1. **Define purpose** – What problem does the section solve? Identify required fields (title, stats, list, etc.).
2. **Create folder** – `features/marketing/<feature>/sections/<section>/` with `index.tsx`, `data.ts`, optional `types.ts`.
3. **Populate data** – Export typed content. Keep arrays sortable and copy on-brand.
4. **Build UI** – Use shared layouts/components. Keep server components unless interaction requires client code.
   - Reach for Tailwind primitives like `text-balance`, `text-wrap`, and `supports-[feature]` variants before introducing custom CSS; drop shared overrides into `@layer components` if they must live globally (Tailwind docs).
   - When adding pagination or nav, wrap links with Next’s `<Link>` so prefetching works, mirroring the shadcn/ui pagination guidance.
5. **Integrate** – Import the section component into `<feature>/page.tsx` and place it in the desired order.
6. **Validate** – Run lint, verify responsiveness, and ensure headings maintain hierarchy.

Promote any reusable logic to shared components to avoid duplication.
