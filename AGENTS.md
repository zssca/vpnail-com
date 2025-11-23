# AI Delivery Playbook – Static Marketing Pattern

> **Mandatory:** All AI collaborators must treat this document as the baseline contract. If a task request appears to conflict with these rules, pause and consult `/docs/rules/` (sections 01–08) plus the relevant task playbook before continuing. Always document which rule you followed when escalating decisions.

## Documentation Protocol
- **Primary reference:** `/docs/rules/`
- **Task playbooks:** `/docs/rules/tasks/{setup,development,optimization,deployment}/`
- **Escalation:** When requirements are ambiguous or structural changes are requested, cite the applicable rule from `/docs/rules/` before proceeding.

---

## Platform Model
- **Rendering contract:** Static Site Generation. Every page exports `dynamic = 'force-static'` and `revalidate = false`.
- **Runtime contract:** Server Actions exist solely to process forms/email and live under `features/[feature]/actions/*.action.ts` with `'use server'` scoped to the action file.
- **Outcomes:** 10–30 ms loads, strong SEO, low hosting overhead, minimized attack surface.

```typescript
// Page-level requirement
export const dynamic = 'force-static'
export const revalidate = false

// Server Actions (forms only)
'use server' // inside features/[feature]/actions/*.action.ts
```

---

## Architecture Blueprint (Immutable Pattern)
```
project-root/
├── lib/
│   ├── config/
│   │   ├── site.config.ts         ← Canonical business + branding data
│   │   ├── nav.config.ts
│   │   ├── seo.config.ts
│   │   └── email.config.ts
│   ├── constants/
│   ├── types/
│   ├── utils/
│   └── validations/
│
├── components/
│   ├── ui/                        ← shadcn/ui primitives
│   ├── layouts/
│   └── shared/                    ← Reusable business components
│
├── features/
│   ├── 
       └── [page]/
│   │       ├── page.tsx
│   │       ├── seo.ts
│   │       ├── index.ts
│   │       ├── sections/
│   │       │   └── [section]/
│   │       │       ├── index.tsx
│   │       │       ├── data.ts
│   │       │       └── types.ts (optional)
│   │       ├── actions/           ← Forms/email only
│   │       ├── schemas/           ← Zod validation for forms
│   │       └── data/              ← Only for complex service/article modules
│   │
│   │       ⚠ Allowed folders: sections/, actions/, schemas/, data/
│   │       ⚠ Forbidden folders: components/, utils/, hooks/, lib/, helpers/
│
│   └── shared/                    ← Sections reusable across features
│
├── emails/
│   ├── templates/
│   └── styles/
│
├── app/
│   ├── page.tsx                   ← Imports feature pages only
│   └── ...
│
└── public/
    └── images/
```

For any deviation from this tree, acquire written approval referencing the appropriate rule in `/docs/rules/`.

---

## Golden Controls
1. **Single source of business truth:** `lib/config/site.config.ts`. Never hardcode names, addresses, URLs, or branding elsewhere.
2. **Page content lives in section `data.ts` files.** Marketing copy, lists, testimonials, pricing, FAQs, etc.
3. **Static-first discipline:** No runtime `fetch` for display data. Server Actions exist only for forms/email.
4. **Immutable core directories:** Do not restructure `lib/` or `components/`. Extend functionality through sections or shared components only.
5. **Managed assets remain untouched:** Never edit `app/globals.css` or any file under `components/ui/` unless a rule explicitly directs it.
6. **Feature-per-page contract:** Each `features/[page]/page.tsx` composes sections only; no extra logic.
7. **Sections stay inside `sections/`.** React components, hooks, and helpers are forbidden at the feature root.
8. **SEO stays at the feature root (`seo.ts`).** Do not embed metadata inside sections.
9. **Sections are self-contained modules.** They may not import other sections’ data or components.
10. **App routes pass through features.** All composition happens inside `features/*`.

### Size Caps
- Section components ≤150 lines.
- Feature pages ≤200 lines.
- Individual data files ≤500 lines (split when approaching the limit).

Always cite `/docs/rules/01-architecture.md` when enforcing these controls during reviews.

---

