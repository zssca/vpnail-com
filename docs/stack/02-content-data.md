# 02 · Content & Data Rules

All marketing copy, structured data, and media references originate from TypeScript modules loaded at build time.

## Data Modules

- Location: `features/[...]/sections/[section]/data.ts`
- Shape: Export typed objects that the section UI imports using relative paths.
- No cross-importing between sections—duplicate data intentionally or move shared structures into `features/shared/`.
- Dynamic collections should also export lightweight selectors (e.g., `export const serviceParams = services.map(...)`) so `generateStaticParams` can statically pull slugs without re-reading files during runtime builds (Next.js `generateStaticParams` docs, v15.1.8).

## Copy Standards

- Voice: Conversational, confident, faith-informed care language (adjust tone per brand).
- Sentences: Prefer short paragraphs (2–3 sentences) for readability.
- Avoid hardcoding phone numbers, addresses, or pricing; pull from `site.config.ts` or constants.

## Media Rules

- Store images under `public/images/content/<feature>/<slug>/`.
- Reference with absolute paths (e.g., `/images/content/services/hair/hero.jpg`).
- Provide `alt` text for every image string.

## Data Hygiene Checklist

1. ✅ Strong types imported from `@/lib/types/*`.
2. ✅ Exported constant name matches file purpose.
3. ✅ No JSX in data files.
4. ✅ All strings double-checked for brand alignment.
5. ✅ Arrays ordered intentionally (services, FAQs, testimonials).

Apply this file unchanged to any project that relies on build-time content modules.
