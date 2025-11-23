import { PackagesCarouselSection } from '@/components/shared/packages-carousel'
import { combinationsData } from './data'

export function CombinationsSection() {
  return (
    <PackagesCarouselSection
      id="packages"
      sectionVariant="muted"
      sectionSize="lg"
      {...combinationsData}
    />
  )
}
