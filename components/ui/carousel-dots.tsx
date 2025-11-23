"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import type { CarouselApi } from "./carousel"

type CarouselDotsProps = React.ComponentProps<"div"> & {
  api?: CarouselApi | null
}

export function CarouselDots({
  api,
  className,
  ...props
}: CarouselDotsProps) {
  const [slides, setSlides] = React.useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setSlides(api.scrollSnapList().map((_, index) => index))

    const updateSelected = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", updateSelected)
    api.on("reInit", updateSelected)
    updateSelected()

    return () => {
      api.off("select", updateSelected)
      api.off("reInit", updateSelected)
    }
  }, [api])

  if (!api || slides.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        className
      )}
      data-slot="carousel-dots"
      {...props}
    >
      {slides.map((index) => (
        <button
          key={`carousel-dot-${index}`}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          data-active={selectedIndex === index}
          className={cn(
            "h-2 w-2 rounded-full bg-muted transition-colors data-[active=true]:bg-primary"
          )}
          onClick={() => api?.scrollTo(index)}
        />
      ))}
    </div>
  )
}
