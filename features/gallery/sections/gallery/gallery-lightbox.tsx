'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import type { GalleryImage } from '@/lib/gallery'

interface GalleryLightboxProps {
  image: GalleryImage | null
  allImages: GalleryImage[]
  onClose: () => void
  onNavigate: (image: GalleryImage) => void
}

export function GalleryLightbox({ image, allImages, onClose, onNavigate }: GalleryLightboxProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)

  const currentIndex = image ? allImages.findIndex((img) => img.filename === image.filename) : -1
  const canNavigatePrevious = currentIndex > 0
  const canNavigateNext = currentIndex < allImages.length - 1

  const navigatePrevious = () => {
    if (canNavigatePrevious) {
      onNavigate(allImages[currentIndex - 1])
      setIsLoading(true)
      setImageError(false)
    }
  }

  const navigateNext = () => {
    if (canNavigateNext) {
      onNavigate(allImages[currentIndex + 1])
      setIsLoading(true)
      setImageError(false)
    }
  }

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
  }, [image, allImages, currentIndex])

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
      <DialogContent className="max-w-5xl overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Gallery image preview</DialogTitle>
          <DialogDescription>
            Use arrow keys to navigate between images or swipe on mobile. Press escape to close.
          </DialogDescription>
        </DialogHeader>
        {image && (
          <div
            className="relative h-[75vh] w-full bg-background"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Image viewer"
          >
            {isLoading && (
              <Skeleton className="absolute inset-0 h-full w-full" />
            )}
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
                className={`object-contain transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
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
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-sm text-white">
                <div>{image.caption}</div>
                {allImages.length > 1 && (
                  <div className="mt-1 text-xs text-gray-300">
                    {currentIndex + 1} of {allImages.length}
                  </div>
                )}
              </figcaption>
              <meta itemProp="name" content={image.title} />
              <meta itemProp="description" content={image.description} />
            </figure>

            {/* Navigation hints for keyboard and touch */}
            {allImages.length > 1 && (
              <>
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 transform p-4 text-white/40 transition-colors ${
                    canNavigatePrevious ? 'cursor-pointer hover:text-white/80' : 'cursor-not-allowed opacity-25'
                  }`}
                  onClick={navigatePrevious}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      navigatePrevious()
                    }
                  }}
                  role="button"
                  tabIndex={canNavigatePrevious ? 0 : -1}
                  aria-label={canNavigatePrevious ? 'Previous image' : 'No previous image'}
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 transform p-4 text-white/40 transition-colors ${
                    canNavigateNext ? 'cursor-pointer hover:text-white/80' : 'cursor-not-allowed opacity-25'
                  }`}
                  onClick={navigateNext}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      navigateNext()
                    }
                  }}
                  role="button"
                  tabIndex={canNavigateNext ? 0 : -1}
                  aria-label={canNavigateNext ? 'Next image' : 'No next image'}
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
