'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analyticsConfig } from '@/lib/config/analytics.config'
import { ensureDataLayer, pushDataLayerEvent } from '@/lib/utils/analytics'

export function AnalyticsEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams?.toString()
  const analyticsActive = analyticsConfig.shouldLoadAnalytics

  useEffect(() => {
    ensureDataLayer(analyticsConfig.dataLayerName)

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const trackedElement = target.closest('[data-gtm-event]') as HTMLElement | null
      const anchor = target.closest('a,button') as HTMLAnchorElement | HTMLButtonElement | null
      const href = anchor?.getAttribute('href') || ''
      const text = (anchor?.textContent || trackedElement?.textContent || '').trim()

      if (trackedElement?.dataset.gtmEvent) {
        pushDataLayerEvent(trackedElement.dataset.gtmEvent, {
          link_url: trackedElement.dataset.gtmHref || href,
          link_text: trackedElement.dataset.gtmLabel || text,
          component_id: trackedElement.dataset.gtmId,
          event_category: trackedElement.dataset.gtmCategory,
        })
        return
      }

      if (!href) return

      const pagePath = window.location.pathname
      const pageTitle = document.title

      let eventName: string | null = null

      if (href.startsWith('tel:')) eventName = 'click_to_call'
      else if (href.startsWith('mailto:')) eventName = 'email_click'
      else if (/setmore\.com/i.test(href)) eventName = 'book_now_click'
      else if (/maps\.google\.com/i.test(href) || href.startsWith('#location')) eventName = 'click_get_directions'

      if (eventName) {
        pushDataLayerEvent(eventName, {
          link_url: href,
          link_text: text,
          page_path: pagePath,
          page_title: pageTitle,
          page_location: window.location.href,
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (!analyticsActive) return

    const pagePath = search ? `${pathname}?${search}` : pathname
    pushDataLayerEvent('page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [analyticsActive, pathname, search])

  return null
}
