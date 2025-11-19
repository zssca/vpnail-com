# Playbook · Initial Project Setup

Use this when starting a new client project from the template.

## 1. Clone and Install

- Clone the repo from the canonical template source.
- Run `npm install` from the project root.

## 2. Verify Structure

- Confirm the folders match the architecture in `docs/rules/03-architecture.md`.
- Ensure `features/marketing/`, `lib/config/`, `components/`, and `app/` all exist as described.

## 3. Configure for Client

- Open `lib/config/site.config.ts` and update business, navigation, and analytics entries for the new client.
- Make sure no old client names or contact details remain.

## 4. Verify Build

- Run `npm run lint`, `npm run type-check`, and `npm run build`.
- Start the app locally and spot-check the main routes.

## 5. First Commit

- Initialize git if needed and create an initial commit with the client’s baseline configuration.

## Verification

- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] All primary marketing pages load locally without errors

