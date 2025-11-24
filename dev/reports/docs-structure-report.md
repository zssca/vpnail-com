# Website Structure Mentions in `docs/`

Question: Does the `docs/` folder describe the website’s structure? Yes—multiple files outline the architecture, routing, and section-driven layout conventions. Key references:

- `docs/stack/00-overview.md` – Defines core directories (`app/`, `features/`, `components/`, `lib/`, `public/`) and the “section-driven UX” principle where pages are composed of sections sourced from co-located data.
- `docs/stack/01-architecture.md` – Provides the canonical directory contract for each feature (`features/marketing/<page>/` with `page.tsx`, `seo.ts`, `sections/<section>/index.tsx + data.ts`, optional `actions/`, `schemas/`, `data/`). Includes rules like one feature per route, no cross-feature imports, and file size caps.
- `docs/stack/02-content-data.md` – States that all marketing copy lives in `features/.../sections/.../data.ts`, forbids cross-section imports, and prescribes where to store media (`public/images/content/<feature>/<slug>/`).
- `docs/stack/03-components-ui.md` – Locates shared layouts in `components/layouts/` and shared UI primitives in `components/ui/`, reinforcing separation between feature sections and shared building blocks.
- `docs/stack/05-configuration.md` – Points to global config files (e.g., `lib/config/site.config.ts` for business info and navigation) that inform sitewide structure.
- `docs/stack/glossary.md` – Defines “Feature” (route-level folder) and “Section” (UI+data pair under `features/.../sections/`), clarifying the structural vocabulary.
- `docs/playbooks/add-page.md` – Describes how each route in `app/<slug>/page.tsx` delegates to a matching feature under `features/marketing/<slug>/`, with sections composing the page.
- `docs/playbooks/add-section.md` – Specifies the folder pattern for new sections (`features/marketing/<feature>/sections/<section>/` with `index.tsx` and `data.ts`) and integration into the feature’s `page.tsx`.
- `docs/tree/tree.md` – Generated snapshot of the current project tree, showing actual routes under `app/`, features under `features/`, shared components, and config locations.

Conclusion: The docs explicitly define the website’s structure as a static, section-driven Next.js site: routes live in `app/` but delegate to feature folders under `features/marketing/`, each feature is composed of section subfolders with paired data files, shared UI lives under `components/`, and global configuration in `lib/config/`. The tree snapshot corroborates the prescribed layout.
