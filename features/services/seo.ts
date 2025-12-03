import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const servicesMetadata = buildMetadata({
  title: `Nail Services & Pricing Calgary | ${siteConfig.business.name}`,
  description:
    `View nail salon prices in Calgary. Manicures from $25, pedicures from $40, gel & acrylic extensions, custom nail art, waxing & massage at ${siteConfig.business.name}. Book online.`,
  path: '/services',
  keywords: [
    // Primary service keywords
    'nail services Calgary',
    'nail salon prices Calgary',
    'nail salon pricing Calgary',
    'manicure Calgary',
    'pedicure Calgary',
    'gel nails Calgary',
    'acrylic nails Calgary',
    // Manicure types
    'gel manicure Calgary',
    'shellac manicure Calgary',
    'shellac nails Calgary',
    'French manicure Calgary',
    // Pedicure types
    'spa pedicure Calgary',
    'hot stone pedicure Calgary',
    'deluxe pedicure Calgary',
    'shellac pedicure Calgary',
    // Extensions
    'gel nail extensions Calgary',
    'acrylic nail extensions Calgary',
    'nail extensions Calgary',
    'gel refill Calgary',
    'acrylic fill Calgary',
    // Nail art styles (actual services)
    'custom nail art Calgary',
    'nail art design Calgary',
    'chrome nails Calgary',
    'ombre nails Calgary',
    'cat eye nails Calgary',
    // Massage & spa
    'relaxation massage Calgary',
    'paraffin wax treatment Calgary',
    // Waxing services
    'waxing services Calgary',
    'facial waxing Calgary',
    'Brazilian waxing Calgary',
    'eyebrow waxing Calgary',
    'body waxing Calgary',
    // Location & brand
    'nail salon Victoria Park Calgary',
    'Victoria Park Nails and Spa',
    'professional nail care Calgary',
    'luxury nail salon Calgary',
    'best manicure Calgary',
    'best pedicure Calgary',
  ],
  openGraphDescription:
    `Browse nail salon prices in Calgary. Manicures, pedicures, gel & acrylic extensions, custom nail art, massage & waxing with upfront pricing at ${siteConfig.business.name}.`,
  twitterDescription:
    'See nail service prices at Victoria Park Nails & Spa Calgary. Manicures, pedicures, extensions, nail art, waxing & massage. Book online today.',
})
