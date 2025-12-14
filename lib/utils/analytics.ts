'use client'

import { analyticsConfig } from '@/lib/config/analytics.config'

export type DataLayerEvent = Record<string, unknown>

type PushOptions = {
  includePageMetadata?: boolean
}

const getPageMetadata = () => {
  if (typeof window === 'undefined') return {}

  return {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  }
}

export function ensureDataLayer(layerName = analyticsConfig.dataLayerName): Array<DataLayerEvent> {
  if (typeof window === 'undefined') return []

  const win = window as unknown as Record<string, unknown>
  const existing = win[layerName]

  if (Array.isArray(existing)) {
    return existing as Array<DataLayerEvent>
  }

  const dataLayer: Array<DataLayerEvent> = []
  win[layerName] = dataLayer
  return dataLayer
}

export function pushDataLayerEvent(
  eventName: string,
  params: Record<string, unknown> = {},
  options: PushOptions = { includePageMetadata: true }
) {
  if (!eventName || typeof window === 'undefined') return

  const dataLayer = ensureDataLayer()
  const payload = {
    event: eventName,
    ...(options.includePageMetadata !== false ? getPageMetadata() : {}),
    ...params,
  }

  // Push to GA4 if available
  const win = window as typeof window & { gtag?: (...args: unknown[]) => void }
  if (typeof win.gtag === 'function') {
    win.gtag('event', eventName, payload)
  }

  dataLayer.push(payload)
}
