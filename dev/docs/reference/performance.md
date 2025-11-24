# Performance & SEO

Cache components, fast assets, and clean metadata for Next.js 16.

## Cache Components & Data

- Add `'use cache'` to route files/components so they land in the Full Route Cache with Partial Pre-Rendering.
- Use `cacheLife('hours' | { expire: 60 })` to bound cache duration.
- Tag fetches (`next: { tags: ['services'] }`) and invalidate with `revalidateTag('services')`.
- For globally shared data, combine `'use cache: remote'` with `cacheTag`/`cacheLife` in helpers.
- Avoid `dynamic`/`revalidate` exports unless intentionally opting out of caching.

## Images

```tsx
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  sizes="(max-width: 768px) 100vw, 1200px"
  className="object-cover"
/>
```

- Use absolute `/images/...` paths.
- Supply `sizes`; use `priority` only above the fold.

## Fonts

```tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })
```

Load in `app/layout.tsx` and apply the variable class on `<html>`.

## Code Splitting

```tsx
const Heavy = dynamic(() => import('./Heavy'), { loading: () => <div>Loading…</div> })
```

Use sparingly; prefer server-rendered components where possible.

## SEO

- **Metadata** in `seo.ts`:

```typescript
export const metadata = {
  title: 'Page Title',
  description: 'Description',
  openGraph: {
    title: 'Title',
    description: 'Description',
    url: 'https://example.com/page',
    images: ['/images/og.jpg'],
  },
}
```

- **Structured data** via JSON-LD helpers.
- **Sitemaps**: in `sitemap.ts`, `id` is a `Promise` in Next.js 16 — `const resolvedId = await id`.
- **Robots**:

```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

## Core Web Vitals Targets

- LCP < 2.5s
- INP/FID < 100ms
- CLS < 0.1

Monitor with `<Analytics />` and Lighthouse runs per page.

## Checklist

- next/image everywhere; alt text on all images.
- Fonts via `next/font`.
- Routes use `'use cache'` and `cacheComponents: true` in config.
- Tag fetches you plan to invalidate; call `revalidatePath`/`revalidateTag` after mutations.
- Keep metadata + OG images present on every page.
