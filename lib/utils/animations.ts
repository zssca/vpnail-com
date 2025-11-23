/**
 * Consistent animation utilities for the Victoria Park Nails application.
 * These utilities provide standardized transitions and animations for a cohesive UI experience.
 */

/**
 * Transition duration presets for consistent animation timing
 * Use these to standardize how fast elements animate across the UI
 */
export const transitions = {
  // Fast transitions for interactive feedback (e.g., hover states)
  fast: 'transition-all duration-150 ease-in-out',

  // Standard transitions for general UI changes
  base: 'transition-all duration-300 ease-in-out',

  // Slower transitions for emphasis and important changes
  slow: 'transition-all duration-500 ease-in-out',

  // Spring-like bounce for engaging moments (e.g., loading completion)
  spring: 'transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
}

/**
 * Predefined animation classes for common UI effects
 * Combine these with transitions for complete animation behavior
 * Requires: @tailwindcss/postcss with animate-in plugin
 */
export const animations = {
  // Fade in animation - use for content appearing
  fadeIn: 'animate-in fade-in duration-300',

  // Fade out animation - use for content disappearing
  fadeOut: 'animate-out fade-out duration-300',

  // Slide up animation - use for modals, dropdowns
  slideUp: 'animate-in slide-in-from-bottom-4 duration-300',

  // Slide down animation - use for collapsing content
  slideDown: 'animate-in slide-in-from-top-4 duration-300',

  // Scale in animation - use for expanding elements
  scaleIn: 'animate-in zoom-in-95 duration-300',

  // Scale out animation - use for shrinking elements
  scaleOut: 'animate-out zoom-out-95 duration-300',
}

/**
 * Common hover effects for interactive elements
 * Apply these to buttons, links, and other interactive components
 */
export const hoverEffects = {
  // Lift effect - card rises on hover
  lift: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',

  // Glow effect - element glows on hover
  glow: 'transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]',

  // Scale effect - element grows on hover
  scale: 'transition-transform duration-300 hover:scale-105',

  // Opacity effect - element brightens on hover
  opacity: 'transition-opacity duration-300 hover:opacity-80',

  // Color effect - standard color transition
  color: 'transition-colors duration-200',
}

/**
 * Focus states for accessibility
 * Apply these to all interactive elements for keyboard navigation
 */
export const focusStates = {
  // Standard focus ring - visible focus indicator
  ring: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',

  // Inset ring - ring inside the element (good for buttons)
  inset: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring focus-visible:outline-none',
}

/**
 * Print styles utility class
 * Use this to hide/show elements when printing
 */
export const printStyles = {
  noPrint: 'print:hidden',
  printOnly: 'hidden print:block',
  printBreak: 'print:break-after-page',
  printAvoidBreak: 'print:break-inside-avoid',
}

/**
 * Skeleton/loading animation
 * Use with animated gradient backgrounds for better loading UX
 */
export const loadingAnimation = 'animate-pulse'

/**
 * Utility to combine transition and animation classes
 * @param transition - Transition preset from transitions object
 * @param animation - Animation preset from animations object
 * @returns Combined class string
 *
 * @example
 * const cardAnimation = combineAnimations('base', 'slideUp')
 */
export function combineAnimations(
  transition: keyof typeof transitions,
  animation: keyof typeof animations,
): string {
  return `${transitions[transition]} ${animations[animation]}`
}
