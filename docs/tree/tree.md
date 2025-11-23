# Project Tree Structure

Generated on: 2025-11-23 06:22:12

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
│   ├── contact/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── layout/
│   │   ├── head-tags.tsx
│   │   ├── skip-links.tsx
│   │   └── structured-data-config.ts
│   ├── services/
│   │   └── page.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── globals.css
│   ├── layout.tsx
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
│   │   ├── dual-cta-section.tsx
│   │   ├── location-map.tsx
│   │   ├── packages-carousel.tsx
│   │   ├── parking-dialog.tsx
│   │   ├── suspense-boundary.tsx
│   │   ├── testimonial-card.tsx
│   │   └── testimonials-carousel.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── animated-theme-toggler.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── blur-fade.tsx
│       ├── breadcrumb.tsx
│       ├── button-group.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel-dots.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── empty.tsx
│       ├── field.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-group.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── item.tsx
│       ├── kbd.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── section-header.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton-loader.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── spinner.tsx
│       ├── star-rating.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
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
│   │   ├── seo-content-optimization.md
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
│   │   └── tree.md
│   └── README.md
├── features/
│   ├── accessibility/
│   │   ├── sections/
│   │   │   └── content/
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
│   │   │   └── main/
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
│   │   ├── home.schema.ts
│   │   ├── index.ts
│   │   ├── page.tsx
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
│   ├── shared/
│   │   ├── hero.tsx
│   │   └── index.ts
│   └── terms/
│       ├── sections/
│       │   └── content/
│       │       ├── data.ts
│       │       └── index.tsx
│       ├── index.ts
│       ├── page.tsx
│       └── seo.ts
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
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── use-media-query.ts
│   │   ├── use-mobile.ts
│   │   ├── use-scroll-lock.ts
│   │   ├── use-tabs.ts
│   │   └── use-touch-gestures.ts
│   ├── seo/
│   │   ├── index.ts
│   │   ├── metadata.ts
│   │   ├── og-image.ts
│   │   ├── structured-data.ts
│   │   └── types.ts
│   ├── types/
│   │   ├── config.types.ts
│   │   └── global.types.ts
│   ├── utils/
│   │   ├── animations.ts
│   │   ├── colors.ts
│   │   ├── form-helpers.ts
│   │   ├── gallery.ts
│   │   ├── heading-validator.ts
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
│   ├── fonts/
│   │   └── Cormorant_Garamond/
│   │       ├── static/
│   │       │   ├── CormorantGaramond-Bold.ttf
│   │       │   ├── CormorantGaramond-BoldItalic.ttf
│   │       │   ├── CormorantGaramond-Italic.ttf
│   │       │   ├── CormorantGaramond-Light.ttf
│   │       │   ├── CormorantGaramond-LightItalic.ttf
│   │       │   ├── CormorantGaramond-Medium.ttf
│   │       │   ├── CormorantGaramond-MediumItalic.ttf
│   │       │   ├── CormorantGaramond-Regular.ttf
│   │       │   ├── CormorantGaramond-SemiBold.ttf
│   │       │   └── CormorantGaramond-SemiBoldItalic.ttf
│   │       ├── CormorantGaramond-Italic-VariableFont_wght.ttf
│   │       ├── CormorantGaramond-VariableFont_wght.ttf
│   │       ├── OFL.txt
│   │       └── README.txt
│   ├── geist-icons/
│   │   ├── accessibility-unread.svg
│   │   ├── accessibility.svg
│   │   ├── acronym-api.svg
│   │   ├── acronym-csv.svg
│   │   ├── acronym-gif.svg
│   │   ├── acronym-http.svg
│   │   ├── acronym-isr.svg
│   │   ├── acronym-jpg.svg
│   │   ├── acronym-js.svg
│   │   ├── acronym-json.svg
│   │   ├── acronym-markdown.svg
│   │   ├── acronym-page.svg
│   │   ├── acronym-ppr.svg
│   │   ├── acronym-svg.svg
│   │   ├── acronym-ts.svg
│   │   ├── agent.svg
│   │   ├── agents.svg
│   │   ├── alignment-center.svg
│   │   ├── alignment-left.svg
│   │   ├── alignment-right.svg
│   │   ├── alpha.svg
│   │   ├── analytics.svg
│   │   ├── anchor.svg
│   │   ├── api.svg
│   │   ├── archive.svg
│   │   ├── arrow-circle-down.svg
│   │   ├── arrow-circle-fill-down-right.svg
│   │   ├── arrow-circle-fill-up-right.svg
│   │   ├── arrow-circle-left.svg
│   │   ├── arrow-circle-right.svg
│   │   ├── arrow-circle-up.svg
│   │   ├── arrow-crossed.svg
│   │   ├── arrow-down-left.svg
│   │   ├── arrow-down-right.svg
│   │   ├── arrow-down.svg
│   │   ├── arrow-globe.svg
│   │   ├── arrow-left-right.svg
│   │   ├── arrow-left.svg
│   │   ├── arrow-move-unread.svg
│   │   ├── arrow-move.svg
│   │   ├── arrow-right.svg
│   │   ├── arrow-up-diagonal-scale-small.svg
│   │   ├── arrow-up-diagonal-scale.svg
│   │   ├── arrow-up-down.svg
│   │   ├── arrow-up-left.svg
│   │   ├── arrow-up-right-small.svg
│   │   ├── arrow-up-right.svg
│   │   ├── arrow-up.svg
│   │   ├── asterisk-small.svg
│   │   ├── asterisk.svg
│   │   ├── backspace.svg
│   │   ├── bar-chart.svg
│   │   ├── beaker-flask.svg
│   │   ├── bell-off.svg
│   │   ├── bell.svg
│   │   ├── blend-mode.svg
│   │   ├── blob.svg
│   │   ├── book-closed.svg
│   │   ├── book-open.svg
│   │   ├── bookmark.svg
│   │   ├── botid.svg
│   │   ├── box.svg
│   │   ├── brain.svg
│   │   ├── branch-minus.svg
│   │   ├── branch-plus.svg
│   │   ├── briefcase.svg
│   │   ├── browser-arc.svg
│   │   ├── browser-brave.svg
│   │   ├── browser-chrome.svg
│   │   ├── browser-edge.svg
│   │   ├── browser-firefox.svg
│   │   ├── browser-opera.svg
│   │   ├── browser-safari.svg
│   │   ├── bug.svg
│   │   ├── buildings.svg
│   │   ├── cache.svg
│   │   ├── calculator.svg
│   │   ├── calendar.svg
│   │   ├── camera.svg
│   │   ├── canary-bird.svg
│   │   ├── cart.svg
│   │   ├── chart-activity.svg
│   │   ├── chart-bar-middle.svg
│   │   ├── chart-bar-peak.svg
│   │   ├── chart-bar-random.svg
│   │   ├── chart-pie.svg
│   │   ├── chart-trending-down.svg
│   │   ├── chart-trending-up.svg
│   │   ├── check-circle-fill.svg
│   │   ├── check-circle.svg
│   │   ├── check-square-fill.svg
│   │   ├── check-square.svg
│   │   ├── check.svg
│   │   ├── chevron-circle-down-fill.svg
│   │   ├── chevron-circle-down.svg
│   │   ├── chevron-circle-left-fill.svg
│   │   ├── chevron-circle-left.svg
│   │   ├── chevron-circle-right-fill.svg
│   │   ├── chevron-circle-right.svg
│   │   ├── chevron-circle-up-down.svg
│   │   ├── chevron-circle-up-fill.svg
│   │   ├── chevron-circle-up.svg
│   │   ├── chevron-double-down.svg
│   │   ├── chevron-double-left.svg
│   │   ├── chevron-double-right.svg
│   │   ├── chevron-double-up.svg
│   │   ├── chevron-down-small.svg
│   │   ├── chevron-down.svg
│   │   ├── chevron-left-small.svg
│   │   ├── chevron-left.svg
│   │   ├── chevron-right-small.svg
│   │   ├── chevron-right.svg
│   │   ├── chevron-up-down.svg
│   │   ├── chevron-up-small.svg
│   │   ├── chevron-up.svg
│   │   ├── clipboard.svg
│   │   ├── clock-dashed.svg
│   │   ├── clock-rewind.svg
│   │   ├── clock-small.svg
│   │   ├── clock.svg
│   │   ├── closed-captions.svg
│   │   ├── cloud-download.svg
│   │   ├── cloud-upload.svg
│   │   ├── cloud.svg
│   │   ├── code-block.svg
│   │   ├── code-bracket.svg
│   │   ├── code-wrap.svg
│   │   ├── code.svg
│   │   ├── codepen.svg
│   │   ├── coins.svg
│   │   ├── command.svg
│   │   ├── compass.svg
│   │   ├── connection.svg
│   │   ├── copy-small.svg
│   │   ├── copy.svg
│   │   ├── corner-down-left.svg
│   │   ├── corner-down-right.svg
│   │   ├── corner-left-down.svg
│   │   ├── corner-left-up.svg
│   │   ├── corner-right-down.svg
│   │   ├── corner-right-up.svg
│   │   ├── corner-up-left.svg
│   │   ├── corner-up-right.svg
│   │   ├── cpu.svg
│   │   ├── credit-card.svg
│   │   ├── crop.svg
│   │   ├── cross-circle-fill.svg
│   │   ├── cross-circle.svg
│   │   ├── cross-small.svg
│   │   ├── cross.svg
│   │   ├── crosshair.svg
│   │   ├── cursor-click.svg
│   │   ├── cursor.svg
│   │   ├── data-cache.svg
│   │   ├── data-point-low.svg
│   │   ├── data-point-medium.svg
│   │   ├── data-point.svg
│   │   ├── database.svg
│   │   ├── delta.svg
│   │   ├── device-alternate-small.svg
│   │   ├── device-alternate.svg
│   │   ├── device-desktop.svg
│   │   ├── device-phone.svg
│   │   ├── display.svg
│   │   ├── dollar-fill.svg
│   │   ├── dollar.svg
│   │   ├── double-check.svg
│   │   ├── download.svg
│   │   ├── droplet.svg
│   │   ├── edge-cache.svg
│   │   ├── edge-config.svg
│   │   ├── edge.svg
│   │   ├── email.svg
│   │   ├── envelope.svg
│   │   ├── external-small.svg
│   │   ├── external.svg
│   │   ├── eye-dashed.svg
│   │   ├── eye-off.svg
│   │   ├── eye.svg
│   │   ├── face-happy.svg
│   │   ├── face-plus.svg
│   │   ├── face-sad.svg
│   │   ├── face-smile.svg
│   │   ├── face-unhappy.svg
│   │   ├── file-dependency.svg
│   │   ├── file-dependent.svg
│   │   ├── file-text.svg
│   │   ├── file-zip.svg
│   │   ├── file.svg
│   │   ├── filter-small.svg
│   │   ├── filter.svg
│   │   ├── fingerprint.svg
│   │   ├── firewall-check.svg
│   │   ├── firewall-flame.svg
│   │   ├── firewall-globe.svg
│   │   ├── flag-priority.svg
│   │   ├── flag.svg
│   │   ├── floppy-disk.svg
│   │   ├── fluid.svg
│   │   ├── folder-closed.svg
│   │   ├── folder-dependency.svg
│   │   ├── folder-dependent.svg
│   │   ├── folder-minus.svg
│   │   ├── folder-open.svg
│   │   ├── folder-plus.svg
│   │   ├── footer.svg
│   │   ├── forward10-seconds.svg
│   │   ├── fulcrum.svg
│   │   ├── fullscreen-close.svg
│   │   ├── fullscreen.svg
│   │   ├── function-bun-monochrome.svg
│   │   ├── function-bun.svg
│   │   ├── function-edge-color.svg
│   │   ├── function-edge.svg
│   │   ├── function-go.svg
│   │   ├── function-middleware.svg
│   │   ├── function-n.svg
│   │   ├── function-node.svg
│   │   ├── function-python.svg
│   │   ├── function-rectangle-fill.svg
│   │   ├── function-rectangle.svg
│   │   ├── function-ruby.svg
│   │   ├── function-rust.svg
│   │   ├── function-square.svg
│   │   ├── function.svg
│   │   ├── gauge.svg
│   │   ├── git-branch-slash.svg
│   │   ├── git-branch.svg
│   │   ├── git-commit.svg
│   │   ├── git-merge.svg
│   │   ├── git-pull-request.svg
│   │   ├── globe-box.svg
│   │   ├── globe-slash.svg
│   │   ├── globe.svg
│   │   ├── gps.svg
│   │   ├── grid-masonry.svg
│   │   ├── grid-square.svg
│   │   ├── hash.svg
│   │   ├── header.svg
│   │   ├── headset.svg
│   │   ├── heart-fill.svg
│   │   ├── heart.svg
│   │   ├── home.svg
│   │   ├── hook.svg
│   │   ├── image-generation.svg
│   │   ├── image.svg
│   │   ├── inbox-unread.svg
│   │   ├── inbox.svg
│   │   ├── information-fill-small.svg
│   │   ├── information-fill.svg
│   │   ├── information.svg
│   │   ├── inspect.svg
│   │   ├── invoice.svg
│   │   ├── isr.svg
│   │   ├── key-old.svg
│   │   ├── key.svg
│   │   ├── kv.svg
│   │   ├── lambda-rectangle-fill.svg
│   │   ├── lambda-rectangle.svg
│   │   ├── lambda.svg
│   │   ├── layers.svg
│   │   ├── layout-dashed.svg
│   │   ├── layout-shift-unread.svg
│   │   ├── layout-shift.svg
│   │   ├── layout.svg
│   │   ├── lens.svg
│   │   ├── lifebuoy.svg
│   │   ├── lightning.svg
│   │   ├── line-chart.svg
│   │   ├── link.svg
│   │   ├── linked.svg
│   │   ├── linkedin.svg
│   │   ├── list-filter.svg
│   │   ├── list-ordered.svg
│   │   ├── list-unordered.svg
│   │   ├── loader-circle.svg
│   │   ├── location.svg
│   │   ├── lock-closed-small.svg
│   │   ├── lock-closed.svg
│   │   ├── lock-open-small.svg
│   │   ├── lock-open.svg
│   │   ├── logo-amex.svg
│   │   ├── logo-angular-color.svg
│   │   ├── logo-apple.svg
│   │   ├── logo-astro.svg
│   │   ├── logo-azure-devops.svg
│   │   ├── logo-azure.svg
│   │   ├── logo-bitbucket-color.svg
│   │   ├── logo-bitbucket-monochrome.svg
│   │   ├── logo-bluesky.svg
│   │   ├── logo-bun-monochrome.svg
│   │   ├── logo-bun.svg
│   │   ├── logo-checkly.svg
│   │   ├── logo-cloudflare-monochrome.svg
│   │   ├── logo-cloudflare.svg
│   │   ├── logo-contentful.svg
│   │   ├── logo-data-dog.svg
│   │   ├── logo-discord.svg
│   │   ├── logo-ember.svg
│   │   ├── logo-facebook-messenger.svg
│   │   ├── logo-facebook.svg
│   │   ├── logo-figma.svg
│   │   ├── logo-gatsby.svg
│   │   ├── logo-geist.svg
│   │   ├── logo-github-small.svg
│   │   ├── logo-github.svg
│   │   ├── logo-gitlab-monochrome.svg
│   │   ├── logo-gitlab.svg
│   │   ├── logo-google-cloud-platform.svg
│   │   ├── logo-google.svg
│   │   ├── logo-growthbook-monochrome.svg
│   │   ├── logo-growthbook.svg
│   │   ├── logo-hugo.svg
│   │   ├── logo-hypertune.svg
│   │   ├── logo-launchdarkly.svg
│   │   ├── logo-linear.svg
│   │   ├── logo-linkedin-small.svg
│   │   ├── logo-mastercard.svg
│   │   ├── logo-meta.svg
│   │   ├── logo-new-relic.svg
│   │   ├── logo-next.svg
│   │   ├── logo-node.svg
│   │   ├── logo-nuxt.svg
│   │   ├── logo-open-ai.svg
│   │   ├── logo-openfeature.svg
│   │   ├── logo-optimizely-monochrome.svg
│   │   ├── logo-optimizely.svg
│   │   ├── logo-posthog-monochrome.svg
│   │   ├── logo-posthog.svg
│   │   ├── logo-python-monochrome.svg
│   │   ├── logo-python.svg
│   │   ├── logo-react.svg
│   │   ├── logo-reddit.svg
│   │   ├── logo-reflag.svg
│   │   ├── logo-remix.svg
│   │   ├── logo-rust.svg
│   │   ├── logo-sanity.svg
│   │   ├── logo-slack-color.svg
│   │   ├── logo-slack.svg
│   │   ├── logo-solid.svg
│   │   ├── logo-splitbee.svg
│   │   ├── logo-statsig.svg
│   │   ├── logo-svelte.svg
│   │   ├── logo-turbopack.svg
│   │   ├── logo-turborepo.svg
│   │   ├── logo-twitter-x-small.svg
│   │   ├── logo-twitter-x.svg
│   │   ├── logo-twitter.svg
│   │   ├── logo-v0.svg
│   │   ├── logo-vercel-api.svg
│   │   ├── logo-vercel-circle.svg
│   │   ├── logo-vercel-fill.svg
│   │   ├── logo-vercel.svg
│   │   ├── logo-visa.svg
│   │   ├── logo-vite.svg
│   │   ├── logo-vue.svg
│   │   ├── logo-whats-app.svg
│   │   ├── logo-y-combinator.svg
│   │   ├── logo-youtube-small.svg
│   │   ├── logout.svg
│   │   ├── logs.svg
│   │   ├── magnifying-glass-minus.svg
│   │   ├── magnifying-glass-plus.svg
│   │   ├── magnifying-glass-small.svg
│   │   ├── magnifying-glass.svg
│   │   ├── menu-alt-unread.svg
│   │   ├── menu-alt.svg
│   │   ├── menu.svg
│   │   ├── message-typing.svg
│   │   ├── message.svg
│   │   ├── microfrontends.svg
│   │   ├── microphone-off.svg
│   │   ├── microphone.svg
│   │   ├── middleware.svg
│   │   ├── minus-circle.svg
│   │   ├── minus-square-small.svg
│   │   ├── minus.svg
│   │   ├── monitoring.svg
│   │   ├── moon-alternate.svg
│   │   ├── moon-small.svg
│   │   ├── moon.svg
│   │   ├── more-horizontal.svg
│   │   ├── more-vertical.svg
│   │   ├── music.svg
│   │   ├── musical-notes.svg
│   │   ├── network-device.svg
│   │   ├── notebook.svg
│   │   ├── notes.svg
│   │   ├── notification.svg
│   │   ├── option.svg
│   │   ├── paper-airplane.svg
│   │   ├── paperclip.svg
│   │   ├── pause-circle.svg
│   │   ├── pause.svg
│   │   ├── pen.svg
│   │   ├── pencil-edit.svg
│   │   ├── pencil.svg
│   │   ├── percentage.svg
│   │   ├── phone.svg
│   │   ├── picture-in-picture.svg
│   │   ├── pin.svg
│   │   ├── play-circle.svg
│   │   ├── play-fill.svg
│   │   ├── play.svg
│   │   ├── plus-circle.svg
│   │   ├── plus-square-small.svg
│   │   ├── plus.svg
│   │   ├── postgres.svg
│   │   ├── power.svg
│   │   ├── preview-document.svg
│   │   ├── preview-eye.svg
│   │   ├── prism-color.svg
│   │   ├── prism.svg
│   │   ├── puzzle.svg
│   │   ├── question-fill.svg
│   │   ├── question.svg
│   │   ├── rainbow-triangle.svg
│   │   ├── refresh-clockwise.svg
│   │   ├── refresh-counter-clockwise.svg
│   │   ├── repositories.svg
│   │   ├── rewind10-seconds.svg
│   │   ├── robot.svg
│   │   ├── rotate-clockwise.svg
│   │   ├── rotate-counter-clockwise.svg
│   │   ├── route.svg
│   │   ├── router.svg
│   │   ├── rss.svg
│   │   ├── scroll.svg
│   │   ├── secure-connection.svg
│   │   ├── serverless.svg
│   │   ├── servers.svg
│   │   ├── settings-gear-fill.svg
│   │   ├── settings-gear.svg
│   │   ├── settings-slider.svg
│   │   ├── settings-sliders.svg
│   │   ├── share-alt.svg
│   │   ├── share.svg
│   │   ├── shareplay.svg
│   │   ├── shield-check-fill.svg
│   │   ├── shield-check.svg
│   │   ├── shield-globe.svg
│   │   ├── shield-off.svg
│   │   ├── shield-small.svg
│   │   ├── shield.svg
│   │   ├── shift.svg
│   │   ├── sidebar-left.svg
│   │   ├── sidebar-right.svg
│   │   ├── sign-in.svg
│   │   ├── skip-back-fill.svg
│   │   ├── skip-back.svg
│   │   ├── skip-forward-fill.svg
│   │   ├── skip-forward.svg
│   │   ├── slash-back.svg
│   │   ├── slash-forward.svg
│   │   ├── slash.svg
│   │   ├── sort-ascending.svg
│   │   ├── sort-descending.svg
│   │   ├── spaces.svg
│   │   ├── sparkles.svg
│   │   ├── speaker-fill.svg
│   │   ├── speaker-off-fill.svg
│   │   ├── speaker-off.svg
│   │   ├── speaker-volume-loud-fill.svg
│   │   ├── speaker-volume-loud.svg
│   │   ├── speaker-volume-quiet-fill.svg
│   │   ├── speaker-volume-quiet.svg
│   │   ├── speaker.svg
│   │   ├── spiral.svg
│   │   ├── star-fill.svg
│   │   ├── star.svg
│   │   ├── status-bordered.svg
│   │   ├── status-small.svg
│   │   ├── status.svg
│   │   ├── stop-circle.svg
│   │   ├── stop-fill.svg
│   │   ├── stop.svg
│   │   ├── stopwatch-fast.svg
│   │   ├── stopwatch-unread.svg
│   │   ├── stopwatch.svg
│   │   ├── store.svg
│   │   ├── sun-alternate.svg
│   │   ├── sun-small.svg
│   │   ├── sun.svg
│   │   ├── tab.svg
│   │   ├── tablet-device.svg
│   │   ├── tabs.svg
│   │   ├── tag.svg
│   │   ├── target.svg
│   │   ├── terminal-window.svg
│   │   ├── terminal.svg
│   │   ├── text-bold.svg
│   │   ├── text-format.svg
│   │   ├── text-heading.svg
│   │   ├── text-italic.svg
│   │   ├── text-strikethrough.svg
│   │   ├── text-title.svg
│   │   ├── text-uppercase.svg
│   │   ├── thumb-down.svg
│   │   ├── thumb-up.svg
│   │   ├── toggle-off-alt-unread.svg
│   │   ├── toggle-off-alt.svg
│   │   ├── toggle-off.svg
│   │   ├── toggle-on-alt-unread.svg
│   │   ├── toggle-on-alt.svg
│   │   ├── toggle-on.svg
│   │   ├── toolbar.svg
│   │   ├── traces.svg
│   │   ├── trash.svg
│   │   ├── user-check.svg
│   │   ├── user-cross.svg
│   │   ├── user-link.svg
│   │   ├── user-minus.svg
│   │   ├── user-passkey-fill.svg
│   │   ├── user-passkey.svg
│   │   ├── user-plus.svg
│   │   ├── user-screen.svg
│   │   ├── user-settings.svg
│   │   ├── user.svg
│   │   ├── users.svg
│   │   ├── variable.svg
│   │   ├── vercel-agent.svg
│   │   ├── verified-check-fill.svg
│   │   ├── verified-check.svg
│   │   ├── video.svg
│   │   ├── warning-fill.svg
│   │   ├── warning.svg
│   │   ├── webcam-off.svg
│   │   ├── webcam.svg
│   │   ├── webhook.svg
│   │   ├── window-advanced.svg
│   │   ├── window-critical.svg
│   │   ├── window-globe.svg
│   │   ├── window-variable.svg
│   │   ├── window.svg
│   │   ├── workflow.svg
│   │   ├── wrench.svg
│   │   └── zero-config.svg
│   ├── icons/
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
│   ├── free-parking-sign.svg
│   ├── google-logo.svg
│   ├── Placeholder_view_vector.svg
│   └── Victoria_Park_Nails_Spa_Logo_Primary_small.png
├── report/
│   └── md
├── scripts/
│   ├── backup-project.py
│   ├── fresh-install.py
│   ├── README.md
│   └── update-service-images.py
├── .env.local
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── COLOR_AUDIT_REPORT.md
├── components.json
├── eslint.config.mjs
├── new-price.md
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── tsconfig.json
└── UI_UX_AUDIT_REPORT.md
```

---

**Total items:** 1009
