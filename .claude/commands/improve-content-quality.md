**Act as a content strategist and SEO specialist with expertise in healthcare marketing, brand voice development, user experience writing, and conversion optimization.** Your task is to comprehensively analyze all text content across the project and systematically improve it for better SEO performance, enhanced user experience, increased engagement, and consistent tone of voice—focusing specifically on keyword quality improvements and tone mastery throughout.

## Phase 1: Discovery & Analysis

**Begin by thoroughly analyzing the existing content across the entire project.** Do not make any changes yet. Instead:

1. **Read and catalog all content sources**: Examine `lib/config/site.config.ts` for site-wide content, then systematically review all `data.ts` files in every feature's sections folder (`features/marketing/*/sections/*/data.ts`). Document the current content patterns, structure, and keyword usage.

2. **Analyze tone of voice comprehensively**: Evaluate the current tone across all pages and sections. Identify tone inconsistencies, shifts in voice, formality mismatches, and emotional register variations. Assess whether the tone effectively balances professionalism with warmth, medical expertise with approachability, faith-based values with inclusivity, and business credibility with personal care. Determine if the tone resonates with the target audience (busy professionals, parents, caregivers) and reflects the unique mobile service model. Document where tone feels forced, generic, overly corporate, too casual, or misaligned with brand values.

3. **Assess SEO elements**: Review all `seo.ts` files at feature roots to evaluate meta titles, meta descriptions, Open Graph content, and keyword targeting. Identify gaps, redundancies, weak keyword choices, and missed optimization opportunities.

4. **Evaluate content quality**: Analyze each piece of content for clarity, readability, engagement, persuasiveness, medical/professional appropriateness, and alignment with user intent. Consider heading hierarchy, paragraph structure, sentence length, active vs passive voice, and emotional resonance.

5. **Identify keyword opportunities**: Discover primary and secondary keywords that should be naturally integrated based on the business context (mobile regenerative clinic, Calgary-specific services, nurse-led care, faith-based values). Evaluate current keyword density, placement, and natural language usage.

6. **Analyze user journey**: Understand how content guides users through awareness, consideration, and decision stages. Identify weak calls-to-action, unclear value propositions, missing trust signals, and gaps in information architecture.

7. **Present findings**: After your comprehensive analysis, create a prioritized improvement plan organized by impact and effort. Clearly identify which pages, sections, and content elements need the most attention and why—including specific tone issues that need addressing.

## Phase 2: Strategic Improvements

**After presenting your analysis and getting confirmation to proceed, systematically improve content quality across the project.**

### Tone & Voice Mastery:
- Establish and maintain a consistent, distinctive tone that reflects the brand identity across all touchpoints
- Balance professionalism with approachability—avoid sounding clinical or cold while maintaining credibility
- Infuse warmth and empathy appropriate for healthcare context without being overly sentimental
- Reflect the mobile service convenience and personalized care differentiator in the tone
- Ensure faith-based values come through subtly and inclusively without alienating non-religious audiences
- Adjust formality levels appropriately per page type (About = personal, Services = professional-friendly, Contact = welcoming)
- Eliminate generic corporate language and replace with authentic, human voice
- Create emotional connection through storytelling tone while maintaining trust and authority
- Ensure tone resonates specifically with target personas (busy professionals, parents, caregivers seeking convenience)
- Address tone inconsistencies between sections and pages for seamless brand experience
- Use language rhythm and pacing that feels natural when read aloud
- Adapt tone intensity appropriately (reassuring for concerns, energizing for benefits, confident for expertise)

### SEO Optimization Focus:
- Enhance keyword quality by naturally integrating relevant terms without overstuffing
- Optimize meta titles and descriptions for click-through rates while maintaining keyword relevance
- Improve heading hierarchy (H1, H2, H3) with keyword-rich, descriptive titles
- Strengthen internal linking through contextual anchor text
- Enhance semantic relevance by using related terms and natural language variations
- Optimize for featured snippets and local SEO where applicable
- Ensure content length and depth match search intent for target keywords

### UX Writing Excellence:
- Improve clarity and conciseness while maintaining warmth and professionalism
- Enhance scannability through better formatting, bullet points, and visual hierarchy
- Strengthen value propositions and unique differentiators
- Improve calls-to-action for better conversion potential
- Ensure consistency in tone, voice, and terminology across all pages
- Enhance readability scores while maintaining medical/professional credibility
- Add emotional connection points that resonate with target audience

### Content Quality Standards:
- Use active voice and strong action verbs
- Eliminate jargon while maintaining professional expertise
- Ensure accuracy and appropriateness for healthcare context
- Add specificity and concrete details over vague generalities
- Improve storytelling elements where appropriate
- Enhance trust signals through credible, reassuring language
- Optimize for mobile reading patterns

### Keyword Quality Improvements:
- Replace weak or generic keywords with more specific, high-intent alternatives
- Improve keyword placement in critical positions (titles, first paragraphs, headings)
- Enhance long-tail keyword coverage for niche services
- Optimize location-based keywords for Calgary neighborhoods and service areas
- Improve service-specific keyword integration across relevant pages
- Strengthen brand keyword associations
- Ensure natural keyword flow without forced or awkward phrasing

## Phase 3: Implementation & Validation

**Make improvements systematically, one feature at a time:**

1. Start with highest-impact pages (typically Home, Services, About)
2. Update content in `data.ts` files and `seo.ts` files
3. Preserve the project's architecture—never modify structure, only text content
4. Maintain consistency with business context (Manna Health's mobile, nurse-led, faith-based positioning)
5. After completing each page, briefly summarize the changes and improvements made
6. Continue through all pages until comprehensive content quality improvements are complete

## Critical Constraints:

- **Never modify project structure, component code, or styling**—only text content in data files and SEO files
- **Never add new files or folders**—work only with existing `data.ts` and `seo.ts` files
- **Preserve all existing data structure and TypeScript types**—only change text values
- **Never break existing imports or references**—maintain all function signatures and exports
- **Respect brand voice**: Professional yet approachable, warm yet credible, expert yet accessible
- **Healthcare compliance**: Ensure all medical claims are appropriate and not misleading
- **Maintain factual accuracy**: Never invent services, credentials, or details not in original content

## Success Criteria:

Your improvements should result in content that:
- **Has a distinctive, consistent tone** that feels authentically "Manna Health" across every page and section
- **Ranks better in search engines** through strategic keyword improvements and natural language optimization
- **Converts more visitors** through clearer value propositions, compelling CTAs, and persuasive tone
- **Builds deep trust** through professional yet warm, credible yet approachable, expert yet human language
- **Creates emotional resonance** with the target audience through tone that understands their needs and lifestyle
- **Engages and retains attention** through improved readability, scannability, and conversational flow
- **Reflects the unique brand personality**—mobile convenience, nurse-led expertise, faith-inspired care
- **Maintains perfect tone consistency** across all pages, sections, and content types
- **Balances multiple tone dimensions** skillfully without contradiction or awkwardness
- **Feels natural, human, and authentic**—never robotic, generic, corporate, or over-optimized
- **Speaks directly to personas** with language that resonates with busy professionals, parents, and caregivers

**Begin with Phase 1: Present your comprehensive analysis and improvement plan before making any changes.**
