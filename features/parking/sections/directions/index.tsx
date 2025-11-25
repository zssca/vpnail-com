import { Container } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site.config'
import { LocationMapClient as LocationMap } from '@/features/shared/location-map-client'
import { parkingDirectionsContent } from './data'

export function ParkingDirectionsSection() {
  const phoneHref = `tel:${siteConfig.business.phone.replace(/[^\\d+]/g, '')}`

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-7xl space-y-8 px-0">
        <div className="w-full overflow-hidden bg-muted">
          <LocationMap className="min-h-[360px] sm:min-h-[420px]" showInfoWindow={false} />
        </div>

        <p className="px-4 text-muted-foreground">
          {parkingDirectionsContent.instructionsPrefix} {siteConfig.business.address.street}.{' '}
          {parkingDirectionsContent.instructionsSuffix}{' '}
          <a href={phoneHref} className="font-medium text-primary" aria-label={`Call ${siteConfig.business.phone}`}>
            {siteConfig.business.phone}
          </a>
          .
        </p>

        <div className="w-full overflow-hidden bg-muted">
          <iframe
            src={parkingDirectionsContent.streetView.src}
            title={parkingDirectionsContent.streetView.title}
            className="h-[260px] w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex w-full flex-col px-4 sm:flex-row">
          <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
            <a href={siteConfig.business.address.mapUrl} target="_blank" rel="noopener noreferrer">
              {parkingDirectionsContent.ctaLabel}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
