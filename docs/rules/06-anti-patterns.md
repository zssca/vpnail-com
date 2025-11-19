# Anti-Patterns · Red Flags to Block

Review this file before opening a PR or merging someone else’s. If you spot any of these, stop and fix them immediately.

---

## 1. Architecture Violations

| Anti-pattern | Why it hurts | Fix |
|--------------|--------------|-----|
| Hardcoded business data inside components | Makes the template unusable for the next client | Read from `site.config.ts` or section `data.ts` |
| Features outside `features/marketing/` | Breaks documentation and tooling | Move the folder under `features/marketing/` |
| Custom file names (e.g., `home-page.tsx`, `hero.tsx`) | Downstream docs/tasks rely on canonical names | Rename to `page.tsx`, `index.tsx`, `data.ts`, etc. |
| Cross-section imports (hero → testimonials) | Introduces hidden coupling | Duplicate the data or promote shared logic into `lib/` |
| Sections holding shared state or context | Sections should be dumb renderers | Move shared providers into `components/providers/` |

---

## 2. Data & Config Smells

- Data stored at the feature root (`features/marketing/home/home.data.ts`). Keep it inside `sections/*/data.ts`.
- Multiple sources of truth for contact info. `site.config.ts` owns it; everything else reads from there.
- API routes used for display data. Fetch inside Server Components instead.
- Missing validation in Server Actions. Always parse `FormData` through Zod before sending emails.
- Logging secrets to the client console. Debug on the server side only.

---

## 3. Next.js 16 Gotchas

- Accessing `params.slug` synchronously instead of `const { slug } = await params`.
- Keeping `middleware.ts` instead of `proxy.ts`.
- Forgetting to add `cacheLife` to `revalidateTag()` calls.
- Using `'use client'` in files that never touch hooks or the DOM.
- Leaving `next lint` scripts in `package.json` (use ESLint directly).
- Disabling `cacheComponents` or leaving `experimental.dynamicIO` flags around.
- Importing `serverRuntimeConfig`/`publicRuntimeConfig` or reading env vars without `connection()` when runtime freshness matters.
- Depending on `images.domains`, missing the 16px size, or relying on `next/legacy/image`.

---

## 4. Rendering Missteps

- Blocking entire pages on slow data without Suspense fallbacks.
- Creating gigantic sections (>150 LOC) instead of splitting into smaller blocks.
- Bypassing Server Components by moving logic into Client Components “for convenience.”
- Ignoring streaming/partial rendering opportunities on data-heavy pages.

---

## 5. SEO / Analytics Issues

- Missing `seo.ts` file for any marketing page.
- Metadata not referencing config-driven titles/descriptions.
- Analytics scripts running even when `site.config.analytics.enableAnalytics` is false.
- Structured data files hardcoding business names.

---

## Review Checklist

- [ ] `rg "Old Client"` and `rg "TODO"` return nothing meaningful.
- [ ] `npm run lint`, `npm run type-check`, and `npm run build` pass.
- [ ] No file violates naming/location rules from `03-file-organization.md`.
- [ ] All new Server Actions live under `actions/` and validate input.
- [ ] UI diffs match approved mocks and maintain accessibility (labels, focus states, contrast).

If you see any of these anti-patterns, fix them before code review or call them out explicitly.
