import { siteConfig } from '@/lib/config/site.config'

export const parkingDirectionsContent = {
  structuredDataDescription: `Parking directions and access for guests of ${siteConfig.business.name}.`,
  instructionsPrefix: 'Park in front of the salon at',
  instructionsSuffix: 'If stalls are full, call and we will guide you to the nearest open spot.',
  streetView: {
    title: `${siteConfig.business.name} parking street view`,
    src: siteConfig.location.streetViewEmbedUrl,
  },
  ctaLabel: 'Get Directions',
}
