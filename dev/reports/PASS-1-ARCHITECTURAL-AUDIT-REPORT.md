# Pass 1: Architectural Audit Report
**Date**: 2025-11-23
**Scope**: Comprehensive structural analysis and foundational fixes
**Status**: In Progress

## Executive Summary

This is the first of five architectural review passes for the GTFS Next.js application. This pass focuses on foundational structural issues, file organization, and alignment with the feature-first architecture defined in CLAUDE.md.

### High-Level Findings
- **Total Files Analyzed**: 183 TypeScript/TSX files
- **Critical Issues**: 8 categories identified
- **Compliance Status**: ~60% aligned with architecture standards
- **Immediate Concerns**: Missing config files, organizational structure, data/logic separation

---

## Step 1: Project Structure Analysis

### Current State Assessment

#### Directory Structure (Actual)
```
gtfservices-ca/
├── app/                         # ✅ Routes present
├── components/                  # ⚠️  Mixed organization
│   ├── ui/                      # ✅ shadcn/ui (protected)
│   ├── CTASection.tsx           # ❌ Should be in shared
│   ├── MainNav.tsx              # ❌ Should be in layouts
│   ├── PageContainer.tsx        # ❌ Should be in layouts
│   ├── PageHeader.tsx           # ❌ Should be in shared
│   └── [other components]       # ❌ Not organized
├── features/                    # ⚠️  Partially compliant
│   ├── about/                   # ❌ Missing sections/
│   │   ├── page.tsx
│   │   └── seo.ts
│   ├── home/                    # ✅ Good structure
│   │   ├── page.tsx
│   │   ├── seo.ts
│   │   └── sections/
│   ├── contact/                 # ✅ Good structure
│   └── [others]
├── lib/                         # ⚠️  Incomplete
│   ├── config/                  # ❌ Missing site.config.ts, nav.config.ts, seo.config.ts
│   │   └── email.config.ts      # ✅ Present
│   ├── data.ts                  # ❌ Should be reorganized
│   ├── types.ts                 # ✅ Present
│   └── utils.ts                 # ✅ Present
├── data/                        # ❌ Should be in lib/config or features
│   ├── company/
│   ├── categories/
│   ├── products/
│   └── config/
├── contexts/                    # ❌ Should be in lib/
├── hooks/                       # ❌ Should be in lib/
└── public/                      # ✅ Correct
```

#### Expected Structure (CLAUDE.md)
```
project/
├── app/                         # Routes only
├── components/
│   ├── ui/                      # shadcn/ui (never edit)
│   ├── layouts/                 # Layout wrappers
│   └── shared/                  # Shared components
├── features/
│   └── [feature]/
│       ├── page.tsx
│       ├── seo.ts
│       ├── sections/
│       │   └── [section]/
│       │       ├── index.tsx
│       │       └── data.ts
│       ├── actions/
│       ├── schemas/
│       └── data/
├── lib/
│   ├── config/                  # Site, nav, SEO, email config
│   ├── types/
│   ├── utils/
│   └── validations/
└── public/
```

---

## Step 2: Naming Convention Violations

### Issues Identified

#### ❌ CRITICAL: Component Organization
**Location**: `/components/` (root level)
**Issue**: 13 components in root not organized into subdirectories

**Violations Found**:
```
components/
├── CTASection.tsx              # Should be: components/shared/CTASection.tsx
├── ClientSiteHeader.tsx        # Should be: components/layouts/ClientSiteHeader.tsx
├── MainNav.tsx                 # Should be: components/layouts/MainNav.tsx
├── NavbarSearch.tsx            # Should be: components/shared/NavbarSearch.tsx
├── PageContainer.tsx           # Should be: components/layouts/PageContainer.tsx
├── PageHeader.tsx              # Should be: components/shared/PageHeader.tsx
├── ProductImageGallery.tsx     # Should be: components/shared/ProductImageGallery.tsx
├── SearchFilter.tsx            # Should be: components/shared/SearchFilter.tsx
├── SiteBreadcrumb.tsx          # Should be: components/shared/SiteBreadcrumb.tsx
├── SiteFooter.tsx              # Should be: components/layouts/SiteFooter.tsx
├── SiteHeader.tsx              # Should be: components/layouts/SiteHeader.tsx
├── ErrorBoundary.tsx           # Should be: components/shared/ErrorBoundary.tsx
└── structured-data.tsx         # ❌ Wrong case: should be StructuredData.tsx
```

