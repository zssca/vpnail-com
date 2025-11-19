import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { GalleryImage } from '@/lib/gallery'

interface GalleryLightboxProps {
  image: GalleryImage | null
  onClose: () => void
}

export function GalleryLightbox({ image, onClose }: GalleryLightboxProps) {
  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Gallery image preview</DialogTitle>
          <DialogDescription>Use escape to close the lightbox.</DialogDescription>
        </DialogHeader>
        {image && (
          <figure
            className="relative h-[75vh] w-full bg-background"
            itemScope
            itemType="https://schema.org/ImageObject"
          >
            <Image
              src={image.src}
              alt={image.alt}
              title={image.title}
              fill
              itemProp="contentUrl"
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
            <figcaption className="sr-only" itemProp="caption">
              {image.caption}
            </figcaption>
            <meta itemProp="name" content={image.title} />
            <meta itemProp="description" content={image.description} />
          </figure>
        )}
      </DialogContent>
    </Dialog>
  )
}
