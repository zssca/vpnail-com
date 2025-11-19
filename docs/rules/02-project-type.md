# Project Type · SSG + Minimal Server

This template assumes a static-first architecture with minimal server usage. Understanding this is essential before touching any page code.

## What This Project Is

- **Static Site Generation by default** – all marketing pages render at build time from `.ts` data files.
- **Server Actions only for forms/email** – runtime code is limited to form submission and email sending.
- **No API routes for display data** – anything a user reads on a page should come from static data, not live fetches.

The result is a static marketing site that behaves like a fast, predictable appliance.

## Architecture Decision

- Use static generation for all display pages and marketing routes.
- Keep all business/config data inside `lib/config/site.config.ts` and section `data.ts` files.
- Use Server Actions **only** in `features/marketing/[feature]/actions/*.action.ts` for:
  - Contact and booking forms
  - Email sending
  - Server-side validation and side effects

Do not introduce API routes just to move data around—render it at build time instead.

## Benefits

- **Performance** – typical responses in the 10–30ms range thanks to static HTML.
- **SEO** – fully rendered pages with consistent metadata and predictable URLs.
- **Cost** – static hosting and minimal server usage keep hosting bills low.
- **Security** – fewer moving parts and no runtime database surface for marketing content.

## Build Time vs Runtime

- **Build time** – Next.js reads config and data `.ts` files, generates HTML for each page, and writes it to the `out/` directory.
- **Runtime** – the host serves static files; only Server Actions run on form submissions or similar events.

If something can be known at build time, it belongs in config or `data.ts`, not in a runtime fetch.

## When to Use Server Actions

Use a Server Action when:

- You need to handle a form submission (contact, consultation, booking).
- You must send an email using the data from a user.
- You need server-side validation or tagging that cannot happen purely at build time.

Never use Server Actions or API routes just to load static display content. Keep the display path static, and reserve runtime for mutations and emails only.

