# Template Architecture · System Overview

This document explains how the marketing template is wired so you can extend it without inventing new patterns.

---

## Philosophy

1. **Single source of truth** – `lib/config/site.config.ts` defines the business identity. Every other config reads from it.
2. **Self-contained sections** – UI is composed of sections that live under `features/marketing/[page]/sections/[name]/`.
3. **Predictable surfaces** – pages expose `page.tsx`, `seo.ts`, and `index.ts`; sections expose `index.tsx`, `data.ts`, and optional `types.ts`.
4. **Static-first** – all marketing pages are statically exported; dynamic work is limited to Server Actions.
5. **Composable features** – features import sections, not the other way around. Shared UI lives under `components/`.

---

## Directory Map

```
project-root/
├── app/                     # App Router routes; import ready-made pages
│   ├── page.tsx             # → imports '@/features/marketing/home'
│   └── [page]/page.tsx      # → imports matching feature
├── features/
│   └── marketing/
│       └── [page]/
│           ├── page.tsx     # Page component (Server Component)
│           ├── seo.ts       # Metadata export
│           ├── index.ts     # Barrel exports
│           ├── sections/
│           │   └── [section]/
│           │       ├── index.tsx
│           │       ├── data.ts
│           │       └── types.ts (optional)
│           ├── actions/     # Server Actions only when needed
│           └── schemas/     # Zod schemas for forms
├── components/              # Shared UI (layouts, shared, ui, providers)
├── emails/                  # React Email templates + styles
├── lib/
│   ├── config/              # All configs read from site.config.ts
│   ├── utils/               # Pure helpers + formatting
│   ├── validations/         # Zod schemas that are not feature-specific
│   └── seo/                 # Structured data + metadata helpers
├── public/                  # Assets swapped per client
└── docs/                    # This folder
```

---

## Data Pipeline

```
lib/config/site.config.ts
        ↓
Derived configs (site, email, navigation)
        ↓
Section data files (features/marketing/[page]/sections/*/data.ts)
        ↓
Components (sections/*/index.tsx)
        ↓
Page assembly (features/marketing/[page]/page.tsx)
        ↓
App routes (app/[page]/page.tsx)
```

### Guidelines

- Never replicate business data in sections—read it from config-derived objects.
- Section data can enrich config values (e.g., combine address lines) but must not hardcode them.
- If multiple sections use the same derived value, extract it into a helper inside `lib/config/derived/` or a utility under `lib/utils/` and import it into each `data.ts`.

### Dynamic Service Detail Pages

- The services route (`app/services/[category]/[service]/page.tsx`) statically renders every treatment by reading from `features/marketing/services/data`.
- Each service lives in `features/marketing/services/data/services/[slug]/` and splits responsibilities across:
  - `core.data.ts` – hero copy plus treatment info/steps
  - `science.data.ts` – ingredients, research, results, and optional before/after data
  - `conversion.data.ts` – pricing, FAQs, testimonials, and CTA content
  - `seo.data.ts` – dedicated metadata/keyword definitions
- `features/marketing/services/data/index.ts` assembles those partials into `ServiceDetailData` objects that routes, search, and metadata helpers consume.
- When you add or edit a service, touch only the partial files inside that folder and the dynamic route will automatically pick up the changes.

---

## Page Composition

1. **Sections expose functions** – `HeroSection`, `TestimonialsSection`, etc., each as Server Components.
2. **Page imports sections** – `features/marketing/home/page.tsx` imports the subset of sections it needs (and nothing else).
3. **App route re-exports** – `app/page.tsx` simply imports and exports `HomePage` along with its metadata.
4. **Metadata lives with the page** – `features/marketing/home/seo.ts` exports `Metadata` so routes just spread it.

```tsx
// features/marketing/home/page.tsx
import { HeroSection } from './sections/hero'
import { ServicesSection } from './sections/services'

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
    </main>
  )
}

// app/page.tsx
import { HomePage, homeMetadata } from '@/features/marketing/home'

export const metadata = homeMetadata
export default HomePage
```

---

## Rendering & Performance

- **Static export**: `output: 'export'` in `next.config.ts`, `dynamic = 'force-static'`, `revalidate = false` on marketing routes.
- **Server Components**: default everywhere; only mark a file `'use client'` if it calls hooks, handles events, or uses browser APIs.
- **Server Actions**: only in `actions/*.action.ts`, never embedded inside `page.tsx`.
- **Cache Components**: keep `cacheComponents: true` enabled and wrap slower bits in `<Suspense>` so static sections stay cacheable.
- **Caching**: rely on Next.js deduplication—avoid manual caching unless a guide in `nextjs/04-data-and-caching.md` says otherwise.
- **Budgets**: Lighthouse 90+, <1s FCP, <2.5s LCP, static HTML size < 200 KB per page when possible.

---

## Server Actions + Forms

- Actions live under `features/marketing/[page]/actions/` and are suffixed with `.action.ts`.
- Validation schemas live under `schemas/` next to the feature, not globally, unless reused across multiple pages.
- React Hook Form + Zod handle client validation; Server Action repeats validation server-side before sending emails or touching external services.
- Emails use the React Email templates under `emails/` and the configuration from `lib/config/email.config.ts`.

---

## Adding or Changing Content

1. Update `lib/config/site.config.ts` and any derived config that depends on the new data.
2. Update `public/` assets if imagery/logos change.
3. Adjust section `data.ts` files to read the new values.
4. Verify any contact info used inside `components/shared/` continues to read from config.
5. Run through `tasks/update-content.md` for the validation steps.

---

## Success Criteria

| Area | Goal | How to measure |
|------|------|----------------|
| Performance | Lighthouse ≥ 90 across categories | `npm run build && npm run start` → Lighthouse/Pagespeed |
| Repeatability | New client spin-up < 30 min | Time yourself editing only config + assets |
| Maintainability | Sections ≤ 150 LOC, no cross-imports | Code review + `rg` checks |
| Safety | No hardcoded data, no stray `'use client'` | Grep for literals, run lint/type-check |

Keep this architecture guide open when you are unsure where something belongs. If it isn’t described here, it probably shouldn’t exist in this template.
