# Data Fetching & Caching

This template keeps data simple: read config at build time, send emails via Server Actions, and let Next.js handle deduplication. Use this guide when you need to touch data flows.

## Build-Time Data Rules

1. Fetch inside Server Components; avoid API routes for display data.
2. Keep fetch calls close to the component that renders the data.
3. Use the global config as the source of truth; utilities should derive values rather than duplicating them.
4. Prefer `fetch` with the default cache for static data. Marketing content rarely needs `cache: 'no-store'`.
5. Keep `cacheComponents: true` enabled so sections stay static without extra work—lean on `<Suspense>` when you need streaming.

```tsx
export async function TestimonialsSection() {
  const testimonials = await getTestimonials()
  return <TestimonialsList items={testimonials} />
}

async function getTestimonials() {
  const res = await fetch('https://cms.example.com/testimonials', {
    next: { revalidate: 3600 },
  })
  return res.json()
}
```

## Deduplication

- Next.js deduplicates identical fetch requests within the same request tree.
- You can safely call `getTestimonials()` multiple times; only one network request will execute.

## Named Cache Profiles

- Define shared cache lifetimes in `next.config.ts` using the `cacheLife` option when a page/section needs predictable refresh windows.

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    marketing: {
      stale: 300, // 5 minutes
      revalidate: 1800, // 30 minutes
      expire: 43200, // 12 hours
    },
  },
}
export default nextConfig
```

- Apply them inside Server Components or helpers alongside `'use cache'`:

```tsx
'use cache'
import { cacheLife } from 'next/cache'

export async function getFaqs() {
  cacheLife('marketing')
  return fetchFaqsFromCms()
}
```

## Server Actions

```ts
// features/marketing/contact/actions/send-email.action.ts
'use server'

import { z } from 'zod'
import { sendContactEmail } from '@/lib/email/send-contact'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function sendEmail(formData: FormData) {
  const payload = schema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  await sendContactEmail(payload)
}
```

Rules:
- Keep actions colocated with the feature using them.
- Validate inputs server-side even if the client already validated.
- Never mutate shared config inside an action.

## Cache Helpers

- `refresh()` – re-render the current route on demand (e.g., after a CMS webhook).
- `updateTag(tag)` – immediately invalidate cache entries tagged with `tag`.

```ts
'use server'
import { updateTag } from 'next/cache'

export async function updateContactInfo() {
  await save()
  updateTag('site-contact')
}
```

- `revalidateTag(tag, cacheLifeProfile)` – schedule cache refresh with the required cache-life argument (`'max'`, `'days'`, a custom profile, etc.).

```ts
'use server'
import { revalidateTag } from 'next/cache'

export async function syncArticle(articleId: string) {
  await pushArticle(articleId)
  revalidateTag(`article-${articleId}`, 'max')
}
```

- `"use cache"` and `cacheLife()` – stick to components or helper functions that benefit from memoized results and document how long they can stay stale.

Most marketing flows will not need manual cache helpers. Reach for them only when content truly changes at runtime.

## Runtime Env Access

- `serverRuntimeConfig`/`publicRuntimeConfig` are gone. Read secrets from `process.env` in Server Components or Actions and prefix safe public values with `NEXT_PUBLIC_`.
- When you must load runtime-only secrets during a render, call `await connection()` before reading env vars so Next.js doesn’t inline stale values.

```tsx
import { connection } from 'next/server'

export default async function AdminStats() {
  await connection()
  const apiKey = process.env.REALTIME_API_KEY
  // never pass apiKey to the client
}
```

## Validation & Error Handling

- Centralize shared schemas in `lib/validations/` when multiple features reuse them; otherwise keep them inside the feature.
- Throw typed errors inside Server Actions and catch them in client forms to show human copy.
- Log unexpected failures via your platform-specific logger before returning a generic message.

Follow these rules to keep data flows predictable, cache-friendly, and easy to debug.
