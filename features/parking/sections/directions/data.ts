import { siteConfig } from '@/lib/config/site.config'

export const parkingDirectionsContent = {
  structuredDataDescription: `Parking directions and access for guests of ${siteConfig.business.name}.`,
  subtitle: 'Parking',
  title: 'Free parking right outside our salon',
  description: `Park directly outside ${siteConfig.business.name} at ${siteConfig.business.address.street}. Look for the free parking sign by the entrance; if front stalls are full, call and we will guide you.`,
  stepsTitle: 'Quick directions',
  steps: [
    'Enter 1 St SE via 14 Ave and pull up beside the salon.',
    'Use the signed customer stalls directly outside the storefront (look for the free parking sign).',
    `If those stalls are full, call ${siteConfig.business.phone} and we will direct you to the nearest open spot.`,
  ],
  highlights: [
    {
      label: 'Front stalls',
      description: 'Reserved for guests directly outside the salon for easiest access.',
    },
    {
      label: 'Overflow help',
      description: 'Call us and we will point you to the nearest available parking.',
    },
  ],
  map: {
    label: 'Parking map',
    description: 'Victoria Park Nails marker + free parking sign (POIs hidden).',
  },
  streetViewCard: {
    label: 'Street view',
    description: 'Preview the storefront and parking entrance.',
  },
  assistance: {
    label: 'Need help finding a spot?',
    description: 'Call and we will guide you in real time.',
  },
  streetView: {
    title: `${siteConfig.business.name} parking street view`,
    src: siteConfig.location.streetViewEmbedUrl,
  },
  ctaLabel: 'Get Directions',
  ctaHref: siteConfig.business.address.mapUrl,
  contactLabel: 'Call for parking help',
}
