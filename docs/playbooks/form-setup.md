# Playbook · Form Setup

**Use when:** Adding or updating a form powered by Next.js Server Actions.

1. **Design fields** – List inputs, validation rules, success messaging.
2. **Schema** – Create/extend `features/<feature>/schemas/<form>.schema.ts` with Zod.
3. **Action** – Implement `features/<feature>/actions/<form>.action.ts`:
   - Parse data with schema.
   - Call email/CRM helpers.
   - Return structured success/error responses.
   - Start the file with `'use server'` and export a single async function per form to keep Next.js Server Actions deterministic (Next.js Server Actions docs, v15.1.8).
   - After successful submissions, call `revalidatePath`/`revalidateTag` for any cached routes that should refresh (Next.js caching docs, v15.1.8).
4. **Hardening**
   - Update `next.config.ts` `experimental.serverActions.allowedOrigins` with the hostnames that can submit the form.
   - Add lightweight anti-spam (rate limiting, honeypot) and treat every action as a public endpoint—authorization happens server-side.
5. **UI** – Build form component inside the relevant section. Use shared input components.
   - Prefer shadcn/ui’s `<Form>`, `<FieldGroup>`, and `<FieldError>` components with `useActionState` so validation feedback and pending states remain accessible (shadcn/ui forms for Next.js, shadcn@3.5.0).
   - When triggering autosave or `onChange` actions, debounce calls to avoid spamming the server (Next.js Server Actions docs, v15.1.8).
6. **Environment** – Ensure required env vars exist and are documented in `stack/05-configuration.md` + `.env.example`.
7. **Testing** – Submit valid + invalid payloads locally. Confirm toast/confirmation behavior and email delivery.
   - Verify the router cache refreshes (navigate away/back) to confirm `revalidatePath` worked.

Reuse this SOP in any project where forms follow the same action/schema pattern.
