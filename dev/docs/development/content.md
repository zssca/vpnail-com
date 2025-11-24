# Content Management

All copy, business details, and assets live in config/data files to keep components clean and cacheable.

## Where Things Live

| Content | Location |
|---------|----------|
| Business info | `lib/config/site.config.ts` |
| Navigation | `lib/config/nav.config.ts` |
| Page content | `features/[page]/sections/[section]/data.ts` |
| Collection data | `features/[page]/data/*` |
| SEO per page | `features/[page]/seo.ts` |

## Config Example

`lib/config/site.config.ts`

```typescript
export const siteConfig = {
  name: 'Site Name',
  description: 'Description',
  url: 'https://example.com',
  contact: {
    phone: '(555) 123-4567',
    email: 'info@example.com',
    address: { street: '123 Main St', city: 'City', state: 'ST', zip: '12345' },
  },
  social: {
    facebook: 'https://facebook.com/page',
    instagram: 'https://instagram.com/page',
  },
}
```

## Section Data Patterns

- **Simple**

```typescript
export const heroData = {
  title: 'Welcome',
  subtitle: 'Description',
  image: '/images/hero.jpg',
}
```

- **List**

```typescript
export const servicesData = [
  { id: 'service-1', title: 'Service One', description: 'Description', price: '$100' },
]
```

- **Typed**

```typescript
export interface Service {
  slug: string
  title: string
  description: string
}

export const services: Service[] = []
```

## Images

- Store in `public/images/...`.
- Reference with absolute paths (`/images/...`) so `next/image` can optimize.

```tsx
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Luxury manicure session"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, 1200px"
/>
```

## Updating Content

1) Edit the relevant data/config file (never inline strings in components).  
2) If slugs/collections change, update any helpers feeding `generateStaticParams`.  
3) After Server Actions mutate cached data, call `revalidatePath`/`revalidateTag` for affected routes/tags.

## Best Practices

- Keep data files under 500 lines and typed.
- Provide descriptive alt text for all images.
- Avoid relative `../public` paths; always use absolute `/images/...`.
- Use tags (`next: { tags: ['services'] }`) on fetches you plan to revalidate.
- Prefer `cacheLife` on cached helpers when content has a known TTL.
