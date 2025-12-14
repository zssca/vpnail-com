
"use client"

import { useEffect, useState } from 'react'
import { BlurFade } from '@/components/ui/blur-fade'
import { AnimatePresence, motion } from 'motion/react'
import { type Announcement } from '@/lib/types/config.types'

interface AnnouncementCarouselProps {
  announcements: Announcement[]
  autoplayDelay?: number
}

export function AnnouncementCarousel({
  announcements,
  autoplayDelay = 5000,
}: AnnouncementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)


  // Use derived state instead of syncing useEffect to state
  const enabledAnnouncements = announcements.filter(
    (a) => a.enabled && a.message.trim().length > 0
  )



  useEffect(() => {
    if (enabledAnnouncements.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % enabledAnnouncements.length)
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [enabledAnnouncements.length, autoplayDelay])

  if (enabledAnnouncements.length === 0) return null

  const currentAnnouncement = enabledAnnouncements[currentIndex]

  // Fallback if accessed before state update
  if (!currentAnnouncement) return null

  return (
    <div className="w-full bg-primary text-primary-foreground py-2 min-h-[40px] flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnouncement.id}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center"
          >
            {currentAnnouncement.title && (
              <>
                <BlurFade
                  delay={0.1}
                  offset={0}
                  className="inline-flex items-center"
                >
                  <span className="font-bold">{currentAnnouncement.title}</span>
                </BlurFade>
                <BlurFade delay={0.15} offset={0} className="hidden sm:inline-block">
                  <span className="px-2">-</span>
                </BlurFade>
                <div className="w-full sm:hidden" />
              </>
            )}
            <BlurFade delay={0.2} offset={0} className="inline-block">
              <span className="opacity-70">{currentAnnouncement.message}</span>
            </BlurFade>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
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
  // Deprecated: This component is kept for compatibility if imported elsewhere, 
  // but effectively we are moving to toasts. 
  // If it's still explicitly used, we can render nothing or a basic fallback.
  return null
}
