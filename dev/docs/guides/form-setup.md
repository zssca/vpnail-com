# Playbook · Form Setup

**Use when:** Adding or updating a form powered by Next.js Server Actions.

1) **Design fields** — Inputs, validation rules, success copy, and any CRM/email side effects.
2) **Schema** — Create/extend `features/<feature>/schemas/<form>.schema.ts` with Zod.
3) **Action** — Implement `features/<feature>/actions/<form>.action.ts`:
   - Start file with `'use server'`.
   - Parse `FormData` with the schema; return `{ success, errors, values }`.
   - Perform side effects (email/CRM) and call `revalidatePath`/`revalidateTag` for cached routes or tagged fetches.
4) **UI** — Build the form in the relevant section with shadcn/ui fields.
   - Prefer Server Actions + `useActionState` (`<Form action={...}>`, `<Field>`, `<FieldError>`) for accessible validation and pending states.
   - Use React Hook Form only when you need client-managed state; still render shadcn/ui `<FormField>`/`<FormMessage>`.
5) **Hardening**
   - Set `experimental.serverActions.allowedOrigins` in `next.config.ts`.
   - Add anti-spam (rate limit, honeypot) and treat every action as a public endpoint.
6) **Environment** — Document required env vars in `.env.example` + configuration docs.
7) **Testing** — Submit valid/invalid payloads locally; confirm success/error UI, email delivery, and that cached pages refresh after `revalidatePath`.

Reuse this SOP in any project where forms follow the same action/schema pattern.
