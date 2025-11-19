# Playbook · Email + Environment Configuration

Use this when onboarding a new client or rotating secrets.

## 1. Client Config

- Update `site.config.ts` sections `business`, `contact`, `email`, and `analytics`.
- Keep derived config files (site, nav, email) reading from the updated values—avoid copy/paste duplication.

## 2. Resend / SMTP Settings

- Add the API key to `.env.local` as `RESEND_API_KEY=...` (or the SMTP equivalent the project expects).
- Never commit `.env*` files; verify `.gitignore` already covers them.

## 3. Email Templates

- Open `emails/templates/contact-notification.tsx` (and any other template) and ensure the copy reflects the new business info.
- Check that the template imports any required values from `site.config.ts` rather than literals.

## 4. Utility Hooks

- Inspect helpers under `lib/email/` or `lib/utils/email.ts` and make sure they load sender/recipient names from config.
- When adding new helpers, keep them pure, typed, and colocated with existing email utilities.

## 5. Verification

- [ ] `.env.local` contains all required keys (Resend, GA, analytics IDs)
- [ ] `npm run lint` and `npm run type-check` pass (catches missing env declarations)
- [ ] Local test submission reaches the configured inbox (Resend dashboard or SMTP logs)
- [ ] Secrets are referenced via `process.env.*` only inside server code (Server Actions, utils)

After these checks, follow `tasks/contact-form.md` or `tasks/deploy.md` depending on your goal.
