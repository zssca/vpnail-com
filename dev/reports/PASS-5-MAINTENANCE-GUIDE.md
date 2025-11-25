# Architectural Maintenance Guide

## Quick Reference for Maintaining 100% Compliance

This guide ensures the codebase maintains 100% architectural compliance as it evolves.

---

## Adding a New Feature

### 1. Create Feature Structure

```bash
mkdir -p features/[feature-name]/sections
touch features/[feature-name]/page.tsx
touch features/[feature-name]/seo.ts
```

**Rules**:
- Use kebab-case for directory name
- Always create `sections/` folder
- Never create: `components/`, `utils/`, `hooks/`, `lib/`

### 2. Create Page Component

```typescript
// features/[feature-name]/page.tsx
'use cache'  // ← Add for static pages

import { PageContainer } from "@/components/layouts/PageContainer"

export default async function FeaturePage() {
  return (
    <PageContainer>
      {/* Import sections here */}
    </PageContainer>
  )
}
```

**Checklist**:
- ✅ Add `'use cache'` directive for static content
- ✅ Use Server Component by default (no 'use client')
- ✅ Keep under 200 lines
- ✅ Import sections, don't write UI here

### 3. Create SEO Configuration

```typescript
// features/[feature-name]/seo.ts
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config/site.config'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: `${siteConfig.url}/route-slug`,
  },
}
```

**Checklist**:
- ✅ Export `metadata` object
- ✅ Use TypeScript `Metadata` type
- ✅ Reference `siteConfig` for URLs

### 4. Wire Route in App Router

```typescript
// app/[route-slug]/page.tsx
export { default, generateMetadata } from "@/features/[feature-name]/page"
export { metadata } from "@/features/[feature-name]/seo"
```

**For dynamic routes, add**:
```typescript
export { generateStaticParams } from "@/features/[feature-name]/page"
```

---

## Adding a New Section

### 1. Create Section Structure

```bash
mkdir features/[feature]/sections/[section-name]
touch features/[feature]/sections/[section-name]/index.tsx
touch features/[feature]/sections/[section-name]/data.ts
```

**Rules**:
- Use kebab-case for section directory
- Always create both `index.tsx` and `data.ts`
- Optional: `types.ts` for complex types

### 2. Create Data File

```typescript
// features/[feature]/sections/[section-name]/data.ts
export const sectionData = {
  title: "Section Title",
  description: "Section description",
  items: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ],
}
```

**Rules**:
- ✅ Export a named constant
- ✅ Use TypeScript inference or explicit types
- ✅ Keep under 500 lines
- ✅ Never hardcode content in components

### 3. Create Section Component

```typescript
// features/[feature]/sections/[section-name]/index.tsx
import { sectionData } from "./data"

export function SectionName() {
  return (
    <section>
      <h2>{sectionData.title}</h2>
      <p>{sectionData.description}</p>
      {/* Render items */}
    </section>
  )
}
```

**Checklist**:
- ✅ Server Component by default (no 'use client')
- ✅ Import data from `./data`
- ✅ Keep under 150 lines
- ✅ Use semantic HTML
- ✅ PascalCase function name

### 4. Add to Parent Page

```typescript
// features/[feature]/page.tsx
import { SectionName } from "./sections/[section-name]"

export default function FeaturePage() {
  return (
    <PageContainer>
      <SectionName />
    </PageContainer>
  )
}
```

---

## Adding a Form

### 1. Create Schema

```typescript
// features/[feature]/schemas/[form-name].schema.ts
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short"),
})

export type FormData = z.infer<typeof formSchema>
```

### 2. Create Server Action

```typescript
// features/[feature]/actions/[action-name].action.ts
'use server'

import { formSchema } from "../schemas/[form-name].schema"
import { revalidatePath } from "next/cache"

export async function submitForm(formData: FormData) {
  // 1. Validate
  const result = formSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, errors: result.error.flatten() }
  }

  // 2. Process
  try {
    // ... your logic

    // 3. Revalidate
    revalidatePath('/path')

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to submit" }
  }
}
```

**Checklist**:
- ✅ Start with `'use server'`
- ✅ Validate input with Zod
- ✅ Return structured response
- ✅ Call `revalidatePath` after mutation

### 3. Create Form Component

