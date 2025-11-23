import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const privacyMetadata = buildMetadata({
  title: `Privacy Policy | ${siteConfig.business.name} Calgary`,
  description:
    `Understand how ${siteConfig.business.name} in Calgary collects, uses, and protects personal information for salon guests and website visitors.`,
  path: '/privacy',
  keywords: [
    `${siteConfig.business.name} privacy policy`,
    'Calgary nail salon privacy',
    'nail salon data protection',
    `${siteConfig.business.name} terms`,
  ],
  type: 'article',
  noindex: true,
})
