# Glossary

- **Feature** – Folder under `features/marketing/*` that powers a specific route.
- **Section** – UI + data pair under `features/.../sections/` representing a page slice.
- **Detail page** – A dynamic page (e.g., `/services/[slug]`) that renders content based on data modules.
- **Server Action** – Next.js server function invoked from a form submit, located in `actions/` folders.
- **Data module** – TypeScript file exporting copy/content consumed by sections.
- **Playbook** – Step-by-step SOP stored in `docs/playbooks/`.
- **Prompt** – Fill-in brief for AI/contractor tasks stored in `docs/prompts/`.
- **Full Route Cache** – Next.js App Router cache layer that stores the full rendered payload for a route when the layout/page begins with `'use cache'` (Next.js `use cache` docs, v15.1.8).
- **fetchCache** – Layout-level setting (`export const fetchCache = 'default-cache' | 'force-cache' | 'only-no-store'`) that establishes the default caching mode for any `fetch` call inside that subtree (Next.js caching docs, v15.1.8).
- **cacheComponents** – Next.js 16 config flag that enables Partial Pre-Rendering by caching static parts of React Server Components (Next.js 16 release notes).
- **React Compiler** – Built-in optimizer in Next.js 16 that auto-memoizes components when `reactCompiler: true` is set (Next.js 16 release notes).

Keep terminology consistent across repositories so automation and contributors share the same language.