```typescript
// features/[feature]/sections/[form]/index.tsx
'use client'

import { useState } from "react"
import { submitForm } from "../../actions/[action-name].action"
import { formData } from "./data"

export function FormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ... form logic
}
```

**Checklist**:
- ✅ Add `'use client'` directive
- ✅ Use form state management
- ✅ Import data from `./data`
- ✅ Handle loading/error states

---

## Sharing Code Across Features

### Shared UI Components

If a component is used in **3+ features**, extract it:

```bash
# Move to shared location
mv features/[feature]/sections/[section]/Component.tsx \
   components/shared/Component.tsx
```

**Update imports**:
```typescript
// Before
import { Component } from "./sections/[section]/Component"

// After
import { Component } from "@/components/shared/Component"
```

### Shared Utilities

```typescript
// lib/utils/[utility-name].ts
export function utilityFunction() {
  // Shared logic
}
```

### Shared Types

```typescript
// lib/types.ts or lib/types/[domain].ts
export interface SharedType {
  // Shared interface
}
```

### Shared Validation

```typescript
// lib/validations/[validator-name].ts
import { z } from 'zod'

export const sharedSchema = z.object({
  // Shared validation
})
```

---

## Import Order Standard

Always maintain this import order:

```typescript
// 1. React and React hooks
import { useState, useEffect } from "react"

// 2. Next.js modules
import Link from "next/link"
import Image from "next/image"

// 3. External packages
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

// 4. Internal modules (@/ aliases)
import { siteConfig } from "@/lib/config/site.config"
import { Component } from "@/components/shared/Component"

// 5. Relative imports (./)
import { sectionData } from "./data"
import { SectionComponent } from "./SectionComponent"
```

**Blank lines between groups**

---

## Naming Conventions Cheat Sheet

| Item | Convention | Example |
|------|-----------|---------|
| Feature directory | kebab-case | `product-detail/` |
| Section directory | kebab-case | `hero-section/` |
| Component file | kebab-case.tsx | `hero-section.tsx` |
| Page file | page.tsx | Always `page.tsx` |
| Data file | data.ts | Always `data.ts` |
| SEO file | seo.ts | Always `seo.ts` |
| Action file | [name].action.ts | `submit.action.ts` |
| Schema file | [name].schema.ts | `contact.schema.ts` |
| Type file | types.ts | Always `types.ts` |

---

## File Size Limits

| File Type | Limit | Action if Exceeded |
|-----------|-------|-------------------|
| page.tsx | 200 lines | Split into more sections |
| Section index.tsx | 150 lines | Extract sub-components |
| data.ts | 500 lines | Split by category |

**How to split a large section**:

```typescript
// Before (200 lines)
export function LargeSection() {
  // ... 200 lines
}

// After
// index.tsx (50 lines - orchestration)
import { Header } from "./Header"
import { Content } from "./Content"
import { Footer } from "./Footer"

export function LargeSection() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  )
}

// Header.tsx (50 lines)
// Content.tsx (50 lines)
// Footer.tsx (50 lines)
```

---

## Cache Strategy Checklist

### Static Pages
```typescript
'use cache'  // Add at top of page.tsx

export default async function Page() {
  // Static content
}
```

### Dynamic Routes
```typescript
export async function generateStaticParams() {
  const items = await getItems()
  return items.map((item) => ({
    slug: item.slug,
  }))
}
```

### Server Actions
```typescript
'use server'

import { revalidatePath } from "next/cache"

export async function mutateData() {
  // ... mutation logic

  revalidatePath('/path')  // Revalidate after change
}
```

---

## Never Do This

### ❌ Cross-Feature Imports
```typescript
// WRONG - importing from another feature
import { AboutHero } from '@/features/about/sections/hero'
```

```typescript
// RIGHT - extract to shared
import { Hero } from '@/components/shared/Hero'
```

### ❌ Hardcoded Content
```typescript
// WRONG - content in component
export function Hero() {
  return <h1>Welcome to GTFS</h1>
}
```

```typescript
// RIGHT - content in data.ts
import { heroData } from "./data"

export function Hero() {
  return <h1>{heroData.title}</h1>
}
```

### ❌ Deep Relative Imports
```typescript
// WRONG
import { config } from '../../../lib/config/site.config'
```

```typescript
// RIGHT
import { config } from '@/lib/config/site.config'
```

