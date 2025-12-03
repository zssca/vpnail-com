"use client"

import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { AnnouncementBanner } from './announcement-banner'
import type { Announcement } from '@/lib/types/config.types'

interface AnnouncementCarouselProps {
  announcements: Announcement[]
  autoplayDelay?: number
}

export function AnnouncementCarousel({
  announcements,
  autoplayDelay = 5000,
}: AnnouncementCarouselProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter only enabled announcements
  const enabledAnnouncements = announcements.filter((a) => a.enabled)

  // Don't render if no enabled announcements
  if (enabledAnnouncements.length === 0) {
    return null
  }

  // If only one announcement, render it directly without carousel
  if (enabledAnnouncements.length === 1) {
    return <AnnouncementBanner message={enabledAnnouncements[0].message} />
  }

  // Don't show carousel until mounted (prevent hydration mismatch)
  if (!mounted) {
    return <AnnouncementBanner message={enabledAnnouncements[0].message} />
  }

  return (
    <Carousel
      orientation="vertical"
      opts={{
        loop: true,
        align: 'start',
      }}
      plugins={[
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: false,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="mt-0">
        {enabledAnnouncements.map((announcement) => (
          <CarouselItem key={announcement.id} className="pt-0">
            <AnnouncementBanner message={announcement.message} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
