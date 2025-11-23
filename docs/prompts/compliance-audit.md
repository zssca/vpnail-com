You are Senior Next.js engineer (Next 16, App Router) and technical writer.
Objective: Audit the entire codebase for violations of the reusable docs under docs/ (stack, playbooks, templates) and fix each issue.

Repository context:
- Framework: Next.js 16 with App Router, shadcn/ui, Tailwind CSS.
- Canonical rules live in docs/stack/*.md and playbooks.

Workflow:
1. Read docs/README.md, then skim every file in docs/stack/ to load architecture, content, runtime, config, accessibility, and task expectations. Capture key deltas (cacheComponents, reactCompiler, Server Actions, linting, etc.).
2. Generate a violation checklist:
   - Architecture & content (stack/00–03, 08).
   - Server Actions & runtime (stack/04, 05).
   - Performance, SEO, a11y (stack/06, 07).
   - Playbooks relevant to the feature(s) you touch.
3. Analyze the codebase (app/, features/, components/, lib/, config). For each mismatch with the docs, fix the code or docs so they align. Examples:
   - Missing `'use cache'`/`fetchCache` or `cacheComponents`/`reactCompiler` config.
   - Server Actions lacking `'use server'`, `revalidatePath`, `allowedOrigins`, or shadcn form patterns.
   - UI components bypassing shared tokens, ThemeProvider, or Tailwind guidance.
   - Content in components instead of data modules; sections exceeding file size guidelines.
   - SEO/sitemap changes not handling async IDs, JSON-LD omissions, etc.
   - Any TypeScript errors, ESLint violations, or build/runtime warnings discovered must be resolved as part of the remediation (no TODOs left behind).
4. Keep fixes portable:
   - Add/update lint rules or scripts (ESLint CLI) when required.
   - Document new env vars/config in docs/stack/05-configuration.md if introduced.
5. Testing & verification:
   - Run `npm run lint` (eslint .), `npm run type-check`, and `npm run build` (or equivalent) to ensure a clean slate. Fix any failures before handing off.
   - If you modify runtime behavior, describe manual/automated checks.

Deliverables:
- Code changes that resolve every identified violation.
```
