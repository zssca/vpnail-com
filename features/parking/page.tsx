'use cache'

import { StructuredData } from '@/components/seo'
import { siteConfig } from '@/lib/config/site.config'
import { ParkingDirectionsSection } from './sections/directions'
import { parkingDirectionsContent } from './sections/directions/data'

export function ParkingPage() {
  return (
    <main>
      <StructuredData
        type="LocalBusiness"
        data={{
          description: parkingDirectionsContent.structuredDataDescription,
          hasMap: siteConfig.business.address.mapUrl,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: siteConfig.location.coordinates.lat,
            longitude: siteConfig.location.coordinates.lng,
          },
        }}
      />

      <ParkingDirectionsSection />
    </main>
  )
}