### ❌ Forbidden Folders in Features
```typescript
// WRONG structure
features/
  └── contact/
      ├── components/  ❌ NO
      ├── utils/       ❌ NO
      ├── hooks/       ❌ NO
      └── lib/         ❌ NO
```

```typescript
// RIGHT structure
features/
  └── contact/
      ├── sections/    ✅ YES
      ├── actions/     ✅ YES (optional)
      ├── schemas/     ✅ YES (optional)
      └── data/        ✅ YES (optional)
```

### ❌ Editing Protected Files
```typescript
// NEVER EDIT:
app/globals.css           ❌ Managed by Tailwind
components/ui/*           ❌ Managed by shadcn/ui
```

---

## Quick Validation Commands

### Check Feature Structure
```bash
# All features should have page.tsx, seo.ts, sections/
ls features/*/
```

### Check for Forbidden Folders
```bash
# Should return nothing
find features -maxdepth 2 -type d -name "components"
find features -maxdepth 2 -type d -name "utils"
find features -maxdepth 2 -type d -name "hooks"
```

### Check File Sizes
```bash
# Pages (should be < 200 lines)
find features app -name "page.tsx" -exec wc -l {} \; | sort -rn

# Sections (should be < 150 lines)
find features -path "*/sections/*/index.tsx" -exec wc -l {} \; | sort -rn
```

### Check for 'any' Types
```bash
# Should return nothing in application code
grep -r ": any" features/ components/shared/ lib/
```

### Check for Debug Code
```bash
# Should only show error logging
grep -r "console.log\|debugger\|TODO\|FIXME" features/ components/
```

---

## Common Scenarios

### Scenario: Component Used in 2 Features

**Action**: Keep it in one feature's sections, import normally

```typescript
// features/feature-a/sections/section/Component.tsx
export function Component() { ... }

// features/feature-a/page.tsx
import { Component } from "./sections/section/Component"

// features/feature-b/page.tsx
// ❌ Don't cross-import
// import { Component } from "@/features/feature-a/sections/section/Component"

// ✅ Extract to shared if used in 3+ features
```

### Scenario: Need to Share Data Between Sections

**Action**: Create feature-level data file

```typescript
// features/[feature]/data/shared-data.ts
export const sharedData = {
  // Shared across sections
}

// features/[feature]/sections/section-a/index.tsx
import { sharedData } from "../../data/shared-data"

// features/[feature]/sections/section-b/index.tsx
import { sharedData } from "../../data/shared-data"
```

### Scenario: Business Info Needed Everywhere

**Action**: Use lib/config/site.config.ts

```typescript
// lib/config/site.config.ts
export const siteConfig = {
  name: "GTFS",
  email: "sales@gtfservices.ca",
  // ...
}

// Anywhere in the app
import { siteConfig } from "@/lib/config/site.config"
```

---

## Pre-Commit Checklist

Before committing new code:

- [ ] All new features have `page.tsx`, `seo.ts`, `sections/`
- [ ] All new sections have `index.tsx` and `data.ts`
- [ ] No cross-feature imports
- [ ] No forbidden folders in features/
- [ ] All files within size limits
- [ ] Naming conventions followed
- [ ] Imports use `@/` path aliases
- [ ] Import order is correct
- [ ] Static pages have `'use cache'`
- [ ] Dynamic routes have `generateStaticParams`
- [ ] No `console.log` or debug code
- [ ] No hardcoded content in components
- [ ] TypeScript compiles without errors
- [ ] No `any` types in new code

---

## Getting Help

### Documentation
- **Architecture Guide**: `dev/docs/architecture.md`
- **Development Guide**: `dev/docs/development/`
- **Quick Reference**: `CLAUDE.md`

### Examples
Look at existing features for patterns:
- Simple feature: `features/about/`
- Form feature: `features/contact/`
- Dynamic feature: `features/category/`
- Complex feature: `features/product-detail/`

### Validation
Run the project tree generator to verify structure:
```bash
python3 dev/scripts/generate_tree.py --show-info
```

---

## Conclusion

Following these guidelines ensures the codebase maintains **100% architectural compliance**. When in doubt, reference existing features as examples and consult CLAUDE.md for the authoritative guidelines.

**Remember**:
- Feature-first structure
- Isolated sections
- Colocated data
- Single source of truth
- No cross-feature dependencies

---

**Guide Version**: 1.0
**Last Updated**: November 23, 2025
**Status**: Production
