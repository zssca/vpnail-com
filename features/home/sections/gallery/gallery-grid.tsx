'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { getImageSizes, imagePlaceholders, getLoadingStrategy } from '@/lib/utils/image'
import type { GalleryImage } from '@/lib/utils/gallery'

interface HomeGalleryGridProps {
  images: GalleryImage[]
}

export function HomeGalleryGrid({ images }: HomeGalleryGridProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-4">
          {images.map((image, index) => {
            const { priority } = getLoadingStrategy(index, images.length, 6)
            return (
            <figure
              key={image.filename}
              itemScope
              itemType="https://schema.org/ImageObject"
              className="flex"
              style={{ viewTransitionName: `gallery-image-${index}` }}
            >
              <Button
                type="button"
                onClick={() => setSelected(image)}
                variant="ghost"
                className="group relative flex aspect-square h-full w-full overflow-hidden rounded-xl border bg-muted p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
                aria-label={`View full size: ${image.alt}`}
                title={image.title}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  fill
                  itemProp="contentUrl"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={getImageSizes('gallery')}
                  priority={priority}
                  loading={priority ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL={imagePlaceholders.default}
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/15" />
              </Button>
              <figcaption className="sr-only" itemProp="caption">
                {image.caption}
              </figcaption>
              <meta itemProp="name" content={image.title} />
              <meta itemProp="description" content={image.description} />
            </figure>
          )
        })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-[95vw] overflow-hidden p-0 sm:max-w-5xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Gallery image preview</DialogTitle>
            <DialogDescription>Use arrow keys to navigate or escape to close the lightbox.</DialogDescription>
          </DialogHeader>
          {selected && (
            <figure
              className="relative h-[65vh] w-full bg-background sm:h-[75vh]"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                title={selected.title}
                fill
                itemProp="contentUrl"
                className="object-contain"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, 70vw"
                priority
                placeholder="blur"
                blurDataURL={imagePlaceholders.default}
              />
              <figcaption className="sr-only" itemProp="caption">
                {selected.caption}
              </figcaption>
              <meta itemProp="name" content={selected.title} />
              <meta itemProp="description" content={selected.description} />
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
