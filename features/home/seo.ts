import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const homeMetadata = buildMetadata({
  title: `Best Nail Salon Calgary | ${siteConfig.business.name} | Manicures & Pedicures`,
  description:
    `Calgary's top-rated nail salon in Victoria Park. Book gel manicures, spa pedicures, acrylic extensions, custom nail art, waxing & massage. Free parking near Stampede grounds.`,
  path: '/',
  keywords: [
    // Primary keywords
    'nail salon Calgary',
    'best nail salon Calgary',
    'nail salon near me',
    'manicure Calgary',
    'pedicure Calgary',
    'gel nails Calgary',
    'acrylic nails Calgary',
    'nail art Calgary',
    // Secondary service keywords
    'shellac manicure Calgary',
    'spa pedicure Calgary',
    'nail extensions Calgary',
    'custom nail art Calgary',
    'gel manicure Calgary',
    'acrylic nail extensions Calgary',
    'deluxe pedicure Calgary',
    // Nail art styles (services offered)
    'chrome nails Calgary',
    'ombre nails Calgary',
    'cat eye nails Calgary',
    'French manicure Calgary',
    // Location keywords
    'nail salon Victoria Park',
    'nail salon Downtown Calgary',
    'nail salon Beltline Calgary',
    'Victoria Park nails',
    'nail salon near Calgary Stampede',
    // Brand & trust
    'Victoria Park Nails and Spa',
    'luxury nail salon Calgary',
    'professional nail care Calgary',
    // Other services
    'waxing Calgary',
    'massage Calgary',
  ],
  openGraphDescription:
    'Calgary top-rated nail salon for manicures, pedicures, gel & acrylic extensions, custom nail art, waxing & massage. Free parking near Stampede grounds.',
  twitterDescription:
    'Best nail salon in Calgary with online booking, free parking, manicures, pedicures, gel & acrylic nails, and custom nail art in Victoria Park.',
})
