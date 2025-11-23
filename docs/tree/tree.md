# Project Tree Structure

Generated on: 2025-11-21 20:07:29

Excluded directories: .claude, .git, .next, __pycache__, build, dist, node_modules

```
vpnail-com/
├── .vscode/
│   └── settings.json
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
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── consultation/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── contact/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── gallery/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── layout/
│   │   ├── head-tags.tsx
│   │   ├── skip-links.tsx
│   │   └── structured-data-config.ts
│   ├── services/
│   │   ├── loading.tsx
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
│   │   ├── header/
│   │   │   ├── desktop-nav.tsx
│   │   │   ├── header-logo.tsx
│   │   │   └── mobile-menu.tsx
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
│   │   ├── location-map.tsx
│   │   ├── service-card.tsx
│   │   ├── suspense-boundary.tsx
│   │   └── testimonial-card.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── animated-tab.tsx
│       ├── animated-theme-toggler.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── form.tsx
│       ├── icon-colored.tsx
│       ├── input.tsx
│       ├── item.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── section-header.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton-loader.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── star-rating.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
├── docs/
│   ├── playbooks/
│   │   ├── add-page.md
│   │   ├── add-section.md
│   │   ├── add-service.md
│   │   ├── form-setup.md
│   │   ├── localization.md
│   │   ├── seo-pass.md
│   │   └── update-content.md
│   ├── prompts/
│   │   ├── compliance-audit.md
│   │   ├── feature-template.md
│   │   └── task-template.md
│   ├── stack/
│   │   ├── 00-overview.md
│   │   ├── 01-architecture.md
│   │   ├── 02-content-data.md
│   │   ├── 03-components-ui.md
│   │   ├── 04-actions-runtime.md
│   │   ├── 05-configuration.md
│   │   ├── 06-performance-seo.md
│   │   ├── 07-a11y-brand.md
│   │   ├── 08-task-guide.md
│   │   ├── checklists.md
│   │   └── glossary.md
│   ├── templates/
│   │   ├── playbook-template.md
│   │   ├── section-component.tsx.txt
│   │   └── section-data.ts.txt
│   ├── tree/
│   └── README.md
├── features/
│   ├── about/
│   │   ├── sections/
│   │   │   ├── credentials/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── cta/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── hero/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── location/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── philosophy/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── stats/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── story/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── testimonials/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── values/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   └── who-we-serve/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   └── seo.ts
│   ├── accessibility/
│   │   ├── sections/
│   │   │   └── content/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   └── seo.ts
│   ├── consultation/
│   │   ├── sections/
│   │   │   ├── cta/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── hero/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── journey/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   └── types/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   └── seo.ts
│   ├── contact/
│   │   ├── actions/
│   │   │   └── send-email.action.ts
│   │   ├── schemas/
│   │   │   └── contact.schema.ts
│   │   ├── sections/
│   │   │   ├── contact-info/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── faqs/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── form/
│   │   │   │   ├── data.ts
│   │   │   │   ├── form-fields.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── use-form-submission.tsx
│   │   │   ├── hero/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── hours/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── location/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   └── methods/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   └── seo.ts
│   ├── gallery/
│   │   ├── sections/
│   │   │   ├── cta/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── data.ts
│   │   │   │   ├── gallery-grid.tsx
│   │   │   │   ├── gallery-image-item.tsx
│   │   │   │   ├── gallery-lightbox.tsx
│   │   │   │   ├── gallery-pagination.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── lightbox-navigation.tsx
│   │   │   └── hero/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   └── seo.ts
│   ├── home/
│   │   ├── sections/
│   │   │   ├── combinations/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── cta/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── features/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── data.ts
│   │   │   │   ├── gallery-grid.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── hero/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── local-seo/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── services/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── team/
│   │   │   │   ├── data.ts
│   │   │   │   ├── index.tsx
│   │   │   │   └── types.ts
│   │   │   └── testimonials/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   ├── schema.ts
│   │   └── seo.ts
│   ├── privacy/
│   │   ├── sections/
│   │   │   └── content/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   └── seo.ts
│   ├── services/
│   │   ├── sections/
│   │   │   ├── combinations/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── comparison/
│   │   │   │   ├── data.ts
│   │   │   │   ├── index.tsx
│   │   │   │   └── types.ts
│   │   │   ├── cta/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── faqs/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── hero/
│   │   │   │   ├── data.ts
│   │   │   │   └── index.tsx
│   │   │   ├── services-grid/
│   │   │   │   ├── data.ts
│   │   │   │   ├── index.tsx
│   │   │   │   └── types.ts
│   │   │   └── testimonials/
│   │   │       ├── data.ts
│   │   │       └── index.tsx
│   │   ├── index.ts
│   │   ├── page.tsx
│   │   └── seo.ts
│   └── terms/
│       ├── sections/
│       │   └── content/
│       │       ├── data.ts
│       │       └── index.tsx
│       ├── index.ts
│       ├── page.tsx
│       └── seo.ts
├── hooks/
│   └── use-tabs.tsx
├── lib/
│   ├── config/
│   │   ├── analytics.config.ts
│   │   ├── fonts.config.ts
│   │   ├── metadata.config.ts
│   │   ├── nav.config.ts
│   │   ├── seo.config.ts
│   │   ├── site.config.ts
│   │   └── theme.config.ts
│   ├── constants/
│   │   └── routes.ts
│   ├── email/
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── README.md
│   │   ├── RESEND-SETUP.md
│   │   ├── resend.ts
│   │   └── templates.ts
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── use-media-query.ts
│   │   ├── use-scroll-lock.ts
│   │   └── use-touch-gestures.ts
│   ├── seo/
│   │   ├── index.ts
│   │   ├── metadata.ts
│   │   ├── og-image.ts
│   │   ├── structured-data.ts
│   │   └── types.ts
│   ├── types/
│   │   └── global.types.ts
│   ├── utils/
│   │   ├── animations.ts
│   │   ├── form-helpers.ts
│   │   ├── gallery.ts
│   │   ├── heading-validator.ts
│   │   ├── image-placeholder.ts
│   │   ├── image.ts
│   │   └── index.ts
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
│   ├── README.md
│   └── update-service-images.py
├── .env.local
├── .gitignore
├── AGENTS.md
├── build-errors.log
├── CLAUDE.md
├── components.json
├── eslint.config.mjs
├── lint-errors.log
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── TODO-FULL-AUDIT.md
└── tsconfig.json
```

---

**Total items:** 500
