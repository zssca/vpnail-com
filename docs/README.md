# Documentation Overview

This `docs/` directory is a reusable knowledge base for static-first marketing sites built with Next.js, shadcn/ui, and Resend. Copy the entire directory into similar projects to enforce the same rules and playbooks.

## Structure

- `stack/` – canonical rules organized by topic (overview through task triage)
- `playbooks/` – repeatable SOPs for the most common tasks
- `prompts/` – fill-in templates for scoped AI or contractor briefs
- `templates/` – copy/paste boilerplates for sections and documentation

## Usage

1. **Read `stack/00-overview.md`** to understand the stack, hosting, and runtime assumptions.
2. **Follow the numbered stack rules** before touching architecture, content, or runtime code.
3. **Open the relevant playbook** for concrete, step-by-step instructions.
4. **Use prompts/templates** whenever you assign work to an AI or collaborator.
5. **Revisit `stack/04` + `stack/06` before forms or caching work**—they document the current Next.js 16 guidance: hardened Server Actions, `'use cache'` + `cacheComponents` for Partial Pre-Rendering, React Compiler defaults, and shadcn/ui form/theming expectations (Sources: Next.js 16 release notes & docs, shadcn/ui docs shadcn@3.5.0).

> Tip: keep `AGENT.md` in the repo root pointing back to this folder so every contributor starts here.
