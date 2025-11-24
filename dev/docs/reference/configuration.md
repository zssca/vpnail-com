# Configuration

## Site Config

`lib/config/site.config.ts`

```typescript
export const siteConfig = {
  name: 'Site Name',
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

## Navigation

`lib/config/nav.config.ts`

```typescript
export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
```

## SEO

`lib/config/seo.config.ts`

```typescript
export const defaultSEO = {
  title: { default: 'Site Name', template: '%s | Site Name' },
  description: 'Site description',
}
```

## Environment Variables

`.env.local`

```bash
RESEND_API_KEY=your_key
EMAIL_FROM=noreply@example.com
CONTACT_EMAIL=contact@example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Access:

```typescript
// Server only
process.env.RESEND_API_KEY

// Client & server
process.env.NEXT_PUBLIC_GA_ID
```

## Next.js Config

`next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true, // enable cache components / PPR
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'example.com'],
    },
  },
}

export default nextConfig
```

## Tailwind Config

`tailwind.config.ts`

```typescript
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { primary: { 500: '#3b82f6', 600: '#2563eb' } },
    },
  },
}
```

## TypeScript

`tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```
