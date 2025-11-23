# 06 · Performance & SEO

Static-first delivery means most optimizations happen before deployment.

## Performance

- Prefer build-time data and avoid `fetch` in components.
- Use `<Image>` with `priority` only on above-the-fold hero assets.
- Lazy-load heavy sections via dynamic imports if they contain carousels/video.
- Keep CLS low by reserving heights for images and async components.
- Wrap repeated queries in `React.cache`, `'use cache'`, or `unstable_cache` so shared computations execute once per build rather than per import (Next.js caching docs, Next.js 16 upgrade guide).
- When you must fetch at runtime, opt into caching explicitly (`cache: 'force-cache'` or tagged revalidation) because modern Next.js treats naked `fetch` calls as `no-store`. If a project opts out of `cacheComponents`, fall back to exporting `fetchCache = 'default-cache'` from the root layout to restore the Full Route Cache (Next.js upgrade notes).
- Enable `cacheComponents: true` to turn on Partial Pre-Rendering so static shells stay cached while dynamic segments stream in (Next.js 16 release notes).
- Turn on the React Compiler (`reactCompiler: true`) once components are strict-mode compliant; it auto-memoizes render output and reduces unnecessary rerenders (Next.js 16 release notes).
- If you rely on 16px thumbnails, add `images: { imageSizes: [16, ...] }` back into `next.config` because Next.js 16 removed that default to reduce `srcset` bloat (Next.js 16 upgrade guide).
- Local `<Image>` sources that include query strings now require `images.localPatterns.search` entries (e.g., `/assets/**?v=1`) otherwise Next.js blocks them to avoid enumeration attacks (Next.js 16 upgrade guide).
- Revisit the new `next/image` defaults: `minimumCacheTTL` now defaults to 4 hours, `images.qualities` only allows `[75]`, local IP optimization is blocked unless `images.dangerouslyAllowLocalIP` is true, and `images.maximumRedirects` defaults to 3—override these when upstream requirements differ (Next.js 16 upgrade guide).
- Replace legacy `images.domains` allow-lists with `images.remotePatterns` for better control over protocol + host matches (Next.js 16 upgrade guide).

## Revalidation & Caching

- Let `cacheComponents` + `'use cache'` pin each route to the Full Route Cache; do **not** export `dynamic`/`revalidate` flags because Next.js 16 disallows them once cache components are on (Next.js 16 release notes).
- Use on-demand revalidation only if content updates frequently; document the trigger endpoint when added.
- Add `'use cache'` to layout/page files so the entire route participates in the Full Route Cache rather than only leaf segments (Next.js `use cache` docs, Next.js 16 upgrade guide).
- After a mutation, prefer `revalidatePath`/`revalidateTag` inside the Server Action so both the Data Cache and the client Router Cache refresh immediately; use `updateTag` when you need read-your-writes semantics and call `refresh()` to force the router to re-render after stateful actions (Next.js caching docs, Next.js 16 upgrade guide).
- `cacheLife` and `cacheTag` are now stable helpers—drop any `unstable_` aliases when importing from `next/cache` (Next.js 16 upgrade guide).
- For large statically generated sites, tune `experimental.staticGenerationRetryCount`, `staticGenerationMaxConcurrency`, and `staticGenerationMinPagesPerWorker` in config to keep CI builds deterministic (Next.js static generation config docs, Next.js 16 upgrade guide).

## SEO

- Each feature exports `generateMetadata` via `seo.ts`.
- Include title, description, canonical, and Open Graph fields.
- When pages list collections (services, areas), add structured data via `JSON-LD` helpers in `lib/utils/seo.ts`.
- When generating sitemaps in Next.js 16, remember `sitemap({ id })` receives a `Promise<number>`—`const resolvedId = await id` before using it (Next.js 16 upgrade guide).
- Metadata image routes (`opengraph-image`, `twitter-image`, `icon`, `apple-icon`) also pass `params` and `id` as promises; `await` them inside the default export before using values like `slug` (Next.js 16 upgrade guide).

## Content Quality

- Use H1 once per page (usually hero title).
- Maintain logical heading hierarchy (H2 for sections, H3 for sub-points).
- Provide FAQ schema when the page contains QA content.

Reuse this doc unchanged; only adjust if your hosting or SEO toolkit changes drastically.
