import { buildMetadata } from '@/lib/seo/metadata'
import { siteConfig } from '@/lib/config/site.config'

export const contactMetadata = buildMetadata({
  title: 'Contact & Book Appointment | Victoria Park Nails & Spa Calgary',
  description:
    `Book your nail appointment at Calgary's Victoria Park salon. Call ${siteConfig.business.phone} or book online. Free parking, walk-ins welcome, open 7 days near Stampede grounds.`,
  path: '/contact',
  keywords: [
    // Booking keywords
    'book nail appointment Calgary',
    'nail salon appointment Calgary',
    'nail salon booking Calgary',
    'online booking nail salon Calgary',
    'book manicure Calgary',
    'book pedicure Calgary',
    'book gel nails Calgary',
    'book acrylic nails Calgary',
    // Contact keywords
    'contact Victoria Park Nails and Spa',
    'nail salon contact Calgary',
    'Victoria Park nail salon contact',
    // Convenience keywords (USPs)
    'nail salon with free parking Calgary',
    'walk-in nail salon Calgary',
    'same-day nail appointment Calgary',
    'nail salon open Sunday Calgary',
    // Location keywords
    'nail salon near Calgary Stampede',
    'nail salon Victoria Park',
    'nail salon Downtown Calgary',
    'nail salon near me Calgary',
    // Hours & info
    'nail salon hours Calgary',
    'nail salon directions Calgary',
    'Victoria Park beauty services',
  ],
  openGraphDescription:
    `Book your nail appointment at Victoria Park Nails & Spa Calgary. Free parking, walk-ins welcome, same-day availability at ${siteConfig.business.address.street} near Stampede grounds.`,
  twitterDescription:
    `Book your Calgary nail appointment. Call ${siteConfig.business.phone} or book online. Free parking, walk-ins welcome, open 7 days at Victoria Park Nails & Spa.`,
})
