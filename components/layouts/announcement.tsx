"use client"

import { useMemo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Bell } from 'lucide-react'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Announcement } from '@/lib/types/config.types'
import { cn } from '@/lib/utils'

import { Container } from './container'

interface AnnouncementCarouselProps {
  announcements: Announcement[]
  autoplayDelay?: number
}

type ParsedAnnouncement = {
  headline: string
  supporting?: string
}

const MESSAGE_SEPARATORS = [' - ', ' – ', ' — ', ' | ']

function parseMessage(message: string): ParsedAnnouncement {
  const separator = MESSAGE_SEPARATORS.find((mark) => message.includes(mark))
  if (!separator) {
    return { headline: message.trim() }
  }

  const [headline, ...rest] = message
    .split(separator)
    .map((segment) => segment.trim())
    .filter(Boolean)

  return {
    headline: headline || message.trim(),
    supporting: rest.length ? rest.join(` ${separator.trim()} `) : undefined,
  }
}

export function AnnouncementBanner({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  const { headline, supporting } = parseMessage(message)

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'bg-gradient-to-r from-primary via-primary/95 to-primary/80 text-primary-foreground',
        'border-b border-primary/30 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]',
        'h-full',
        className
      )}
    >
      <Container className="h-full px-4 py-3 sm:px-6" noPaddingMobile>
        <div className="flex h-full flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-3 sm:text-left">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold leading-tight tracking-tight sm:text-base">
              {headline}
            </span>
          </div>
          {supporting ? (
            <span className="text-xs leading-snug text-primary-foreground/90 sm:text-sm">
              {supporting}
            </span>
          ) : null}
        </div>
      </Container>
    </div>
  )
}

export function AnnouncementCarousel({
  announcements,
  autoplayDelay = 4500,
}: AnnouncementCarouselProps) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    [autoplayDelay]
  )

  const enabledAnnouncements = useMemo(
    () =>
      announcements.filter(
        (announcement) => announcement.enabled && announcement.message.trim().length > 0
      ),
    [announcements]
  )

  if (enabledAnnouncements.length === 0) {
    return null
  }

  if (enabledAnnouncements.length === 1) {
    return <AnnouncementBanner message={enabledAnnouncements[0].message} />
  }

  return (
    <Carousel
      orientation="vertical"
      opts={{ loop: true, align: 'start' }}
      plugins={[autoplay]}
      className="w-full h-[60px] sm:h-[68px]"
    >
      <CarouselContent className="!mt-0 h-full">
        {enabledAnnouncements.map((announcement) => (
          <CarouselItem key={announcement.id} className="!pt-0 h-full">
            <AnnouncementBanner message={announcement.message} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
