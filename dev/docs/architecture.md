# Architecture

Feature-first, cache-friendly structure tuned for Next.js 16 cache components.

## Shape

```
features/[page]/
├── page.tsx          # Page entry (exports from app/ route)
├── seo.ts            # Metadata
├── sections/         # Page sections (one folder per section)
│   └── [section]/
│       ├── index.tsx # UI (Server Component by default)
│       └── data.ts   # Content + types
├── actions/          # Server Actions
└── schemas/          # Validation
```

Routes in `app/` import the feature page and re-export `metadata`. Add `'use cache'` at the top of route components to land them in the Full Route Cache with Partial Pre-Rendering.

## Rules

- **Single source of truth** — Business info and copy come from config/data files, never literals in components.
- **No cross-feature imports** — Share via `components/shared/`, `features/shared/`, or `lib/*`.
- **Data stays local** — Sections read from their own `./data` (optionally `./types`). Never import sibling section data.
- **Cache boundaries** — Use `'use cache'` plus `cacheLife` for static-ish helpers; use `'use cache: remote'` with `cacheTag`/`cacheLife` for shared DB/API lookups you want globally cached.
- **File limits** — Pages ≤ 200 lines; sections/components ≤ 150; data ≤ 500.

## Naming

- Directories: `kebab-case`
- Components: `PascalCase`
- Data/constants: `camelCase` with suffix (e.g., `heroData`, `serviceList`)

## Locations

| Type | Location |
|------|----------|
| Routes | `app/` |
| Pages | `features/[page]/page.tsx` |
| Sections | `features/[page]/sections/` |
| Config | `lib/config/` |
| Shared UI | `components/` |
| Utils | `lib/utils/` |
