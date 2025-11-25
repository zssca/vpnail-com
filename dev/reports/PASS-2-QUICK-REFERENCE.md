# Pass 2: Quick Reference Card

## What Changed

### Import Paths (Use These Going Forward)

```typescript
// Layouts (structural components)
import { PageContainer } from '@/components/layouts/PageContainer'
import { SiteHeader } from '@/components/layouts/SiteHeader'
import { SiteFooter } from '@/components/layouts/SiteFooter'
import { MainNav } from '@/components/layouts/MainNav'

// Shared (reusable UI components)
import { CTASection } from '@/components/shared/CTASection'
import { PageHeader } from '@/components/shared/PageHeader'
import { ProductImageGallery } from '@/components/shared/ProductImageGallery'
```

### Section Pattern (Follow This)

Every section MUST have both files:

```
features/[feature]/sections/[section]/
├── index.tsx     # UI component
└── data.ts       # Content (headings, labels, descriptions)
```

Example:
```typescript
// data.ts
export const sectionCopy = {
  heading: "Section Title",
  description: "Section description",
}

// index.tsx
import { sectionCopy } from './data'

export function Section() {
  return <h2>{sectionCopy.heading}</h2>
}
```

### Import Order (Use This Order)

```typescript
// 1. React (if needed)
import { useState } from 'react'

// 2. Next.js
import Link from 'next/link'
import Image from 'next/image'

// 3. External packages
import { ArrowRight } from 'lucide-react'

// 4. Internal (@/ imports)
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layouts/PageContainer'
import type { Product } from '@/lib/types'

// 5. Relative imports
import { sectionData } from './data'
```

## Rules

1. NO cross-section imports (`../other-section/data`)
2. NO hardcoded content in components (use data.ts)
3. ALWAYS use @/ path aliases (not relative paths for components)
4. ALWAYS add blank lines between import groups

## Quick Checks

Before committing, verify:
- [ ] My section has a data.ts file
- [ ] I'm using @/ imports for components
- [ ] I'm not importing from ../other-section
- [ ] My imports are in the correct order
- [ ] No hardcoded strings (except UI labels like "Submit", "Close")

## Common Mistakes

### Wrong
```typescript
import { PageContainer } from '@/components/PageContainer'  // ❌
import { data } from '../other-section/data'  // ❌
const title = "Hardcoded Title"  // ❌
```

### Right
```typescript
import { PageContainer } from '@/components/layouts/PageContainer'  // ✅
import { data } from './data'  // ✅
const { title } = sectionCopy  // ✅
```

## Need Help?

See full documentation:
- `/Users/afshin/Desktop/work/GTFS/gtfservices-ca/CLAUDE.md`
- `/Users/afshin/Desktop/work/GTFS/gtfservices-ca/dev/docs/`
- `/Users/afshin/Desktop/work/GTFS/gtfservices-ca/dev/reports/PASS-2-*`

---

**Updated**: 2025-11-23 (Pass 2)
