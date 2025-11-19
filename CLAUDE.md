# Manna Health - Quick Reference

> **💡 Not sure?** Read `/docs/rules/` (01 → 08) for detailed guidance.

## 📚 Full Documentation

**Core Rules:** `/docs/rules/01-start-here.md` through `08-task-guide.md`
**Task Playbooks:** `/docs/rules/tasks/{setup,development,optimization,deployment}/`
**When uncertain:** Always check `/docs/rules/` before making architectural decisions

---

## ⚠️ PROJECT TYPE: SSG + Forms (Static + Minimal Server)

All display data from `.ts` files (build time). Server Actions ONLY for forms/email.

```typescript
// All pages (build time rendering)
export const dynamic = 'force-static'
export const revalidate = false

// Server Actions (runtime, forms only)
'use server'  // ONLY in features/marketing/[feature]/actions/*.action.ts
```

**Benefits**: 10-30ms load times, perfect SEO, minimal hosting costs, high security

---

## 🏗️ PROJECT ARCHITECTURE

```
project-root/
├── lib/                           ← Core infrastructure (FIXED)
│   ├── config/
│   │   ├── site.config.ts         ← 🔥 MAIN CONFIG (business, branding, nav, analytics)
│   │   ├── nav.config.ts
│   │   ├── seo.config.ts
│   │   └── email.config.ts
│   ├── constants/
│   ├── types/
│   ├── utils/
│   └── validations/
│
├── components/                    ← Reusable components (FIXED)
│   ├── ui/                        ← shadcn/ui components
│   ├── layouts/                   ← Layout components
│   └── shared/                    ← Shared business components
│
├── features/                      ← Feature-based pages
│   ├── marketing/
│   │   ├── [page]/                ← Feature folder structure
│   │   │   ├── page.tsx           ← Page assembly (Server Component)
│   │   │   ├── seo.ts             ← SEO metadata (feature root only)
│   │   │   ├── index.ts           ← Barrel exports
│   │   │   ├── sections/          ← All sections here (REQUIRED)
│   │   │   │   └── [section]/
│   │   │   │       ├── index.tsx  ← UI component
│   │   │   │       ├── data.ts    ← Content data
│   │   │   │       └── types.ts   ← Types (optional)
│   │   │   ├── actions/           ← Server Actions (forms only)
│   │   │   │   └── *.action.ts
│   │   │   ├── schemas/           ← Zod validation (forms only)
│   │   │   │   └── *.schema.ts
│   │   │   └── data/              ← Complex data (services/articles only)
│   │   │       └── */
│   │   │
│   │   │   ⚠️  NO OTHER FOLDERS - Only: sections/, actions/, schemas/, data/
│   │   │   ⚠️  NO components/, utils/, hooks/, lib/ at feature level
│   │   │
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── contact/
│   │   ├── consultation/
│   │   ├── gallery/
│   │   ├── areas/
│   │   ├── articles/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── accessibility/
│   └── shared/                    ← Shared sections across features
│       └── faqs/
│
├── emails/                        ← Email templates (Resend)
│   ├── templates/
│   └── styles/
│
├── app/                           ← Next.js routes (thin layer)
│   ├── page.tsx                   ← Imports HomePage from features
│   └── ...
│
└── public/                        ← Static assets
    └── images/
```

---

## 🔑 GOLDEN RULES

### Architecture Rules (DO NOT BREAK)
1. **All config in `lib/config/site.config.ts`** - Business info, branding, navigation, analytics
2. **Page content in section data.ts files** - Hero text, services, testimonials
3. **Never hardcode business info** - Always reference site.config.ts
4. **Static first** - Server Actions ONLY for forms
5. **Never modify lib/, components/ structure** - These are fixed

### File Organization Rules (MUST FOLLOW)
6. **Each page = one feature** in `features/marketing/[page]/`
7. **All sections under `sections/` folder** - Never at feature root
8. **SEO at feature root** - `seo.ts` not in sections
9. **Self-contained sections** - Each has `index.tsx`, `data.ts`, optional `types.ts`
10. **App routes ONLY render features** - No composition in routes

### File Patterns (ENFORCE)
```
✅ features/marketing/about/page.tsx
✅ features/marketing/about/sections/hero/index.tsx
✅ features/marketing/about/sections/hero/data.ts
✅ features/marketing/about/seo.ts

❌ features/marketing/about-page.tsx
❌ features/marketing/about/hero/
❌ features/marketing/about/data/hero.data.ts
❌ features/marketing/about/hero.seo.ts
```

