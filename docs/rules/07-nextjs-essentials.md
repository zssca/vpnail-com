# Next.js 16 Essentials · Daily Reference

Quick reference for the Next.js 16 patterns used in this template. For deep dives, use the `nextjs/` folder.

## Core Patterns

- Treat every route prop (`params`, `searchParams`, `id`, etc.) as async. Always `await` them in Server Components or `use()` them in Client Components.
- Prefer Server Components; mark files `'use client'` only when they use hooks or browser APIs.
- Turn on cache components (`cacheComponents: true` in `next.config.ts`) so Partial Pre-rendering keeps sections static while still supporting Suspense streaming.
- Use static export (`output: 'export'`) plus `dynamic = 'force-static'` and `revalidate = false` for marketing routes.

## Static Generation

- Generate all display pages at build time from `.ts` data files and config.
- Use `generateStaticParams` for dynamic routes that need pre-rendered paths.
- Avoid runtime `fetch()` for marketing content; move that data into `data.ts` files instead.
- Cache Components keeps the static tree frozen—wrap dynamic shells in `<Suspense>` so streaming can hydrate only what changes.

## Server Components vs Client Components

- **Server Components** – default for pages and sections; they read config and static data directly.
- **Client Components** – only when you need interactivity (forms, local state, browser APIs).
- Keep client islands small and wrap them around specific interactive pieces rather than whole pages.

## Common Pitfalls

- Forgetting to `await params` or `id` in route handlers and metadata helpers.
- Ignoring the new image defaults (16px size and multiple `quality` values are no longer implicit—declare them when you truly need them).
- Introducing API routes for data that could be rendered at build time.
- Sprinkling `'use client'` across large files instead of isolating interactive components.
- Leaving `middleware.ts`/`skipMiddlewareUrlNormalize` references anywhere—Next.js 16 expects `proxy.ts` + `skipProxyUrlNormalize`.
- Relying on `serverRuntimeConfig`/`publicRuntimeConfig` (removed). Read from `process.env` directly and use `connection()` when you must pull runtime secrets during render.

## Proxy & Routing

- Rename `middleware.ts` → `proxy.ts` and export a `proxy` function. The runtime is Node.js only.
- Replace any config that used `skipMiddlewareUrlNormalize` with `skipProxyUrlNormalize`.
- Confirm packages/commands no longer pass `--turbopack`; Turbopack is stable and configured directly in `next.config.ts`.

## Images & Assets

- Default `imageSizes` omitted the `16` breakpoint—add `images.imageSizes: [16, 32, ...]` if a section truly renders 16px variants.
- `images.qualities` now defaults to `[75]`. Declare `[50, 75, 100]` (or fewer) when compression requirements differ.
- `images.maximumRedirects` defaults to `3` and local IP optimization is blocked unless you set `dangerouslyAllowLocalIP: true` (only for private networks).
- `images.minimumCacheTTL` jumped to four hours. Override only when verified business needs require faster churn.
- Use `images.remotePatterns` instead of the deprecated `images.domains`.

## Env & Runtime Config

- `serverRuntimeConfig`/`publicRuntimeConfig` were removed. Access env vars directly via `process.env` and prefix client-safe values with `NEXT_PUBLIC_`.
- For secrets that must be read at runtime rather than build time, call `await connection()` before accessing them in a Server Component or action.
- Import cache helpers from `next/cache` without the old `unstable_` prefix (`cacheTag`, `cacheLife`, `refresh`, `updateTag`, `revalidateTag`).

## Deep Dive References

- Full core updates: [nextjs/01-core-updates.md](./nextjs/01-core-updates.md)
- Breaking changes: [nextjs/02-breaking-changes.md](./nextjs/02-breaking-changes.md)
- Rendering patterns: [nextjs/03-rendering-patterns.md](./nextjs/03-rendering-patterns.md)
- Data & caching: [nextjs/04-data-and-caching.md](./nextjs/04-data-and-caching.md)
- Migration checklist: [nextjs/05-migration-checklist.md](./nextjs/05-migration-checklist.md)
