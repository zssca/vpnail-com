# Playbook · Add Page

**Use when:** Creating a new marketing page/route backed by a feature folder.

1) **Plan**
   - Confirm URL/slug and goal.
   - Define hero + 3–6 sections; capture copy in a doc.
2) **Clone template**
   - Duplicate the closest feature folder.
   - Rename directories/files to the new slug.
3) **Wire route**
   - Add `app/<slug>/page.tsx` that imports `<FeatureName>Page` from `features/marketing/<slug>/page`.
   - Add `'use cache'` at the top of the route component so it lands in the Full Route Cache; optionally add `cacheLife('hours')` if the page pulls slow-but-static data.
   - For dynamic segments, implement `generateStaticParams` sourced from the feature’s data helpers so every slug is pre-rendered.
4) **Fill sections**
   - Update `sections/*/data.ts` with new content and imagery.
   - Keep section components server-side and within size limits.
5) **SEO**
   - Edit `features/marketing/<slug>/seo.ts` with title, description, canonical, and OG.
   - Add JSON-LD (FAQ/Service/LocalBusiness) via shared helpers when relevant.
6) **Review**
   - Run lint and preview desktop/mobile.
   - Ensure any fetches inside cached routes use tags or `cacheLife` and that mutations call `revalidatePath`/`revalidateTag`.
   - Confirm `cacheComponents` is on and no `dynamic`/`revalidate` exports are present unless intentionally opting out.

If a special section emerges repeatedly, graduate it into `features/shared/` or `components/shared/` before duplicating.