### Import Rules (STRICT)
```typescript
// ✅ DO
import { heroData } from './data'                      // Same section
import { HeroSection } from './sections/hero'          // Page composing sections
import { siteConfig } from '@/lib/config/site.config'  // Global config

// ❌ DON'T
import { heroData } from '../hero/data'                // Cross-section
import { heroData } from '@/features/marketing/about/sections/hero/data' // Cross-feature
const heroData = { title: "Hardcoded" }               // Hardcoded data
```

### Size Limits (ENFORCE)
- Components: 150 lines → Split if larger
- Page Components: 200 lines → Extract sections
- Data Files: 500 lines → Organize into modules

---

## 📝 COMMON WORKFLOWS

> **Detailed task guides:** See `/docs/rules/tasks/{development,setup,optimization}/`

**Update Business Info:** Edit `lib/config/site.config.ts` (never hardcode)
**Update Page Content:** Edit `features/marketing/[page]/sections/[name]/data.ts`
**Add New Page:** See `/docs/rules/tasks/development/add-new-page.md`
**Add Section:** See `/docs/rules/tasks/development/add-new-section.md`
**Add Service/Article:** See `/docs/rules/tasks/development/update-content.md`

---

## ❌ ANTI-PATTERNS (STOP IF YOU SEE)

### SSG Violations
- `'use server'` anywhere except `features/marketing/[page]/actions/`
- `app/api/` routes (use Server Actions instead)
- `await fetch()` for display data (use data.ts files)
- Database setup (this is file-based)
- `export const revalidate = 3600` (should be false)

### Architecture Violations
- Hardcoded business names/addresses/phone numbers
- Cross-section imports (`import from '../other-section'`)
- Cross-feature imports (except shared)
- Config in feature folders
- Sections at feature root (must be in `sections/`)
- SEO files in sections (must be at feature root)
- **❌ ILLEGAL FOLDERS in features:** `components/`, `utils/`, `hooks/`, `lib/`, `helpers/`
- Data centralization folder (`data/` allowed ONLY for services/articles complex data)

### File Naming Violations
- `home-page.tsx` instead of `page.tsx`
- `hero.data.ts` instead of `data.ts`
- `home.seo.ts` instead of `seo.ts`
- Section folders at feature root instead of in `sections/`

---

## 🚀 QUICK REFERENCE

### Key File Locations
| Type | Location | Example |
|------|----------|---------|
| **Config** | `lib/config/site.config.ts` | Business info, branding, nav |
| **Page** | `features/marketing/[page]/page.tsx` | Page assembly |
| **SEO** | `features/marketing/[page]/seo.ts` | Metadata (feature root) |
| **Section** | `features/[page]/sections/[name]/` | `index.tsx`, `data.ts` |
| **Action** | `features/[page]/actions/*.action.ts` | Server Actions only |
| **Email** | `emails/templates/[name].tsx` | Resend templates |

### Data Flow Pattern
```
lib/config/site.config.ts → Global config (footer, header, nav)
features/[page]/sections/[name]/data.ts → Section component → Page → App route
```

### Import Rules
```typescript
// ✅ Allowed
import { heroData } from './data'                       // Same section
import { HeroSection } from './sections/hero'           // Page → Section
import { siteConfig } from '@/lib/config/site.config'   // Global config
import { SharedFaqsSection } from '@/features/shared/faqs' // Shared features

// ❌ Forbidden
import { heroData } from '../other-section/data'        // Cross-section
import { heroData } from '@/features/about/sections/hero/data' // Cross-feature
```

---

## 💡 CORE PRINCIPLE

> **"Structure is FIXED. Content changes via `site.config.ts` and `data.ts` files."**

- **Business info?** → Edit `lib/config/site.config.ts` (never hardcode)
- **Page content?** → Edit `features/[page]/sections/[name]/data.ts`
- **New feature?** → Follow existing patterns exactly (check `/docs/rules/`)
- **Bug fix?** → Preserve the architecture
- **Need component?** → Use from `components/` first, never create in features

---

## 🎯 PROJECT CONTEXT

**Business:** Manna Health - Mobile regenerative clinic in Calgary
**Services:** Hair restoration, facials, microneedling, neuromodulators, dermal fillers (8 total)
**Target:** Busy professionals, parents, caregivers
**Differentiator:** Mobile service + nurse-led + faith-based care

**Pages:** Home, About, Services (8), Consultation, Contact, Gallery, Articles (25), Areas (10 Calgary neighborhoods), Privacy, Terms, Accessibility

**Tech Stack:** Next.js 16 (SSG), React Server Components, Tailwind CSS, shadcn/ui, Resend (email), Vercel (hosting)
