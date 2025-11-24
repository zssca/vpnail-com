# Project Tree

root: /Users/afshin/Desktop/work/MannaHealth/mannahealth-ca
include: app, components, developer, features, lib, public
exclude: node_modules, .git, .next

```
app/
|-- (legal)/
|   |-- accessibility/
|   |   `-- page.tsx
|   |-- privacy/
|   |   `-- page.tsx
|   `-- terms/
|       `-- page.tsx
|-- (marketing)/
|   |-- about/
|   |   `-- page.tsx
|   |-- areas/
|   |   |-- [slug]/
|   |   |   `-- page.tsx
|   |   `-- page.tsx
|   |-- articles/
|   |   |-- [slug]/
|   |   |   `-- page.tsx
|   |   `-- page.tsx
|   |-- contact/
|   |   `-- page.tsx
|   |-- gallery/
|   |   `-- page.tsx
|   |-- services/
|   |   |-- [category]/
|   |   |   |-- [service]/
|   |   |   |   `-- page.tsx
|   |   |   `-- page.tsx
|   |   `-- page.tsx
|   `-- page.tsx
|-- (patient-flow)/
|   |-- booking/
|   |   `-- page.tsx
|   |-- consultation/
|   |   `-- page.tsx
|   `-- intake/
|       |-- consent/
|       |   `-- page.tsx
|       |-- medical-history/
|       |   `-- page.tsx
|       `-- page.tsx
|-- api/
|   `-- webhooks/
|       `-- square/
|           `-- route.ts
|-- error.tsx
|-- global-error.tsx
|-- globals.css
|-- layout.tsx
|-- not-found.tsx
|-- opengraph-image.tsx
`-- sitemap.ts

components/
|-- layouts/
|   |-- footer/
|   |   |-- sections/
|   |   |   |-- bottom-bar.tsx
|   |   |   |-- brand-section.tsx
|   |   |   |-- contact-section.tsx
|   |   |   `-- navigation-section.tsx
|   |   `-- index.tsx
|   |-- header/
|   |   |-- search-dialog/
|   |   |   |-- content.tsx
|   |   |   |-- empty-state.tsx
|   |   |   |-- index.tsx
|   |   |   |-- loading-state.tsx
|   |   |   |-- result-group.tsx
|   |   |   |-- result-item.tsx
|   |   |   |-- saved-search-group.tsx
|   |   |   |-- trigger.tsx
|   |   |   `-- types.ts
|   |   |-- actions.tsx
|   |   |-- desktop-nav.tsx
|   |   |-- index.tsx
|   |   |-- logo.tsx
|   |   `-- mobile-nav.tsx
|   |-- breadcrumbs.tsx
|   |-- container.tsx
|   |-- index.ts
|   |-- page-wrapper.tsx
|   `-- section.tsx
|-- providers/
|   |-- analytics-events.tsx
|   |-- client-only.tsx
|   |-- index.ts
|   |-- service-worker-provider.tsx
|   |-- theme-provider.tsx
|   `-- toast-provider.tsx
|-- seo/
|   |-- google-tag-manager.tsx
|   |-- index.ts
|   `-- structured-data.tsx
|-- shared/
|   |-- cta/
|   |   `-- index.tsx
|   |-- feedback/
|   |   |-- confirm-dialog.tsx
|   |   |-- empty-state.tsx
|   |   |-- error.tsx
|   |   |-- index.ts
|   |   `-- loading.tsx
|   |-- article-reading-progress.tsx
|   |-- article-toc-drawer.tsx
|   |-- booking-error-boundary.tsx
|   |-- button-group-input.tsx
|   |-- faq.tsx
|   |-- hero.tsx
|   |-- index.ts
|   |-- service-card.tsx
|   |-- service-navigation.tsx
|   |-- smart-link.tsx
|   |-- testimonials.tsx
|   `-- trust-signals.tsx
|-- ui/
|   |-- accordion.tsx
|   |-- alert-dialog.tsx
|   |-- alert.tsx
|   |-- animated-shiny-text.tsx
|   |-- animated-theme-toggler.tsx
|   |-- aspect-ratio.tsx
|   |-- avatar.tsx
|   |-- badge.tsx
|   |-- before-after.tsx
|   |-- blur-fade.tsx
|   |-- breadcrumb.tsx
|   |-- button-group.tsx
|   |-- button.tsx
|   |-- calendar.tsx
|   |-- card.tsx
|   |-- carousel.tsx
|   |-- chart.tsx
|   |-- checkbox.tsx
|   |-- collapsible.tsx
|   |-- command.tsx
|   |-- context-menu.tsx
|   |-- dialog.tsx
|   |-- drawer.tsx
|   |-- dropdown-menu.tsx
|   |-- empty.tsx
|   |-- field.tsx
|   |-- form.tsx
|   |-- hover-card.tsx
|   |-- index.ts
|   |-- input-group.tsx
|   |-- input-otp.tsx
|   |-- input.tsx
|   |-- item.tsx
|   |-- kbd.tsx
|   |-- label.tsx
|   |-- loading-indicator.tsx
|   |-- loading-skeleton.tsx
|   |-- menubar.tsx
|   |-- navigation-menu.tsx
|   |-- page-loading.tsx
|   |-- pagination.tsx
|   |-- popover.tsx
|   |-- progress.tsx
|   |-- radio-group.tsx
|   |-- resizable.tsx
|   |-- scroll-area.tsx
|   |-- scroll-progress.tsx
|   |-- scrollspy.tsx
|   |-- select.tsx
|   |-- separator.tsx
|   |-- sheet.tsx
|   |-- sidebar.tsx
|   |-- skeleton-card.tsx
|   |-- skeleton-form.tsx
|   |-- skeleton-image.tsx
|   |-- skeleton.tsx
|   |-- slider.tsx
|   |-- sonner.tsx
|   |-- spinner.tsx
|   |-- switch.tsx
|   |-- table.tsx
|   |-- tabs.tsx
|   |-- textarea.tsx
|   |-- toggle-group.tsx
|   |-- toggle.tsx
|   `-- tooltip.tsx
|-- calendar-18.tsx
`-- time-picker.tsx

