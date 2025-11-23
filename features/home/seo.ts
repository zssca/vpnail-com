import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const homeMetadata = buildMetadata({
  title: `Nail Salon Calgary | ${siteConfig.business.name} | Book Online`,
  description:
    `Book gel manicures, spa pedicures, extensions, waxing, and massage at ${siteConfig.business.name} in Victoria Park, Calgary. Free parking, CTrain access, and same-day appointments when available.`,
  path: '/',
  keywords: [
    'Victoria Park Nails and Spa',
    'best nail salon Calgary',
    'nail salon Calgary',
    'Victoria Park nails',
    'manicure Calgary',
    'pedicure Calgary',
    'custom nail art Calgary',
    'gel nails Calgary',
    'acrylic nails Calgary',
    'shellac manicure Calgary',
    'spa pedicure Calgary',
    'luxury nail salon Calgary',
    'nail extensions Calgary',
    'nail salon Victoria Park',
    'nail salon Downtown Calgary',
    'nail salon Beltline Calgary',
    'Calgary Stampede nails',
    'professional nail care Calgary',
    'hot stone massage Calgary',
  ],
  openGraphDescription:
    'Victoria Park Calgary nail salon for long-wear manicures, pedicures, gel and acrylic extensions, waxing, and massage with free parking near the Stampede grounds.',
  twitterDescription:
    'Calgary nail salon with online booking, free parking, and long-wear manicures, pedicures, extensions, and waxing in Victoria Park.',
})
