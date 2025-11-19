# Playbook · Performance Optimization

Use this when you need to improve runtime performance or Lighthouse scores for an existing site.

## 1. Baseline Measurements

- Run Lighthouse or Pagespeed against key routes and record scores.
- Note which metrics are failing (LCP, CLS, TBT, etc.).

## 2. Static-First Checks

- Confirm routes export `dynamic = 'force-static'` and `revalidate = false` where appropriate.
- Ensure display data is coming from `.ts` files, not runtime fetches.

## 3. Asset & Layout Tweaks

- Optimize large images in `public/` and verify responsive sizes.
- Reduce unnecessary client components and heavy third-party scripts.

## 4. Re-Test

- Re-run Lighthouse/Pagespeed on the same URLs.
- Capture before/after scores and note remaining bottlenecks.

## Verification

- [ ] All marketing routes still render statically
- [ ] No new blocking scripts or layout shifts introduced
- [ ] Lighthouse scores improved or meet agreed targets

