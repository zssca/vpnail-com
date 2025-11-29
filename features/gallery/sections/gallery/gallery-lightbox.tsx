'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LightboxNavigation } from './lightbox-navigation'
import type { GalleryImage } from '@/lib/utils/gallery'

interface GalleryLightboxProps {
  image: GalleryImage | null
  allImages: GalleryImage[]
  onClose: () => void
  onNavigate: (image: GalleryImage) => void
}

export function GalleryLightbox({ image, allImages, onClose, onNavigate }: GalleryLightboxProps) {
  const [imageError, setImageError] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)

  const currentIndex = image ? allImages.findIndex((img) => img.filename === image.filename) : -1
  const canNavigatePrevious = currentIndex > 0
  const canNavigateNext = currentIndex < allImages.length - 1

  const navigatePrevious = useCallback(() => {
    if (!canNavigatePrevious) {
      return
    }

    const previousImage = allImages[currentIndex - 1]
    if (previousImage) {
      onNavigate(previousImage)
      setImageError(false)
    }
  }, [allImages, canNavigatePrevious, currentIndex, onNavigate])

  const navigateNext = useCallback(() => {
    if (!canNavigateNext) {
      return
    }

    const nextImage = allImages[currentIndex + 1]
    if (nextImage) {
      onNavigate(nextImage)
      setImageError(false)
    }
  }, [allImages, canNavigateNext, currentIndex, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    if (!image) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        navigatePrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        navigateNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [image, navigateNext, navigatePrevious])

  // Touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = Math.abs(touchStartY.current - touchEndY)

    // Only register horizontal swipes, ignore vertical scrolling
    if (Math.abs(diffX) > diffY && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left, show next image
        navigateNext()
      } else {
        // Swiped right, show previous image
        navigatePrevious()
      }
    }
  }

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] overflow-hidden p-0 sm:max-w-5xl max-h-[85vh] sm:max-h-[90vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>Gallery image preview</DialogTitle>
          <DialogDescription>
            Use arrow keys to navigate between images or swipe on mobile. Press escape to close.
          </DialogDescription>
        </DialogHeader>
        {image && (
          <div
            className="relative h-[65vh] w-full bg-background sm:h-[75vh]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Image viewer"
            style={{ viewTransitionName: `gallery-lightbox` }}
          >
            <figure
              className="relative h-full w-full"
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
                onError={() => {
                  setImageError(true)
                }}
              />
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center text-sm text-muted-foreground">
                    <div className="mb-2">Unable to load image</div>
                    <div className="text-xs">Please try again later</div>
                  </div>
                </div>
              )}
              {/* Image counter badge */}
              {allImages.length > 1 && (
                <div className="absolute right-4 top-4 rounded bg-foreground/50 px-3 py-1.5 text-sm text-background backdrop-blur-sm">
                  {currentIndex + 1} / {allImages.length}
                </div>
              )}

              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent px-4 py-3 text-sm text-background">
                <div>{image.caption}</div>
              </figcaption>
              <meta itemProp="name" content={image.title} />
              <meta itemProp="description" content={image.description} />
            </figure>

            {/* Navigation controls */}
            <LightboxNavigation
              currentIndex={currentIndex}
              totalImages={allImages.length}
              canNavigatePrevious={canNavigatePrevious}
              canNavigateNext={canNavigateNext}
              onNavigatePrevious={navigatePrevious}
              onNavigateNext={navigateNext}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
