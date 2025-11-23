/**
 * Default SEO Configuration
 * Base SEO settings used across the site
 */

import type { Metadata } from 'next'
import { primaryNav } from './nav.config'
import { siteConfig } from './site.config'

export const SEO_BASE_URL = siteConfig.url
export const SEO_BRAND_NAME = siteConfig.name
export const SEO_DEFAULT_DESCRIPTION = siteConfig.description
export const SEO_DEFAULT_OG_IMAGE = siteConfig.ogImage
export const SEO_DEFAULT_CREATOR = siteConfig.creator
export const SEO_AUTHORS = [...siteConfig.authors]
export const SEO_DEFAULT_KEYWORDS = [...siteConfig.keywords]
export const SEO_SOCIAL_LINKS = siteConfig.social
export const SEO_BUSINESS = siteConfig.business
export const SEO_NAVIGATION_ITEMS = primaryNav
  .filter((item) => Boolean(item.href))
  .map((item) => ({
    name: item.label,
    url: item.href ?? '/',
  }))

export const defaultSEO = {
  metadataBase: new URL(SEO_BASE_URL),
  authors: [...SEO_AUTHORS],
  creator: SEO_DEFAULT_CREATOR,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: SEO_BRAND_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    creator: SEO_DEFAULT_CREATOR,
  },
} satisfies Partial<Metadata>
