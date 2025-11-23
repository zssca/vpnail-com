import Link from 'next/link'
import { Section, Container } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { getGalleryImages } from '@/lib/utils/gallery'
import { homeGalleryData } from './data'
import { HomeGalleryGrid } from './gallery-grid'

export function HomeGallerySection() {
  const images = getGalleryImages(9)

  if (images.length === 0) {
    return null
  }

  return (
    <Section variant="muted" size="lg">
      <Container>
        <div className="space-y-8 sm:space-y-10">
          <div className="text-center">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{homeGalleryData.title}</h2>
          </div>

          <HomeGalleryGrid images={images} />

          <div className="flex justify-center pt-2">
            <Button size="lg" variant="outline" asChild>
              <Link href={homeGalleryData.cta.href}>{homeGalleryData.cta.text}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
