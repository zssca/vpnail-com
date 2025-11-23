import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const accessibilityMetadata = buildMetadata({
  title: `Accessibility | ${siteConfig.business.name} Calgary`,
  description:
    `Accessibility statement for ${siteConfig.business.name} in Calgary. Learn about our inclusive policies and accessible features for both our salon and website.`,
  path: '/accessibility',
  keywords: [
    `${siteConfig.business.name} accessibility`,
    'Calgary nail salon accessibility',
    'accessible nail salon Calgary',
    `${siteConfig.business.name} ADA compliance`,
  ],
  type: 'article',
  noindex: true,
})
