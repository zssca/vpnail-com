# 04 · Actions & Runtime Boundaries

Server Actions are allowed only for form handling and transactional workflows.

## File Placement

- `features/[feature]/actions/*.action.ts` – one exported async function per form.
- `features/[feature]/schemas/*.schema.ts` – companion Zod validations.
- Add `'use server'` at the top of every `*.action.ts` (or individual inline action) so Next.js treats each export as a Server Action and performs dead-code elimination on unused functions (Next.js Server Actions docs, Next.js 16 upgrade guide).

## Rules

1. **Validate first** – parse the form data with Zod before performing side effects.
2. **No database writes** – these projects are static; persist via email + CRMs only.
3. **Email sending** – abstract via `lib/email/*` so providers (Resend, Postmark) are swappable.
4. **Security** – never trust client-provided values; sanitize and encode outputs.
5. **Rate limiting** – if needed, centralize middleware in `lib/utils/rate-limit.ts`.
6. **Cache busting** – call `revalidatePath`, `revalidateTag`, or the new `updateTag` helper from the action after a successful mutation so both the Data Cache and Router Cache refresh immediately (Next.js caching docs, Next.js 16 upgrade guide).
7. **Origin allow-list** – define `experimental.serverActions.allowedOrigins` in `next.config.js` whenever requests may flow through reverse proxies or alternate domains to reduce CSRF risk (Next.js Server Actions docs, Next.js 16 upgrade guide).
8. **Treat actions as public endpoints** – every action needs its own authorization/anti-abuse checks because Next.js generates HTTP endpoints for any export referenced by the client (Next.js Server Actions docs, Next.js 16 upgrade guide).
9. **Client events** – when triggering actions from `onChange` or `useEffect`, debounce or batch updates to avoid hammering the server (Next.js Server Actions docs, Next.js 16 upgrade guide).
10. **Async request APIs** – Next.js 16 removed synchronous access to `cookies`, `headers`, `draftMode`, `params`, and `searchParams`; always `await` those helpers (or `props.params/searchParams`) and run `npx next typegen` whenever you add dynamic segments so the generated `PageProps`/`LayoutProps` helpers stay accurate (Next.js 16 upgrade guide).

## Error Handling

- Throw `new Error('message')` for unexpected issues; catch at the form caller to surface friendly copy.
- Log minimal metadata (timestamp, form name) using a shared logger util.
- Use `useActionState` or `useFormState` in the consuming component to pipe serialized error objects back into inputs instead of recreating ad-hoc state machines (shadcn/ui forms for Next.js, shadcn@3.5.0).

## Environment Variables

- Document required keys in `docs/stack/05-configuration.md`.
- Access via `process.env.NEXT_PUBLIC_*` (client safe) or server-only env within actions.
- Mirror the same env vars on your hosting provider and list any webhook secrets alongside action descriptions so deployment reviews can trace dependencies quickly.

Keep this file generic; swap email providers or CRM references per project without rewriting the rules.
