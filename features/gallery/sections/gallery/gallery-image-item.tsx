import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { GalleryImage } from '@/lib/gallery'

interface GalleryImageItemProps {
  image: GalleryImage
  onClick: () => void
}

export function GalleryImageItem({ image, onClick }: GalleryImageItemProps) {
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
