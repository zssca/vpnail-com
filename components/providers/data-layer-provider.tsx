'use client'

import { useEffect } from 'react'
import { analyticsConfig } from '@/lib/config/analytics.config'
import { ensureDataLayer } from '@/lib/utils/analytics'

export function DataLayerProvider() {
  useEffect(() => {
    ensureDataLayer(analyticsConfig.dataLayerName)
  }, [])

  return null
}
