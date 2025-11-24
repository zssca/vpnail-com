# Sections

Sections are small Server Components with colocated data.

## Structure

```
sections/[name]/
├── index.tsx   # Component (Server by default)
├── data.ts     # Content
└── types.ts    # Types (optional)
```

## Create a Section

1) **Folder**

```bash
mkdir -p features/home/sections/hero
```

2) **Data**

`data.ts`

```typescript
export const heroData = {
  title: 'Welcome',
  subtitle: 'Description',
}
```

3) **Component**

`index.tsx`

```tsx
import { heroData } from './data'

export function HeroSection() {
  return (
    <section className="space-y-3">
      <h1 className="text-balance text-4xl font-semibold">{heroData.title}</h1>
      <p className="text-muted-foreground">{heroData.subtitle}</p>
    </section>
  )
}
```

4) **Use in page**

```tsx
import { HeroSection } from './sections/hero'

export default function Page() {
  return <HeroSection />
}
```

## Patterns

- **Lists**

```typescript
// data.ts
export const items = [
  { id: 1, title: 'Item 1', description: '...' },
  { id: 2, title: 'Item 2', description: '...' },
]

// index.tsx
export function ItemsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="rounded-2xl border bg-card p-6">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </article>
      ))}
    </div>
  )
}
```

- **Typed data**

```typescript
// types.ts
export interface Item {
  id: number
  title: string
  description: string
}

// data.ts
import type { Item } from './types'
export const items: Item[] = []
```

## Best Practices

- Keep sections < 150 lines; push shared UI into `components/shared`.
- Default to Server Components; only add `'use client'` when interaction is required.
- Only import data from the same folder; no cross-section imports.
- Use semantic HTML and Tailwind utilities; prefer shadcn/ui primitives for form and interactive elements.
- Maintain heading hierarchy and responsive spacing.
