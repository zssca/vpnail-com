# Project Structure

## Root

```
project/
├── app/              # Routes (import feature pages, export metadata)
├── components/       # Shared UI (shadcn/ui + shared layouts)
├── features/         # Feature pages (sections, actions, schemas, data)
├── lib/              # Config & utilities
├── public/           # Static files
└── developer/        # Documentation
```

## Features

```
features/[page]/
├── page.tsx          # Page component (Server Component)
├── seo.ts            # Metadata
├── sections/
│   └── [section]/
│       ├── index.tsx
│       └── data.ts
├── actions/          # Server Actions
├── schemas/          # Validation
└── data/             # Additional data
```

## Components

```
components/
├── ui/               # shadcn/ui primitives
├── layouts/          # Layout/section wrappers
└── shared/           # Shared components
```

## Lib

```
lib/
├── config/           # Configuration (site, nav, SEO)
├── constants/        # Constants
├── types/            # TypeScript types
├── utils/            # Utilities
└── validations/      # Shared validation
```

## Public

```
public/
└── images/
    ├── logo.svg
    └── content/
        └── [feature]/
```

## Naming

| Type | Convention | Example |
|------|-----------|---------|
| Directories | `kebab-case` | `contact-form/` |
| Components | `PascalCase.tsx` | `HeroSection.tsx` |
| Pages | `page.tsx` | Always `page.tsx` |
| Data | `data.ts` | Always `data.ts` |
| Actions | `[name].action.ts` | `contact.action.ts` |
| Schemas | `[name].schema.ts` | `contact.schema.ts` |

## File Limits

| Type | Max Lines |
|------|-----------|
| Component | 150 |
| Page | 200 |
| Data | 500 |

## Imports

Use path aliases:

```typescript
import { config } from '@/lib/config/site.config'
import { Button } from '@/components/ui/button'
```

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Routing & Cache Components

- Routes live in `app/`; they import feature pages and re-export `metadata`.
- Add `'use cache'` in routes (and optionally `cacheLife`) to land pages in the Full Route Cache with Partial Pre-Rendering.
- Avoid `dynamic`/`revalidate` exports unless intentionally opting out of caching.
