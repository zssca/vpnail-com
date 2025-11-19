# Next.js 16 Breaking Changes

Use this list when migrating code or reviewing PRs. Every item here is mandatory.

## 1. Async Route Props Everywhere

- `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` now return Promises.
- In Server Components, destructure them with `await`.

```tsx
export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params
  const query = await searchParams
  return <div>{slug}</div>
}
```

- In Client Components, use React’s `use()` helper.

```tsx
'use client'
import { use } from 'react'

export default function Page(props: PageProps) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  return <div>{params.slug}</div>
}
```

- The same async contract applies to metadata utilities—`sitemap`, `robots`, `opengraph-image`, etc.—so `await params`/`await id` before using them.

## 2. `middleware.ts` → `proxy.ts`

- Rename the file and change the export from `middleware` to `proxy`.

```ts
// proxy.ts
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // logic
}
```

- Replace config flags like `skipMiddlewareUrlNormalize` with `skipProxyUrlNormalize` in `next.config.ts`.
- The `proxy` runtime is Node.js only; edge runtimes are no longer supported here.

## 3. Cache API Adjustments

- `revalidateTag()` now requires a cache-life profile: `revalidateTag('site', 'max')` or `revalidateTag('site', cacheLife('days'))`.
- Prefer `updateTag()` for “read your writes” updates.
- The `"use cache"` directive must wrap the component/function body.
- Import helpers from `next/cache` without the `unstable_` prefix (`cacheTag`, `cacheLife`, `refresh`, `updateTag`).
- `cacheComponents` replaced the experimental `dynamicIO` flag—strip any lingering `experimental.*` toggles and move to the stable option.

## 4. Image Loader & Config Defaults

- `images.minimumCacheTTL` default is now 4 hours. Override only if you truly need more frequent refreshes.
- `images.imageSizes` no longer includes `16`. Add it back explicitly if you render icons at that width.
- `images.qualities` now defaults to `[75]`. Set your own array (e.g., `[50, 75, 100]`) when marketing assets need multiple compression levels.
- `images.maximumRedirects` defaults to `3`. Bump it (or drop to `0`) when dealing with chained CDN URLs.
- Local IP optimization is disabled unless `images.dangerouslyAllowLocalIP` is `true`—only set it inside private networks.
- `images.domains` is deprecated; migrate to `images.remotePatterns`.
- `next/legacy/image` was removed. Import from `next/image`.

## 5. Tooling Changes

- `next lint` was removed; use `eslint .` or the existing `npm run lint` instead.
- Node.js 20.9+ is required.
- Turbopack configuration lives at the top level of `next.config.ts`; CLI flags like `--turbopack` are no longer needed.

## 6. Types & Imports

- Route prop types should reflect the new async shape:

```ts
type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
```

- Any helper that reads cookies/headers/draft mode must be async.

## 7. Runtime Config Removal

- `serverRuntimeConfig` and `publicRuntimeConfig` are gone. Delete imports from `next/config`.
- Read secrets directly from `process.env` in Server Components/Actions. Prefix client-safe values with `NEXT_PUBLIC_` and access them in Client Components.

```tsx
'use client'

export function Banner() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL
  return <p>{apiBase}</p>
}
```

## 8. Runtime Env Reads Require `connection()`

- When you need to read a secret that should not be inlined at build time, call `await connection()` from `next/server` before touching `process.env`.
- This prevents Next.js from bundling stale values during static export.

```tsx
import { connection } from 'next/server'

export default async function Page() {
  await connection()
  const apiKey = process.env.RUNTIME_API_KEY
  return <div />
}
```

Audit every route, layout, server action, and helper against this list when you touch it. Missing any of the above will break the build in Next.js 16.
