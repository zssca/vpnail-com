import { buildMetadata } from '@/lib/seo/metadata'

import { siteConfig } from '@/lib/config/site.config'

export const galleryMetadata = buildMetadata({
  title: `Nail Art Gallery Calgary | Chrome, Ombre & Custom Designs | ${siteConfig.business.name}`,
  description:
    `Browse nail art inspiration from Calgary's Victoria Park salon. Chrome nails, ombre designs, cat eye, French tips, bridal nails & custom hand-painted art. Book your design today.`,
  path: '/gallery',
  keywords: [
    // Gallery & portfolio keywords
    'nail art gallery Calgary',
    'nail design gallery Calgary',
    'nail design ideas Calgary',
    'nail art inspiration Calgary',
    'nail salon portfolio Calgary',
    'manicure gallery Calgary',
    'pedicure photos Calgary',
    // Nail art styles (services offered)
    'chrome nails Calgary',
    'ombre nails Calgary',
    'cat eye nails Calgary',
    'French tip nails Calgary',
    'French manicure Calgary',
    'hand-painted nail art Calgary',
    'custom nail art Calgary',
    'intricate nail art Calgary',
    // Special occasion nails
    'bridal nails Calgary',
    'wedding nails Calgary',
    'Calgary Stampede nails',
    // Extensions with art
    'gel nail extensions Calgary',
    'acrylic nail art Calgary',
    'shellac nail art Calgary',
    // Brand
    'Victoria Park Nails and Spa gallery',
    'nail transformation Calgary',
  ],
  openGraphDescription:
    `Browse nail art gallery from Calgary's Victoria Park salon. Chrome, ombre, cat eye, French tips, bridal nails & custom designs. Book your look today.`,
  twitterDescription:
    'Nail art inspiration from Victoria Park Nails Calgary. Chrome, ombre, cat eye, French tips & custom hand-painted designs. See our portfolio.',
})
