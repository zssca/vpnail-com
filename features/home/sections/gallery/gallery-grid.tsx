'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SkeletonShimmer } from '@/components/ui/skeleton'
import type { GalleryImage } from '@/lib/gallery'

interface HomeGalleryGridProps {
  images: GalleryImage[]
}

export function HomeGalleryGrid({ images }: HomeGalleryGridProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const [mounted, setMounted] = useState(false)

  // Hydration safety - ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setMounted(true)
  }, [])

  if (images.length === 0) {
    return null
  }

  if (!mounted) {
    return (
      <div className="overflow-x-hidden">
        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-4">
          {images.map((image) => (
            <div key={image.filename} className="aspect-square">
              <SkeletonShimmer className="h-full w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-4">
          {images.map((image, index) => (
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
                  sizes="(max-width: 400px) 48vw, (max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, 20vw"
                  priority={index < 6}
                  loading={index < 6 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
              </Button>
              <figcaption className="sr-only" itemProp="caption">
                {image.caption}
              </figcaption>
              <meta itemProp="name" content={image.title} />
              <meta itemProp="description" content={image.description} />
            </figure>
          ))}
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
