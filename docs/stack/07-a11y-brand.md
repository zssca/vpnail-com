# 07 · Accessibility & Brand Voice

Make accessibility and brand alignment non-negotiable across all projects.

## Accessibility Checklist

- Semantic HTML for every section (`<section aria-labelledby>` when needed).
- Visible focus states; rely on Tailwind focus utilities instead of removing outlines.
- Color contrast ≥ WCAG AA (use theming tokens to enforce).
- Provide `aria-live` regions for form success/error states.
- Ensure interactive components receive keyboard support (e.g., accordions, carousels).

## Brand Voice

- Tone: compassionate clinical expertise with faith-forward reassurance (tweak per brand brief).
- Vocabulary: “clients” or “patients” consistently; avoid switching mid-page.
- CTAs: Actionable (“Book a Consultation”), never vague (“Click Here”).

## Typography & Color

- Typography scale defined in Tailwind config; do not invent ad-hoc font sizes.
- Color palette resides in design tokens; keep brand hex codes out of individual components unless prototyping.
- Lean on Tailwind utilities like `text-balance`, `text-wrap`, and `underline-offset-*` to keep long-form content legible without bespoke CSS (Tailwind docs).

Copy, adjust the voice descriptors for each brand, and keep the accessibility list identical for maximum reuse.
