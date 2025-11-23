# 05 · Configuration Management

Centralize every piece of business logic in typed config files. Never duplicate values inside features.

## Config Files

- `lib/config/site.config.ts` – business info, contact channels, navigation.
- `lib/config/nav.config.ts` – derived navigation structures if needed.
- `lib/config/seo.config.ts` – defaults for metadata + social images.
- `lib/config/email.config.ts` – provider keys, sender details.
- `next.config.ts` – central place to set `cacheComponents`, `reactCompiler`, `experimental.staticGeneration*` knobs, `serverActions.allowedOrigins`, basePath/locales, and other runtime behaviors that need to stay consistent across deployments (Next.js 16 upgrade guide).
- `eslint.config.mjs` – generated via the Next.js lint codemod so `npm run lint` calls `eslint .` (Next.js 16 removed `next lint`).

## Practices

1. **Typed exports** – create `SiteConfig`/`EmailConfig` interfaces under `lib/types/`.
2. **Single source** – update values once and import elsewhere.
3. **Environment separation** – rely on `.env.local` for secrets, never commit credentials.
4. **Feature flags** – keep lightweight flags in config rather than ad-hoc checks.
5. **Caching defaults** – with `cacheComponents: true` turned on globally, simply add `'use cache'` to routes and let Next.js manage the Full Route Cache; only export `fetchCache = 'default-cache'` from the root layout if a project intentionally disables cache components (Next.js caching docs, Next.js 16 upgrade guide + release notes).
6. **Server action safety** – document expected hostnames and update `serverActions.allowedOrigins` in config alongside each integration so ops changes don’t silently break form submissions (Next.js Server Actions docs, Next.js 16 upgrade guide).
7. **Partial pre-render + React Compiler** – make `cacheComponents: true` and (when safe) `reactCompiler: true` the default in new repos so every route benefits from Partial Pre-Rendering and automatic memoization (Next.js 16 release notes).
8. **Runtime config** – `serverRuntimeConfig`/`publicRuntimeConfig` are gone in Next.js 16; read env vars directly and, when values must be evaluated at runtime, call `await connection()` inside the route/action before accessing `process.env` (Next.js 16 upgrade guide).
9. **Linting** – replace `next lint` with the ESLint CLI (`eslint .`) and keep ignores inside `eslint.config.mjs` so local + CI linting match (Next.js 16 upgrade codemod).

## Next.js 16 Guardrails

- **Runtime requirements** – Deploy on Node.js 20.9+ (LTS) with TypeScript 5.1+ and keep `react`, `react-dom`, `@types/react`, and `@types/react-dom` current whenever you bump Next (Next.js 16 upgrade guide).
- **Turbopack defaults** – `next dev` and `next build` now run Turbopack automatically. Drop `--turbopack` flags from scripts, and only pass `--webpack` if a legacy Webpack config must run while you port those options to Turbopack (Next.js 16 upgrade guide).
- **Turbopack config location + aliasing** – Move prior `experimental.turbopack` config under the top-level `turbopack` key and use `turbopack.resolveAlias` to stub Node built-ins (e.g., `fs`) or legacy Sass `~` imports until the client code is refactored (Next.js 16 upgrade guide).
- **Filesystem caching** – Enable `experimental.turbopackFileSystemCacheForDev: true` on repos that restart frequently so compiler output persists between runs (Next.js 16 upgrade guide).
- **Proxy rename** – `middleware.{ts,js}` now becomes `proxy.{ts,js}` with a `proxy` export and a Node runtime; update config flags such as `skipProxyUrlNormalize` when renaming (Next.js 16 upgrade guide).
- **Cache Components flag** – The experimental `dynamicIO` flag was removed. Keep the stable `cacheComponents` flag true in new repos so Partial Pre-Rendering stays on (Next.js 16 upgrade guide).
- **Runtime config removal** – `serverRuntimeConfig`/`publicRuntimeConfig` are gone; read env vars directly and call `await connection()` inside Server Components when you need to evaluate `process.env` at runtime (Next.js 16 upgrade guide).
- **Async request APIs** – `cookies`, `headers`, `draftMode`, route `params`, and `searchParams` are promise-based. Always `await` them (or `props.params/searchParams`) and run `npx next typegen` whenever you add dynamic segments to refresh the generated `PageProps`/`LayoutProps` helpers (Next.js 16 upgrade guide).

## Secrets Policy

- Document required env vars in `docs/stack/checklists.md`.
- Introduce new secrets via `.env.example`.
- Validate presence during CI (custom script or Next.js runtime checks).

By standardizing configuration between projects, migrations and AI contributions remain predictable.
