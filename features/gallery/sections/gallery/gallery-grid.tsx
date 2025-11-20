'use client'

import { useEffect, useState } from 'react'
import type { GalleryImage } from '@/lib/gallery'
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
  const [mounted, setMounted] = useState(false)

  const totalPages = Math.max(1, Math.ceil(images.length / ITEMS_PER_PAGE))
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE
  const paginatedImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Hydration safety - ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setMounted(true)
  }, [])

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
    if (!mounted) return

    const nextPageStart = activePage * ITEMS_PER_PAGE
    const nextPageEnd = Math.min(nextPageStart + ITEMS_PER_PAGE, images.length)

    for (let i = nextPageStart; i < nextPageEnd; i++) {
      if (images[i]) {
        const img = new window.Image()
        img.src = images[i].src
      }
    }
  }, [activePage, images, mounted])

  if (!mounted) {
    return (
      <>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {paginatedImages.map((image) => (
            <GalleryImageItem
              key={image.filename}
              image={image}
              onClick={() => {}}
            />
          ))}
        </div>
        <GalleryPagination
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {paginatedImages.map((image) => (
          <GalleryImageItem
            key={image.filename}
            image={image}
            onClick={() => setSelectedImage(image)}
          />
        ))}
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
