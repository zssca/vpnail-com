# Playbook · Add a Section to an Existing Page

Use this when you need to drop a new block (hero, pricing grid, CTA, etc.) into an existing marketing page.

## 1. Create the Section Folder

```bash
mkdir -p features/marketing/<page>/sections/<section>
cat <<'TSX' > features/marketing/<page>/sections/<section>/data.ts
import { siteConfig } from '@/lib/config/site.config'

export const newSectionData = {
  title: siteConfig.pages.<page>.<section>.title,
  description: siteConfig.pages.<page>.<section>.description,
}
TSX

cat <<'TSX' > features/marketing/<page>/sections/<section>/index.tsx
import { newSectionData } from './data'

export function NewSection() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-semibold">{newSectionData.title}</h2>
        <p className="mt-4 text-muted-foreground">{newSectionData.description}</p>
      </div>
    </section>
  )
}
TSX

cat <<'TS' > features/marketing/<page>/sections/<section>/index.ts
export { NewSection } from './index'
export { newSectionData } from './data'
TS
```

## 2. Update the Page Assembly

```tsx
// features/marketing/<page>/page.tsx
import { ExistingSection } from './sections/existing'
import { NewSection } from './sections/<section>'

export function <PageName>Page() {
  return (
    <main>
      <ExistingSection />
      <SectionDivider />
      <NewSection />
    </main>
  )
}
```

## 3. Wire Config/Data

- Add the content to `site.config.ts` under the appropriate page key.
- If the section needs structured data (arrays of cards, FAQs, etc.), build them inside `data.ts` using values from config.
- Never import data from another section—duplicate or move shared helpers into `lib/` if necessary.

## 4. Verify

- [ ] Section renders in the right order on the page
- [ ] Responsive layout behaves at common breakpoints (mobile/tablet/desktop)
- [ ] All copy comes from config-driven data
- [ ] `npm run lint && npm run type-check` passes
- [ ] No unused exports/imports remain
