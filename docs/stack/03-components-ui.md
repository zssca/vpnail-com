# 03 · Components & UI

These conventions keep shared UI predictable and portable between repos.

## Libraries

- **shadcn/ui** provides primitive components. Never modify generated files directly; extend via wrappers in `components/ui/`.
- **Layouts** belong in `components/layouts/` and expose small, composable structures (e.g., `Section`, `Container`).
- **Theme Provider** – Wrap `app/layout.tsx` with a `ThemeProvider` built on `next-themes`, passing `attribute="class"` and `suppressHydrationWarning` on `<html>` so dark mode stays in sync across SSR/CSR (shadcn/ui dark mode guide, shadcn@3.5.0).
- **React Compiler** – Opt into Next.js 16’s `reactCompiler: true` config so components gain automatic memoization and diffing improvements without sprinkling `memo` manually (Next.js 16 release notes).

## Styling

- Tailwind CSS is the default. Create utility classes in `globals.css` only when used in 3+ places.
- Dark mode optional; if present, gate via data attributes on `<html>`.
- Use the official `@tailwindcss/vite` plugin (or the framework-specific equivalent) when tooling outside Next.js to keep builds fast and aligned with Tailwind v4 expectations (Tailwind CSS v4 announcement).
- Override third-party widgets inside `@layer components { ... }` instead of scattering selectors so that Tailwind can tree-shake the overrides predictably (Tailwind `adding-custom-styles` docs).
- Reach for CSS custom properties or theme variables rather than large `@apply` blocks; the Tailwind team now recommends CSS variables for performance (Tailwind compatibility guide).
- Reach for `max-*` or `supports-[feature]` variants instead of stacking `sr-only`/`not-sr-only` or heavy media query overrides; they keep responsive tweaks declarative and cheaper to parse (Tailwind v3.2 release notes).

## Component Rules

1. Keep components pure and server-friendly; avoid client hooks unless necessary.
2. Accept data via props; never import feature data directly inside shared components.
3. Add short comments only for complex logic or layout hacks.
4. Extract subcomponents when JSX exceeds ~150 lines.
5. When building paginated UIs, wrap nav items with `<Link>` instead of `<a>` so Next.js prefetching works out of the box (shadcn/ui pagination docs, shadcn@3.5.0).
6. Forms should lean on shadcn’s `<Form>` + `<Field>` primitives tied to `useActionState` so validation errors and pending UI stay accessible without writing bespoke state plumbing (shadcn/ui forms for Next.js, shadcn@3.5.0).

## Theming

- Tokens defined in `tailwind.config.ts` or `lib/config/theme.ts`.
- Colors should reference theme variables; avoid hex values inline unless for temporary experiments.
- Dark/light toggles should be rendered through the shared `ThemeProvider` so every component consumes the same CSS variables; install `next-themes` when a project enables theming (shadcn/ui dark mode guide, shadcn@3.5.0).

Consistently applying these patterns means every project using this doc set will feel familiar to contributors and AI agents alike.
