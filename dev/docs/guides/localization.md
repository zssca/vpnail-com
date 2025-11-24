# Playbook · Localization

**Use when:** Preparing content for multiple locales or language variants.

1) **Assess scope** — Determine which features need localization and whether route prefixes (`/[locale]/`) are required.
2) **Data strategy** — Move copy into locale modules (`data.en.ts`, `data.fr.ts`) or keyed objects.
   - Export helpers that merge locales with slugs so `generateStaticParams` can pre-render `[locale]/[slug]`.
3) **Config** — Add locale metadata to `site.config.ts` (default locale, supported codes).
4) **Routing** — If using Next.js i18n routing, update `next.config.ts` locales and mirror base routes under `app/[locale]/`.
   - Set `defaultLocale` explicitly; disable `localeDetection` when middleware handles prefixes.
5) **Translation** — Hand off JSON/TS exports (never JSX) to translators.
6) **QA** — Check long-string layouts, form validation messages per locale, a11y for each language, and cached routes after any locale data change.

Because content lives in data files, this flow ports well across similar repos.
