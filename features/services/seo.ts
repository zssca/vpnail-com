import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const servicesMetadata = buildMetadata({
  title: `Nail Services & Pricing Calgary | ${siteConfig.business.name}`,
  description:
    `See pricing for manicures, gel and acrylic extensions, spa pedicures, waxing, and massage at ${siteConfig.business.name} in Calgary. Free parking and online booking.`,
  path: '/services',
  keywords: [
    'Victoria Nails Calgary',
    'nail services Calgary',
    'manicure Calgary',
    'pedicure Calgary',
    'gel manicure Calgary',
    'shellac manicure Calgary',
    'acrylic nails Calgary',
    'gel nail extensions Calgary',
    'custom nail art Calgary',
    'nail art design Calgary',
    'spa pedicure Calgary',
    'hot stone pedicure Calgary',
    'deluxe pedicure Calgary',
    'massage therapy Calgary',
    'hot stone massage Calgary',
    'relaxation massage Calgary',
    'waxing services Calgary',
    'facial waxing Calgary',
    'Brazilian waxing Calgary',
    'nail salon Victoria Park Calgary',
    'professional nail care Calgary',
    'luxury nail salon Calgary',
    'nail salon pricing Calgary',
    'best manicure Calgary',
    'best pedicure Calgary',
  ],
  openGraphDescription:
    `Browse every manicure, pedicure, gel or acrylic enhancement, massage, and waxing option with upfront pricing at ${siteConfig.business.name} in Calgary.`,
})
