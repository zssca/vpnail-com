# Pages

Pages are thin Server Components that stitch together sections and opt into cache components.

## Structure

```
features/[page]/
├── page.tsx   # Page component (Server Component)
├── seo.ts     # Metadata
└── sections/  # Sections used by the page
```

## Create a Page

1) **Create feature shell**

```bash
mkdir -p features/about/sections
```

2) **Build the page**

`features/about/page.tsx`

```tsx
import { cacheLife } from 'next/cache'
import { HeroSection } from './sections/hero'

export default async function AboutPage() {
  'use cache'
  // Optional: cap lifetime if data changes occasionally
  // cacheLife('hours')
  return <HeroSection />
}
```

3) **Add metadata**

`features/about/seo.ts`

```typescript
export const metadata = {
  title: 'About',
  description: 'About us',
}
```

4) **Wire the route**

`app/about/page.tsx`

```tsx
import Page from '@/features/about/page'
export { metadata } from '@/features/about/seo'
export default Page
```

## Dynamic Pages

Generate static params to keep routes cached:

```typescript
// features/services/[slug]/page.tsx
import { services } from '../data/services'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  'use cache'
  const service = services.find((s) => s.slug === params.slug)
  return <ServiceDetail service={service} />
}
```

If a Server Action mutates data, call `revalidatePath('/services')` (and the detail path) or `revalidateTag` for tagged fetches.

## Best Practices

- Keep pages < 200 lines; push UI to sections.
- Add `'use cache'` at the page (or file) level so the route lands in the Full Route Cache; add `cacheLife` when data has a known TTL.
- Use `Link` for navigation so the router cache prefetches.
- Keep metadata in `seo.ts` and import it from the route.
- Avoid `dynamic`/`revalidate` exports unless you must opt out of caching.
