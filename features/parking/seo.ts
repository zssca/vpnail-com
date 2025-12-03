import { buildMetadata } from '@/lib/seo/metadata'
import { siteConfig } from '@/lib/config/site.config'

export const parkingMetadata = buildMetadata({
  title: 'Free Parking at Victoria Park Nails & Spa Calgary | Map & Directions',
  description: `Free customer parking at ${siteConfig.business.address.street} in Calgary. View parking map, street view, and walking directions to ${siteConfig.business.name} near Stampede grounds.`,
  path: '/parking',
  keywords: [
    'nail salon with free parking Calgary',
    'free parking Calgary nail salon',
    'Victoria Park Nails parking',
    'parking near Calgary Stampede nails',
    'parking Victoria Park Nails and Spa',
    'directions Victoria Park Nails',
    'nail salon parking downtown Calgary',
    'nail salon directions Calgary',
    'free parking nail spa Calgary',
  ],
  openGraphDescription: `Free customer parking at Victoria Park Nails & Spa Calgary. View parking map, street view, and walking directions near Stampede grounds.`,
  twitterDescription: `Free customer parking at ${siteConfig.business.address.street}. View map & directions or call ${siteConfig.business.phone} for parking help.`,
})
