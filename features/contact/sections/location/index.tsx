import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { locationData } from './data'

import { LocationMapClient as LocationMap } from '@/components/shared/location-map-client'

export function LocationSection() {
  return (
    <Card id="location" className="flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{locationData.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-6">
          {locationData.description}
        </p>
        <LocationMap showInfoWindow={false} className="min-h-[360px] sm:min-h-[420px]" />
      </CardContent>
    </Card>
  )
}
