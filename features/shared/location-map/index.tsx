'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config/site.config'
import { useGoogleMapsScript } from './use-google-maps-script'
import { useMapInitialization } from './use-map-initialization'

export interface LocationMapProps {
  className?: string
  showInfoWindow?: boolean
}

/**
 * Interactive Google Maps component with business location, parking, and landmarks
 *
 * Features:
 * - Advanced markers with custom styling
 * - Auto-opening info window for business location
 * - Parking and landmark markers
 * - 45-degree tilt hybrid satellite view
 * - Automatic bounds fitting
 * - Fallback to iframe embed if API fails
 *
 * Configuration: All coordinates and settings from site.config.ts
 */
export function LocationMap({ className, showInfoWindow = true }: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const hasApiKey = Boolean(siteConfig.googleMapsApiKey)

  // Only mount on client side for SSR/CSR hydration compatibility
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  // Load Google Maps script
  const { isLoaded: isScriptLoaded, loadError: scriptLoadError } = useGoogleMapsScript({
    apiKey: siteConfig.googleMapsApiKey,
    enabled: isMounted && hasApiKey,
  })

  // Initialize map with markers
  const { mapRef, initError } = useMapInitialization({
    isScriptLoaded,
    businessName: siteConfig.name,
    businessPosition: siteConfig.location.coordinates,
    parkingPosition: siteConfig.location.parking,
    shoppersMartPosition: siteConfig.location.landmarks.shoppersDrugMart.coordinates,
    shoppersMartName: siteConfig.location.landmarks.shoppersDrugMart.name,
    address: siteConfig.business.address,
    showInfoWindow,
  })

  // Show fallback if there's any error or no API key
  const showFallback = scriptLoadError || initError || !hasApiKey

  return (
    <div className={className}>
      <div className="relative w-full overflow-hidden border border-border bg-muted min-h-[360px] sm:min-h-[420px]">
        {/* Google Maps container */}
        <div ref={mapRef} className="absolute inset-0 h-full w-full" />

        {/* Fallback iframe embed */}
        {showFallback && (
          <iframe
            title={`${siteConfig.name} map`}
            src={siteConfig.location.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </div>
  )
}
