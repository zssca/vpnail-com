# Service Pages - 30-Minute Quick Fixes
## Critical Issues Only

Copy-paste ready code for Phase 1 critical fixes.

---

## FIX #1: ARIA Labels (5 minutes)

**File:** `/Users/afshin/Desktop/work/Victoria Park Nails/vpnail-com/features/services/sections/services-grid/index.tsx`

**Find this (line 19):**
```tsx
<Tabs defaultValue={servicesGridData.categories[0].id} className="w-full">
  <div className="flex justify-center mb-8">
    <TabsList className="grid w-full max-w-md grid-cols-3">
      {servicesGridData.categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          className="text-sm"
          id={category.id}
        >
          {category.title}
        </TabsTrigger>
      ))}
    </TabsList>
  </div>
```

**Replace with:**
```tsx
<Tabs defaultValue={servicesGridData.categories[0].id} className="w-full">
  <div className="flex justify-center mb-8">
    <TabsList
      className="grid w-full max-w-md grid-cols-3"
      aria-label="Service categories: Choose between nail services, massage and spa treatments, or waxing services"
    >
      {servicesGridData.categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          className="text-sm"
          id={category.id}
          aria-label={`${category.title} services`}
        >
          {category.title}
        </TabsTrigger>
      ))}
    </TabsList>
  </div>
```

---

## FIX #2: Color Contrast (5 minutes)

**File:** `/Users/afshin/Desktop/work/Victoria Park Nails/vpnail-com/features/services/sections/services-grid/index.tsx`

**Find this (line 74):**
```tsx
<div className="flex-shrink-0">
  <div className="flex flex-col items-end bg-primary/10 px-2.5 py-1.5 rounded-md">
    <span className="text-base font-bold text-primary whitespace-nowrap leading-none">
      {service.price}
    </span>
```

**Replace with:**
```tsx
<div className="flex-shrink-0">
  <div className="flex flex-col items-end bg-primary/25 px-2.5 py-1.5 rounded-md">
    <span className="text-base font-bold text-primary-700 whitespace-nowrap leading-none">
      {service.price}
    </span>
```

**What changed:**
- `bg-primary/10` → `bg-primary/25` (darker background)
- `text-primary` → `text-primary-700` (darker text)

---

## FIX #3: Broken CTA Link (3 minutes)

**File:** `/Users/afshin/Desktop/work/Victoria Park Nails/vpnail-com/features/services/sections/cta/data.ts`

**Find this (line 9):**
```typescript
primaryButton: {
  text: "Check Available Times",
  href: "/services"
}
```

**Replace with:**
```typescript
primaryButton: {
  text: "Check Available Times",
  href: siteConfig.business.bookingUrl
}
```

---

## FIX #4: Button Focus (2 minutes - VERIFY ONLY)

**File:** `/Users/afshin/Desktop/work/Victoria Park Nails/vpnail-com/components/ui/button.tsx`

**Status:** Already correct ✅

The focus styling is already in the Button component (line 8):
```tsx
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

**Verify it works:**
1. Open service page
2. Press TAB key repeatedly
3. You should see a visible ring around each button
4. If not visible, check your browser's CSS override settings

---

## VERIFICATION CHECKLIST

After making changes, verify:

```
□ No TypeScript errors
□ Service grid still displays correctly
□ Price badges are readable (darker background/text)
□ "Check Available Times" button now opens booking system
□ Can tab through tabs and see focus ring
□ No visual regressions
```

---

## TESTING (2 minutes)

### Quick Test
```
1. Save files
2. npm run dev (or next dev)
3. Open http://localhost:3000/services
4. Press TAB to navigate - see focus ring? ✅
5. Click "Check Available Times" - opens booking? ✅
6. Can you read the price badges? ✅
```

### Accessibility Test
```
1. Install axe DevTools chrome extension
2. Open Services page
3. Run accessibility scan
4. Should be zero critical/serious violations
```

---

## EXPECTED CHANGES

### Before vs After

**ARIA Labels:**
- Before: Screen reader users hear just "button"
- After: Screen reader users hear "Nail Services services button"

**Price Badge Color:**
- Before: Light gray text on very light background (hard to read)
- After: Darker text on slightly darker background (easy to read)

**CTA Button:**
- Before: Clicking "Check Available Times" reloads page
- After: Clicking "Check Available Times" opens Setmore booking

**Button Focus:**
- Before: (depends on if visible) - verify with TAB key
- After: Visible ring around focused buttons

---

## ROLLBACK (if needed)

If anything breaks:

1. Undo the changes: `git checkout -- features/services/sections/services-grid/index.tsx features/services/sections/cta/data.ts`
2. Try again, step by step
3. Test after each change

---

## FILE LOCATIONS (Copy-Paste Ready)

### File 1: Service Grid
```
/Users/afshin/Desktop/work/Victoria\ Park\ Nails/vpnail-com/features/services/sections/services-grid/index.tsx
```

### File 2: CTA Data
```
/Users/afshin/Desktop/work/Victoria\ Park\ Nails/vpnail-com/features/services/sections/cta/data.ts
```

### File 3: Button Component (READ ONLY - verify)
```
/Users/afshin/Desktop/work/Victoria\ Park\ Nails/vpnail-com/components/ui/button.tsx
```

---

## SUCCESS = 4 Changes in 30 Minutes

Total changes needed:
- 3 files modified
- 4 specific edits
- 0 new dependencies
- 0 new components

Time estimate: **30 minutes** (including testing)

---

## WHAT THESE FIXES DO

1. **ARIA Labels** → Screen readers can now identify service categories
2. **Color Contrast** → People with vision issues can read prices
3. **CTA Link** → Users can actually book appointments
4. **Focus Rings** → Keyboard users know where they are

**Impact:** Turn accessibility issues into features, improve booking conversions.

---

## NEXT STEPS (After Phase 1)

Once Phase 1 is complete:
- See `IMPLEMENTATION_GUIDE.md` for Phase 2 (UX improvements)
- See `SERVICE_PAGES_UI_AUDIT.md` for full context
- See `EXECUTIVE_SUMMARY.md` for overall plan

**Phase 1:** Accessibility (30 min) ← YOU ARE HERE
**Phase 2:** UX Improvements (2-3 hours)
**Phase 3:** Polish & Enhancement (4-5 hours)

