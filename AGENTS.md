# Development Guide

**Reference**: Full documentation in `dev/docs/`

## Architecture

Feature-first structure with isolated sections and colocated data.

### Project Tree

```
project/
├── app/                          # Routes (import features, export metadata)
├── components/
│   ├── ui/                       # shadcn/ui primitives (never edit)
│   ├── layouts/                  # Layout wrappers
│   └── shared/                   # Shared components
├── features/
│   └── [feature]/
│       ├── page.tsx              # Page component (Server Component)
│       ├── seo.ts                # Metadata
│       ├── sections/             # Page sections
│       │   └── [section]/
│       │       ├── index.tsx     # UI component
│       │       ├── data.ts       # Content
│       │       └── types.ts      # Types (optional)
│       ├── actions/              # Server Actions
│       ├── schemas/              # Validation
│       └── data/                 # Additional data
├── lib/
│   ├── config/                   # Site, nav, SEO config
│   ├── constants/                # Constants
│   ├── types/                    # TypeScript types
│   ├── utils/                    # Utilities
│   └── validations/              # Shared validation
├── public/
│   └── images/
│       └── content/
│           └── [feature]/        # Feature-specific images
└── dev/docs/                     # Documentation
```

## Core Rules

**Single Source of Truth**
- Content comes from config/data files, never literals in components
- Business info lives in `lib/config/`, feature content in `features/[name]/sections/*/data.ts`

**Isolation**
- No cross-feature imports (share via `components/shared/`, `features/shared/`, `lib/*`)
- Sections read only their own `./data.ts` (never import sibling section data)
- **Never edit**: `globals.css` and `components/ui/*` (shadcn/ui managed files — always exclude from modifications)

**Cache Boundaries**
- Add `'use cache'` at page/file level for Full Route Cache
- Use `cacheLife('hours')` for data with known TTL
- Use `'use cache: remote'` + `cacheTag`/`cacheLife` for shared DB/API lookups
- Call `revalidatePath`/`revalidateTag` after mutations

**File Limits**
- Pages: ≤ 200 lines
- Sections/Components: ≤ 150 lines
- Data files: ≤ 500 lines

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Directories | `kebab-case` | `contact-form/` |
| Components | `PascalCase.tsx` | `HeroSection.tsx` |
| Pages | `page.tsx` | Always `page.tsx` |
| Data | `data.ts` | Always `data.ts` |
| Actions | `[name].action.ts` | `submit.action.ts` |
| Schemas | `[name].schema.ts` | `contact.schema.ts` |

## Common Tasks

### Add Page

1. Create feature shell: `mkdir -p features/[name]/sections`
2. Build page component with `'use cache'`
3. Add metadata in `seo.ts`
4. Wire route in `app/[slug]/page.tsx`
5. For dynamic routes, implement `generateStaticParams`

### Add Section

1. Create folder: `features/[feature]/sections/[section]/`
2. Add `data.ts` with typed content
3. Build `index.tsx` (Server Component by default)
4. Import into parent page

### Add Form

1. Create schema in `features/[feature]/schemas/[name].schema.ts` (Zod)
2. Build Server Action in `actions/[name].action.ts` (start with `'use server'`)
3. Create form component with `'use client'` + `useActionState` or `react-hook-form`
4. Return structured state: `{ success, errors, values }`
5. Call `revalidatePath`/`revalidateTag` after successful mutation

## Component Guidelines

**Server Components (Default)**
- Use for static content, data fetching, SEO
- No `'use client'` directive needed

**Client Components**
- Add `'use client'` only when interaction required
- Forms, modals, interactive UI

**Styling**
- Use Tailwind utilities
- Prefer shadcn/ui primitives (`Button`, `Form`, `Input`, `Badge`)
- Maintain responsive spacing and heading hierarchy
- Use semantic HTML

## Data Patterns

**Simple Data**
```typescript
// data.ts
export const heroData = {
  title: 'Welcome',
  subtitle: 'Description',
}
```

**Lists**
```typescript
// types.ts
export interface Item {
  id: number
  title: string
}

// data.ts
import type { Item } from './types'
export const items: Item[] = [
  { id: 1, title: 'Item 1' },
]
```

## Configuration

**Site Config**: `lib/config/site.config.ts`
- Name, URL, contact info, social links

**Navigation**: `lib/config/nav.config.ts`
- Main nav, footer nav

**SEO**: `lib/config/seo.config.ts`
- Default metadata, title templates

**Environment**: `.env.local`
- API keys (server-only)
- Public vars (prefix with `NEXT_PUBLIC_`)

## Best Practices

**Performance**
- Enable `cacheComponents: true` in `next.config.ts`
- Use `Link` for navigation (router prefetch)
- Avoid `dynamic`/`revalidate` exports unless opting out of caching
- Add `generateStaticParams` for dynamic routes

**Security**
- Validate on server (never trust client state)
- Configure `experimental.serverActions.allowedOrigins`
- Add rate limiting and honeypot for public forms
- Guard Server Actions like public endpoints

**Accessibility**
- Use semantic HTML
- Maintain heading hierarchy (h1 → h2 → h3)
- Add `aria-invalid`, `aria-describedby` for form fields
- Include descriptive labels and error messages

**Code Quality**
- Extract shared UI to `components/shared/`
- Keep components focused and small
- Use TypeScript for type safety
- Follow import order: React → Next → External → Internal → Relative

## Quick Reference

**Path Aliases**
```typescript
import { config } from '@/lib/config/site.config'
import { Button } from '@/components/ui/button'
```

**Cache Directives**
```typescript
'use cache'                              // Static cache
cacheLife('hours')                       // TTL cache
'use cache: remote'                      // Shared cache
cacheTag(['tag'])                        // Tag for invalidation
```

**Revalidation**
```typescript
revalidatePath('/path')                  // Revalidate specific path
revalidateTag('tag')                     // Revalidate tagged fetches
```

---

**For detailed guides**: See `dev/docs/`
- Getting started: `dev/docs/getting-started.md`
- Architecture: `dev/docs/architecture.md`
- Development: `dev/docs/development/`
- Playbooks: `dev/docs/guides/`
- Reference: `dev/docs/reference/`
