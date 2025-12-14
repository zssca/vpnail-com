import { useEffect, useRef, useState } from 'react'
import type { Coordinates } from '@/lib/types/config.types'
import {
  MAP_CONFIG,
  MARKER_Z_INDEX,
  MARKER_ICONS,
  MARKER_SIZES,
  createStyledPin,
  createBusinessLabel,
  createInfoWindowContent,
} from './config'

interface UseMapInitializationOptions {
  isScriptLoaded: boolean
  businessName: string
  businessPosition: Coordinates
  parkingPosition: Coordinates
  shoppersMartPosition: Coordinates
  shoppersMartName: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
  }
  showInfoWindow: boolean
}

interface UseMapInitializationResult {
  mapRef: React.RefObject<HTMLDivElement | null>
  initError: boolean
  isInitializing: boolean
  errorMessage: string | null
}

/**
 * Hook to initialize Google Map with markers and info windows
 * Handles marker creation, event listeners, and cleanup
 */
export function useMapInitialization({
  isScriptLoaded,
  businessName,
  businessPosition,
  parkingPosition,
  shoppersMartPosition,
  shoppersMartName,
  address,
  showInfoWindow,
}: UseMapInitializationOptions): UseMapInitializationResult {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [initError, setInitError] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || typeof window === 'undefined' || !window.google) {
      return
    }

    let mounted = true

    async function initMap() {
      if (!mapRef.current) return

      setIsInitializing(true)
      setErrorMessage(null)

      try {
        // Verify Google Maps API is available
        if (!window.google?.maps?.importLibrary) {
          throw new Error('Google Maps API not fully loaded')
        }

        // Import marker library with error handling
        let AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement
        let PinElement: typeof google.maps.marker.PinElement

        try {
          const markerLib = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary
          AdvancedMarkerElement = markerLib.AdvancedMarkerElement
          PinElement = markerLib.PinElement

          if (!AdvancedMarkerElement || !PinElement) {
            throw new Error('Marker library loaded but classes not available')
          }
        } catch (libError) {
          console.error('[GoogleMaps] Failed to load marker library:', libError)
          throw new Error('Failed to load Advanced Markers library. Check Map ID configuration.')
        }

        if (!mounted) return

        // Initialize map with error handling
        let map: google.maps.Map
        try {
          map = new google.maps.Map(mapRef.current!, {
            center: businessPosition,
            ...MAP_CONFIG,
          })
        } catch (mapError) {
          console.error('[GoogleMaps] Failed to create map:', mapError)
          throw new Error('Failed to initialize map. Check API key and Map ID.')
        }

        if (!mounted) return
        mapInstanceRef.current = map

        // Create business marker with custom pin and label
        const pin = createStyledPin(PinElement)
        const labelDiv = createBusinessLabel(businessName)

        const content = document.createElement('div')
        content.style.cssText = 'display: flex; flex-direction: column; align-items: center;'
        content.appendChild(pin.element)
        content.appendChild(labelDiv)

        const businessMarker = new AdvancedMarkerElement({
          map,
          position: businessPosition,
          content: content,
          title: businessName,
          zIndex: MARKER_Z_INDEX.business,
        })

        if (!mounted) return
        markersRef.current.push(businessMarker)

        // Create parking marker
        const parkingImg = document.createElement('img')
        parkingImg.src = MARKER_ICONS.parking
        parkingImg.style.width = `${MARKER_SIZES.large.width}px`
        parkingImg.style.height = `${MARKER_SIZES.large.height}px`

        const parkingMarker = new AdvancedMarkerElement({
          map,
          position: parkingPosition,
          title: 'Customer Parking',
          content: parkingImg,
          zIndex: MARKER_Z_INDEX.parking,
        })

        if (!mounted) return
        markersRef.current.push(parkingMarker)

        // Create Shoppers Drug Mart marker
        const shoppersImg = document.createElement('img')
        shoppersImg.src = MARKER_ICONS.shoppersDrugMart
        shoppersImg.style.width = `${MARKER_SIZES.large.width}px`
        shoppersImg.style.height = `${MARKER_SIZES.large.height}px`

        const shoppersMartMarker = new AdvancedMarkerElement({
          map,
          position: shoppersMartPosition,
          title: shoppersMartName,
          content: shoppersImg,
          zIndex: MARKER_Z_INDEX.landmark,
        })

        if (!mounted) return
        markersRef.current.push(shoppersMartMarker)

        // Create and configure info window
        let businessInfoWindow: google.maps.InfoWindow | null = null

        if (showInfoWindow) {
          businessInfoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(businessName, address),
          })

          infoWindowRef.current = businessInfoWindow

          // Add click listeners
          businessMarker.addListener('click', () => {
            businessInfoWindow?.open({
              anchor: businessMarker,
              map,
            })
          })

          parkingMarker.addListener('click', () => {
            businessInfoWindow?.close()
          })

          shoppersMartMarker.addListener('click', () => {
            businessInfoWindow?.close()
          })
        }

        // Fit map bounds to show all markers
        const bounds = new google.maps.LatLngBounds()
        bounds.extend(businessPosition)
        bounds.extend(parkingPosition)
        bounds.extend(shoppersMartPosition)
        map.fitBounds(bounds, 40)
        map.setTilt(MAP_CONFIG.tilt)

        // Prevent over-zooming
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          const currentZoom = map.getZoom()
          if (currentZoom && currentZoom > MAP_CONFIG.maxZoom) {
            map.setZoom(MAP_CONFIG.maxZoom)
          }
        })

        // Auto-open business info window on load
        if (showInfoWindow && businessInfoWindow) {
          businessInfoWindow.open({
            anchor: businessMarker,
            map,
          })
        }
        // Mark as successfully initialized
        if (mounted) {
          setIsInitializing(false)
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown map initialization error'
        console.error('[GoogleMaps] Error initializing map:', errorMsg)
        if (mounted) {
          setInitError(true)
          setErrorMessage(errorMsg)
          setIsInitializing(false)
        }
      }
    }

    initMap()

    // Cleanup function
    return () => {
      mounted = false

      // Close info window
      if (infoWindowRef.current) {
        infoWindowRef.current.close()
        infoWindowRef.current = null
      }

      // Remove all markers from map
      markersRef.current.forEach((marker) => {
        marker.map = null
      })
      markersRef.current = []

      // Clear map instance
      mapInstanceRef.current = null
    }
  }, [
    isScriptLoaded,
    businessName,
    businessPosition,
    parkingPosition,
    shoppersMartPosition,
    shoppersMartName,
    address,
    showInfoWindow,
  ])

  return { mapRef, initError, isInitializing, errorMessage }
}
