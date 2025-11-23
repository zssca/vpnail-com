# Playbook · Add Page

**Use when:** Creating a new marketing page/route backed by a feature folder.

1. **Plan**
   - Confirm URL + slug.
   - Define hero + sections (3–6). Capture copy in a doc.
2. **Clone template**
   - Duplicate an existing feature folder closest in complexity.
   - Rename directories/files to the new slug.
3. **Wire route**
   - Add `app/<slug>/page.tsx` that imports `<FeatureName>Page` from `features/marketing/<slug>/page`.
   - Export an `async` route component that renders the feature and call `'use cache'` as its first statement so the route lands in the Full Route Cache; skip `dynamic`/`revalidate` exports because they’re incompatible with `cacheComponents: true` in Next.js 16.
   - If the page sits under a dynamic segment, implement `generateStaticParams` fed by the feature’s data helpers so the build emits every slug (Next.js `generateStaticParams` docs, v15.1.8).
4. **Fill sections**
   - Update each `sections/*/data.ts` with new content.
   - Adjust section components if layout differs (stay within size limits).
5. **SEO**
   - Edit `features/marketing/<slug>/seo.ts` with title, description, canonical, OG.
   - Add JSON-LD snippets (FAQ, Service, LocalBusiness) via shared helpers whenever the page contains structured content.
6. **Review**
   - Run checklist, test locally, capture screenshots.
   - Verify `fetch` calls in the feature explicitly opt into `force-cache` if they hydrate build-time data, since Next.js 15 defaults to `no-store` (Next.js caching docs, v15.1.8).
   - Confirm `cacheComponents` remains enabled globally so new sections benefit from Partial Pre-Rendering; flag any route that must opt out (Next.js 16 release notes).

If a special section emerges repeatedly, graduate it into `features/shared/` or `components/shared/` before duplicating.
