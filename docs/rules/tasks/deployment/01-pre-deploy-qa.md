# Playbook · QA Before Hand-off

Run this checklist before you call a task “done.”

## Automated Checks

- [ ] `npm run lint`
- [ ] `npm run type-check`
- [ ] `npm run build`
- [ ] `npm run start` (smoke test the static output)

## Functional Checks

- [ ] Every marketing route loads (/, /about, /services, /contact, etc.)
- [ ] Navigation + footer links resolve correctly
- [ ] Forms submit successfully (and show error states when invalid)
- [ ] Images and icons render without 404s
- [ ] Metadata/title/description look correct in page source

## Responsive Sweep

Test at 320px, 768px, 1024px, and 1440px widths:
- [ ] Hero sections scale without clipping text
- [ ] Grids stack properly on mobile
- [ ] Buttons stay tappable (min 44px height)

## Content Integrity

- [ ] `rg "Old Client"` returns nothing
- [ ] Phone numbers/addresses all match the new config
- [ ] Section ordering matches the approved layout

## Observability

- [ ] Console is free of errors and warnings
- [ ] Network tab shows no failed requests
- [ ] Lighthouse score ≥ 90 on performance/accessibility/best practices/SEO (desktop)

Capture screenshots or notes for anything unusual and attach them to the ticket/PR.
