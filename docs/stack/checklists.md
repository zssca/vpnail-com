# Checklists

## Pre-Commit

- [ ] Lint passes locally (`npm run lint`).
- [ ] No stray `console.log` or TODO comments.
- [ ] Section/page file sizes within limits.
- [ ] New assets added under `public/` and optimized.
- [ ] `package.json` `lint` script points to `eslint .` with the generated `eslint.config.mjs` (Next.js 16 removed `next lint`).

## Pre-PR / Handoff

- [ ] Documentation updated (rules, playbooks, prompts) if patterns changed.
- [ ] Screenshots or recordings attached for visual changes.
- [ ] Forms tested with both success and failure paths.
- [ ] Lighthouse smoke test run on the updated pages.
- [ ] Server Action changes list their `revalidatePath`/`revalidateTag` usage and confirm `serverActions.allowedOrigins` covers every host (Next.js Server Actions + caching docs, Next.js 16 upgrade guide).
- [ ] Routes touched still opt into `'use cache'` and keep `cacheComponents` enabled; document any intentional `no-store` fetches or cache-component opt-outs (Next.js caching docs, Next.js 16 upgrade guide + release notes).
- [ ] Async Request APIs are awaited—`cookies`, `headers`, `draftMode`, route `params`, and `searchParams` (or metadata image props) all use `await`, and `npx next typegen` was rerun after editing dynamic segments (Next.js 16 upgrade guide).
- [ ] Middleware/proxy changes live in `proxy.{ts,js}` with a `proxy` export and documented runtime assumptions (Next.js 16 upgrade guide).

## Release

- [ ] Env vars confirmed on the hosting platform.
- [ ] Analytics/SEO integrations double-checked.
- [ ] Rollback plan documented (usually redeploy previous build).
- [ ] `next.config.ts` deployed with the latest static generation + server action settings (Next.js config docs, Next.js 16 upgrade guide).
- [ ] `cacheComponents` + `reactCompiler` flags reviewed and documented so ops knows whether PPR/React Compiler are active (Next.js 16 release notes).
- [ ] Hosting target runs Node.js 20.9+ and TypeScript 5.1+, and package scripts only fall back to `--webpack` intentionally now that Turbopack is the default (Next.js 16 upgrade guide).
- [ ] Image configuration overrides (`images.localPatterns`, `remotePatterns`, `minimumCacheTTL`, `qualities`, `maximumRedirects`, `dangerouslyAllowLocalIP`) are documented when deviating from the Next.js 16 defaults (Next.js 16 upgrade guide).

Use or extend these lists per project; they intentionally stay generic.
