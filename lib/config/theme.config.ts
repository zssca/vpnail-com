/**
 * Theme Configuration
 * Defines semantic color usage and design system tokens
 * Uses CSS HSL variables defined in globals.css
 */

/**
 * Semantic color palette
 * Maps semantic meanings to CSS HSL variable names
 */
export const semanticColors = {
  /**
   * Primary brand color
   * Used for: CTAs, primary actions, highlights
   * CSS Variable: --color-primary
   */
  primary: 'hsl(var(--color-primary))',

  /**
   * Secondary brand color
   * Used for: Secondary actions, accents
   * CSS Variable: --color-secondary
   */
  secondary: 'hsl(var(--color-secondary))',

  /**
   * Success/positive state
   * Used for: Confirmations, positive feedback, checkmarks
   * CSS Variable: --color-success
   * Default: Green (#10b981)
   */
  success: 'hsl(var(--color-success))',

  /**
   * Warning/caution state
   * Used for: Warnings, alerts, pending actions
   * CSS Variable: --color-warning
   * Default: Amber (#f59e0b)
   */
  warning: 'hsl(var(--color-warning))',

  /**
   * Error/destructive state
   * Used for: Errors, deletions, destructive actions
   * CSS Variable: --color-error
   * Default: Red (#ef4444)
   */
  error: 'hsl(var(--color-error))',

  /**
   * Info/neutral state
   * Used for: Information, help text, neutral badges
   * CSS Variable: --color-info
   * Default: Blue (#3b82f6)
   */
  info: 'hsl(var(--color-info))',
} as const

/**
 * Star rating colors
 * Used in star rating components
 */
export const starColors = {
  /**
   * Filled star color
   * CSS Variable: --star-fill
   * Default: Amber (#fbbf24)
   */
  fill: 'hsl(var(--star-fill))',

  /**
   * Empty/unfilled star color
   * CSS Variable: --star-empty
   * Default: Muted foreground
   */
  empty: 'hsl(var(--star-empty))',
} as const

/**
 * Icon color presets
 * Predefined icon color combinations
 */
export const iconColorPresets = {
  success: {
    color: semanticColors.success,
    background: 'hsl(var(--color-success) / 0.1)',
  },
  warning: {
    color: semanticColors.warning,
    background: 'hsl(var(--color-warning) / 0.1)',
  },
  error: {
    color: semanticColors.error,
    background: 'hsl(var(--color-error) / 0.1)',
  },
  info: {
    color: semanticColors.info,
    background: 'hsl(var(--color-info) / 0.1)',
  },
  primary: {
    color: semanticColors.primary,
    background: 'hsl(var(--color-primary) / 0.1)',
  },
} as const

/**
 * Component spacing scale
 * Consistent spacing values used throughout the app
 */
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem', // 48px
  '4xl': '4rem', // 64px
} as const

/**
 * Responsive breakpoints
 * Mobile-first breakpoint values (in pixels)
 */
export const breakpoints = {
  mobile: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/**
 * Typography scale
 * Font sizes and line heights for consistent typography
 */
export const typography = {
  h1: {
    size: '2.25rem', // 36px
    lineHeight: '2.5rem',
    weight: 700,
  },
  h2: {
    size: '1.875rem', // 30px
    lineHeight: '2.25rem',
    weight: 700,
  },
  h3: {
    size: '1.5rem', // 24px
    lineHeight: '2rem',
    weight: 600,
  },
  body: {
    size: '1rem', // 16px
    lineHeight: '1.5rem',
    weight: 400,
  },
  lead: {
    size: '1.125rem', // 18px
    lineHeight: '1.75rem',
    weight: 400,
  },
  small: {
    size: '0.875rem', // 14px
    lineHeight: '1.25rem',
    weight: 400,
  },
} as const

/**
 * Shadow scales
 * Elevation shadows for depth
 */
export const shadows = {
  sm: '0 1px 2px 0 hsl(var(--foreground) / 0.05)',
  md: '0 4px 6px -1px hsl(var(--foreground) / 0.1)',
  lg: '0 10px 15px -3px hsl(var(--foreground) / 0.1)',
  xl: '0 20px 25px -5px hsl(var(--foreground) / 0.1)',
  '2xl': '0 25px 50px -12px hsl(var(--foreground) / 0.25)',
} as const

/**
 * Border radius scale
 * Consistent border radius values
 */
export const borderRadius = {
  sm: '0.375rem', // 6px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const

/**
 * Animation/Transition configuration
 * Standard durations and easing functions
 */
export const animation = {
  durations: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

/**
 * Z-index scale
 * Stacking context values for layering elements
 */
export const zIndex = {
  hide: '-1',
  base: '0',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
} as const

/**
 * Theme configuration type
 * Export for TypeScript type safety
 */
export type SemanticColor = keyof typeof semanticColors
export type StarColor = keyof typeof starColors
export type Spacing = keyof typeof spacing
export type Breakpoint = keyof typeof breakpoints
export type ZIndex = keyof typeof zIndex

/**
 * Complete theme object
 * Single source of truth for all design tokens
 */
export const themeConfig = {
  colors: semanticColors,
  starColors,
  iconColorPresets,
  spacing,
  breakpoints,
  typography,
  shadows,
  borderRadius,
  animation,
  zIndex,
} as const

export default themeConfig