developer/
|-- docs/
|   |-- development/
|   |   |-- content.md
|   |   |-- forms.md
|   |   |-- pages.md
|   |   |-- README.md
|   |   `-- sections.md
|   |-- guides/
|   |   |-- add-page.md
|   |   |-- add-section.md
|   |   |-- add-service.md
|   |   |-- form-setup.md
|   |   |-- localization.md
|   |   |-- README.md
|   |   |-- seo-pass.md
|   |   `-- update-content.md
|   |-- reference/
|   |   |-- configuration.md
|   |   |-- performance.md
|   |   |-- project-structure.md
|   |   |-- README.md
|   |   `-- styling.md
|   |-- templates/
|   |   |-- playbook-template.md
|   |   |-- section-component.tsx.txt
|   |   `-- section-data.ts.txt
|   |-- architecture.md
|   |-- getting-started.md
|   `-- README.md
|-- prompts/
|   |-- fix-codebase-ai.md
|   `-- README.md
|-- reports/
|   |-- docs-structure-report.md
|   |-- pricing-analysis.md
|   `-- README.md
|-- scripts/
|   |-- project-tree/
|   |   `-- generate_tree.py
|   |-- backup-project.py
|   |-- fresh-install.py
|   `-- update-service-images.py
|-- project-tree.md
`-- README.md

