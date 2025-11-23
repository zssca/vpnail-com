# Playbook · Localization

**Use when:** Preparing content for multiple locales or language variants.

1. **Assess scope** – Determine which features require localization and whether routing changes (`/[locale]/`) are needed.
2. **Data strategy** – Move copy into locale-specific data modules (`data.en.ts`, `data.fr.ts`) or keyed objects.
   - Export helper arrays that merge locales with slugs so `generateStaticParams` can pre-render `[locale]/[slug]` combinations (Next.js `generateStaticParams` docs, v15.1.8).
3. **Config** – Add locale metadata to `site.config.ts` (default locale, supported codes).
4. **Routing** – If using Next.js i18n routing, update `next.config.js` locales array and ensure `app/[locale]/` segments mirror base routes.
   - Keep the config under the documented caps (≤100 locales/domains) and set `defaultLocale` explicitly so paths like `/fr/...` behave predictably (Next.js i18n routing docs, v15.1.8).
   - Disable `localeDetection` when middleware controls the prefix (Next.js i18n routing docs, v15.1.8).
5. **Translation** – Provide translators with JSON/TS exports instead of JSX.
6. **QA** – Validate layout with long strings, ensure forms/validation messages switch languages, and run accessibility checks for each locale.

Because content lives in data files, this flow ports well across similar repos.
