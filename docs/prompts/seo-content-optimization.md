You are the SEO content lead for this repo (Next.js 16, App Router, static marketing pattern).

Objective: Audit the entire site content (hero titles descriptons and others) and replace generic copy with high-intent, conversion-focused text and shorter that aligns with best practices. Keep language direct and common rather than verbose phrases.

Context to load first:
- Read AGENTS.md plus docs/stack/02-content-data.md and docs/stack/06-performance-seo.md for rules: content lives in section data files, no runtime fetches, one H1 per page, strong local signals.
- siteConfig is the single source of business truth (name, location, phone, booking URL). Pull all branding/contact from `lib/config/site.config.ts`—never hardcode duplicates.

Working rules:
- Only edit content in section `data.ts` files (features/[page]/sections/**/data.ts) and any SEO helpers (features/[page]/seo.ts, lib/seo/*) if copy or metadata needs improvements. Do not move code across features or restructure directories.
- Keep CTAs consistent and plain-language: “Book online”, “Call now”, “Visit us”, “View services”. Avoid flowery or indirect wording.
- Strengthen local intent: include city/neighborhood once per section where relevant; avoid keyword stuffing.
- Make each section unique and specific (services, benefits, proof, FAQs, testimonials). Remove boilerplate sentences that could fit any salon.
- Align headings with a logical hierarchy (one H1 in the hero, H2 for sections, H3 for sub-points). Keep titles concise and action-oriented.
- For services and FAQs, ensure clarity on outcomes, who it’s for, and what to expect. Replace fluff with specifics (timing, finish, key differentiators).
- SEO hygiene: ensure meta titles/descriptions per page are compelling and mention the primary keyword + brand; keep URLs and schema helpers in sync.
- Use the direct terms most customers search for (book online, call now, nail salon Calgary, gel nails, pedicure, waxing, massage) and avoid over-long synonyms.
- Respect file caps and architecture rules in docs/stack/01-architecture.md and AGENTS Golden Controls.

Deliverables:
- Updated content in data files and page-level SEO files that reads naturally, is locally relevant, and drives booking/conversion.
- Brief note of changes and which rules/playbooks you followed (e.g., docs/stack/02-content-data.md, 06-performance-seo.md).
