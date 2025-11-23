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

  // Only mount on client side - this is intentional for SSR/CSR hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  const initMap = useCallback(() => {
    if (!isMounted || !mapRef.current || typeof window === 'undefined' || !window.google) return

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      center: siteConfig.location.coordinates,
      zoom: 17,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    })

    // Business marker (red - default)
    const businessMarker = new google.maps.Marker({
      map,
      position: siteConfig.location.coordinates,
      title: siteConfig.name,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    })

    // Parking marker (blue with P)
    const parkingMarker = new google.maps.Marker({
      map,
      position: siteConfig.location.parking,
      title: 'Parking',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      },
      label: {
        text: 'P',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    })

    // Business info window
    const businessInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; min-width: 200px;">
          <strong style="font-size: 14px; display: block; margin-bottom: 4px;">
            ${siteConfig.name}
          </strong>
          <p style="margin: 0; font-size: 12px; color: #666;">
            ${siteConfig.business.address.street}
          </p>
        </div>
      `,
    })

    // Parking info window
    const parkingInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; min-width: 150px;">
          <strong style="font-size: 14px; display: block; margin-bottom: 4px;">
            🅿️ Parking
          </strong>
          <p style="margin: 0; font-size: 12px; color: #666;">
            Customer parking available
          </p>
        </div>
      `,
    })

    // Add click listeners
    businessMarker.addListener('click', () => {
      parkingInfoWindow.close()
      businessInfoWindow.open(map, businessMarker)
    })

    parkingMarker.addListener('click', () => {
      businessInfoWindow.close()
      parkingInfoWindow.open(map, parkingMarker)
    })

    // Auto-open business info on load
    businessInfoWindow.open(map, businessMarker)
  }, [isMounted])

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

    return () => {
      // Cleanup if needed
    }
  }, [isMounted, initMap])

  return (
    <div className={className}>
      <div
        ref={mapRef}
        className="w-full h-[300px] rounded-lg overflow-hidden border border-border bg-muted"
      />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button variant="outline" size="lg" asChild>
          <a
            href="https://maps.app.goo.gl/Bybt5QQfCJKHycm86"
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
