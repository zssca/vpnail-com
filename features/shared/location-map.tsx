'use client'

import { MapPin, Phone } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site.config'

/**
 * Locked map widget.
 * Do not modify this file with automated/AI editors. Changes require human review and approval.
 */
export interface LocationMapProps {
  className?: string
  showInfoWindow?: boolean
}

export function LocationMap({ className, showInfoWindow = true }: LocationMapProps) {
  const MAPS_SCRIPT_ID = 'google-maps-sdk'
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const businessPosition = siteConfig.location.coordinates
  const parkingPosition = siteConfig.location.parking
  const hasApiKey = Boolean(siteConfig.googleMapsApiKey)

  // Only mount on client side - this is intentional for SSR/CSR hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  const initMap = useCallback(() => {
    if (!isMounted || !mapRef.current || typeof window === 'undefined' || !window.google) return

    // Initialize map with 45-degree imagery
    const map = new google.maps.Map(mapRef.current, {
      center: businessPosition,
      zoom: 17,
      mapTypeId: 'hybrid', // show satellite imagery with street/road labels
      tilt: 45,
      heading: 0,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      rotateControl: false,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    })

    const createLabeledPin = (fill: string, text: string) => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="64" viewBox="0 0 48 64">
          <defs>
            <path id="arc" d="M10 18 A14 14 0 0 1 38 18" />
          </defs>
          <path d="M24 0C10.75 0 0 10.745 0 24c0 16.914 24 40 24 40s24-23.086 24-40C48 10.745 37.25 0 24 0Z" fill="${fill}" />
          <text font-family="Inter, Arial, sans-serif" font-size="13" font-weight="700" fill="#fff" letter-spacing="0.5">
            <textPath href="#arc" startOffset="50%" text-anchor="middle">${text}</textPath>
          </text>
        </svg>
      `
      return {
        url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(34, 46),
        anchor: new google.maps.Point(17, 46),
      }
    }

    const parkingIcon = {
      url: '/free-parking-sign.svg',
      scaledSize: new google.maps.Size(140, 60),
      anchor: new google.maps.Point(70, 60),
    }

    const createBusinessPin = () => {
      // Business pin with distinct badge below the marker
      // Colors: #dc2626 (brand), #111827 (foreground), #ffffff (contrast)
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="120" viewBox="0 0 180 120">
          <!-- Shadow -->
          <ellipse cx="90" cy="110" rx="26" ry="6" fill="#000" opacity="0.16" />

          <!-- Pin -->
          <path d="M90 14 C71 14 56 29 56 48 C56 72 90 104 90 104 C90 104 124 72 124 48 C124 29 109 14 90 14 Z"
                fill="#dc2626" stroke="#ffffff" stroke-width="3" />

          <!-- Inner highlight -->
          <circle cx="90" cy="48" r="16" fill="#ffffff" opacity="0.96" />
          <circle cx="90" cy="48" r="10" fill="#dc2626" opacity="0.9" />

          <!-- Nail motif -->
          <g transform="translate(90, 48)">
            <path d="M-7 -5 L-7 7 C-7 9 -5 11 -3 11 L3 11 C5 11 7 9 7 7 L7 -5 C7 -7 5 -9 3 -9 L-3 -9 C-5 -9 -7 -7 -7 -5 Z"
                  fill="#dc2626" />
            <ellipse cx="0" cy="-5" rx="6" ry="3.5" fill="#ef4444" opacity="0.85" />
          </g>

          <!-- Label badge below the pin, separated from the marker -->
          <defs>
            <linearGradient id="labelGradBusiness" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#111827" stop-opacity="0.98" />
              <stop offset="100%" stop-color="#0b1220" stop-opacity="0.98" />
            </linearGradient>
          </defs>
          <rect x="25" y="104" width="130" height="26" rx="13" ry="13" fill="url(#labelGradBusiness)" />
          <text x="90" y="121" text-anchor="middle" font-family="Inter, -apple-system, sans-serif"
                font-size="12.5" font-weight="700" fill="#ffffff" letter-spacing="0.6">
            ${siteConfig.name}
          </text>
        </svg>
      `
      return {
        url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(120, 96),
        anchor: new google.maps.Point(60, 86),
      }
    }

    // Business marker with enhanced styling
    const businessMarker = new google.maps.Marker({
      map,
      position: businessPosition,
      title: siteConfig.name,
      icon: createBusinessPin(),
      animation: google.maps.Animation.DROP,
      zIndex: 1000,
    })

    // Parking marker with simple drop animation
    const parkingMarker = new google.maps.Marker({
      map,
      position: parkingPosition,
      title: 'Customer Parking',
      icon: parkingIcon,
      animation: google.maps.Animation.DROP,
      zIndex: 500,
    })

    // InfoWindow colors: Using hex values that map to globals.css variables
    // #dc2626 = destructive, #111827 = foreground, #6b7280 = muted-foreground
    // #fef2f2 = destructive background tint, #991b1b = dark destructive
    let businessInfoWindow: google.maps.InfoWindow | null = null

    if (showInfoWindow) {
      businessInfoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding:12px 16px;min-width:240px;font-family:system-ui,-apple-system,sans-serif;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <div style="width:10px;height:10px;background:#dc2626;border-radius:50%;box-shadow:0 0 8px rgba(220,38,38,0.5);"></div>
              <strong style="font-size:16px;color:#111827;">
                ${siteConfig.name}
              </strong>
            </div>
            <p style="margin:0 0 8px 0;font-size:13px;color:#6b7280;line-height:1.6;">
              ${siteConfig.business.address.street}<br/>
              ${siteConfig.business.address.city}, ${siteConfig.business.address.province} ${siteConfig.business.address.postalCode}
            </p>
            <div style="display:flex;align-items:center;gap:4px;padding:6px 10px;background:#fef2f2;border-radius:6px;border-left:3px solid #dc2626;">
              <span style="font-size:12px;color:#991b1b;font-weight:600;">
                📍 Main Location
              </span>
            </div>
          </div>
        `,
      })

      // Add click listeners with smooth transitions
      businessMarker.addListener('click', () => {
        businessInfoWindow?.open(map, businessMarker)
        businessMarker.setAnimation(google.maps.Animation.BOUNCE)
        setTimeout(() => businessMarker.setAnimation(null), 1400)
      })

      parkingMarker.addListener('click', () => {
        businessInfoWindow?.close()
      })
    }

    // Fit both markers without over-zooming
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(businessPosition)
    bounds.extend(parkingPosition)
    map.fitBounds(bounds, 40)

    google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
      const currentZoom = map.getZoom()
      if (currentZoom && currentZoom > 19) {
        map.setZoom(19)
      }
      // Ensure 45-degree view is applied after bounds
      map.setTilt(45)
      map.setHeading(0)
    })

    // Auto-open business info on load
    if (showInfoWindow && businessInfoWindow) {
      businessInfoWindow.open(map, businessMarker)
    }
  }, [isMounted, businessPosition, parkingPosition, showInfoWindow])

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return
    if (!hasApiKey) {
      setLoadError(true)
      return
    }

    // If already loaded, initialize immediately
    if (window.google?.maps) {
      initMap()
      return
    }

    const existingScript = document.getElementById(MAPS_SCRIPT_ID) as HTMLScriptElement | null
    const script =
      existingScript ??
      Object.assign(document.createElement('script'), {
        id: MAPS_SCRIPT_ID,
        src: `https://maps.googleapis.com/maps/api/js?key=${siteConfig.googleMapsApiKey}&v=weekly`,
        async: true,
        defer: true,
      })

    const handleLoad = () => {
      initMap()
    }

    const handleError = () => {
      setLoadError(true)
    }

    script.addEventListener('load', handleLoad)
    script.addEventListener('error', handleError)

    if (!existingScript) {
      document.head.appendChild(script)
    }

    return () => {
      script.removeEventListener('load', handleLoad)
      script.removeEventListener('error', handleError)
    }
  }, [isMounted, hasApiKey, initMap, MAPS_SCRIPT_ID])

  const showFallback = loadError || !hasApiKey

  return (
    <div className={className}>
      <div className="relative w-full overflow-hidden border border-border bg-muted min-h-[360px] sm:min-h-[420px]">
        <div ref={mapRef} className="absolute inset-0 h-full w-full" />
        {showFallback ? (
          <iframe
            title={`${siteConfig.name} map`}
            src={siteConfig.location.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : null}
      </div>

    </div>
  )
}
