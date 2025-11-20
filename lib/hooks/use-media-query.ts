'use client'

import { useEffect, useState } from 'react'

/**
 * Hook for matching media queries
 * Returns true if the media query matches, false otherwise
 * Useful for responsive behavior and detecting mobile devices
 *
 * @param query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns boolean - Whether the media query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 * const isLandscape = useMediaQuery('(orientation: landscape)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Create media query list
    const mediaQuery = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
    // Legacy browsers (IE11 and below)
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)

      return () => {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  // Return false until component is mounted (prevent hydration mismatch)
  return mounted ? matches : false
}

/**
 * Convenience hook for detecting mobile breakpoint
 * @returns boolean - True if screen width is 768px or less
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

/**
 * Convenience hook for detecting tablet breakpoint
 * @returns boolean - True if screen width is 768px to 1024px
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

/**
 * Convenience hook for detecting desktop breakpoint
 * @returns boolean - True if screen width is greater than 1024px
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}

/**
 * Convenience hook for detecting dark mode preference
 * @returns boolean - True if user prefers dark mode
 */
export function usePrefersDark(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

/**
 * Convenience hook for detecting reduced motion preference
 * Useful for accessibility - respects user's motion preferences
 * @returns boolean - True if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
