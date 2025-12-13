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
}: UseMapInitializationOptions) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [initError, setInitError] = useState(false)
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

      try {
        // Import marker library
        const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary(
          'marker'
        )) as google.maps.MarkerLibrary

        // Initialize map
        const map = new google.maps.Map(mapRef.current!, {
          center: businessPosition,
          ...MAP_CONFIG,
        })

        if (!mounted) return
        mapInstanceRef.current = map

        // Create business marker with custom pin and label
        const pin = createStyledPin()
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
      } catch (error) {
        console.error('Error initializing map:', error)
        if (mounted) {
          setInitError(true)
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

  return { mapRef, initError }
}
