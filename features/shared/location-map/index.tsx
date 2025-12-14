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
 * Loading spinner component for map loading state
 */
function MapLoadingIndicator() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm z-10">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        </div>
        <span className="text-sm text-muted-foreground font-medium">Loading map...</span>
      </div>
    </div>
  )
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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for client-side mount detection
    setIsMounted(true)
  }, [])

  // Load Google Maps script
  const { isLoaded: isScriptLoaded, loadError: scriptLoadError, isLoading: isScriptLoading } = useGoogleMapsScript({
    apiKey: siteConfig.googleMapsApiKey,
    enabled: isMounted && hasApiKey,
  })

  // Initialize map with markers
  const { mapRef, initError, isInitializing, errorMessage } = useMapInitialization({
    isScriptLoaded,
    businessName: siteConfig.name,
    businessPosition: siteConfig.location.coordinates,
    parkingPosition: siteConfig.location.parking,
    shoppersMartPosition: siteConfig.location.landmarks.shoppersDrugMart.coordinates,
    shoppersMartName: siteConfig.location.landmarks.shoppersDrugMart.name,
    address: siteConfig.business.address,
    showInfoWindow,
  })

  // Determine loading and error states
  const isLoading = isScriptLoading || isInitializing
  const hasError = scriptLoadError || initError
  const showFallback = hasError || !hasApiKey

  // Log errors in development for debugging
  if (process.env.NODE_ENV === 'development' && hasError) {
    if (scriptLoadError) {
      console.warn('[LocationMap] Script load failed - falling back to iframe embed')
    }
    if (initError && errorMessage) {
      console.warn('[LocationMap] Initialization failed:', errorMessage)
    }
  }

  return (
    <div className={className}>
      <div className="relative w-full overflow-hidden border border-border bg-muted min-h-[360px] sm:min-h-[420px]">
        {/* Google Maps container - always render to allow ref attachment */}
        <div
          ref={mapRef}
          className="absolute inset-0 h-full w-full"
          style={{ visibility: showFallback ? 'hidden' : 'visible' }}
        />

        {/* Loading indicator - show while script loads or map initializes */}
        {isLoading && !showFallback && <MapLoadingIndicator />}

        {/* Fallback iframe embed - show on error or missing API key */}
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
