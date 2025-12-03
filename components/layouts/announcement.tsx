"use client"

import { useMemo, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import { Bell, X, ArrowRight } from 'lucide-react'

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
  announcement,
  onDismiss,
  className,
}: {
  announcement: Announcement
  onDismiss?: () => void
  className?: string
}) {
  const { headline, supporting } = parseMessage(announcement.message)
  const isNeutral = announcement.variant === 'neutral'

  const Content = (
    <div className="flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-3 sm:text-left">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 animate-pulse" aria-hidden="true" />
        <span className="text-sm font-semibold leading-tight tracking-tight sm:text-base">
          {headline}
        </span>
      </div>
      {supporting ? (
        <span className={cn(
          "text-xs leading-snug sm:text-sm",
          isNeutral ? "text-muted-foreground" : "text-primary-foreground/90"
        )}>
          {supporting}
        </span>
      ) : null}
      {announcement.link && (
        <span className="hidden items-center gap-1 text-xs font-medium underline underline-offset-4 sm:flex">
          Learn more <ArrowRight className="h-3 w-3" />
        </span>
      )}
    </div>
  )

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'relative overflow-hidden transition-colors',
        isNeutral
          ? 'bg-background text-foreground border-b'
          : 'bg-gradient-to-r from-primary via-primary/95 to-primary/80 text-primary-foreground border-b border-primary/30 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]',
        className
      )}
    >
      <Container className="px-4 py-3 sm:px-6" noPaddingMobile>
        {announcement.link ? (
          <Link href={announcement.link} className="block hover:opacity-90 transition-opacity">
            {Content}
          </Link>
        ) : (
          Content
        )}

        {onDismiss && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDismiss()
            }}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors",
              isNeutral
                ? "hover:bg-muted text-muted-foreground hover:text-foreground"
                : "hover:bg-primary-foreground/10 text-primary-foreground/80 hover:text-primary-foreground"
            )}
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </Container>
    </div>
  )
}

export function AnnouncementCarousel({
  announcements,
  autoplayDelay = 5000,
}: AnnouncementCarouselProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const dismissed = sessionStorage.getItem('announcement-dismissed')
    if (dismissed) {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('announcement-dismissed', 'true')
  }

  const autoplay = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      playOnInit: true,
    })
  )

  const enabledAnnouncements = useMemo(
    () =>
      announcements.filter(
        (announcement) => announcement.enabled && announcement.message.trim().length > 0
      ),
    [announcements]
  )

  if (!isMounted || !isVisible || enabledAnnouncements.length === 0) {
    return null
  }

  if (enabledAnnouncements.length === 1) {
    return <AnnouncementBanner announcement={enabledAnnouncements[0]} onDismiss={handleDismiss} />
  }

  return (
    <div className="relative group">
      <Carousel
        orientation="horizontal"
        opts={{ loop: true, align: 'start' }}
        plugins={[autoplay.current]}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="!mt-0">
          {enabledAnnouncements.map((announcement) => (
            <CarouselItem key={announcement.id} className="!pt-0">
              <AnnouncementBanner announcement={announcement} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/10 text-white/80 hover:text-white transition-colors z-10"
        aria-label="Dismiss announcements"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
