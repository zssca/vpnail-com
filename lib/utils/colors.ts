/**
 * Color Utilities
 *
 * Provides hex color equivalents of CSS variables for contexts where
 * CSS variables are not supported (email templates, SVG data URIs, meta tags, etc.)
 *
 * IMPORTANT: These hex values are approximations of the oklch colors defined in globals.css
 * When updating colors in globals.css, update these values accordingly.
 */

/**
 * Light mode color mappings
 * Hex equivalents of CSS variables from globals.css :root
 */
export const lightColors = {
  // Base colors
  background: '#ffffff',        // oklch(1 0 0)
  foreground: '#18181b',        // oklch(0.145 0 0)

  // Card colors
  card: '#ffffff',              // oklch(1 0 0)
  cardForeground: '#18181b',    // oklch(0.145 0 0)

  // Primary colors
  primary: '#8b9a7c',           // oklch(0.55 0.05 45.5) - muted olive/sage green
  primaryForeground: '#fafafa', // oklch(0.985 0 0)

  // Secondary colors
  secondary: '#f5f5f5',         // oklch(0.97 0 0)
  secondaryForeground: '#3f3f46', // oklch(0.205 0 0)

  // Muted colors
  muted: '#f5f5f5',             // oklch(0.97 0 0)
  mutedForeground: '#71717a',   // oklch(0.556 0 0)

  // Accent colors
  accent: '#f5f5f5',            // oklch(0.97 0 0)
  accentForeground: '#3f3f46',  // oklch(0.205 0 0)

  // Destructive/error
  destructive: '#dc2626',       // oklch(0.577 0.245 27.325) - red

  // Border and input
  border: '#e4e4e7',            // oklch(0.922 0 0)
  input: '#e4e4e7',             // oklch(0.922 0 0)

  // Ring (focus)
  ring: '#8b9a7c',              // oklch(0.55 0.05 45.5)

  // Chart colors (semantic alternatives)
  chart1: '#8b9a7c',            // oklch(0.55 0.05 45.5) - primary/info
  chart2: '#6ea56c',            // oklch(0.45 0.04 45.5) - success (darker green)
  chart3: '#a1b08c',            // oklch(0.65 0.04 45.5) - light variant
  chart4: '#9b9273',            // oklch(0.5 0.06 45.5) - warning (warmer tone)
  chart5: '#97a77f',            // oklch(0.6 0.05 45.5) - medium variant
} as const

/**
 * Dark mode color mappings
 * Hex equivalents of CSS variables from globals.css .dark
 */
export const darkColors = {
  // Base colors
  background: '#18181b',        // oklch(0.145 0 0)
  foreground: '#fafafa',        // oklch(0.985 0 0)

  // Card colors
  card: '#27272a',              // oklch(0.205 0 0)
  cardForeground: '#fafafa',    // oklch(0.985 0 0)

  // Primary colors
  primary: '#a1b08c',           // oklch(0.75 0.04 45.5) - lighter sage for dark mode
  primaryForeground: '#18181b', // oklch(0.145 0 0)

  // Secondary colors
  secondary: '#3f3f46',         // oklch(0.269 0 0)
  secondaryForeground: '#fafafa', // oklch(0.985 0 0)

  // Muted colors
  muted: '#3f3f46',             // oklch(0.269 0 0)
  mutedForeground: '#a1a1aa',   // oklch(0.708 0 0)

  // Accent colors
  accent: '#3f3f46',            // oklch(0.269 0 0)
  accentForeground: '#fafafa',  // oklch(0.985 0 0)

  // Destructive/error
  destructive: '#ef4444',       // oklch(0.704 0.191 22.216) - brighter red for dark mode

  // Border and input (with transparency approximated)
  border: '#27272a',            // oklch(1 0 0 / 10%) approximation
  input: '#3f3f46',             // oklch(1 0 0 / 15%) approximation

  // Ring (focus)
  ring: '#a1b08c',              // oklch(0.75 0.04 45.5)

  // Chart colors (semantic alternatives)
  chart1: '#a1b08c',            // oklch(0.75 0.04 45.5) - primary/info
  chart2: '#8aa688',            // oklch(0.65 0.03 45.5) - success
  chart3: '#b8c5a7',            // oklch(0.85 0.03 45.5) - light variant
  chart4: '#a8b08d',            // oklch(0.7 0.05 45.5) - warning
  chart5: '#b1bd9a',            // oklch(0.8 0.04 45.5) - medium variant
} as const

/**
 * Semantic color names mapped to their purpose
 * Use these for email templates and other contexts requiring hex colors
 */
export const semanticColorMap = {
  success: lightColors.chart2,    // Green-ish
  warning: lightColors.chart4,    // Amber-ish
  error: lightColors.destructive, // Red
  info: lightColors.chart1,       // Primary-based
} as const

/**
 * Convert oklch to approximate hex (simplified for common grays)
 * Note: This is a basic approximation. For accurate colors, use the predefined mappings above.
 *
 * @param l - Lightness (0-1)
 * @param c - Chroma (0-0.4)
 * @param h - Hue (0-360)
 * @returns Approximate hex color
 */
export function oklchToHex(l: number, c: number, h: number): string {
  // This is a simplified approximation for documentation purposes
  // For production use, rely on the predefined color mappings above
  const gray = Math.round(l * 255)
  return `#${gray.toString(16).padStart(2, '0').repeat(3)}`
}

/**
 * Get color for current theme
 * @param colorKey - Key from lightColors/darkColors
 * @param preferDark - Whether to prefer dark mode colors
 * @returns Hex color value
 */
export function getThemeColor(
  colorKey: keyof typeof lightColors,
  preferDark = false
): string {
  return preferDark ? darkColors[colorKey] : lightColors[colorKey]
}