**Impact**: Violates component organization standards, makes codebase harder to navigate

---

## Step 3: Feature Structure Violations

### ❌ CRITICAL: About Feature Missing Sections Directory

**Feature**: `features/about/`
**Current Structure**:
```
features/about/
├── page.tsx          # ✅ Present
└── seo.ts            # ✅ Present
```

**Expected Structure**:
```
features/about/
├── page.tsx
├── seo.ts
└── sections/         # ❌ MISSING
    ├── hero/
    │   ├── index.tsx
    │   └── data.ts
    ├── mission/
    │   ├── index.tsx
    │   └── data.ts
    └── [other sections]/
```

**Issue**: All content is embedded directly in `page.tsx` (238 lines) instead of being separated into sections. This violates the sections-first architecture.

**Content Analysis of `features/about/page.tsx`**:
- Hardcoded content literals throughout (violates single source of truth)
- No data separation
- Monolithic component structure
- Imports shared components like `CTASection` (correct pattern)

---

## Step 4: Configuration Files Missing

### ❌ CRITICAL: Required Config Files Not Found

**Location**: `lib/config/`
**Currently Present**: Only `email.config.ts`

**Missing Files**:
1. **`site.config.ts`** - Company name, URL, contact info, social links
2. **`nav.config.ts`** - Navigation configuration
3. **`seo.config.ts`** - Default metadata, title templates

**Impact**: Business information is scattered across multiple data files instead of centralized:
- Company info in: `data/company/info.ts`
- Navigation in: `data/config/navigation.ts`
- No SEO defaults

**Current Workaround**: Using `data/` directory structure which should migrate to `lib/config/`

---

## Step 5: Data & Logic Separation Issues

### ❌ CRITICAL: Data Directory Structure

**Current State**:
```
data/
├── company/          # Should be: lib/config/site.config.ts
│   ├── info.ts
│   └── advantages.ts
├── categories/       # OK: Feature-specific data
├── products/         # OK: Feature-specific data
├── config/           # Should be: lib/config/
│   ├── navigation.ts
│   └── filter-media.ts
├── contact/          # Should be: features/contact/sections/*/data.ts
└── applications/     # Should be: lib/constants/
```

**Issues**:
1. Top-level `data/` directory violates architecture (should be in `lib/config/` or feature `sections/`)
2. Company info should be in `lib/config/site.config.ts`
3. Navigation should be in `lib/config/nav.config.ts`
4. Contact data should be colocated in `features/contact/sections/*/data.ts`

### ❌ Content Literals in Components

**Example from `features/about/page.tsx`**:
```tsx
// ❌ WRONG: Hardcoded content
<h2 className="text-3xl font-bold mb-4">Our Approach</h2>
<p className="text-lg text-muted-foreground mb-4">
  Local responsiveness: quick quotes, cross-references, and application help.
</p>
```

**Should be**:
```tsx
// ✅ CORRECT: Data-driven
import { aboutData } from './sections/approach/data'

<h2>{aboutData.title}</h2>
<p>{aboutData.description}</p>
```

---

## Step 6: Import Pattern Issues

### ⚠️  Minor: Import Ordering Inconsistencies

**Found in**: Multiple files including `components/MainNav.tsx`, `features/about/page.tsx`

**Example from `features/about/page.tsx`**:
```tsx
// Current (not grouped properly)
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { Award, Users, Building, Globe, Shield, Zap, CheckCircle, Target, Settings } from "lucide-react";
import { getCompanyAdvantages } from "@/lib/data";
```

