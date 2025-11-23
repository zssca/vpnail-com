'use client'

import { useEffect, useState } from 'react'
import type { GalleryImage } from '@/lib/utils/gallery'
import { GalleryImageItem } from './gallery-image-item'
import { GalleryLightbox } from './gallery-lightbox'
import { GalleryPagination } from './gallery-pagination'

interface GalleryGridProps {
  images: GalleryImage[]
}

const ITEMS_PER_PAGE = 30

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [activePage, setActivePage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(images.length / ITEMS_PER_PAGE))
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE
  const paginatedImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActivePage(1)
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [images.length])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActivePage((page) => Math.min(Math.max(page, 1), totalPages))
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [totalPages])

  const handlePageChange = (page: number) => {
    setActivePage(page)
    setSelectedImage(null)
  }

  // Preload images for next page
  useEffect(() => {
    const nextPageStart = activePage * ITEMS_PER_PAGE
    const nextPageEnd = Math.min(nextPageStart + ITEMS_PER_PAGE, images.length)

    for (let i = nextPageStart; i < nextPageEnd; i++) {
      if (images[i]) {
        const img = new window.Image()
        img.src = images[i].src
      }
    }
  }, [activePage, images])

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-4 xl:grid-cols-6">
        {paginatedImages.map((image, index) => (
          <GalleryImageItem
            key={image.filename}
            image={image}
            index={index}
            onClick={() => setSelectedImage(image)}
            priority={index < 6}
          />
        ))}
        </div>
      </div>

      <GalleryPagination
        activePage={activePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <GalleryLightbox
        image={selectedImage}
        allImages={images}
        onClose={() => setSelectedImage(null)}
        onNavigate={setSelectedImage}
      />
    </>
  )
}
