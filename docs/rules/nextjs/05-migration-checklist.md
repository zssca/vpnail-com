# Next.js 16 Migration Checklist

Use this list whenever you upgrade a repo or review a PR touching framework-level files.

## Files & Routing

- [ ] `middleware.ts` replaced with `proxy.ts`
- [ ] Export renamed from `middleware` → `proxy`
- [ ] Any custom route handlers updated to async cookies/headers/draft mode
- [ ] Config uses `skipProxyUrlNormalize` (never `skipMiddlewareUrlNormalize`) when url normalization is required
- [ ] `cacheComponents: true` enabled and legacy `experimental.dynamicIO` removed

## Components & Props

- [ ] Every page/layout treats `params` and `searchParams` as Promises
- [ ] Metadata helpers (`sitemap`, `robots`, `opengraph-image`, etc.) `await` their `params`/`id`
- [ ] Client Components that consume route props use `use()` or receive resolved values
- [ ] No stray `'use client'` markers on files that do not need hooks/browser APIs

## Tooling

- [ ] `next.config.ts` enables `reactCompiler: true`
- [ ] Turbopack overrides (if any) live inside `next.config.ts` without CLI flags
- [ ] Repository uses Node.js 20.9+
- [ ] Lint scripts call `eslint` directly (no `next lint`)

## Caching & Images

- [ ] Calls to `revalidateTag()` include the cache-life argument (string or profile)
- [ ] Any custom cache logic reviewed for `refresh()` / `updateTag()` opportunities
- [ ] Named cache profiles exist for sections needing predictable refresh windows
- [ ] `images.minimumCacheTTL` adjustments documented if they differ from 14,400 seconds
- [ ] `images.imageSizes` only includes `16` when absolutely required
- [ ] `images.qualities` is explicit whenever more than `[75]` is needed
- [ ] `images.maximumRedirects`/`dangerouslyAllowLocalIP` settings documented
- [ ] Remote hosts configured via `images.remotePatterns` (not `images.domains`)
- [ ] No imports from `next/legacy/image`

## Forms & Actions

- [ ] Server Actions live in `features/marketing/[page]/actions/`
- [ ] Every action validates input with Zod (or equivalent)
- [ ] Email utilities pull sender/recipient info from config, not literals

## Env & Runtime Config

- [ ] Project does not import from `next/config`
- [ ] Client props read from `process.env.NEXT_PUBLIC_*`
- [ ] Server Components/Actions call `connection()` before reading runtime-only env secrets

## Verification

- [ ] `npm run lint` passes under Turbopack (dev) and `npm run build` succeeds
- [ ] Smoke-tested static export via `npm run build && npm run start`
- [ ] Critical flows (home, contact, services pages) render without hydration errors

Do not consider the migration complete until every checkbox is satisfied.
