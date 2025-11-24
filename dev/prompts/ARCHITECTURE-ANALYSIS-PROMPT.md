# Architecture Analysis Prompt

## Setup

First, generate and read the project tree for reference:

```bash
python3 dev/scripts/project-tree/generate_tree.py --show-info
```

Read the generated tree at `developer/project-tree.md`. Rerun this command anytime you need updated structure information.

## Analysis Scope

Examine all folders under `components/`, `features/`, `lib/`, `app/`, and `emails/` to identify structural issues, inconsistencies, and anti-patterns.

## Checks to Perform

### 1. Component Organization
- Check if `components/shared/` components are truly universal vs domain-specific
- Identify components that belong in `features/` instead

### 2. Feature Structure
- Verify all features follow the standard pattern: `page.tsx`, `seo.ts`, `sections/`
- Check sections have `index.tsx` + `data.ts`
- Find missing standard files or inconsistent structures

### 3. Data & Logic Separation
- Identify hardcoded data or business logic in UI components
- Verify content lives in `data.ts` or `lib/config/`

### 4. Code Duplication
- Find duplicated code that could be consolidated
- Identify overly complex components that should be split

### 5. Import Patterns
- Check for inconsistent import paths (relative vs absolute)
- Verify imports follow allowed patterns

### 6. Architecture Rules (CLAUDE.md)
- No forbidden folders within `features/` (components/, utils/, hooks/)
- Sections only in `sections/` folder
- SEO files in correct locations
- No cross-feature imports

### 7. Component Usage
- Single-use components that could be inlined
- Repeated code that should be extracted

### 8. Data Location
- Shared data not in page-specific folders
- Page-specific data not in shared locations

### 9. Naming Conventions
- Folders: `kebab-case`
- Components: `PascalCase.tsx`
- Files: `data.ts`, `page.tsx`, `[name].action.ts`, `[name].schema.ts`

### 10. Code Quality
- Circular dependencies
- Excessive nesting (>4 levels)
- File size violations:
  - Sections: ≤150 lines
  - Pages: ≤200 lines
  - Data: ≤500 lines

## Report Structure

Create `ARCHITECTURE-ISSUES-REPORT.md` with:

1. **Table of Contents**
2. **Executive Summary** - High-level overview
3. **Detailed Findings** - Organized by category above
   - File paths and line numbers
   - Severity: Critical/High/Medium/Low
   - Before/after code examples
4. **Action Plan** - Prioritized with effort estimates
5. **Ideal Structure** - Proposed directory tree after fixes
6. **Recommendations** - Best practices going forward