# Playbook · Add Analytics Tracking

## 1. Update Config

```ts
// lib/config/site.config.ts
export const siteConfig = {
  analytics: {
    googleAnalyticsId: 'G-XXXXXXX',
    enableAnalytics: true,
  },
}
```

- Store every tracking ID in config so sections/components can read them consistently.

## 2. Environment Variables

```
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
```

- Mirror the same vars in your hosting platform (Vercel/Netlify dashboard).

## 3. Scripts/Providers

- The template already ships with analytics providers in the main layout; enabling the config flag and env var is usually enough.
- If you add a new provider, implement it under `components/providers/analytics-provider.tsx` and keep it tree-shakeable.

## 4. Verification

- [ ] `npm run lint && npm run type-check`
- [ ] Browser devtools show the analytics script only when `enableAnalytics` is true
- [ ] Network tab confirms hits after navigation (GA debug view is your friend)
- [ ] No analytics code runs in local/staging unless explicitly enabled

Document any additional providers in the PR description for future reference.