**Should be** (with blank line separation):
```tsx
// React imports
import Image from "next/image"
import Link from "next/link"

// External packages
import { Award, Users, Building, Globe, Shield, Zap, CheckCircle, Target, Settings } from "lucide-react"

// Internal modules (ui components first, then others)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/PageContainer"
import { PageHeader } from "@/components/PageHeader"
import { CTASection } from "@/components/CTASection"
import { getCompanyAdvantages } from "@/lib/data"
```

**Status**: Low priority, cosmetic issue

---

## Step 7: Cross-Feature Dependencies

### ✅ GOOD: No Cross-Feature Imports Detected

**Analysis**: Grep search for cross-feature imports returned no results. Features are properly isolated.

**Shared Code Pattern**: Correctly using `components/shared/` for reusable components like:
- `CTASection` - Used by multiple features
- `PageContainer` - Layout wrapper
- `PageHeader` - Header component

**Status**: Compliant with isolation rules

---

## Step 8: Root-Level Directories to Relocate

### ❌ CRITICAL: Misplaced Directories

**Issue 1: `/contexts/` at Root**
- **Current**: `contexts/breadcrumb-context.tsx`
- **Should be**: `lib/contexts/breadcrumb-context.tsx`
- **Reason**: Contexts are utilities, should be in `lib/`

**Issue 2: `/hooks/` at Root**
- **Current**:
  ```
  hooks/
  ├── use-dynamic-images.ts
  └── use-mobile.ts
  ```
- **Should be**: `lib/hooks/`
- **Reason**: Hooks are utilities, should be in `lib/`

**Issue 3: `/categories/` Markdown Files**
- **Current**: `categories/` with 8 markdown files
- **Purpose**: Unclear (possibly old documentation)
- **Action**: Review and potentially move to `dev/docs/` or remove

**Issue 4: `/emails/` Directory**
- **Current**:
  ```
  emails/
  ├── templates/
  └── styles/
  ```
- **Assessment**: Acceptable location for email templates (domain-specific)
- **Action**: No change needed

---

## Step 9: File Size Analysis

### ⚠️  Files Exceeding Limits

**Over 200 lines (Pages)**:
- `features/about/page.tsx` - **238 lines** ❌ (limit: 200)
  - **Issue**: Monolithic page, should extract sections

**Over 150 lines (Components)**:
- `components/MainNav.tsx` - **247 lines** ❌ (limit: 150)
  - **Issue**: Complex navigation, should split mobile/desktop

**Analysis Needed**:
- Need to check all section components in `features/*/sections/*/index.tsx`
- Need to check data files in `data/` directories

---

## Step 10: SEO & Metadata Analysis

### ✅ GOOD: Features Have SEO Files

**Compliant Features**:
- `features/about/seo.ts` ✅
- `features/home/seo.ts` ✅
- `features/contact/seo.ts` ✅
- `features/category/seo.ts` ✅
- `features/product-detail/seo.ts` ✅

**Missing**:
- `lib/config/seo.config.ts` - Default metadata configuration ❌

