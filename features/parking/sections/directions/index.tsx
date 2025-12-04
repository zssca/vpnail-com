import { Container } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import { Skeleton } from '@/components/ui/skeleton'
import { LocationMapClient as LocationMap } from '@/features/shared/location-map-client'
import { parkingDirectionsContent } from './data'

export function ParkingDirectionsSection() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-6xl space-y-8 sm:space-y-10 px-0 sm:px-6">
        <div className="px-6 sm:px-0">
          <SectionHeader
            subtitle={parkingDirectionsContent.subtitle}
            title={parkingDirectionsContent.title}
            spacing="compact"
            maxWidth="lg"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden sm:rounded-lg border-y sm:border border-border bg-muted">
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
            className="min-h-[340px] sm:min-h-[420px] sm:rounded-lg overflow-hidden border-y sm:border border-border"
            showInfoWindow={false}
            fallback={
              <div className="relative w-full overflow-hidden sm:rounded-lg border-y sm:border border-border bg-muted min-h-[340px] sm:min-h-[420px]">
                <Skeleton className="absolute inset-0 h-full w-full" />
              </div>
            }
          />
        </div>

        <div className="px-6 sm:px-0 space-y-6">
          {/* Directions Feature */}
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Plan your trip</h3>
            <form
              className="flex flex-col sm:flex-row gap-3"
              action="https://www.google.com/maps/dir/"
              method="get"
              target="_blank"
            >
              <input type="hidden" name="api" value="1" />
              <input type="hidden" name="destination" value="Victoria Park Nails and Spa" />
              <div className="flex-1">
                <input
                  type="text"
                  name="origin"
                  placeholder="Enter your starting location (e.g. Calgary Tower)"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <Button type="submit" variant="default">
                Get Directions
              </Button>
            </form>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href={parkingDirectionsContent.ctaHref} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
