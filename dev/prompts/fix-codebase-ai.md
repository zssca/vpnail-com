# Prompt: Fix This Codebase Using repo docs/kb

You are an expert Next.js 16 + shadcn/ui engineer. Your task is to diagnose and fix issues in this repo while strictly following the local rules under `docs/kb`.

## Must-Read Docs (local)
- `docs/kb/stack/00-overview.md` – stack, static-first, cacheComponents, `use cache` placement.
- `docs/kb/stack/01-architecture.md` – feature/section directory contract.
- `docs/kb/stack/02-content-data.md` – data modules, media locations.
- `docs/kb/stack/03-components-ui.md` – shared UI/layouts expectations.
- `docs/kb/stack/04-actions-runtime.md` – Server Actions, shadcn form stack (RHF + Zod), `useActionState` guidance.
- `docs/kb/stack/05-configuration.md` – config files, cacheComponents/reactCompiler, fetch logging.
- `docs/kb/stack/06-performance-seo.md` – caching, PPR
- `docs/kb/stack/checklists.md` – guardrails before shipping.

## Repo Structure to Preserve
- Routes live in `app/`; each route is a thin wrapper that imports its feature’s `page.tsx`.
- Features: `features/marketing/<page>/` with `page.tsx`, `seo.ts`, `sections/<section>/{index.tsx,data.ts,types.ts?}`, optional `actions/`, `schemas/`, `data/` for collections.
- Shared-only code in `components/` (layouts, ui, providers, shared blocks) and `lib/` (config, utils, seo, constants, email).
- Assets under `public/`, content images under `public/images/content/<feature>/<slug>/`.

## Static + Caching Rules (Next.js 16)
- Add `'use cache'` at top of every `async` route component (`page.tsx`/`layout.tsx`) to stay in the Full Route Cache; do not export `dynamic`/`revalidate` when cacheComponents is on.
- Dynamic routes must export `generateStaticParams` sourced from local data helpers.
- Runtime fetches opt into caching (`cache: 'force-cache'` or tags); otherwise they become `no-store`.
- React Compiler (`reactCompiler: true`) should remain enabled when code is strict-mode safe.
- Use `revalidatePath`/`revalidateTag`/`updateTag` inside Server Actions after mutations.

## Forms
- Use shadcn form primitives + `react-hook-form` + `@hookform/resolvers` + `zod`.
- Define Zod schema beside the form; pass `zodResolver(schema)` to `useForm` with `defaultValues` set.
- Render with `<FormField control={form.control} name="..." render={({ field }) => <FormItem><FormLabel/><FormControl/><FormDescription/><FormMessage/></FormItem>}>`.
- For Server Actions, pair with `useActionState` and surface pending/errors; keep error slots fixed-size to avoid layout shift.

## Navigation
- Prefer route-level `loading.tsx` + prefetch over inline spinners; only use `useLinkStatus` when a route is proven slow, with fixed-size indicators.

## Coding Principles
- Keep components server-friendly; avoid client hooks unless necessary.
- No cross-feature imports; reuse via `components/` or `lib/`.
- Respect file caps: section ≤150 lines, page ≤200, data ≤500.
- Update config values in `lib/config/*` instead of hardcoding business data.
- Keep styles Tailwind-first; add global utilities only if reused 3+ times.

## Workflow
1. Read relevant `docs/kb` files for the area you touch.
2. Inspect the affected feature/section. Keep section-driven composition.
3. Make changes aligned with the above rules. Avoid new third-party deps unless justified.
4. Run lint/tests/build if available for the change scope; note anything you couldn’t run.
5. Summarize changes, tests run/results, and any follow-ups.

Deliver fixes that adhere to these rules. Reject changes that conflict with the documented architecture or static-first expectations.