features/
|-- marketing/
|   |-- about/
|   |   |-- sections/
|   |   |   |-- credentials/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- philosophy/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- story/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- testimonials/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- values/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- who-we-serve/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- accessibility/
|   |   |-- sections/
|   |   |   |-- content/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- areas/
|   |   |-- data/
|   |   |   |-- areas/
|   |   |   |   |-- airdrie.ts
|   |   |   |   |-- altadore.ts
|   |   |   |   |-- aspen-woods.ts
|   |   |   |   |-- beltline.ts
|   |   |   |   |-- bowness.ts
|   |   |   |   |-- bragg-creek.ts
|   |   |   |   |-- bridgeland.ts
|   |   |   |   |-- chestermere.ts
|   |   |   |   |-- cochrane.ts
|   |   |   |   |-- cranston.ts
|   |   |   |   |-- crescent-heights.ts
|   |   |   |   |-- downtown-calgary.ts
|   |   |   |   |-- hillhurst.ts
|   |   |   |   |-- inglewood.ts
|   |   |   |   |-- kensington.ts
|   |   |   |   |-- mahogany.ts
|   |   |   |   |-- marda-loop.ts
|   |   |   |   |-- mission.ts
|   |   |   |   |-- okotoks.ts
|   |   |   |   |-- ramsay.ts
|   |   |   |   |-- redwood-meadows.ts
|   |   |   |   |-- rocky-view-county.ts
|   |   |   |   |-- seton.ts
|   |   |   |   |-- signal-hill.ts
|   |   |   |   |-- springbank.ts
|   |   |   |   `-- sunnyside.ts
|   |   |   `-- index.ts
|   |   |-- sections/
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- list/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- detail.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- articles/
|   |   |-- data/
|   |   |   |-- articles/
|   |   |   |   |-- acne-scarring-treatments.data.ts
|   |   |   |   |-- aesthetics-for-men.data.ts
|   |   |   |   |-- anti-aging-preventative-care.data.ts
|   |   |   |   |-- busy-mom-skincare-routine.data.ts
|   |   |   |   |-- combination-treatments.data.ts
|   |   |   |   |-- cost-value-aesthetic-treatments.data.ts
|   |   |   |   |-- exosome-science-breakthrough.data.ts
|   |   |   |   |-- hair-restoration-comparison.data.ts
|   |   |   |   |-- holistic-skin-health-approach.data.ts
|   |   |   |   |-- hormonal-acne-treatment.data.ts
|   |   |   |   |-- medical-weight-loss-journey.data.ts
|   |   |   |   |-- menopause-skin-changes.data.ts
|   |   |   |   |-- microblading-permanent-makeup.data.ts
|   |   |   |   |-- nutrition-skin-connection.data.ts
|   |   |   |   |-- postpartum-hair-loss-hope.data.ts
|   |   |   |   |-- pregnancy-safe-treatments.data.ts
|   |   |   |   |-- recovery-downtime.data.ts
|   |   |   |   |-- rosacea-management.data.ts
|   |   |   |   |-- seasonal-skincare.data.ts
|   |   |   |   |-- self-care-without-guilt.data.ts
|   |   |   |   |-- stress-skin-connection-mothers.data.ts
|   |   |   |   |-- stress-skin-connection.data.ts
|   |   |   |   |-- teen-acne-self-esteem.data.ts
|   |   |   |   |-- understanding-hair-growth-cycle.data.ts
|   |   |   |   `-- wedding-prep-aesthetics-timeline.data.ts
|   |   |   `-- index.ts
|   |   |-- sections/
|   |   |   |-- article-conclusion/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- article-content/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- article-header/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- article-key-takeaways/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- article-recommendations/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- article-scrollspy/
|   |   |   |   `-- index.tsx
|   |   |   |-- article-summary/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- articles-grid/
|   |   |   |   |-- article-card.tsx
|   |   |   |   |-- article-filters.tsx
|   |   |   |   |-- article-stats.tsx
|   |   |   |   |-- data.ts
|   |   |   |   |-- index.tsx
|   |   |   |   `-- lazy.tsx
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- detail.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- consultation/
|   |   |-- sections/
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- journey/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- testimonials/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- types/
|   |   |       |-- comparison-highlights.tsx
|   |   |       |-- comparison-table.tsx
|   |   |       |-- constants.ts
|   |   |       |-- data.ts
|   |   |       |-- detailed-card.tsx
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- contact/
|   |   |-- actions/
|   |   |   `-- send-email.action.ts
|   |   |-- schemas/
|   |   |   `-- contact.schema.ts
|   |   |-- sections/
|   |   |   |-- bento/
|   |   |   |   |-- constants.ts
|   |   |   |   |-- contact-form-card.tsx
|   |   |   |   |-- data.ts
|   |   |   |   |-- index.tsx
|   |   |   |   |-- live-support-card.tsx
|   |   |   |   `-- location-hours-cards.tsx
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- form/
|   |   |   |   |-- contact-text-field.tsx
|   |   |   |   |-- data.ts
|   |   |   |   |-- fields.tsx
|   |   |   |   |-- index.tsx
|   |   |   |   |-- lazy.tsx
|   |   |   |   |-- message-field.tsx
|   |   |   |   |-- service-field.tsx
|   |   |   |   |-- submit-button.tsx
|   |   |   |   |-- submit.ts
|   |   |   |   |-- types.ts
|   |   |   |   |-- use-contact-form.ts
|   |   |   |   `-- utils.ts
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- location/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- methods/
|   |   |   |   |-- availability-view.tsx
|   |   |   |   |-- constants.ts
|   |   |   |   |-- data.ts
|   |   |   |   |-- index.tsx
|   |   |   |   |-- location-cards.tsx
|   |   |   |   |-- method-card.tsx
|   |   |   |   `-- priority-method-card.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- gallery/
|   |   |-- sections/
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- gallery/
|   |   |   |   |-- data.ts
|   |   |   |   |-- index.tsx
|   |   |   |   `-- lazy.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- home/
|   |   |-- sections/
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- features/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- gallery-preview/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- pathways/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- results/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- services/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- privacy/
|   |   |-- sections/
|   |   |   |-- content/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- service-categories/
|   |   |-- sections/
|   |   |   |-- benefits/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- overview/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- process/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- services-list/
|   |   |       `-- index.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   |-- services/
|   |   |-- data/
|   |   |   |-- services/
|   |   |   |   |-- dermal-fillers/
|   |   |   |   |   |-- conversion.data.ts
|   |   |   |   |   |-- core.data.ts
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- science.data.ts
|   |   |   |   |   `-- seo.data.ts
|   |   |   |   |-- exosome-hair-restoration/
|   |   |   |   |   |-- conversion.data.ts
|   |   |   |   |   |-- core.data.ts
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- science.data.ts
|   |   |   |   |   `-- seo.data.ts
|   |   |   |   |-- neuromodulators/
|   |   |   |   |   |-- conversion.data.ts
|   |   |   |   |   |-- core.data.ts
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- science.data.ts
|   |   |   |   |   `-- seo.data.ts
|   |   |   |   |-- radiant-peel/
|   |   |   |   |   |-- conversion.data.ts
|   |   |   |   |   |-- core.data.ts
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- science.data.ts
|   |   |   |   |   `-- seo.data.ts
|   |   |   |   |-- renewal-facial/
|   |   |   |   |   |-- conversion.data.ts
|   |   |   |   |   |-- core.data.ts
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- science.data.ts
|   |   |   |   |   `-- seo.data.ts
|   |   |   |   |-- renewal-plus-prp/
|   |   |   |   |   |-- conversion.data.ts
|   |   |   |   |   |-- core.data.ts
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- science.data.ts
|   |   |   |   |   `-- seo.data.ts
|   |   |   |   |-- ritual-facial/
|   |   |   |   |   |-- conversion.data.ts
|   |   |   |   |   |-- core.data.ts
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- science.data.ts
|   |   |   |   |   `-- seo.data.ts
|   |   |   |   `-- sculptra-skin-boosters/
|   |   |   |       |-- conversion.data.ts
|   |   |   |       |-- core.data.ts
|   |   |   |       |-- index.ts
|   |   |   |       |-- science.data.ts
|   |   |   |       `-- seo.data.ts
|   |   |   |-- index.ts
|   |   |   `-- services-grid.ts
|   |   |-- sections/
|   |   |   |-- cta/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- detail/
|   |   |   |   |-- before-after/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- cta/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- faqs/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- gallery/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- hero/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- ingredients/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- intake-form/
|   |   |   |   |-- pricing/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- research/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- results/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- testimonials/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- treatment-info/
|   |   |   |   |   `-- index.tsx
|   |   |   |   |-- treatment-steps/
|   |   |   |   |   `-- index.tsx
|   |   |   |   `-- README.md
|   |   |   |-- faq/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- hero/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   |-- services-grid/
|   |   |   |   |-- data.ts
|   |   |   |   `-- index.tsx
|   |   |   `-- testimonials/
|   |   |       |-- data.ts
|   |   |       `-- index.tsx
|   |   |-- detail.tsx
|   |   |-- index.ts
|   |   |-- page.tsx
|   |   `-- seo.ts
|   `-- terms/
|       |-- sections/
|       |   |-- content/
|       |   |   |-- data.ts
|       |   |   `-- index.tsx
|       |   |-- cta/
|       |   |   |-- data.ts
|       |   |   `-- index.tsx
|       |   |-- faq/
|       |   |   |-- data.ts
|       |   |   `-- index.tsx
|       |   |-- hero/
|       |   |   |-- data.ts
|       |   |   `-- index.tsx
|       |   `-- testimonials/
|       |       |-- data.ts
|       |       `-- index.tsx
|       |-- index.ts
|       |-- page.tsx
|       `-- seo.ts
`-- patient-flow/
    |-- booking/
    |   |-- actions/
    |   |   |-- create-booking.ts
    |   |   |-- fetch-availability.action.ts
    |   |   `-- lookup-customer.action.ts
    |   |-- data/
    |   |-- sections/
    |   |   |-- booking-form/
    |   |   |   |-- booking-stepper.tsx
    |   |   |   |-- index.tsx
    |   |   |   |-- info-schema.ts
    |   |   |   `-- use-booking-flow.ts
    |   |   |-- datetime-step/
    |   |   |   `-- index.tsx
    |   |   |-- info-step/
    |   |   |   |-- components/
    |   |   |   |   |-- booking-summary-card.tsx
    |   |   |   |   `-- policy-notice.tsx
    |   |   |   |-- sections/
    |   |   |   |   |-- contact-section.tsx
    |   |   |   |   |-- details-section.tsx
    |   |   |   |   |-- emergency-section.tsx
    |   |   |   |   `-- preferences-section.tsx
    |   |   |   `-- index.tsx
    |   |   |-- service-step/
    |   |   |   `-- index.tsx
    |   |   `-- staff-step/
    |   |       `-- index.tsx
    |   |-- page.tsx
    |   `-- seo.ts
    |-- intake/
    |   |-- actions/
    |   |   `-- submit-intake.action.ts
    |   |-- schemas/
    |   |   |-- intake.schema.ts
    |   |   `-- intake.types.ts
    |   |-- sections/
    |   |   |-- consent/
    |   |   |   `-- index.tsx
    |   |   |-- medical-history/
    |   |   |   `-- index.tsx
    |   |   `-- use-intake-form.ts
    |   |-- page.tsx
    |   `-- seo.ts
    |-- intake-consent/
    |   |-- actions/
    |   |   `-- submit-intake.action.ts
    |   |-- schemas/
    |   |   |-- consent.schema.ts
    |   |   `-- consent.types.ts
    |   |-- sections/
    |   |   `-- consent/
    |   |       `-- index.tsx
    |   |-- page.tsx
    |   `-- seo.ts
    |-- intake-medical-history/
    |   |-- schemas/
    |   |   |-- medical-history.schema.ts
    |   |   `-- medical-history.types.ts
    |   |-- sections/
    |   |   `-- medical-history/
    |   |       `-- index.tsx
    |   |-- page.tsx
    |   `-- seo.ts
    `-- shared/
        `-- use-intake-state.ts

