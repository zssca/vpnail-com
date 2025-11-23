# 00 · Stack Overview

**Applies to:** Static marketing sites built with Next.js App Router, shadcn/ui, Tailwind CSS, and Resend.

## Runtime Model

- Rendering: With `cacheComponents` enabled, call `'use cache'` as the first statement inside every exported `async` route component (`page.tsx`/`layout.tsx`) and let Next.js 16 enforce static rendering—skip `dynamic`/`revalidate` exports entirely because they’re incompatible once cache components are on (Next.js 16 release notes).
- Data: All display content comes from `.ts` data modules consumed during build time.
- Caching: Enable `cacheComponents: true` in `next.config` so Partial Pre-Rendering keeps the Full Route Cache warm; only export `fetchCache = 'default-cache'` from the root layout when a project intentionally opts out of cache components (Next.js 16 release notes + caching docs).
- Server interaction: Server Actions exist exclusively inside `features/*/actions/*.action.ts` files and only power forms or transactional email.
- Hosting: Optimized for Vercel (SSG/PPR) but portable to any CDN-first host.
- Static paths: Dynamic routes must export `generateStaticParams` (or return an empty array intentionally) so every slug is rendered during `next build`, preventing runtime data fetches (Next.js `generateStaticParams` docs, v15.1.8).
- Rendering optimizations: Turn on the built-in React Compiler via `reactCompiler: true` so components memoize automatically without manual `memo` wrappers (Next.js 16 release notes).

## Core Directories

```
app/            ← Routes (thin wrappers around features)
features/       ← Feature folders with sections and data
components/     ← Shared UI primitives (shadcn/ui + layouts)
lib/            ← Config, utils, validations
public/         ← Static assets (images, fonts, icons)
```

## Non-Negotiable Principles

1. **Static-first** – Prefer build-time data, no client fetching.
2. **Section-driven UX** – Every page composes section components sourced from co-located data.
3. **Single source of truth** – Business info lives in config, not inline strings.
4. **Repeatable patterns** – Every feature mirrors the same structure so new work is predictable.
5. **Predictable builds** – Use `experimental.staticGeneration*` knobs (retry count, worker concurrency) in `next.config.{js,ts}` to keep large static exports stable across CI providers (Next.js static generation config docs, v15.1.8).

Copy this file into new projects and update only the bullet points that change (e.g., if you swap Resend for another provider).
