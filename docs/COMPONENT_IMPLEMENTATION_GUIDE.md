# Component Audit: Implementation Guide

This guide provides step-by-step instructions for implementing the recommendations from the Component Audit Report.

---

## Priority 2: Recommended Enhancements

### 1. Extract `useScrollVisibility` Hook

**Benefit:** Eliminates duplication between Header and StickyBottomNav components, improves maintainability.

**File to Create:** `/lib/hooks/use-scroll-visibility.ts`

```typescript
'use client'

import { useEffect, useState } from 'react'

interface UseScrollVisibilityOptions {
  hideThreshold?: number
  showThreshold?: number
}

/**
 * Hook to manage visibility of components based on scroll direction and position
 * Used for sticky headers/footers that hide/show on scroll
 */
export function useScrollVisibility({
  hideThreshold = 100,
  showThreshold = 10,
}: UseScrollVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show when near top of page
      if (currentScrollY < showThreshold) {
        setIsVisible(true)
      }
      // Hide when scrolling down past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
        setIsVisible(false)
      }
      // Show when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, hideThreshold, showThreshold])

  return isVisible
}
```

**Update Header Component:** Replace scroll effect with hook

**Update StickyBottomNav Component:** Replace scroll effect with hook

---

### 2. Add `role="banner"` to Header

The Header component update includes proper semantic HTML with `role="banner"` attribute.

**Why This Matters:**
- Improves screen reader experience
- Helps assistive technology users navigate page structure
- Follows WCAG 2.1 AA guidelines
- No visual impact

---

### 3. Enhance LocationMap iframe Labels

Update iframe with enhanced `title` and `aria-label` attributes for better accessibility.

---

### 4. Config-Drive SEO Generator Strings

Update `/components/seo/meta-tags.tsx` to accept optional parameters for `siteName` and `publisher`, defaulting to `siteConfig` values.

This removes hardcoded business names and makes the function more flexible.

---

### 5. Formalize Analytics Event Pattern

Create `/lib/analytics/tracking.ts` with centralized event types, patterns, and utility functions.

Benefits:
- Event types are constants (easier to reference)
- Event detection patterns are centralized
- Logic is testable
- Easier to add new event types

---

## Priority 3: Optional Polish

### Add Typography Components

Consider adding:
- `Ol` - Ordered list component for step-by-step instructions
- `BlockQuote` - Blockquote component for testimonials

---

## Testing Checklist

- [ ] Scroll visibility hide/show works correctly
- [ ] Header accessibility verified with screen reader
- [ ] LocationMap labels announced properly
- [ ] Analytics events fire correctly
- [ ] All tests pass
- [ ] No breaking changes to existing code

---

## Summary

| Task | Time Est. | Priority |
|------|-----------|----------|
| Extract useScrollVisibility hook | 15 min | 2 |
| Add role="banner" | 2 min | 2 |
| Enhance LocationMap labels | 5 min | 2 |
| Config-drive SEO strings | 10 min | 2 |
| Formalize analytics | 20 min | 2 |
| Add typography components | 10 min | 3 |
| **Total** | **62 min** | - |

