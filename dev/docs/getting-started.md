# Getting Started

Built with Next.js 16 (cache components on) and shadcn/ui 3.5.

## Install & Run

```bash
npm install          # dependencies
npm run dev          # http://localhost:3000
npm run lint         # keep lint passing before committing
```

## Project Map

```
app/          # Routes (import feature pages, export metadata)
features/     # Page implementations (sections, actions, schemas)
components/   # Shared UI (shadcn/ui lives here)
lib/          # Config, utilities, validation
public/       # Static assets
dev/    # Docs (this folder)
```

## Core Principles

- **Configuration over hardcoding** — Business facts in `lib/config/*`; copy in `data.ts` files.
- **Cache-aware by default** — Routes use `'use cache'` + `cacheComponents: true` for PPR; tag or revalidate paths after mutations.
- **Keep features isolated** — No cross-feature imports; share through `components/shared` or `lib`.

## Quick Links

| Task | Reference |
|------|-----------|
| Update business info | `lib/config/site.config.ts` |
| Update page content | `features/[page]/sections/[section]/data.ts` |
| Add a page | `guides/add-page.md` |
| Add a section | `guides/add-section.md` |
| Wire a form | `guides/form-setup.md` |

## Next Steps

Read [Architecture](./architecture.md) for patterns, then jump into the relevant guide in `development/` or `guides/`.
