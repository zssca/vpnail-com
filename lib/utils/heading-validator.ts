/**
 * Heading Hierarchy Validator
 * Ensures WCAG 1.3.1 compliance for heading structure
 *
 * Rules:
 * - Each page has exactly ONE H1
 * - Heading levels never skip (H1->H2->H3, never H1->H3)
 * - Section titles are H2
 * - Subsections are H3
 * - Card titles are H3 or H4 (depending on context)
 */

export interface HeadingError {
  level: number
  element: string
  issue: string
  suggestion: string
  line?: number
}

export class HeadingHierarchyValidator {
  private headings: Array<{ level: number; text: string }> = []
  private h1Count = 0
  private errors: HeadingError[] = []

  /**
   * Track a heading element
   */
  trackHeading(level: 1 | 2 | 3 | 4 | 5 | 6, text: string): void {
    this.headings.push({ level, text })

    if (level === 1) {
      this.h1Count++
    }
  }

  /**
   * Validate the complete heading structure
   */
  validate(): HeadingError[] {
    this.errors = []

    // Check for multiple H1s
    if (this.h1Count > 1) {
      this.errors.push({
        level: 1,
        element: 'page',
        issue: `Found ${this.h1Count} H1 elements, should have exactly 1`,
        suggestion: 'Remove extra H1 elements and use H2 instead'
      })
    }

    if (this.h1Count === 0) {
      this.errors.push({
        level: 1,
        element: 'page',
        issue: 'No H1 element found',
        suggestion: 'Add an H1 to the page hero or header section'
      })
    }

    // Check for level skipping
    let previousLevel = 0
    for (let i = 0; i < this.headings.length; i++) {
      const current = this.headings[i]

      if (previousLevel > 0 && current.level > previousLevel + 1) {
        this.errors.push({
          level: current.level,
          element: `H${current.level}`,
          issue: `Heading level jumped from H${previousLevel} to H${current.level}`,
          suggestion: `Use H${previousLevel + 1} instead of H${current.level}`
        })
      }

      previousLevel = current.level
    }

    return this.errors
  }

  /**
   * Check if structure is valid
   */
  isValid(): boolean {
    return this.validate().length === 0
  }

  /**
   * Get validation report
   */
  getReport(): string {
    const errors = this.validate()

    if (errors.length === 0) {
      return 'Heading hierarchy is valid (WCAG 1.3.1 compliant)'
    }

    return errors
      .map(
        (e) =>
          `${e.element}: ${e.issue}\n  Suggestion: ${e.suggestion}`
      )
      .join('\n\n')
  }
}

/**
 * Page hierarchy guide
 *
 * Each page should follow this structure:
 *
 * H1 - Page Title (Hero section)
 *   H2 - Section Title (Features, Services, etc)
 *     H3 - Subsection Title (Feature card, service detail)
 *       H4 - Detail heading (rare, nested content)
 *
 * Example:
 * <H1>About Manna Health</H1>
 *   <H2>Our Story</H2>
 *     <H3>Founded in 2015</H3>
 *     <H3>Our Mission</H3>
 *   <H2>Our Team</H2>
 *     <H3>Jane Doe - Nurse</H3>
 *     <H3>John Smith - Specialist</H3>
 */

export const HEADING_HIERARCHY_GUIDE = {
  '1': 'Page Title - Main heading (Hero, Intro)',
  '2': 'Section Title - Major content sections',
  '3': 'Subsection/Card Title - Feature cards, team members, service categories',
  '4': 'Detail Heading - Nested content within cards (rare)',
  '5': 'Minor Detail - Rarely used',
  '6': 'Minimal Detail - Avoid if possible'
}

/**
 * Common mistakes to avoid
 */
export const HEADING_ANTIPATTERNS = [
  {
    wrong: '<H1>Page</H1> <H3>Section</H3>',
    right: '<H1>Page</H1> <H2>Section</H2>',
    issue: 'Skipping H2 violates hierarchy'
  },
  {
    wrong: '<CardTitle><Small>Title</Small></CardTitle>',
    right: '<H3>Title</H3>',
    issue: 'Using Small instead of H3 loses semantic meaning'
  },
  {
    wrong: '<div className="text-3xl">Title</div>',
    right: '<H2>Title</H2>',
    issue: 'Using div with text styling loses heading semantics'
  },
  {
    wrong: '<H2>Section 1</H2> <H4>Subsection</H4>',
    right: '<H2>Section 1</H2> <H3>Subsection</H3>',
    issue: 'Skipping levels breaks keyboard navigation and screen readers'
  }
]
