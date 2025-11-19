# Next.js 16 Core Updates

Use this page to understand the platform capabilities you inherit by default in the template.

## Turbopack (Stable)

- Turbopack replaced Webpack as the production + dev bundler.
- Expect **2‑5× faster production builds** and up to **10× faster Fast Refresh**.
- File-system caching keeps compiler artifacts on disk so restarts are snappy.
- Configure Turbopack directly inside `next.config.ts` (no more `experimental.turbopack` or `--turbopack` CLI flags):

```ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  turbopack: {
    /* per-project overrides if you ever need them */
  },
}
export default config
```

- No config needed—`next dev` and `next build` already opt in.

## React Compiler (Stable)

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactCompiler: true,
}
export default config
```

- Automatic memoization removes most manual `useMemo`/`useCallback` noise.
- Keep components pure and let the compiler optimize rerenders.

## Cache Components (PPR)

```ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  cacheComponents: true,
}
export default config
```

- Cache Components is the stable Partial Pre-rendering story in v16. Turn it on once and leave it on.
- Sections stay static, while Suspense boundaries stream dynamic bits just like before.
- If you previously experimented with `experimental.dynamicIO` or `experimental.ppr`, remove those flags—`cacheComponents` replaces them.

## "use cache" Directive

```tsx
export default async function Page() {
  'use cache'
  const data = await fetchData()
  return <div>{data.title}</div>
}
```

- Opt-in caching for individual components or helper functions.
- Works with the new cache APIs introduced in 16.
- Use sparingly—marketing pages are static already.

## Cache Control Helpers

- `refresh()` – re-render the current route when data changes.
- `updateTag(tag)` – force-update a cached tag immediately (read-your-writes semantics).
- `revalidateTag(tag, cacheLife('days'))` – every call must pass a cache-life profile (string preset or helper).

## Image & Asset Changes

- Default `minimumCacheTTL` for remote images jumped to 14,400 seconds (4 hours). Override only if absolutely necessary.
- `imageSizes` no longer includes `16`—add it if you truly render icons at that width.
- `qualities` default to `[75]`; declare `[50, 75, 100]` (or similar) for marketing assets that need multiple compression profiles.
- `maximumRedirects` default is `3`; set it explicitly when consuming third-party CDNs that chain redirects.
- Remote image allowlists must use `images.remotePatterns`; `images.domains` is deprecated.
- The legacy `next/legacy/image` entry point was removed—always import from `next/image`.
- AMP support was removed entirely.

## Runtime Env Access

- `serverRuntimeConfig`/`publicRuntimeConfig` no longer exist. Read secrets directly via `process.env` and prefix public values with `NEXT_PUBLIC_`.
- For secrets that must be fetched at request time, use the new `connection()` helper so Next.js doesn’t inline them at build time:

```tsx
import { connection } from 'next/server'

export default async function Page() {
  await connection()
  const apiKey = process.env.RUNTIME_API_KEY
  return <div>{/* never leak apiKey to the client */}</div>
}
```

Keep these updates in mind when evaluating performance or platform-level questions. The rest of the docs explain how to apply them safely.
