# Architecture Fix Prompt

Fix architectural issues step by step, working through each category systematically.

## Step 1: Generate Project Tree

First, generate and analyze the project structure:

```bash
python3 dev/scripts/generate_tree.py --show-info
```

Read `dev/project-tree.md` and identify structural issues before proceeding.

## Step 2: Fix Naming Conventions

Check and fix naming issues:
- Folders must be `kebab-case`
- Components must be `kebab-case.tsx`
- Standard files: `data.ts`, `page.tsx`, `[name].action.ts`, `[name].schema.ts`

**Action**: Rename any files/folders that don't follow conventions.

## Step 3: Fix Feature Structure

Ensure all features follow the standard pattern:
- Required: `page.tsx`, `seo.ts`, `sections/`
- Each section needs: `index.tsx` + `data.ts`
- No forbidden folders: `components/`, `utils/`, `hooks/`

**Action**: Add missing files, remove forbidden folders, move misplaced code.

## Step 4: Fix Component Organization

Move components to correct locations:
- Domain-specific components → `features/[name]/sections/`
- Truly universal components → `components/shared/`
- Single-use components → Inline or move to feature

**Action**: Relocate components and update imports.

## Step 5: Fix Data & Logic Separation

Extract hardcoded content to data files:
- Business info → `lib/config/`
- Feature content → `features/[name]/sections/*/data.ts`
- No literals in components

**Action**: Create/update `data.ts` files, remove hardcoded content.

## Step 6: Fix Import Patterns

Standardize imports:
- Use `@/` aliases (not relative paths across features)
- No cross-feature imports (share via `components/shared/`, `lib/`)
- Import order: React → Next → External → Internal → Relative

**Action**: Update import statements throughout codebase.

## Step 7: Fix Cross-Feature Dependencies

Remove cross-feature imports:
- Sections read only their own `./data.ts`
- Shared code goes to `components/shared/`, `features/shared/`, or `lib/`

**Action**: Extract shared code, update imports.

## Step 8: Fix Code Duplication

Consolidate duplicated code:
- Extract repeated patterns to `components/shared/`
- Create utility functions in `lib/utils/`
- Split overly complex components (>150 lines)

**Action**: Refactor duplicated code into shared modules.

## Step 9: Fix File Size Violations

Split large files:
- Sections/Components: ≤150 lines
- Pages: ≤200 lines
- Data: ≤500 lines

**Action**: Break down oversized files into smaller modules.

## Step 10: Fix SEO & Metadata

Ensure proper SEO setup:
- Each feature has `seo.ts` with metadata export
- Routes in `app/` wire metadata correctly
- Follow config in `lib/config/seo.config.ts`

**Action**: Add missing metadata, standardize structure.

## Step 11: Verify Architecture Rules

Final verification against CLAUDE.md:
- No forbidden folders in `features/`
- Sections only in `sections/` folder
- No cross-feature imports
- Single source of truth for data

**Action**: Run final checks, fix any remaining violations.

## Step 12: Regenerate Tree

After all fixes, regenerate tree to verify structure:

```bash
python3 dev/scripts/project-tree/generate_tree.py --show-info
```

Compare with ideal structure from CLAUDE.md.

## Notes

- Work through steps sequentially
- Test after each major change
- Commit logical groups of fixes
- Update documentation if patterns change