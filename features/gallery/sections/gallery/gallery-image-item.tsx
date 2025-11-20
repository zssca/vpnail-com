'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import type { GalleryImage } from '@/lib/gallery'

interface GalleryImageItemProps {
  image: GalleryImage
  onClick: () => void
}

export function GalleryImageItem({ image, onClick }: GalleryImageItemProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <figure
        itemScope
        itemType="https://schema.org/ImageObject"
        className="flex"
      >
        <div className="relative flex aspect-square h-full w-full overflow-hidden rounded-lg border bg-muted p-0">
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
        <figcaption className="sr-only" itemProp="caption">
          {image.caption}
        </figcaption>
        <meta itemProp="name" content={image.title} />
        <meta itemProp="description" content={image.description} />
      </figure>
    )
  }

  return (
    <figure
      itemScope
      itemType="https://schema.org/ImageObject"
      className="flex"
    >
      <Button
        type="button"
        onClick={onClick}
        variant="ghost"
        className="group relative flex aspect-square h-full w-full cursor-pointer overflow-hidden rounded-lg border bg-muted p-0 hover:bg-transparent"
        aria-label={image.alt}
        title={image.title}
      >
        <Image
          src={image.src}
          alt={image.alt}
          title={image.title}
          fill
          itemProp="contentUrl"
          className="object-cover transition-all duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          priority={false}
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
      </Button>
      <figcaption className="sr-only" itemProp="caption">
        {image.caption}
      </figcaption>
      <meta itemProp="name" content={image.title} />
      <meta itemProp="description" content={image.description} />
    </figure>
  )
}
