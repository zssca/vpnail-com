# File Organization Rules

File naming is the backbone of this template. Commit to these rules before you add, move, or rename anything.

---

## Critical Contracts

| Artifact | Path | Required name | Examples |
|----------|------|---------------|----------|
| Marketing page | `features/marketing/[page]/` | `page.tsx` | `features/marketing/home/page.tsx` |
| SEO metadata | same as page | `seo.ts` | `features/marketing/services/seo.ts` |
| Feature barrel | same as page | `index.ts` | re-export page + metadata + sections |
| Section component | `features/marketing/[page]/sections/[name]/` | `index.tsx` | `sections/hero/index.tsx` |
| Section data | same folder as section component | `data.ts` | `sections/hero/data.ts` |
| Section types (optional) | same folder | `types.ts` | `sections/hero/types.ts` |
| Section barrel (optional) | same folder | `index.ts` | re-export component + data |
| Server Action | `features/marketing/[page]/actions/` | `[verb]-[noun].action.ts` | `send-email.action.ts` |
| Schema | `features/marketing/[page]/schemas/` | `[name].schema.ts` | `contact.schema.ts` |
| Config | `lib/config/` | `[topic].config.ts` | `site.config.ts` |
| Utility | `lib/utils/` | `[purpose].ts` | `currency.ts` |

**Do not deviate from these names.** The consistency enables automation, documentation accuracy, and mechanical copy/paste for new clients.

---

## Marketing Feature Layout

```
features/marketing/[page]/
├── page.tsx          # Page assembly (Server Component)
├── seo.ts            # Metadata export
├── index.ts          # Barrel exports for the feature
├── sections/
│   └── [section]/
│       ├── index.tsx # UI
│       ├── data.ts   # Data derived from config
│       ├── types.ts  # Optional type exports
│       └── index.ts  # Optional barrel
├── actions/          # Optional – Server Actions only
│   └── send-email.action.ts
├── schemas/          # Optional – Zod schemas for forms
│   └── contact.schema.ts
└── ...               # No other folders belong here
```

Rules:
- No `components/` folder inside a feature. Sections already fill that role.
- No shared data folder at the feature root. All data lives beside the section that uses it (the only exception is the dedicated service data workspace described below).
- If multiple pages share a section, duplicate the section folder or move it into `components/sections/` only if it will be reused verbatim.

## Service Detail Data

- Dynamic service pages live at `app/services/[category]/[service]/page.tsx` and read from `features/marketing/services/data`.
- Each service slug gets its own folder: `features/marketing/services/data/services/[slug]/`.
- Inside that folder:
  - `core.data.ts` — hero messaging, treatment info, and steps
  - `science.data.ts` — ingredients, research, results, optional before/after
  - `conversion.data.ts` — pricing, FAQs, testimonials, CTA copy
  - `seo.data.ts` — metadata, keywords, Open Graph image
  - `index.ts` — composes a `ServiceDetailData` object and exports it
- `features/marketing/services/data/index.ts` imports every service and exposes helper utilities (`allServices`, `getServiceBySlug`, etc.) for routes, search, metadata, and sitemap generation.
- When you add a new treatment, copy an existing folder, update each partial file, and the route will be statically generated automatically.

---

## Sections

- Folder names are descriptive and kebab-case (`hero`, `services-grid`, `testimonials`).
- Component names are PascalCase exports from `index.tsx` (e.g., `HeroSection`).
- Import ordering inside sections: React/Next imports → config/data imports → UI imports → local helpers.
- Keep sections under ~150 lines; split out helpers into the same folder if necessary.
- Every section folder must export a component (`index.tsx`). `data.ts` never lives on its own.

```tsx
// sections/hero/index.tsx
import { heroData } from './data'

export function HeroSection() {
  return (
    <section className="relative py-24">
      <div className="container">
        <h1>{heroData.title}</h1>
        <p>{heroData.subtitle}</p>
      </div>
    </section>
  )
}
```

---

## Imports & Exports

- Use path aliases defined in `tsconfig.json` (`@/features/...`, `@/components/...`, `@/lib/...`).
- Pages import sections via relative paths (`./sections/hero`).
- App routes import features via aliases (`@/features/marketing/home`).
- Barrel files (`index.ts`) should re-export only what downstream callers need (page, metadata, sections).

---

## Naming Anti-Patterns (Never Do)

| Bad | Why | Fix |
|-----|-----|-----|
| `features/home/home-page.tsx` | Missing `marketing/` folder and wrong filename | `features/marketing/home/page.tsx` |
| `features/marketing/home/home.seo.ts` | Prefixed name | `features/marketing/home/seo.ts` |
| `sections/hero/hero.tsx` | Section files must be generic inside folder | `sections/hero/index.tsx` |
| `sections/hero/hero.data.ts` | Same issue as above | `sections/hero/data.ts` |
| `features/marketing/home/data/hero.ts` | Centralized data folder | Move next to the section |
| `lib/site.config.ts` | Configs belong under `lib/config/` | `lib/config/site.config.ts` |

Run `rg -g '*home*' features/marketing` whenever you suspect a rule was broken, and fix it immediately.

---

## Feature Utilities

- If a helper is truly feature-specific (e.g., `features/marketing/articles/utils.ts` used only inside the Articles feature), keep it inside that feature.
- Shared utilities that multiple features rely on still belong under `lib/utils/`.
- When in doubt, start local. Only promote a helper into `lib/` after a second feature needs it.

---

## Checklist Before Pushing

- [ ] Every new file name matches the contract table at the top.
- [ ] Sections import only their own `./data` and shared UI—not other sections.
- [ ] No business literals exist outside `lib/config/`.
- [ ] All folders and files are lowercase + kebab-case.
- [ ] Barrel exports in features and sections compile (`npm run type-check`).
- [ ] Dead files (unused components/data) were removed in the same PR.

If you are unsure where something belongs, pause and re-read this file—guessing usually leads to a refactor later.
