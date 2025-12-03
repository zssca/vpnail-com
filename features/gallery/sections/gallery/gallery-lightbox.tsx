'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import type { GalleryImage } from '@/lib/utils/gallery'

interface GalleryLightboxProps {
  image: GalleryImage | null
  onClose: () => void
}

export function GalleryLightbox({ image, onClose }: GalleryLightboxProps) {
  const [loadedSrc, setLoadedSrc] = useState('')
  const [errorSrc, setErrorSrc] = useState('')
  const currentSrc = image?.src ?? ''
  const isLoaded = currentSrc !== '' && loadedSrc === currentSrc
  const imageError = currentSrc !== '' && errorSrc === currentSrc

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] overflow-hidden border-0 bg-background p-0 sm:max-w-5xl sm:max-h-[90vh] sm:p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Gallery image preview</DialogTitle>
          <DialogDescription>Press escape to close the gallery image.</DialogDescription>
        </DialogHeader>
        {image && (
          <figure
            className="relative h-[65vh] w-full bg-background sm:h-[75vh]"
            itemScope
            itemType="https://schema.org/ImageObject"
            style={{ viewTransitionName: `gallery-lightbox` }}
          >
            {!isLoaded && !imageError && <Skeleton className="absolute inset-0 h-full w-full" aria-hidden="true" />}
            <Image
              src={image.src}
              alt={image.alt}
              title={image.title}
              fill
              itemProp="contentUrl"
              className={`object-contain transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
              onError={() => {
                setErrorSrc(currentSrc)
                setLoadedSrc('')
              }}
              onLoad={() => setLoadedSrc(currentSrc)}
              placeholder="empty"
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="text-center text-sm text-muted-foreground">
                  <div className="mb-2">Unable to load image</div>
                  <div className="text-xs">Please try again later</div>
                </div>
              </div>
            )}
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
