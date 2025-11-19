# Start Here · 5‑Minute Onboarding

You are working on a **reusable marketing template**. The codebase behaves like an appliance: swap configuration and assets, never the wiring. Use this page to align on expectations before opening your editor.

---

## What This Template Is

- **Fixed architecture**: folder layout, component boundaries, and build system are frozen across clients.
- **Variable data**: only `lib/config/site.config.ts` and assets in `public/` change per client.
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind, shadcn/ui, Server Actions for forms.
- **Rendering**: Static Site Generation by default, with Server Components everywhere unless a hook forces `'use client'`.

---

## Non-Negotiable Rules

```
✅ DO
- Keep every marketing page under features/marketing/[page]/
- Name files page.tsx, seo.ts, index.tsx, data.ts, types.ts
- Read all business data from site.config.ts (or data files that read from it)
- Default to Server Components and fetch data directly inside them
- Keep sections self-contained (component + data + types in the same folder)

❌ DON'T
- Invent file names (home-page.tsx, hero.tsx, hero.data.ts, etc.)
- Place features outside features/marketing/
- Hardcode copy, addresses, phones, hours, or CTAs
- Create API routes just to deliver display data
- Sprinkle 'use client' without hooks or browser APIs
```

Tape these to your mental monitor. Most bugs start with breaking one of them.

---

## Read in This Order

1. **[README.md](./README.md)** – doc map + quick routing table
2. **[02-project-type.md](./02-project-type.md)** – what SSG + minimal server means here
3. **[03-architecture.md](./03-architecture.md)** – how data flows and why sections exist
4. **[04-file-organization.md](./04-file-organization.md)** – exact folder/file contracts
5. **[05-golden-rules.md](./05-golden-rules.md)** – non‑negotiable patterns to memorize
6. **[06-anti-patterns.md](./06-anti-patterns.md)** – sanity check before opening a PR
7. **[07-nextjs-essentials.md](./07-nextjs-essentials.md)** – daily Next.js reference with deep-dive links
8. **[08-task-guide.md](./08-task-guide.md)** – pick the right task recipe before editing anything

---

## First 15 Minutes

1. **Clone + install** – `npm install`, verify `npm run lint` and `npm run type-check` both succeed.
2. **Baseline tour** – walk through `app/`, one marketing feature, and one section folder so the structure sticks.
3. **Config audit** – open `lib/config/site.config.ts`, confirm it matches the brief for the client you are serving.
4. **Asset audit** – ensure the `public/` assets match the config (logos, hero imagery, etc.) or note what must change.
5. **Task selection** – choose the relevant guide under `tasks/` and follow it verbatim.

---

## Pre-Flight Checklist

- [ ] I understand the data path: `site.config.ts → derived configs → section data → components`.
- [ ] My task has a matching recipe inside `tasks/` and I am following it line-by-line.
- [ ] Any new file name + location has been checked against `03-file-organization.md`.
- [ ] I know which Next.js 16 rule applies (`nextjs/` guides bookmarked).
- [ ] I have glanced at `04-anti-patterns.md` to avoid known footguns.

Once these boxes are checked, start the task and keep the relevant doc open. The goal is boring, repeatable changes—consistency beats creativity here.
