import { buildMetadata } from '@/lib/seo/metadata'
import { siteConfig } from '@/lib/config/site.config'

export const parkingMetadata = buildMetadata({
  title: 'Parking at Victoria Park Nails & Spa | Free Customer Parking in Calgary',
  description: `Park free at ${siteConfig.business.address.street} in Calgary. View our parking map, street view, and walking directions to ${siteConfig.business.name} near the Stampede grounds.`,
  path: '/parking',
  keywords: [
    'Victoria Park Nails parking',
    'free parking Calgary nail salon',
    'parking near Calgary Stampede nails',
    'parking Victoria Park Nails and Spa',
    'directions Victoria Park Nails',
  ],
  openGraphDescription: `See where to park for ${siteConfig.name} with a live map, street view, and quick walking directions from the lot to our salon.`,
  twitterDescription: `Free customer parking at ${siteConfig.business.address.street}. Open directions or call ${siteConfig.business.phone} for parking help.`,
})