## Compliance Patterns
```
✅ features/[page]/page.tsx
✅ features/[page]/sections/[section]/index.tsx
✅ features/[page]/sections/[section]/data.ts
✅ features/[page]/seo.ts

❌ features/[page]-page.tsx
❌ features/[page]/[section]/index.tsx (missing sections/)
❌ features/[page]/data/[section].data.ts (wrong naming)
❌ features/[page]/sections/[section]/seo.ts (SEO misplaced)
```

### Import Policy
```typescript
// Permitted
import { sectionData } from './data'
import { Section } from './sections/section'
import { siteConfig } from '@/lib/config/site.config'
import { SharedSection } from '@/features/shared/example'

// Rejected
import { sectionData } from '../other-section/data'
import { heroData } from '@/features/other-page/sections/hero/data'
const sectionData = { title: 'Hardcoded' }
```

When policing imports, reference `/docs/rules/03-imports.md` (or equivalent) so decisions are transparent.

---

## Operational Playbooks (Always cite when acting)
- **Update business profile:** Modify `lib/config/site.config.ts`. Reference `/docs/rules/tasks/development/update-business-info.md` if available.
- **Update page content:** Edit `features/[page]/sections/[section]/data.ts`. Cite the relevant content-update playbook.
- **Add feature/page:** Follow `/docs/rules/tasks/development/add-new-page.md` step-by-step.
- **Add section:** Use `/docs/rules/tasks/development/add-new-section.md`.
- **Add complex content modules (services/articles):** Consult `/docs/rules/tasks/development/update-content.md` before modifying `data/` directories.

AI agents must document which playbook was used in task notes or pull-request descriptions.

---

## Anti-Patterns (Stop + Escalate)
- `'use server'` declared outside `features/[page]/actions/`.
- `app/api/` routes or any ad-hoc API surfaces.
- Runtime data fetching for static content.
- Introducing databases, ORMs, or persistent backends.
- Changing `revalidate` to a non-`false` value.
- Hardcoding business data anywhere.
- Cross-section imports or cross-feature imports (except from `features/shared/`).
- Creating feature-level `components/`, `hooks/`, `utils/`, or `lib/` directories.
- Placing sections outside `sections/` or nesting SEO files within sections.
- Violating naming conventions established in `/docs/rules/`.

When any anti-pattern is detected, halt work and reference the exact rule in `/docs/rules/` within your escalation message.

---

## Quick Reference Table
| Artifact | Location | Purpose |
|---------|----------|---------|
| Config | `lib/config/site.config.ts` | Business + branding source of truth |
| Page | `features/[page]/page.tsx` | Composes sections |
| SEO | `features/[page]/seo.ts` | Metadata per feature |
| Section | `features/[page]/sections/[section]/` | `index.tsx`, `data.ts`, `types.ts` |
| Action | `features/[page]/actions/*.action.ts` | Forms/email workflows |
| Email | `emails/templates/[name].tsx` | Transactional templates |

**Data Flow Template:** `site.config.ts → sections/[section]/data.ts → sections/[section]/index.tsx → features/[page]/page.tsx → app route`. When diagramming flows, always link to `/docs/rules/02-data-flow.md` (or nearest equivalent) for confirmation.

---

## Core Principle
> **Structure is fixed; content resides in configuration and section data modules.**
- Business update? Modify `site.config.ts`.
- Content change? Update the corresponding `data.ts`.
- New experience? Duplicate the existing feature/section pattern exactly, guided by the playbooks.
- Bug fix? Preserve architecture boundaries unless `/docs/rules/` authorizes a structural change.
- Need UI? Reuse `components/` or `features/shared/` before introducing new primitives.

Document any deviations along with the rule ID that justifies them.

---

## Engagement Context Template (Only editable section)
Populate these bullets at project kickoff so every AI agent has context without renaming this file:
- **Client / Brand overview:** _Add a concise summary referencing `/docs/rules/` section if applicable._
- **Primary offerings:** _List core products/services._
- **Target audience:** _Describe the personas served._
- **Differentiators:** _Document what sets the brand apart._
- **Required pages/sections:** _Link to the backlog or specification; avoid naming inside the architecture diagram._
- **Tech stack extensions:** _Note integrations beyond the baseline stack._

All other sections stay constant across projects; only update this template with explicit approval and cross-reference the supporting documentation.
