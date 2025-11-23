# Component Integration Guide

This document provides guidance on integrating the new reusable components and utilities into your existing codebase to reduce duplication and ensure consistency.

## New Components Overview

### UI Components (`/components/ui/`)

#### 1. **StarRating** (`star-rating.tsx`)
Centralized star rating display component with size variants and CSS variables.

**Properties:**
- `rating: number` - Rating value (0-5)
- `size?: 'sm' | 'md' | 'lg'` - Star size
- `showRating?: boolean` - Show numeric value
- `ariaLabel?: string` - Accessibility label

**Usage Example:**
```tsx
import { StarRating } from '@/components/ui/star-rating'

<StarRating rating={4.5} size="md" showRating />
```

**Integration Locations:**
- `/features/home/sections/testimonials/index.tsx` - Replace hardcoded Star components
- `/features/about/sections/testimonials/index.tsx` - Replace hardcoded Star components
- `/features/services/sections/testimonials/index.tsx` - Replace hardcoded Star components

---

#### 2. **SectionHeader** (`section-header.tsx`)
Standardizes the Small + H2 + Lead pattern used across 8+ sections.

**Properties:**
- `subtitle: React.ReactNode` - Uppercase subtitle
- `title: React.ReactNode` - Main heading
- `description?: React.ReactNode` - Lead text description
- `badge?: { content, variant }` - Optional badge
- `centered?: boolean` - Center align (default: true)
- `maxWidth?: 'sm' | 'md' | 'lg'` - Container width
- `spacing?: 'default' | 'compact' | 'relaxed'` - Bottom spacing

**Usage Example:**
```tsx
import { SectionHeader } from '@/components/ui/section-header'

<SectionHeader
  subtitle="CUSTOMER REVIEWS"
  title="What Our Clients Say"
  description="Real feedback from satisfied customers"
  centered
  maxWidth="lg"
  spacing="relaxed"
/>
```

**Integration Locations:**
- `/features/home/sections/testimonials/index.tsx` - Replace header section
- `/features/about/sections/testimonials/index.tsx` - Replace header section
- `/features/services/sections/testimonials/index.tsx` - Replace header section
- All section headers with this pattern

---

#### 3. **IconColored** (`icon-colored.tsx`)
Semantic icon colors utility for consistent icon styling.

**Properties:**
- `icon: LucideIcon` - Icon component
- `color?: 'success' | 'warning' | 'error' | 'info' | 'primary'` - Semantic color
- `size?: number` - Icon size in pixels (default: 24)
- `variant?: 'only-fill' | 'only-outline' | 'both'` - Display variant

**Usage Example:**
```tsx
import { IconColored } from '@/components/ui/icon-colored'
import { CheckCircle, AlertCircle } from 'lucide-react'

<IconColored icon={CheckCircle} color="success" variant="both" />
<IconColored icon={AlertCircle} color="warning" size={32} />
```

---

### Shared Components (`/components/shared/`)

#### 4. **ServiceCard** (`service-card.tsx`)
Standardized service card with pricing, duration, and booking CTA.

**Properties:**
- `title: string` - Service name
- `description?: string` - Service description
- `price: string` - Price (e.g., "$50+")
- `duration: string` - Duration (e.g., "1 hour")
- `href: string` - Booking URL
- `external?: boolean` - Open in new tab
- `ctaText?: string` - Button text (default: "Book Now")
- `badge?: string` - Optional badge label

**Usage Example:**
```tsx
import { ServiceCard } from '@/components/shared/service-card'

<ServiceCard
  title="Gel Manicure"
  description="Long-lasting gel polish application"
  price="$50+"
  duration="1 hour"
  href="https://booking.example.com/manicure"
  external
  badge="Popular"
/>
```

**Integration Locations:**
- `/features/services/sections/services-grid/index.tsx` - Replace service cards in grid
- Any service listing page

---

#### 5. **TestimonialCard** (`testimonial-card.tsx`)
Consistent testimonial/review display with ratings and author info.

**Properties:**
- `rating: number` - Star rating (1-5)
- `content: string` - Review text
- `name: string` - Customer name
- `role?: string` - Customer role/title
- `date?: string` - Review date
- `avatarUrl?: string` - Avatar image
- `avatarFallback?: string` - Initials fallback
- `showRatingValue?: boolean` - Show numeric rating
- `interactive?: boolean` - Hover effects

**Usage Example:**
```tsx
import { TestimonialCard } from '@/components/shared/testimonial-card'

<TestimonialCard
  rating={5}
  content="Amazing service! Highly recommended."
  name="Sarah Johnson"
  role="Regular Customer"
  date="2 weeks ago"
  interactive
/>
```

**Integration Locations:**
- All testimonial sections - Replace handcrafted testimonial cards
- `/features/home/sections/testimonials/index.tsx`
- `/features/about/sections/testimonials/index.tsx`
- `/features/services/sections/testimonials/index.tsx`

---

### Skeleton Loaders (`/components/ui/skeleton-loader.tsx`)

