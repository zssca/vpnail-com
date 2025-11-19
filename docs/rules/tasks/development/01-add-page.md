# Playbook · Add a Marketing Page

Use this when creating a new top-level marketing route (services, gallery, pricing, etc.).

## 1. Scaffold the Feature

```bash
mkdir -p features/marketing/<page>/sections/hero
cat <<'TS' > features/marketing/<page>/page.tsx
export function <PageName>Page() {
  return (
    <main>
      {/* sections go here */}
    </main>
  )
}
TS
cat <<'TS' > features/marketing/<page>/seo.ts
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config/site.config'

export const metadata: Metadata = {
  title: '<Title> | ' + siteConfig.business.name,
  description: '<Short description>',
}
TS
cat <<'TS' > features/marketing/<page>/index.ts
export { <PageName>Page } from './page'
export { metadata as <page>Metadata } from './seo'
TS
```

## 2. Create the First Section

```bash
cat <<'TSX' > features/marketing/<page>/sections/hero/data.ts
import { siteConfig } from '@/lib/config/site.config'

export const heroData = {
  title: siteConfig.pages.<page>.hero.title,
  subtitle: siteConfig.pages.<page>.hero.subtitle,
  backgroundImage: '/images/<page>-hero.jpg',
}
TSX

cat <<'TSX' > features/marketing/<page>/sections/hero/index.tsx
import { heroData } from './data'

export function HeroSection() {
  return (
    <section className="py-24 text-center">
      <div className="container">
        <p className="text-sm uppercase tracking-wide text-primary">{heroData.subtitle}</p>
        <h1 className="mt-4 text-4xl font-bold">{heroData.title}</h1>
      </div>
    </section>
  )
}
TSX

cat <<'TS' > features/marketing/<page>/sections/hero/index.ts
export { HeroSection } from './index'
export { heroData } from './data'
TS
```

Add more section folders following the same pattern.

## 3. Assemble the Page

```tsx
// features/marketing/<page>/page.tsx
import { HeroSection } from './sections/hero'
import { HighlightsSection } from './sections/highlights'

export function <PageName>Page() {
  return (
    <main>
      <HeroSection />
      <HighlightsSection />
    </main>
  )
}
```

## 4. Wire the App Route

```tsx
// app/<page>/page.tsx
import { <PageName>Page, <page>Metadata } from '@/features/marketing/<page>'

export const metadata = <page>Metadata
export default <PageName>Page
```

## 5. Update Navigation/Config

- Add the page to `site.config.ts` navigation / pages map.
- Drop any new imagery into `public/images/`.
- Update sitemap/nav configs if required.

## 6. Verify

- [ ] `npm run lint && npm run type-check`
- [ ] Route loads locally at `http://localhost:3000/<page>` with no console errors
- [ ] Page metadata appears (view page source)
- [ ] Navigation links point to the new route
- [ ] Sections read their data from config (no literals)
