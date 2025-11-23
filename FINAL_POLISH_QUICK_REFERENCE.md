# Final Polish - Quick Reference

## New Utilities Available

### Animations
```typescript
import {
  animations,        // fadeIn, fadeOut, slideUp, slideDown, scaleIn, scaleOut
  transitions,       // fast, base, slow, spring
  hoverEffects,      // lift, glow, scale, opacity, color
  focusStates,       // ring, inset
  combineAnimations  // Helper function
} from '@/lib/utils/animations'
```

### Form Helpers
```typescript
import {
  formErrorMessages,    // Standardized error messages
  toastMessages,        // Toast notification presets
  isValidEmail,         // Email validation
  isValidPhone,         // Phone validation
  isValidURL,           // URL validation
  formatPhoneNumber,    // Display format: (123) 456-7890
  formatPhoneForHref,   // href format: 1234567890
  formatErrorMessage,   // API error to user message
  sanitizeInput         // XSS prevention
} from '@/lib/utils/form-helpers'
```

---

## Common Usage Patterns

### Card with Lift Hover Effect
```tsx
import { hoverEffects } from '@/lib/utils/animations'

<Card className={hoverEffects.lift}>
  {/* Content */}
</Card>
```

### Form with Standardized Errors
```tsx
import { formErrorMessages } from '@/lib/utils/form-helpers'

// In validation schema
email: z.string().email(formErrorMessages.email)

// In form field
<FormMessage>{formErrorMessages.required}</FormMessage>
```

### Modal with Slide Animation
```tsx
import { animations, transitions } from '@/lib/utils/animations'

<Dialog open={open}>
  <DialogContent className={cn(
    animations.slideUp,
    transitions.base
  )}>
    {/* Modal content */}
  </DialogContent>
</Dialog>
```

### Button with Proper Sizing
```tsx
// Mobile: 44px, Desktop: 40px
<Button>Default</Button>

// Mobile: 44px, Desktop: 36px
<Button size="sm">Small</Button>

// Mobile: 44px, Desktop: 40px
<Button size="lg">Large</Button>

// Mobile: 44px, Desktop: 36px icon
<Button size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

### Print Styles
```tsx
{/* Hide when printing */}
<button className="no-print">Share</button>

{/* Show only when printing */}
<div className="print-only">123 Main St, Calgary, AB</div>

{/* Using data attribute */}
<nav data-no-print>{/* navigation */}</nav>
```

### Focus States
```tsx
// Standard focus ring (outside)
"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"

// Inset ring (inside)
"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring focus-visible:outline-none"

// Using focus states utility
import { focusStates } from '@/lib/utils/animations'
<input className={focusStates.ring} />
```

### Toast Notifications
```tsx
import { toast } from 'sonner'
import { toastMessages } from '@/lib/utils/form-helpers'

// Success
toast.success(toastMessages.success.messageSent)

// Error
toast.error(toastMessages.error.messageFailed)

// Info
toast.info(toastMessages.info.processingPayment)
```

---

## Before Deploying

Run this checklist:

1. **Build test**
   ```bash
   npm run build
   ```

2. **Type check**
   ```bash
   npx tsc --noEmit
   ```

3. **Lint check**
   ```bash
   npm run lint
   ```

4. **Visual test**
   - Open `http://localhost:3000`
   - Check all pages load correctly
   - Test keyboard navigation (Tab key)
   - Check mobile responsive design

5. **Accessibility test**
   - DevTools > Lighthouse > Accessibility
   - Verify all interactive elements have focus indicators
   - Test with keyboard only (no mouse)

---

## File Locations

| What | Where |
|------|-------|
| Animation utilities | `/lib/utils/animations.ts` |
| Form helpers | `/lib/utils/form-helpers.ts` |
| Print styles | `/app/globals.css` (lines 172+) |
| Skip links | `/app/layout/skip-links.tsx` |
| Error pages | `/app/not-found.tsx`, `/app/error.tsx` |
| Button component | `/components/ui/button.tsx` |
| Form component | `/components/ui/form.tsx` |

---

## Troubleshooting

### Animation not showing?
- Check that component includes `transitions.base` or similar
- Verify Tailwind CSS is loaded
- Check for conflicting CSS classes

### Error message looks wrong?
- Use `formErrorMessages` presets instead of hardcoding
- Check that Zod validation is using the preset message
- Verify FormMessage component is rendering

### Focus ring not visible?
- Check component includes `focus-visible` classes
- Verify ring color is contrasting
- Check that `outline-none` is not overridden

### Print styles not working?
- Verify elements have `no-print` or `print-only` classes
- Check browser's print preview
- Make sure CSS is loaded (no print media query issues)

---

## Performance Tips

1. **Use hover effects carefully**
   - Only on interactive elements (buttons, links, cards)
   - Don't animate transform on every element

2. **Optimize animations**
   - Use `fast` transition for small feedback
   - Use `base` transition for general changes
   - Use `slow` transition only for emphasis

3. **Lazy load images**
   - Use `loading="lazy"` on non-critical images
   - Optimize image sizes before upload

4. **Minimize bundle**
   - Tree-shaking removes unused Tailwind classes
   - Keep component count reasonable
   - Extract repeated patterns into components

---

## Accessibility Checklist

- [ ] All buttons have text or aria-label
- [ ] All form inputs have labels
- [ ] All images have alt text
- [ ] Focus indicators are visible
- [ ] Color contrast is 4.5:1 (WCAG AA)
- [ ] Keyboard navigation works throughout
- [ ] No auto-playing audio/video
- [ ] Skip links present (already done)

---

## Questions?

See `FINAL_POLISH_GUIDE.md` for detailed documentation and usage examples.

---

**Last Updated:** November 19, 2025
