# Golden Rules · Non-Negotiable Patterns

These rules are absolute. Breaking them causes architecture violations or makes the template hard to reuse for future clients.

## Configuration Rules

1. Keep all business and branding data in `lib/config/site.config.ts`.
2. Never hardcode client names, phone numbers, emails, or addresses in components.
3. Mirror derived config (nav, email, SEO) from `site.config.ts` instead of duplicating literals.
4. Store analytics IDs and flags in config and env vars, not sprinkled throughout components.

## File Organization Rules

5. Each marketing page lives in `features/marketing/[page]/` with `page.tsx`, `seo.ts`, and `index.ts`.
6. All sections live under `features/marketing/[page]/sections/[section]/`.
7. Sections are self-contained: `index.tsx` + `data.ts` (+ `types.ts` if needed).
8. SEO files always live at the feature root (`seo.ts`), never inside sections.

## Import Rules

- Import config via `@/lib/config/site.config` (or other config files that read from it).
- Pages import sections via relative paths like `./sections/hero`.
- Sections never import from other sections; share only via `lib/` helpers or duplicated data.
- App routes import features via aliases (e.g., `@/features/marketing/home`).

## Size and Complexity Limits

- Keep section components around 150 lines or less.
- Keep page components around 200 lines or less.
- Prefer splitting helpers into small, local utilities over growing a giant file.

## Quick Reference Checklist

- [ ] No hardcoded business or contact data outside `lib/config/`.
- [ ] Every marketing page and section follows the standard folder layout.
- [ ] No cross-section or cross-feature imports for page-specific data.
- [ ] Server Actions exist only under `features/marketing/[page]/actions/`.
- [ ] New code paths stay static-first and use Server Components by default.

