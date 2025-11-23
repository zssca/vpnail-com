'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site.config'

interface ParkingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ParkingDialog({ open, onOpenChange }: ParkingDialogProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const businessPosition = siteConfig.location.coordinates
  const parkingPosition = siteConfig.location.parking

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const initMap = useCallback(() => {
    if (!isMounted || !mapRef.current || typeof window === 'undefined' || !window.google) return

    const map = new google.maps.Map(mapRef.current, {
      center: parkingPosition,
      zoom: 18,
      mapTypeId: 'satellite',
      tilt: 45,
      heading: 0,
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
          stylers: [{ visibility: 'off' }],
        },
      ],
    })

    const parkingIcon = {
      url: '/free-parking-sign.svg',
      scaledSize: new google.maps.Size(140, 60),
      anchor: new google.maps.Point(70, 60),
    }

    const createBusinessPin = () => {
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
            <linearGradient id="labelGradDialog" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#1f2937;stop-opacity:0.95" />
              <stop offset="100%" style="stop-color:#111827;stop-opacity:0.98" />
            </linearGradient>
          </defs>
          <rect x="20" y="52" width="160" height="24" rx="12" ry="12" fill="url(#labelGradDialog)" />

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

    const businessInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding:12px 16px;min-width:220px;font-family:system-ui,-apple-system,sans-serif;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:8px;height:8px;background:#dc2626;border-radius:50%;"></div>
            <strong style="font-size:15px;color:#111827;">
              ${siteConfig.name}
            </strong>
          </div>
          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">
            ${siteConfig.business.address.street}<br/>
            ${siteConfig.business.address.city}, ${siteConfig.business.address.province} ${siteConfig.business.address.postalCode}
          </p>
        </div>
      `,
    })


    businessMarker.addListener('click', () => {
      businessInfoWindow.open(map, businessMarker)
    })

    parkingMarker.addListener('click', () => {
      businessInfoWindow.close()
    })

    const bounds = new google.maps.LatLngBounds()
    bounds.extend(parkingPosition)
    bounds.extend(businessPosition)
    map.fitBounds(bounds, 40)

    google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
      const currentZoom = map.getZoom()
      if (currentZoom && currentZoom > 19) {
        map.setZoom(19)
      }
      map.setTilt(45)
    })
  }, [isMounted, businessPosition, parkingPosition])

  useEffect(() => {
    if (!open || !isMounted || typeof window === 'undefined') return

    if (window.google?.maps) {
      initMap()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${siteConfig.googleMapsApiKey}&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => {
      initMap()
    }
    document.head.appendChild(script)
  }, [open, isMounted, initMap])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Customer Parking
          </DialogTitle>
          <DialogDescription>
            Free parking available for {siteConfig.name} customers
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="w-full overflow-hidden rounded-lg border border-border bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1763887397939!6m8!1m7!1s_EkkOWxZK4eChv4gkC4R3Q!2m2!1d51.03873346378575!2d-114.0609939510665!3f309.1331154682398!4f0.9946950430054073!5f2.278747367825379"
              title="Victoria Park Nails parking street view"
              className="h-[240px] sm:h-[320px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div
            ref={mapRef}
            className="w-full h-[350px] sm:h-[450px] rounded-lg overflow-hidden border border-border bg-muted"
            aria-label="Map showing parking location"
          />

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button variant="default" size="lg" className="flex-1" asChild>
              <a
                href={siteConfig.business.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
