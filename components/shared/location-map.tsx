'use client'

import { MapPin, Phone } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site.config'

interface LocationMapProps {
  className?: string
}

export function LocationMap({ className }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const businessPosition = siteConfig.location.coordinates
  const parkingPosition = siteConfig.location.parking

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
      zoom: 19,
      mapTypeId: 'satellite',
      tilt: 45,
      heading: 90,
      disableDefaultUI: true,
      zoomControl: false,
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
          <path d="M24 0C10.75 0 0 10.745 0 24c0 16.914 24 40 24 40s24-23.086 24-40C48 10.745 37.25 0 24 0Z" fill="${fill}" />
          <text x="24" y="28" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" fill="#fff">${text}</text>
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
      // SVG data URI colors: CSS variables not supported in data URIs
      // Colors map to globals.css: #dc2626 = destructive, #ffffff = background (light)
      // To update: modify lib/utils/colors.ts and update these hex values
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80">
          <!-- Shadow -->
          <ellipse cx="100" cy="72" rx="28" ry="4" fill="#000000" opacity="0.2" />

          <!-- Modern pin shape -->
          <path d="M100 10 C85 10 73 22 73 37 C73 52 85 65 100 65 C115 65 127 52 127 37 C127 22 115 10 100 10 Z"
                fill="#dc2626" stroke="#ffffff" stroke-width="3" />

          <!-- Inner circle -->
          <circle cx="100" cy="37" r="18" fill="#ffffff" opacity="0.95" />

          <!-- Modern nail icon -->
          <g transform="translate(100, 37)">
            <path d="M-8 -6 L-8 6 C-8 8 -6 10 -4 10 L4 10 C6 10 8 8 8 6 L8 -6 C8 -8 6 -10 4 -10 L-4 -10 C-6 -10 -8 -8 -8 -6 Z"
                  fill="#dc2626" />
            <ellipse cx="0" cy="-6" rx="7" ry="4" fill="#ef4444" opacity="0.8" />
          </g>

          <!-- Label background with gradient -->
          <defs>
            <linearGradient id="labelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#1f2937;stop-opacity:0.95" />
              <stop offset="100%" style="stop-color:#111827;stop-opacity:0.98" />
            </linearGradient>
          </defs>
          <rect x="20" y="52" width="160" height="24" rx="12" ry="12" fill="url(#labelGrad)" />

          <!-- Label text -->
          <text x="100" y="68" text-anchor="middle" font-family="Inter, -apple-system, sans-serif"
                font-size="13" font-weight="700" fill="#ffffff" letter-spacing="0.5">
            Victoria Park Nails
          </text>
        </svg>
      `
      return {
        url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(140, 56),
        anchor: new google.maps.Point(70, 56),
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
    const businessInfoWindow = new google.maps.InfoWindow({
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
      businessInfoWindow.open(map, businessMarker)
      businessMarker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => businessMarker.setAnimation(null), 1400)
    })

    parkingMarker.addListener('click', () => {
      businessInfoWindow.close()
    })

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
    })

    // Auto-open business info on load
    businessInfoWindow.open(map, businessMarker)
  }, [isMounted, businessPosition, parkingPosition])

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    // Check if Google Maps is already loaded
    if (window.google?.maps) {
      initMap()
      return
    }

    // Load Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${siteConfig.googleMapsApiKey}&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => {
      initMap()
    }
    document.head.appendChild(script)
  }, [isMounted, initMap])

  return (
    <div className={className}>
      <div
        ref={mapRef}
        className="w-full h-[350px] sm:h-[450px] rounded-lg overflow-hidden border border-border bg-muted shadow-sm"
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button variant="outline" size="lg" asChild>
          <a
            href={siteConfig.business.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 text-sm"
          >
            <MapPin className="h-4 w-4" />
            Get Directions
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a
            href={`tel:${siteConfig.business.phone}`}
            className="flex w-full items-center justify-center gap-2 text-sm"
          >
            <Phone className="h-4 w-4" />
            Call Us
          </a>
        </Button>
      </div>
    </div>
  )
}