lib/
|-- booking/
|   `-- time.ts
|-- config/
|   |-- analytics.config.ts
|   |-- email.config.ts
|   |-- fonts.config.ts
|   |-- index.ts
|   |-- metadata.config.ts
|   |-- nav.config.ts
|   |-- performance.config.ts
|   |-- seo.config.ts
|   |-- service-categories.config.ts
|   `-- site.config.ts
|-- constants/
|   |-- index.ts
|   `-- routes.ts
|-- email/
|   `-- index.ts
|-- hooks/
|   |-- use-header-focus-recovery.ts
|   |-- use-header-scroll.ts
|   |-- use-intersection-observer.ts
|   |-- use-keyboard-shortcut.ts
|   |-- use-mobile.ts
|   |-- use-search-dialog.ts
|   `-- use-search-results.ts
|-- integrations/
|   `-- square.ts
|-- search/
|   |-- build-index.ts
|   |-- config.ts
|   |-- index.ts
|   `-- types.ts
|-- seo/
|   |-- constants.ts
|   |-- index.ts
|   |-- metadata.ts
|   |-- og-image.ts
|   |-- structured-data.ts
|   `-- types.ts
|-- types/
|   |-- areas.types.ts
|   |-- articles.types.ts
|   |-- content.types.ts
|   |-- global.types.ts
|   |-- index.ts
|   `-- services.types.ts
`-- utils/
    |-- email.ts
    |-- helpers.ts
    |-- image-optimization.ts
    |-- index.ts
    |-- navigation.ts
    `-- web-vitals.ts

public/
|-- documents/
|   |-- brochures/
|   |-- forms/
|   `-- policies/
|-- favicons/
|   |-- android-icon-192x192.png
|   |-- apple-icon-180x180.png
|   |-- favicon-16x16.png
|   |-- favicon-32x32.png
|   |-- favicon-96x96.png
|   |-- favicon.ico
|   |-- manifest.json
|   `-- ms-icon-144x144.png
|-- fonts/
|   |-- Lato/
|   |   |-- Lato-Black.ttf
|   |   |-- Lato-BlackItalic.ttf
|   |   |-- Lato-Bold.ttf
|   |   |-- Lato-BoldItalic.ttf
|   |   |-- Lato-Italic.ttf
|   |   |-- Lato-Light.ttf
|   |   |-- Lato-LightItalic.ttf
|   |   |-- Lato-Regular.ttf
|   |   |-- Lato-Thin.ttf
|   |   |-- Lato-ThinItalic.ttf
|   |   `-- OFL.txt
|   `-- Playfair_Display/
|       |-- static/
|       |   |-- PlayfairDisplay-Black.ttf
|       |   |-- PlayfairDisplay-BlackItalic.ttf
|       |   |-- PlayfairDisplay-Bold.ttf
|       |   |-- PlayfairDisplay-BoldItalic.ttf
|       |   |-- PlayfairDisplay-ExtraBold.ttf
|       |   |-- PlayfairDisplay-ExtraBoldItalic.ttf
|       |   |-- PlayfairDisplay-Italic.ttf
|       |   |-- PlayfairDisplay-Medium.ttf
|       |   |-- PlayfairDisplay-MediumItalic.ttf
|       |   |-- PlayfairDisplay-Regular.ttf
|       |   |-- PlayfairDisplay-SemiBold.ttf
|       |   `-- PlayfairDisplay-SemiBoldItalic.ttf
|       |-- OFL.txt
|       |-- PlayfairDisplay-Italic-VariableFont_wght.ttf
|       |-- PlayfairDisplay-VariableFont_wght.ttf
|       `-- README.txt
|-- icons/
|   |-- favicons/
|   |   |-- android-chrome-192x192.png
|   |   |-- android-chrome-512x512.png
|   |   |-- apple-touch-icon.png
|   |   |-- favicon-16x16.png
|   |   |-- favicon-32x32.png
|   |   |-- favicon.ico
|   |   `-- site.webmanifest
|   `-- social/
|       `-- whatsapp.svg
|-- images/
|   |-- brand/
|   |   `-- mannahealth-logo.png
|   |-- content/
|   |   |-- areas/
|   |   |   |-- airdrie/
|   |   |   |   `-- hero.webp
|   |   |   |-- altadore/
|   |   |   |   `-- hero.webp
|   |   |   |-- aspen-woods/
|   |   |   |   `-- hero.webp
|   |   |   |-- beltline/
|   |   |   |   `-- hero.webp
|   |   |   |-- bowness/
|   |   |   |   `-- hero.webp
|   |   |   |-- bragg-creek/
|   |   |   |   `-- hero.webp
|   |   |   |-- bridgeland/
|   |   |   |   `-- hero.webp
|   |   |   |-- chestermere/
|   |   |   |   `-- hero.webp
|   |   |   |-- cochrane/
|   |   |   |   `-- hero.webp
|   |   |   |-- cranston/
|   |   |   |   `-- hero.webp
|   |   |   |-- crescent-heights/
|   |   |   |   `-- hero.webp
|   |   |   |-- downtown-calgary/
|   |   |   |   `-- hero.webp
|   |   |   |-- hillhurst/
|   |   |   |   `-- hero.webp
|   |   |   |-- inglewood/
|   |   |   |   `-- hero.webp
|   |   |   |-- kensington/
|   |   |   |   `-- hero.webp
|   |   |   |-- mahogany/
|   |   |   |   `-- hero.webp
|   |   |   |-- marda-loop/
|   |   |   |   `-- hero.webp
|   |   |   |-- mission/
|   |   |   |   `-- hero.webp
|   |   |   |-- okotoks/
|   |   |   |   `-- hero.webp
|   |   |   |-- ramsay/
|   |   |   |   `-- hero.webp
|   |   |   |-- redwood-meadows/
|   |   |   |   `-- hero.webp
|   |   |   |-- rocky-view-county/
|   |   |   |   `-- hero.webp
|   |   |   |-- seton/
|   |   |   |   `-- hero.webp
|   |   |   |-- signal-hill/
|   |   |   |   `-- hero.webp
|   |   |   |-- springbank/
|   |   |   |   `-- hero.webp
|   |   |   `-- sunnyside/
|   |   |       `-- hero.webp
|   |   |-- articles/
|   |   |-- categories/
|   |   |   |-- facial-skin-treatments/
|   |   |   |   `-- facial-skin-treatments-001.webp
|   |   |   |-- hair-restoration/
|   |   |   |   |-- hair-restoration-001.webp
|   |   |   |   |-- hair-restoration-002.webp
|   |   |   |   |-- hair-restoration-003.webp
|   |   |   |   |-- hair-restoration-004.webp
|   |   |   |   |-- hair-restoration-005.webp
|   |   |   |   `-- hair-restoration-006.webp
|   |   |   |-- injectables-aesthetic-medicine/
|   |   |   |   |-- injectables-aesthetic-medicine-001.webp
|   |   |   |   |-- injectables-aesthetic-medicine-002.webp
|   |   |   |   |-- injectables-aesthetic-medicine-003.webp
|   |   |   |   |-- injectables-aesthetic-medicine-004.webp
|   |   |   |   `-- injectables-aesthetic-medicine-005.webp
|   |   |   `-- microneedling-regenerative/
|   |   |       |-- microneedling-regenerative-001.webp
|   |   |       |-- microneedling-regenerative-002.webp
|   |   |       |-- microneedling-regenerative-003.webp
|   |   |       |-- microneedling-regenerative-004.webp
|   |   |       |-- microneedling-regenerative-005.webp
|   |   |       `-- microneedling-regenerative-006.webp
|   |   |-- gallery/
|   |   |   |-- before-after/
|   |   |   |   |-- facials/
|   |   |   |   |-- hair-restoration/
|   |   |   |   |   |-- 001-after.webp
|   |   |   |   |   |-- 001-before.webp
|   |   |   |   |   |-- 002-after.webp
|   |   |   |   |   |-- 002-before.webp
|   |   |   |   |   |-- 003-after.webp
|   |   |   |   |   |-- 003-before.webp
|   |   |   |   |   |-- 004-after.webp
|   |   |   |   |   |-- 004-before.webp
|   |   |   |   |   |-- 005-after.webp
|   |   |   |   |   |-- 005-before.webp
|   |   |   |   |   |-- 007-after.webp
|   |   |   |   |   |-- 007-before.webp
|   |   |   |   |   |-- 008-after.webp
|   |   |   |   |   |-- 008-before.webp
|   |   |   |   |   |-- 009-after.webp
|   |   |   |   |   |-- 009-before.webp
|   |   |   |   |   |-- 010-after.webp
|   |   |   |   |   `-- 010-before.webp
|   |   |   |   |-- injectables/
|   |   |   |   |-- microneedling/
|   |   |   |   `-- skin-boosters/
|   |   |   `-- treatments/
|   |   |       |-- derive-hair-restoration.webp
|   |   |       |-- derive-hair-serum.webp
|   |   |       |-- exosome-hair-treatment.webp
|   |   |       |-- renewal-facial.webp
|   |   |       `-- ritual-facial.webp
|   |   |-- services/
|   |   |   |-- dermal-fillers/
|   |   |   |   |-- dermal-fillers-001.webp
|   |   |   |   |-- dermal-fillers-002.webp
|   |   |   |   |-- dermal-fillers-003.webp
|   |   |   |   |-- dermal-fillers-004.webp
|   |   |   |   |-- dermal-fillers-005.webp
|   |   |   |   `-- dermal-fillers-006.webp
|   |   |   |-- exosome-hair-restoration/
|   |   |   |   |-- exosome-hair-restoration-001.webp
|   |   |   |   |-- exosome-hair-restoration-002.webp
|   |   |   |   |-- exosome-hair-restoration-003.webp
|   |   |   |   |-- exosome-hair-restoration-004.webp
|   |   |   |   `-- exosome-hair-restoration-005.webp
|   |   |   |-- neuromodulators/
|   |   |   |   |-- neuromodulators-001.webp
|   |   |   |   |-- neuromodulators-002.webp
|   |   |   |   |-- neuromodulators-003.webp
|   |   |   |   |-- neuromodulators-004.webp
|   |   |   |   `-- neuromodulators-005.webp
|   |   |   |-- radiant-peel/
|   |   |   |   |-- radiant-peel-001.webp
|   |   |   |   |-- radiant-peel-002.webp
|   |   |   |   |-- radiant-peel-003.webp
|   |   |   |   |-- radiant-peel-004.webp
|   |   |   |   `-- radiant-peel-005.webp
|   |   |   |-- renewal-facial/
|   |   |   |   |-- renewal-facial-001.webp
|   |   |   |   |-- renewal-facial-002.webp
|   |   |   |   |-- renewal-facial-003.webp
|   |   |   |   |-- renewal-facial-004.webp
|   |   |   |   `-- renewal-facial-005.webp
|   |   |   |-- renewal-plus-prp/
|   |   |   |   |-- renewal-plus-prp-001.webp
|   |   |   |   |-- renewal-plus-prp-002.webp
|   |   |   |   |-- renewal-plus-prp-003.webp
|   |   |   |   |-- renewal-plus-prp-004.webp
|   |   |   |   `-- renewal-plus-prp-005.webp
|   |   |   |-- ritual-facial/
|   |   |   |   |-- ritual-facial-001.webp
|   |   |   |   |-- ritual-facial-002.webp
|   |   |   |   |-- ritual-facial-003.webp
|   |   |   |   |-- ritual-facial-004.webp
|   |   |   |   `-- ritual-facial-005.webp
|   |   |   `-- sculptra-skin-boosters/
|   |   |       |-- sculptra-skin-boosters-001.webp
|   |   |       |-- sculptra-skin-boosters-002.webp
|   |   |       |-- sculptra-skin-boosters-003.webp
|   |   |       |-- sculptra-skin-boosters-004.webp
|   |   |       |-- sculptra-skin-boosters-005.webp
|   |   |       |-- sculptra-skin-boosters-006.webp
|   |   |       |-- sculptra-skin-boosters-007.webp
|   |   |       |-- sculptra-skin-boosters-008.webp
|   |   |       |-- sculptra-skin-boosters-009.webp
|   |   |       `-- sculptra-skin-boosters-010.webp
|   |   `-- team/
|   |       `-- melissa-metz/
|   |           |-- melissa-metz-avatar.webp
|   |           `-- melissa-metz.webp
|   `-- ui/
|       |-- illustrations/
|       |-- patterns/
|       `-- placeholders/
|           |-- avatar-placeholder.svg
|           `-- placeholder.svg
|-- videos/
|   |-- about/
|   |-- heroes/
|   |   `-- home-hero.mp4
|   |-- testimonials/
|   `-- treatments/
|-- browserconfig.xml
|-- favicon.ico
|-- google-site-verification.html
|-- manifest.webmanifest
|-- offline.html
|-- robots.txt
`-- sw.js
```
