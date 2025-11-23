/**
 * SEO Utilities - Barrel Export
 * Central export point for all SEO-related utilities
 */

export * from './metadata'
export * from './og-image'
export * from './structured-data'
export * from './types'

// Re-export SEO constants from config for backward compatibility
export {
  SEO_BRAND_NAME,
  SEO_BASE_URL,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_OG_IMAGE,
  SEO_DEFAULT_CREATOR,
  SEO_AUTHORS,
  SEO_DEFAULT_KEYWORDS,
  SEO_NAVIGATION_ITEMS,
  SEO_SOCIAL_LINKS,
  SEO_BUSINESS,
} from '@/lib/config/seo.config'
