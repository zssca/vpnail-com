# Rendering Patterns

Marketing pages stay static, but Next.js 16 gives you modern rendering primitives. This guide tells you which to use.

## Server vs Client Components

| Use Server Component when… | Use Client Component when… |
|----------------------------|-----------------------------|
| Rendering static or config-driven data | React state/hooks are needed |
| Fetching data from CMS/config | Handling user interactions (onClick, onSubmit) |
| Running Server Actions | Using browser-only APIs (window, document) |

Rules:
- Start every file as a Server Component.
- Add `'use client'` at the top only when the component truly needs hooks or browser APIs.
- Shared UI primitives under `components/ui/` can be client components if they rely on shadcn/ui interactivity.

## Route Segment Settings

```ts
export const dynamic = 'force-static'
export const revalidate = false
export const runtime = 'nodejs'
```

- Marketing pages should ship as static HTML. Do not flip these flags unless a lead specifically requires ISR.

## Metadata & SEO

- Each feature exposes `seo.ts` with a typed `Metadata` export.
- App routes simply re-export the metadata to avoid duplication.
- Use structured data helpers in `lib/seo/structured-data.ts` for advanced pages.

## Suspense & Streaming

- Wrap potentially slow sections in `<Suspense>` inside the page component.
- Provide lightweight fallback components (skeletons, loaders) so PPR can flush early.
- Server Components can be async; React will stream the result once resolved.

```tsx
import { Suspense } from 'react'

export function ServicesPage() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<SectionPlaceholder />}>
        <TestimonialsSection />
      </Suspense>
    </main>
  )
}
```

## Cache Components & PPR

- Enable `cacheComponents: true` in `next.config.ts` once per project. It locks static sections while still letting Suspense stream dynamic shells.
- Keep each section pure and deterministic so Cache Components can reuse it safely between requests.
- Never sprinkle `cache: 'no-store'` by default—prefer the cache helpers in `next/cache` to opt-in to invalidation when content truly changes.

## Routing Props

- `params`/`searchParams` arrive as Promises. When a page needs them, declare the prop type with Promises and `await` inside the function.
- Metadata helpers (`sitemap`, `robots`, `opengraph-image`, etc.) follow the same async pattern—`await params`/`await id` before using them.
- If a Client Component needs the same values, pass the resolved data down or `use()` inside that component.

Keep this guide open whenever you add a new page or section that fetches data or handles async work.
