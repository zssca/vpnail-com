# Client Website Template · Rules Index

This folder is your control tower for the reusable small-business template. Use it as a reference, not a novel—jump directly to the doc that answers your question, then go back to shipping.

---

## Documentation Map

| Step | File | Why read it |
|------|------|-------------|
| 1 | [01-start-here.md](./01-start-here.md) | 5‑minute orientation, non‑negotiable rules, and the first checks you should run |
| 2 | [02-project-type.md](./02-project-type.md) | Understanding the SSG + minimal server architecture |
| 3 | [03-architecture.md](./03-architecture.md) | Deep dive on structure, config pipeline, and the "sections" mental model |
| 4 | [04-file-organization.md](./04-file-organization.md) | File and folder contracts (critical before creating anything) |
| 5 | [05-golden-rules.md](./05-golden-rules.md) | Non‑negotiable rules to memorize |
| 6 | [06-anti-patterns.md](./06-anti-patterns.md) | Red flags and architecture violations to check before opening a PR |
| 7 | [07-nextjs-essentials.md](./07-nextjs-essentials.md) | Daily Next.js 16 reference with deep-dive links |
| 8 | [08-task-guide.md](./08-task-guide.md) | Routing table that points to task playbooks inside `tasks/` |

### Sub-folders

- `nextjs/` → feature-specific breakdowns (core updates, breaking changes, rendering, caching, migration checklist)
- `tasks/` → workflow-based task playbooks grouped into setup, development, optimization, and deployment

---

## Quick Start Checklist

1. Read CLAUDE.md (house rules) and `01-start-here.md` before touching the repo.
2. Confirm the template structure matches `03-architecture.md`—if it doesn't, stop and investigate.
3. When working inside the App Router, keep `nextjs/` docs open to avoid regressing to Next.js 15 patterns.
4. Any new file? Verify its name and location against `04-file-organization.md` before saving.
5. Jump into the relevant workflow guide under `tasks/` for implementation steps and verification checklists.
6. Run the QA checklist from `tasks/deployment/01-pre-deploy-qa.md` plus the guardrails in `06-anti-patterns.md` before handing work off.

---

## Where to Look

| Need | Source |
|------|--------|
| "What is the project type and rendering model?" | `02-project-type.md` |
| "How does config data reach a section?" | `03-architecture.md` |
| "What changed in Next.js 16?" | `nextjs/01-core-updates.md` |
| "How do I rename middleware?" | `nextjs/02-breaking-changes.md` |
| "Which rendering strategy do I use?" | `nextjs/03-rendering-patterns.md` |
| "How do I structure fetch + cache?" | `nextjs/04-data-and-caching.md` |
| "Is my migration complete?" | `nextjs/05-migration-checklist.md` |
| "Add a new marketing page?" | `tasks/development/01-add-page.md` |
| "Drop a section into an existing page?" | `tasks/development/02-add-section.md` |
| "Update copy/images?" | `tasks/development/03-update-content.md` |
| "Ship a contact form with Server Actions?" | `tasks/development/04-contact-form.md` |
| "Configure email + environment values?" | `tasks/setup/02-email-config.md` |
| "Deploy and smoke test?" | `tasks/deployment/02-deploy.md` + `tasks/deployment/01-pre-deploy-qa.md` |

---

## Golden Rules (memorize these)

- The architecture is **fixed**. Only `lib/config/site.config.ts` and assets under `public/` change per client.
- Every marketing page lives under `features/marketing/[page]/` and exposes `page.tsx`, `seo.ts`, and `index.ts`.
- Sections are self-contained: `index.tsx` + `data.ts` (+ `types.ts` if needed) inside `sections/[name]/`.
- Never hardcode business data. Read from config, or from data files that already read from config.
- Use Server Components by default; add `'use client'` only when React hooks or browser APIs are required.
- Server data stays in Server Components or Server Actions—no API routes for display data.
- Folders and files stay lowercase kebab-case; exports stay named and predictable.

Keep this README handy as the high-level map. Dive into the linked files for the details you need in the moment.
