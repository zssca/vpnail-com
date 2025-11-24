import { StructuredData } from '@/components/seo'
import { Container } from '@/components/layouts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site.config'
import { LocationMapClient as LocationMap } from '@/components/shared/location-map-client'

export function ParkingPage() {
  return (
    <main className="py-12 sm:py-16">
      <StructuredData
        type="LocalBusiness"
        data={{
          description: 'Parking directions and access for guests of Victoria Park Nails and Spa.',
          hasMap: siteConfig.business.address.mapUrl,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: siteConfig.location.coordinates.lat,
            longitude: siteConfig.location.coordinates.lng,
          },
        }}
      />

      <Container className="max-w-7xl space-y-8 px-0">
        <div className="w-full overflow-hidden bg-muted">
          <LocationMap className="min-h-[360px] sm:min-h-[420px]" showInfoWindow={false} />
        </div>

        <p className="px-4 text-muted-foreground">
          Park in front of the salon at {siteConfig.business.address.street}. If stalls are full, call
          {` ${siteConfig.business.phone}`} and we will guide you to the nearest open spot.
        </p>

        <div className="w-full overflow-hidden bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1763887397939!6m8!1m7!1s_EkkOWxZK4eChv4gkC4R3Q!2m2!1d51.03873346378575!2d-114.0609939510665!3f309.1331154682398!4f0.9946950430054073!5f2.278747367825379"
            title="Victoria Park Nails parking street view"
            className="h-[260px] w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex w-full flex-col sm:flex-row px-4">
          <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
            <a href={siteConfig.business.address.mapUrl} target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
          </Button>
        </div>
      </Container>
    </main>
  )
}
