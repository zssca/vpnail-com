import { Section, Container } from '@/components/layouts'
import { galleryData } from './data'
import { GalleryGrid } from './gallery-grid'
import { getGalleryImages } from '@/lib/utils/gallery'

export function GallerySection() {
  const images = getGalleryImages()

  return (
    <Section variant="muted">
      <Container>
        <div className="mb-16 text-center">
          <Container size="sm">
            <div className="space-y-4">
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{galleryData.title}</h2>
              <p className="text-xl text-muted-foreground">{galleryData.subtitle}</p>
              <p className="leading-7 text-muted-foreground">{galleryData.description}</p>
            </div>
          </Container>
        </div>

        <GalleryGrid images={images} />
      </Container>
    </Section>
  )
}
