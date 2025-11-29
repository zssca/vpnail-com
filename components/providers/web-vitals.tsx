'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { analyticsConfig } from '@/lib/config/analytics.config'

type DataLayerWindow = typeof window & {
  gtag?: (...args: unknown[]) => void
  [key: string]: unknown
}

function pushWebVitalToGTM(metric: {
  name: string
  value: number
  id: string
  rating: string
}) {
  if (!analyticsConfig.shouldLoadAnalytics) return

  const win = window as unknown as DataLayerWindow

  // Try gtag first (if GA4 is loaded directly)
  if (typeof win.gtag === 'function') {
    win.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.value,
      metric_rating: metric.rating,
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
    return
  }

  // Fallback to dataLayer (GTM)
  const dataLayer = win[analyticsConfig.dataLayerName] as Array<Record<string, unknown>> | undefined
  if (Array.isArray(dataLayer)) {
    dataLayer.push({
      event: 'web_vitals',
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_rating: metric.rating,
      event_category: 'Web Vitals',
      non_interaction: true,
    })
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    pushWebVitalToGTM({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
    })
  })

  return null
}
