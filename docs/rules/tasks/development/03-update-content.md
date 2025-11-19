# Playbook · Update Content & Assets

Follow this when a client needs refreshed copy, contact details, or imagery.

## 1. Update the Master Config

- Edit `lib/config/site.config.ts` only—never scatter literals elsewhere.
- Keep sections like `business`, `pages`, `navigation`, `analytics` synchronized.
- Use `as const` where appropriate so types stay accurate.

## 2. Refresh Derived Configs

- Mirror any new values into `site.config.ts`, `nav.config.ts`, or `email.config.ts` **only** if those files read from the updated fields. Do not duplicate data.

## 3. Adjust Section Data

- Visit each affected `features/marketing/[page]/sections/*/data.ts` file and ensure it reads the new config fields.
- If new content adds arrays (services, FAQs), add them inside `data.ts` so components stay dumb.

## 4. Replace Assets

- Drop new files into `public/` (kebab-case names) and update references in config or section data.
- Run `npm run lint` to confirm the static analyzer sees the new files (catches typos in import paths).

## 5. Regression Checks

- [ ] Search the repo for old client names/phone numbers via `rg "Old Name"` to ensure no hardcoded leftovers.
- [ ] Run `npm run type-check` to catch stale config references.
- [ ] Load each affected page locally and verify copy/images.
- [ ] Confirm metadata (`seo.ts`) uses the updated values.

Once all checkboxes are green, proceed to QA (`tasks/qa.md`).
