import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const termsMetadata = buildMetadata({
  title: `Terms of Service | ${siteConfig.business.name} Calgary`,
  description:
    `Review the terms of service for ${siteConfig.business.name} in Calgary, including salon booking policies, cancellations, liability, and website use.`,
  path: '/terms',
  keywords: [
    `${siteConfig.business.name} terms of service`,
    'Calgary nail salon policies',
    'nail salon cancellation policy',
    `${siteConfig.business.name} booking terms`,
  ],
  type: 'article',
  noindex: true,
})