**Sample SEO File** (`features/about/seo.ts`):
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About GTFS | Canadian Industrial Filtration Brand',
  description: 'Learn about GTFS - Canada\'s trusted supplier of industrial filtration solutions...',
  openGraph: {
    title: 'About GTFS | Canadian Industrial Filtration Brand',
    description: 'Learn about GTFS...',
    type: 'website',
  },
}
```

**Status**: Partially compliant, needs default config

---

## Step 11: Architecture Compliance Checklist

### Overall Compliance Score: 60%

| Requirement | Status | Notes |
|------------|--------|-------|
| ✅ No forbidden folders in features/ | PASS | No `components/`, `utils/`, `hooks/`, `lib/` in features |
| ❌ All sections in sections/ folder | FAIL | `features/about/` missing sections directory |
| ✅ No cross-feature imports | PASS | Features properly isolated |
| ❌ Single source of truth for data | FAIL | Scattered config, hardcoded content |
| ⚠️  Naming conventions followed | PARTIAL | PascalCase good, organization needs work |
| ⚠️  Feature structure matches canonical | PARTIAL | Some features compliant, `about` is not |
| ⚠️  File sizes within limits | PARTIAL | 2 files exceed limits |
| ⚠️  Import patterns standardized | PARTIAL | Functional but not consistently ordered |
| ✅ No code duplication (initial check) | PASS | No obvious duplication detected |
| ⚠️  SEO properly configured | PARTIAL | Files present, missing default config |

---

## Critical Issues Summary

### Priority 1 (Blocking)
1. **Create Missing Config Files**
   - `lib/config/site.config.ts`
   - `lib/config/nav.config.ts`
   - `lib/config/seo.config.ts`

2. **Relocate Root-Level Directories**
   - Move `contexts/` → `lib/contexts/`
   - Move `hooks/` → `lib/hooks/`

3. **Migrate Data Directory**
   - Move `data/company/` → `lib/config/site.config.ts`
   - Move `data/config/navigation.ts` → `lib/config/nav.config.ts`
   - Move `data/config/filter-media.ts` → `lib/constants/filter-media.ts`

### Priority 2 (Important)
4. **Reorganize Components Directory**
   - Create `components/layouts/` subdirectory
   - Create `components/shared/` subdirectory
   - Move 13 components to appropriate locations
   - Fix `structured-data.tsx` → `StructuredData.tsx`

5. **Fix About Feature Structure**
   - Create `features/about/sections/` directory
   - Extract content into section components
   - Create data files for each section
   - Reduce `page.tsx` to orchestration only

6. **Split Oversized Files**
   - Split `components/MainNav.tsx` (247 lines)
   - Refactor `features/about/page.tsx` (238 lines)

### Priority 3 (Cleanup)
7. **Standardize Import Ordering**
   - Apply consistent import grouping across all files

8. **Review Categories Directory**
   - Determine purpose of `/categories/*.md` files
   - Move to `/dev/docs/` or remove

---

## Recommended Fix Sequence

### Phase 1: Configuration Setup (Steps 2-3)
1. Create `lib/config/site.config.ts` (consolidate company info)
2. Create `lib/config/nav.config.ts` (migrate navigation)
3. Create `lib/config/seo.config.ts` (defaults)
4. Update `lib/data.ts` to import from new configs

### Phase 2: Directory Reorganization (Steps 4-5)
5. Create `components/layouts/` and `components/shared/`
6. Move components to appropriate subdirectories
7. Move `contexts/` → `lib/contexts/`
8. Move `hooks/` → `lib/hooks/`
9. Update all import statements

### Phase 3: Feature Structure Fixes (Steps 6-7)
10. Create `features/about/sections/` structure
11. Extract sections from `features/about/page.tsx`
12. Create data files for each section
13. Verify all features follow canonical structure

### Phase 4: File Size & Quality (Steps 8-9)
14. Split `components/MainNav.tsx`
15. Optimize `features/about/page.tsx`
16. Standardize import ordering

### Phase 5: Verification (Steps 10-12)
17. Run full architecture checklist
18. Regenerate project tree
19. Validate compliance

---

## Files Requiring Modification (Estimated)

### New Files to Create: ~15
- `lib/config/site.config.ts`
- `lib/config/nav.config.ts`
- `lib/config/seo.config.ts`
- `components/layouts/` (5-6 components)
- `components/shared/` (6-7 components)
- `features/about/sections/` (4-6 sections with data files)

### Files to Move: ~15
- 13 components from `components/` root
- 1 context file
- 2 hook files

### Files to Update (imports): ~50+
- All files importing moved components
- All files importing moved hooks/contexts
- Features importing from old data structure

---

## Next Steps for Pass 1

1. **Begin with Priority 1 fixes** (Configuration setup)
2. **Implement Phase 1** (Create config files)
3. **Test compilation** after each phase
4. **Document changes** as we progress
5. **Prepare for Pass 2** (Import standardization, deeper analysis)

---

## Notes

- **globals.css**: Verified as compliant (uses @import, no manual edits)
- **components/ui/**: Protected, confirmed no modifications
- **Architecture compliance**: Good foundation, needs structural cleanup
- **No major breaking issues**: Application should remain functional during refactoring

---

**Report Status**: Complete
**Next Action**: Begin Priority 1 fixes (Configuration files creation)
