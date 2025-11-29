import { Container } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import { Skeleton } from '@/components/ui/skeleton'
import { LocationMapClient as LocationMap } from '@/features/shared/location-map-client'
import { parkingDirectionsContent } from './data'

export function ParkingDirectionsSection() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-6xl space-y-8 sm:space-y-10">
        <SectionHeader
          subtitle={parkingDirectionsContent.subtitle}
          title={parkingDirectionsContent.title}
          spacing="compact"
          maxWidth="lg"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border bg-muted">
            <div className="aspect-video">
              <iframe
                src={parkingDirectionsContent.streetView.src}
                title={parkingDirectionsContent.streetView.title}
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <LocationMap
            className="min-h-[340px] sm:min-h-[420px]"
            showInfoWindow={false}
            fallback={
              <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted min-h-[340px] sm:min-h-[420px]">
                <Skeleton className="absolute inset-0 h-full w-full" />
              </div>
            }
          />
        </div>

        <div className="flex justify-center lg:justify-start">
          <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
            <a href={parkingDirectionsContent.ctaHref} target="_blank" rel="noopener noreferrer">
              {parkingDirectionsContent.ctaLabel}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