Pre-built skeleton patterns matching component layouts:
- `ServiceCardSkeleton` - Service card loading state
- `TestimonialCardSkeleton` - Testimonial card loading state
- `SectionHeaderSkeleton` - Section header loading state
- `HeroSkeleton` - Hero section loading state
- `FormSkeleton` - Form loading state
- `GridSkeleton` - Generic grid loading state
- `ListItemSkeleton` - List item loading state

**Usage Example:**
```tsx
import { ServiceCardSkeleton, TestimonialCardSkeleton } from '@/components/ui/skeleton-loader'

{isLoading ? <ServiceCardSkeleton count={6} /> : <ServiceGrid />}
{isLoading ? <TestimonialCardSkeleton /> : <TestimonialsList />}
```

---

## Custom Hooks (`/lib/hooks/`)

### Media Query Hooks

#### `useMediaQuery(query: string): boolean`
Detect media query matches.

```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
const isDark = useMediaQuery('(prefers-color-scheme: dark)')
```

#### Convenience Hooks:
- `useIsMobile()` - Mobile breakpoint
- `useIsTablet()` - Tablet breakpoint
- `useIsDesktop()` - Desktop breakpoint
- `usePrefersDark()` - Dark mode preference
- `usePrefersReducedMotion()` - Accessibility preference

---

### Touch Gesture Hooks

#### `useTouchGestures(handlers, options): ref`
Detect swipes, taps, and long presses.

```tsx
const ref = useTouchGestures({
  onSwipeLeft: () => nextSlide(),
  onSwipeRight: () => prevSlide(),
  onTap: () => toggleMenu(),
}, { swipeThreshold: 50 })

return <div ref={ref}>Swipe me</div>
```

#### Convenience Hooks:
- `useSwipe(onLeft, onRight)` - Swipe detection only
- `useLongPress(callback, duration)` - Long press detection

---

### Scroll Lock Hooks

#### `useScrollLock(isLocked, options): void`
Lock/unlock body scroll (for modals, drawers, etc.).

```tsx
useScrollLock(isModalOpen)
```

#### Convenience Hooks:
- `useScrollLockDuration(duration)` - Temporary scroll lock
- `useScrollLockControl()` - Manual lock/unlock controls

---

## Theme Configuration (`/lib/config/theme.config.ts`)

Centralized design tokens for semantic color usage:

```tsx
import { themeConfig, semanticColors } from '@/lib/config/theme.config'

// Semantic colors
themeConfig.colors.success
themeConfig.colors.warning
themeConfig.colors.error
themeConfig.colors.info
themeConfig.colors.primary

// Design tokens
themeConfig.spacing
themeConfig.breakpoints
themeConfig.typography
themeConfig.shadows
themeConfig.borderRadius
themeConfig.animation
themeConfig.zIndex
```

---

## Integration Priority

### Phase 1 (High Impact, Quick Wins)
1. **SectionHeader** - Replace 8+ repetitive header patterns
2. **StarRating** - Replace hardcoded star components
3. **TestimonialCard** - Replace testimonial card compositions

### Phase 2 (Medium Impact)
4. **ServiceCard** - Replace service grid cards
5. **Skeleton Loaders** - Add loading states to async sections

### Phase 3 (Enhancement)
6. **IconColored** - Apply semantic colors throughout
7. **Custom Hooks** - Add to interactive components
8. **Theme Config** - Reference for consistency

---

## CSS Variable Setup

New components use CSS HSL variables. Ensure these are defined in `/app/globals.css`:

```css
:root {
  /* Semantic colors */
  --color-success: 142.7 71.8% 29.2%; /* Green */
  --color-warning: 37.7 92.1% 50.2%; /* Amber */
  --color-error: 0 84.2% 60.2%; /* Red */
  --color-info: 217.2 91.2% 59.8%; /* Blue */
  --color-primary: /* Your primary color */;
  
  /* Star ratings */
  --star-fill: 37.7 92.1% 50.2%; /* Amber */
  --star-empty: 210 40% 96%; /* Muted foreground */
}
```

---

## Best Practices

1. **Use props over custom styling** - Components are designed to be flexible through props
2. **Respect the layout system** - Let parent containers handle spacing
3. **Maintain accessibility** - All components include proper ARIA labels
4. **Test on mobile** - Use `useMediaQuery` hooks to verify responsive behavior
5. **Leverage TypeScript** - Components export types for better DX

---

## Verifying Integration

After integration, verify:
- [ ] Components render correctly in all breakpoints
- [ ] Star ratings display proper colors
- [ ] Section headers align consistently
- [ ] Testimonial cards show author information
- [ ] Service cards have functional CTAs
- [ ] Skeletons match actual content dimensions
- [ ] Touch gestures work on mobile
- [ ] Accessibility tests pass (keyboard nav, screen readers)

---

## Component File Locations

```
components/
├── ui/
│   ├── star-rating.tsx
│   ├── section-header.tsx
│   ├── icon-colored.tsx
│   └── skeleton-loader.tsx
└── shared/
    ├── service-card.tsx
    └── testimonial-card.tsx

lib/
├── config/
│   └── theme.config.ts
└── hooks/
    ├── use-media-query.ts
    ├── use-touch-gestures.ts
    ├── use-scroll-lock.ts
    └── index.ts
```

