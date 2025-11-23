# Victoria Park Nails - Project Guide

## Architecture Pattern

This project follows a **feature-based architecture** for a Next.js marketing website.

### Core Structure

```
project-root/
├── lib/
│   ├── config/          ← All business data and configuration
│   ├── constants/
│   ├── types/
│   ├── utils/
│   └── validations/
│
├── components/
│   ├── ui/              ← shadcn/ui components
│   ├── layouts/
│   └── shared/
│
├── features/
│   └── [page]/
│       ├── page.tsx
│       ├── seo.ts
│       ├── sections/    ← Page sections with data.ts files
│       ├── actions/     ← Server actions for forms
│       └── schemas/     ← Form validation
│
├── emails/
│   └── templates/
│
├── app/
│   └── page.tsx
│
└── public/
    └── images/
```

## Key Rules

### 1. Configuration First
- **Single source of truth:** `lib/config/site.config.ts`
- Never hardcode business info (name, address, phone, hours, etc.)
- All branding, contact info, and business data lives in config files

### 2. Content Organization
- Page content belongs in `features/[page]/sections/[section]/data.ts`
- Each section has: `index.tsx` (component), `data.ts` (content), optional `types.ts`
- SEO metadata stays in `features/[page]/seo.ts`

### 3. Feature Structure
**Allowed in features/[page]/**
- ✅ `sections/` - Page sections
- ✅ `actions/` - Server actions (forms only)
- ✅ `schemas/` - Zod validation
- ✅ `data/` - Complex data modules

**Forbidden in features/[page]/**
- ❌ `components/` - Use `components/shared/` instead
- ❌ `utils/` - Use `lib/utils/` instead
- ❌ `hooks/` - Use `lib/` or `components/` instead
- ❌ `lib/` - Use root `lib/` instead

### 4. Server Actions
- Only for form submissions and email processing
- Must use `'use server'` directive
- Located in `features/[page]/actions/*.action.ts`

### 5. Import Rules
```typescript
// ✅ Allowed
import { sectionData } from './data'
import { siteConfig } from '@/lib/config/site.config'
import { SharedSection } from '@/features/shared/example'

// ❌ Not allowed
import { data } from '../other-section/data'  // No cross-section imports
const data = { title: 'Hardcoded' }           // No hardcoded content
```

## Anti-Patterns

Stop and ask before:
- Creating `app/api/` routes
- Adding databases or ORMs
- Hardcoding business data anywhere
- Cross-section or cross-feature imports (except `features/shared/`)
- Creating feature-level `components/`, `utils/`, or `hooks/` folders
- Placing sections outside `sections/` folder
- Editing `app/globals.css` or `components/ui/` files

## Quick Actions

| Task | Location |
|------|----------|
| Update business info | `lib/config/site.config.ts` |
| Update page content | `features/[page]/sections/[section]/data.ts` |
| Update SEO | `features/[page]/seo.ts` |
| Add form action | `features/[page]/actions/*.action.ts` |
| Add email template | `emails/templates/[name].tsx` |

## Data Flow

```
site.config.ts → sections/[section]/data.ts → sections/[section]/index.tsx
→ features/[page]/page.tsx → app route
```

## Core Principle

**Structure is fixed; content lives in configuration and data files.**

- Business update? → Edit `site.config.ts`
- Content change? → Edit `data.ts`
- New page? → Copy existing feature pattern
- New section? → Add to `sections/` folder
