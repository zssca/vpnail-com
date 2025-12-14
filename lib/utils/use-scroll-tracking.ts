'use client'

import { useEffect } from 'react'
import { pushDataLayerEvent } from './analytics'

export function useScrollTracking(pageName: string, eventName = 'scroll_depth') {
  useEffect(() => {
    const thresholds = [0.25, 0.5, 0.75, 1]
    const fired: Record<number, boolean> = {}

    const track = () => {
      if (typeof window === 'undefined') return

      const scrollPos = window.scrollY + window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight || 1
      const ratio = scrollPos / scrollHeight

      thresholds.forEach((threshold) => {
        if (!fired[threshold] && ratio >= threshold) {
          fired[threshold] = true
          pushDataLayerEvent(eventName, {
            page_name: pageName,
            percent: Math.round(threshold * 100),
          })
        }
      })
    }

    track()
    window.addEventListener('scroll', track, { passive: true })
    return () => window.removeEventListener('scroll', track)
  }, [eventName, pageName])
}
