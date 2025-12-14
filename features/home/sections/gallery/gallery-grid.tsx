'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getImageSizes, getLoadingStrategy } from '@/lib/utils/image'
import type { GalleryImage } from '@/lib/utils/gallery'

interface HomeGalleryGridProps {
  images: GalleryImage[]
}

interface HomeGalleryImageItemProps {
  image: GalleryImage
  index: number
  totalImages: number
  onSelect: (image: GalleryImage) => void
}

function HomeGalleryImageItem({ image, index, totalImages, onSelect }: HomeGalleryImageItemProps) {
  const { priority } = getLoadingStrategy(index, totalImages, 6)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <figure
      itemScope
      itemType="https://schema.org/ImageObject"
      className="flex"
      style={{ viewTransitionName: `gallery-image-${index}` }}
    >
      <Button
        type="button"
        onClick={() => onSelect(image)}
        variant="ghost"
        className="group relative flex aspect-square h-full w-full overflow-hidden rounded-xl border bg-card p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
        aria-label={`View full size: ${image.alt}`}
        title={image.title}
      >
        {!isLoaded && <Skeleton className="absolute inset-0 h-full w-full rounded-xl" aria-hidden="true" />}
        <Image
          src={image.src}
          alt={image.alt}
          title={image.title}
          fill
          itemProp="contentUrl"
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes={getImageSizes('gallery')}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          placeholder="empty"
          onLoad={() => setIsLoaded(true)}
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
}

export function HomeGalleryGrid({ images }: HomeGalleryGridProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const [previewLoaded, setPreviewLoaded] = useState(false)

  const handleSelect = (image: GalleryImage) => {
    setPreviewLoaded(false)
    setSelected(image)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-4">
          {images.map((image, index) => (
            <HomeGalleryImageItem
              key={image.filename}
              image={image}
              index={index}
              totalImages={images.length}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null)
            setPreviewLoaded(false)
          }
        }}
      >
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
              {!previewLoaded && <Skeleton className="absolute inset-0 h-full w-full" aria-hidden="true" />}
              <Image
                src={selected.src}
                alt={selected.alt}
                title={selected.title}
                fill
                itemProp="contentUrl"
                className={`object-contain transition-opacity duration-200 ${previewLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, 70vw"
                priority
                placeholder="empty"
                onLoad={() => setPreviewLoaded(true)}
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
