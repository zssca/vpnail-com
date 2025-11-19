# Project Tree Structure

Generated on: 2025-11-19 03:54:33

Excluded directories: .claude, .git, .next, __pycache__, build, dist, node_modules

```
vpnail-com/
├── app/
│   ├── (legal)/
│   │   ├── accessibility/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── areas/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── consultation/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── gallery/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── opengraph-image.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layouts/
│   │   ├── announcement-banner.tsx
│   │   ├── breadcrumbs.tsx
│   │   ├── container.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── index.ts
│   │   ├── section.tsx
│   │   └── sticky-bottom-nav.tsx
│   ├── providers/
│   │   ├── analytics-events.tsx
│   │   ├── client-only.tsx
│   │   ├── index.ts
│   │   ├── theme-provider.tsx
│   │   └── toast-provider.tsx
│   ├── seo/
│   │   ├── google-tag-manager.tsx
│   │   ├── index.ts
│   │   ├── meta-tags.tsx
│   │   └── structured-data.tsx
│   ├── shared/
│   │   └── location-map.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── animated-theme-toggler.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── typography.tsx
├── docs/
│   ├── rules/
│   │   ├── nextjs/
│   │   │   ├── 01-core-updates.md
│   │   │   ├── 02-breaking-changes.md
│   │   │   ├── 03-rendering-patterns.md
│   │   │   ├── 04-data-and-caching.md
│   │   │   └── 05-migration-checklist.md
│   │   ├── tasks/
│   │   │   ├── deployment/
│   │   │   │   ├── 01-pre-deploy-qa.md
│   │   │   │   └── 02-deploy.md
│   │   │   ├── development/
│   │   │   │   ├── 01-add-page.md
│   │   │   │   ├── 02-add-section.md
│   │   │   │   ├── 03-update-content.md
│   │   │   │   └── 04-contact-form.md
│   │   │   ├── optimization/
│   │   │   │   └── 01-performance.md
│   │   │   ├── setup/
│   │   │   │   ├── 01-initial-setup.md
│   │   │   │   ├── 02-email-config.md
│   │   │   │   └── 03-analytics.md
│   │   │   └── README.md
│   │   ├── 01-start-here.md
│   │   ├── 02-project-type.md
│   │   ├── 03-architecture.md
│   │   ├── 04-file-organization.md
│   │   ├── 05-golden-rules.md
│   │   ├── 06-anti-patterns.md
│   │   ├── 07-nextjs-essentials.md
│   │   ├── 08-task-guide.md
│   │   └── README.md
│   ├── shadcn-components-docs/
│   │   ├── accordion.md
│   │   ├── alert-dialog.md
│   │   ├── alert.md
│   │   ├── aspect-ratio.md
│   │   ├── avatar.md
│   │   ├── badge.md
│   │   ├── breadcrumb.md
│   │   ├── button.md
│   │   ├── calendar.md
│   │   ├── card.md
│   │   ├── carousel.md
│   │   ├── chart.md
│   │   ├── checkbox.md
│   │   ├── collapsible.md
│   │   ├── combobox.md
│   │   ├── command.md
│   │   ├── context-menu.md
│   │   ├── data-table.md
│   │   ├── date-picker.md
│   │   ├── dialog.md
│   │   ├── drawer.md
│   │   ├── dropdown-menu.md
│   │   ├── empty.md
│   │   ├── field.md
│   │   ├── form.md
│   │   ├── hover-card.md
│   │   ├── input-group.md
│   │   ├── input-otp.md
│   │   ├── input.md
│   │   ├── item.md
│   │   ├── kbd.md
│   │   ├── label.md
│   │   ├── menubar.md
│   │   ├── navigation-menu.md
│   │   ├── pagination.md
│   │   ├── popover.md
│   │   ├── progress.md
│   │   ├── radio-group.md
│   │   ├── resizable.md
│   │   ├── scroll-area.md
│   │   ├── select.md
│   │   ├── separator.md
│   │   ├── sheet.md
│   │   ├── sidebar.md
│   │   ├── skeleton.md
│   │   ├── slider.md
│   │   ├── sonner.md
│   │   ├── spinner.md
│   │   ├── switch.md
│   │   ├── table.md
│   │   ├── tabs.md
│   │   ├── textarea.md
│   │   ├── toast.md
│   │   ├── toggle-group.md
│   │   ├── toggle.md
│   │   ├── tooltip.md
│   │   └── typography.md
│   └── tree/
├── features/
│   ├── about/
│   │   ├── sections/
│   │   │   ├── credentials/
│   │   │   │   ├── credentials.data.ts
│   │   │   │   ├── credentials.tsx
│   │   │   │   └── index.ts
│   │   │   ├── cta/
│   │   │   │   ├── cta.data.ts
│   │   │   │   ├── cta.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hero/
│   │   │   │   ├── hero.data.ts
│   │   │   │   ├── hero.tsx
│   │   │   │   └── index.ts
│   │   │   ├── location/
│   │   │   │   ├── index.ts
│   │   │   │   ├── location.data.ts
│   │   │   │   └── location.tsx
│   │   │   ├── philosophy/
│   │   │   │   ├── index.ts
│   │   │   │   ├── philosophy.data.ts
│   │   │   │   └── philosophy.tsx
│   │   │   ├── stats/
│   │   │   │   ├── index.ts
│   │   │   │   ├── stats.data.ts
│   │   │   │   └── stats.tsx
│   │   │   ├── story/
│   │   │   │   ├── index.ts
│   │   │   │   ├── story.data.ts
│   │   │   │   └── story.tsx
│   │   │   ├── testimonials/
│   │   │   │   ├── index.ts
│   │   │   │   ├── testimonials.data.ts
│   │   │   │   └── testimonials.tsx
│   │   │   ├── values/
│   │   │   │   ├── index.ts
│   │   │   │   ├── values.data.ts
│   │   │   │   └── values.tsx
│   │   │   └── who-we-serve/
│   │   │       ├── index.ts
│   │   │       ├── who-we-serve.data.ts
│   │   │       └── who-we-serve.tsx
│   │   ├── about-page.tsx
│   │   ├── about.seo.ts
│   │   └── index.ts
│   ├── accessibility/
│   │   ├── sections/
│   │   │   └── content/
│   │   │       ├── content.data.ts
│   │   │       ├── content.tsx
│   │   │       └── index.ts
│   │   ├── accessibility-page.tsx
│   │   ├── accessibility.seo.ts
│   │   └── index.ts
│   ├── area-detail/
│   │   ├── area-detail-page.tsx
│   │   ├── area-detail.data.ts
│   │   ├── area-detail.seo.ts
│   │   └── index.ts
│   ├── areas/
│   │   ├── sections/
│   │   │   └── hero/
│   │   │       ├── hero.data.ts
│   │   │       ├── hero.tsx
│   │   │       └── index.ts
│   │   ├── areas-page.tsx
│   │   ├── areas.seo.ts
│   │   └── index.ts
│   ├── consultation/
│   │   ├── sections/
│   │   │   ├── cta/
│   │   │   │   ├── cta.data.ts
│   │   │   │   ├── cta.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hero/
│   │   │   │   ├── hero.data.ts
│   │   │   │   ├── hero.tsx
│   │   │   │   └── index.ts
│   │   │   ├── journey/
│   │   │   │   ├── index.ts
│   │   │   │   ├── journey.data.ts
│   │   │   │   └── journey.tsx
│   │   │   └── types/
│   │   │       ├── index.ts
│   │   │       ├── types.data.ts
│   │   │       └── types.tsx
│   │   ├── consultation-page.tsx
│   │   ├── consultation.seo.ts
│   │   └── index.ts
│   ├── contact/
│   │   ├── actions/
│   │   │   └── send-email.action.ts
│   │   ├── schemas/
│   │   │   └── contact.schema.ts
│   │   ├── sections/
│   │   │   ├── contact-info/
│   │   │   │   ├── contact-info.data.ts
│   │   │   │   ├── contact-info.tsx
│   │   │   │   └── index.ts
│   │   │   ├── faqs/
│   │   │   │   ├── faqs.data.ts
│   │   │   │   ├── faqs.tsx
│   │   │   │   └── index.ts
│   │   │   ├── form/
│   │   │   │   ├── form.data.ts
│   │   │   │   ├── form.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hero/
│   │   │   │   ├── hero.data.ts
│   │   │   │   ├── hero.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hours/
│   │   │   │   ├── hours.data.ts
│   │   │   │   ├── hours.tsx
│   │   │   │   └── index.ts
│   │   │   ├── location/
│   │   │   │   ├── index.ts
│   │   │   │   ├── location.data.ts
│   │   │   │   └── location.tsx
│   │   │   └── methods/
│   │   │       ├── index.ts
│   │   │       ├── methods.data.ts
│   │   │       └── methods.tsx
│   │   ├── contact-page.tsx
│   │   ├── contact.seo.ts
│   │   └── index.ts
│   ├── gallery/
│   │   ├── sections/
│   │   │   ├── cta/
│   │   │   │   ├── cta.data.ts
│   │   │   │   ├── cta.tsx
│   │   │   │   └── index.ts
│   │   │   ├── gallery/
│   │   │   │   ├── gallery-grid.tsx
│   │   │   │   ├── gallery.data.ts
│   │   │   │   ├── gallery.tsx
│   │   │   │   └── index.ts
│   │   │   └── hero/
│   │   │       ├── hero.data.ts
│   │   │       ├── hero.tsx
│   │   │       └── index.ts
│   │   ├── gallery-page.tsx
│   │   ├── gallery.seo.ts
│   │   └── index.ts
│   ├── home/
│   │   ├── sections/
│   │   │   ├── combinations/
│   │   │   │   ├── combinations.data.ts
│   │   │   │   ├── combinations.tsx
│   │   │   │   └── index.ts
│   │   │   ├── cta/
│   │   │   │   ├── cta.data.ts
│   │   │   │   ├── cta.tsx
│   │   │   │   └── index.ts
│   │   │   ├── features/
│   │   │   │   ├── features.data.ts
│   │   │   │   ├── features.tsx
│   │   │   │   └── index.ts
│   │   │   ├── gallery/
│   │   │   │   ├── gallery-grid.tsx
│   │   │   │   ├── gallery.data.ts
│   │   │   │   ├── gallery.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hero/
│   │   │   │   ├── hero.data.ts
│   │   │   │   ├── hero.tsx
│   │   │   │   └── index.ts
│   │   │   ├── local-seo/
│   │   │   │   ├── index.ts
│   │   │   │   ├── local-seo.data.ts
│   │   │   │   └── local-seo.tsx
│   │   │   ├── services/
│   │   │   │   ├── index.ts
│   │   │   │   ├── services.data.ts
│   │   │   │   └── services.tsx
│   │   │   ├── team/
│   │   │   │   ├── index.ts
│   │   │   │   ├── team.data.ts
│   │   │   │   ├── team.tsx
│   │   │   │   └── team.types.ts
│   │   │   └── testimonials/
│   │   │       ├── index.ts
│   │   │       ├── testimonials.data.ts
│   │   │       └── testimonials.tsx
│   │   ├── home-page.tsx
│   │   ├── home.data.ts
│   │   ├── home.seo.ts
│   │   └── index.ts
│   ├── privacy/
│   │   ├── sections/
│   │   │   └── content/
│   │   │       ├── content.data.ts
│   │   │       ├── content.tsx
│   │   │       └── index.ts
│   │   ├── index.ts
│   │   ├── privacy-page.tsx
│   │   └── privacy.seo.ts
│   ├── services/
│   │   ├── sections/
│   │   │   ├── combinations/
│   │   │   │   ├── combinations.data.ts
│   │   │   │   ├── combinations.tsx
│   │   │   │   └── index.ts
│   │   │   ├── cta/
│   │   │   │   ├── cta.data.ts
│   │   │   │   ├── cta.tsx
│   │   │   │   └── index.ts
│   │   │   ├── faqs/
│   │   │   │   ├── faqs.data.ts
│   │   │   │   ├── faqs.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hero/
│   │   │   │   ├── hero.data.ts
│   │   │   │   ├── hero.tsx
│   │   │   │   └── index.ts
│   │   │   ├── services-grid/
│   │   │   │   ├── index.ts
│   │   │   │   ├── services-grid.data.ts
│   │   │   │   ├── services-grid.tsx
│   │   │   │   └── services-grid.types.ts
│   │   │   └── testimonials/
│   │   │       ├── index.ts
│   │   │       ├── testimonials.data.ts
│   │   │       └── testimonials.tsx
│   │   ├── index.ts
│   │   ├── services-page.tsx
│   │   ├── services.seo.ts
│   │   └── services.types.ts
│   └── terms/
│       ├── sections/
│       │   └── content/
│       │       ├── content.data.ts
│       │       ├── content.tsx
│       │       └── index.ts
│       ├── index.ts
│       ├── terms-page.tsx
│       └── terms.seo.ts
├── hooks/
│   ├── use-mobile.ts
│   └── use-mobile.tsx
├── lib/
│   ├── config/
│   │   ├── analytics.config.ts
│   │   ├── fonts.config.ts
│   │   ├── metadata.config.ts
│   │   ├── nav.config.ts
│   │   ├── seo.config.ts
│   │   └── site.config.ts
│   ├── constants/
│   │   └── routes.ts
│   ├── email/
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── README.md
│   │   ├── RESEND-SETUP.md
│   │   ├── resend.ts
│   │   └── templates.ts
│   ├── seo/
│   │   ├── constants.ts
│   │   ├── index.ts
│   │   ├── metadata.ts
│   │   ├── og-image.ts
│   │   ├── structured-data.ts
│   │   └── types.ts
│   ├── types/
│   │   └── global.types.ts
│   ├── gallery.ts
│   ├── image-placeholder.ts
│   └── utils.ts
├── public/
│   ├── favicons/
│   │   ├── android-icon-144x144.png
│   │   ├── android-icon-192x192.png
│   │   ├── android-icon-36x36.png
│   │   ├── android-icon-48x48.png
│   │   ├── android-icon-72x72.png
│   │   ├── android-icon-96x96.png
│   │   ├── apple-icon-114x114.png
│   │   ├── apple-icon-120x120.png
│   │   ├── apple-icon-144x144.png
│   │   ├── apple-icon-152x152.png
│   │   ├── apple-icon-180x180.png
│   │   ├── apple-icon-57x57.png
│   │   ├── apple-icon-60x60.png
│   │   ├── apple-icon-72x72.png
│   │   ├── apple-icon-76x76.png
│   │   ├── apple-icon-precomposed.png
│   │   ├── apple-icon.png
│   │   ├── browserconfig.xml
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon-96x96.png
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   ├── ms-icon-144x144.png
│   │   ├── ms-icon-150x150.png
│   │   ├── ms-icon-310x310.png
│   │   └── ms-icon-70x70.png
│   ├── images/
│   │   ├── gallery/
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-1.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-10.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-11.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-12.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-13.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-14.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-15.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-16.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-17.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-18.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-19.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-2.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-20.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-21.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-22.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-23.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-24.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-25.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-26.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-27.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-28.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-29.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-3.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-30.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-31.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-32.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-33.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-34.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-35.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-36.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-37.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-38.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-39.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-4.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-40.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-41.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-42.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-43.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-44.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-45.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-46.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-47.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-48.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-49.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-5.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-50.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-51.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-52.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-53.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-54.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-6.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-7.webp
│   │   │   ├── victoria-park-nails-calgary-luxury-gel-manicure-8.webp
│   │   │   └── victoria-park-nails-calgary-luxury-gel-manicure-9.webp
│   │   ├── home-hero-001.webp
│   │   └── victoria-park-nails-street-shot.webp
│   ├── videos/
│   │   ├── hero-bg-video-001.mp4
│   │   ├── hero-bg-video-002.mp4
│   │   ├── hero-bg-video-003.mp4
│   │   └── hero-bg-video-004.mp4
│   ├── avatar-placeholder.webp
│   ├── google-logo.svg
│   ├── Placeholder_view_vector.svg
│   └── Victoria_Park_Nails_Spa_Logo_Primary_small.png
├── scripts/
│   ├── backup-project.py
│   ├── fresh-install.py
│   ├── generate-tree.py
│   └── README.md
├── .env.local
├── .gitignore
├── CLAUDE.md
├── code-audit-prompt.md
├── components.json
├── eslint.config.mjs
├── middleware.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

**Total items:** 557
