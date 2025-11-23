# 01 · Architecture Rules

Use this checklist before adding or moving files. It keeps every feature portable between projects.

## Directory Contract

```
features/marketing/[page]/
├── page.tsx           # Server component composing sections
├── seo.ts             # Route metadata
├── index.ts           # Barrel exports
├── sections/
│   └── section-name/
│       ├── index.tsx  # UI
│       ├── data.ts    # Build-time content
│       └── types.ts   # Optional local types
├── actions/           # Server actions (forms only)
├── schemas/           # Zod validations for forms
└── data/              # Additional structured content (services, articles)
```

## Golden Rules

1. **One feature = one route** – Never let `app/` contain business logic.
2. **Sections live under `sections/` only** – No stray components at the feature root.
3. **No cross-feature imports** – Reuse happens through shared `components/` or `lib/` exports.
4. **Config stays in `lib/config`** – Update global business info there and reference it everywhere else.
5. **File caps** – Section component ≤ 150 lines, page component ≤ 200 lines, data file ≤ 500 lines.
6. **Dynamic routes own their params** – Keep every `[slug]` or `[...slug]` page co-located with a strongly-typed `generateStaticParams` export fed by the feature’s data modules so static paths don’t drift from the source of truth (Next.js `generateStaticParams` docs, v15.1.8).

## Naming Conventions

- Use `kebab-case` directories for features and sections.
- Use `PascalCase` for exported React components.
- Data constants follow `{sectionName}Data` or `{slug}Area` patterns and export defaults.

## When Adding New Structures

- Clone an existing feature folder as a template.
- Update the route entry under `app/` to import only the new feature’s `page.tsx` default export.
- Add SEO metadata file alongside `page.tsx`.
- For dynamic collections, expose a helper (e.g., `export const serviceSlugs = services.map((s) => ({ slug: s.slug }))`) inside the feature so `generateStaticParams` can stay a thin wrapper. Keep these helpers pure so frameworks can statically analyze them (Next.js `generateStaticParams` docs, v15.1.8).

Breaking these rules makes downstream automation brittle—copy this file verbatim into sibling repos to keep architecture decisions synchronized.
