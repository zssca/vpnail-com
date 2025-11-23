import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const galleryMetadata = buildMetadata({
  title: `Calgary Nail Art Gallery | ${siteConfig.business.name}`,
  description:
    `View Calgary nail art, manicures, and pedicures from ${siteConfig.business.name} near the Stampede grounds. Free parking, CTrain access, and online booking.`,
  path: '/gallery',
  keywords: [
    'nail art gallery Calgary',
    'nail design gallery Calgary',
    'manicure gallery Calgary',
    'pedicure photos Calgary',
    'custom nail art Calgary',
    'nail transformation Calgary',
    'Victoria Park Nails and Spa gallery',
    'nail salon portfolio Calgary',
    'bridal nails Calgary',
    'wedding nails Calgary',
    'Stampede nails Calgary',
    'gel nail extensions Calgary',
    'shellac nail art Calgary',
  ],
  openGraphDescription:
    `See Calgary nail art, manicures, pedicures, and custom designs from ${siteConfig.business.name} near the Stampede with free parking and CTrain access.`,
  twitterDescription:
    'Browse Calgary nail art and manicure inspiration from our Victoria Park studio with online booking and free parking.',
})
