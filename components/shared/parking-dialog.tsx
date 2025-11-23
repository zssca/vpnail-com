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

  // Only mount on client side - this is intentional for SSR/CSR hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  const initMap = useCallback(() => {
    if (!isMounted || !mapRef.current || typeof window === 'undefined' || !window.google) return

    // Initialize map centered on parking
    const map = new google.maps.Map(mapRef.current, {
      center: siteConfig.location.parking,
      zoom: 18,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true,
    })

    // Business marker (red - for reference)
    new google.maps.Marker({
      map,
      position: siteConfig.location.coordinates,
      title: siteConfig.name,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(32, 32),
      },
    })

    // Parking marker (blue with P - highlighted)
    const parkingMarker = new google.maps.Marker({
      map,
      position: siteConfig.location.parking,
      title: 'Customer Parking',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(48, 48),
      },
      label: {
        text: 'P',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
      },
      animation: google.maps.Animation.BOUNCE,
    })

    // Parking info window
    const parkingInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; min-width: 200px;">
          <strong style="font-size: 16px; display: block; margin-bottom: 8px;">
            🅿️ Customer Parking
          </strong>
          <p style="margin: 0; font-size: 13px; color: #666; line-height: 1.5;">
            Free parking available for customers.<br/>
            Just a short walk to ${siteConfig.name}.
          </p>
        </div>
      `,
    })

    // Auto-open parking info
    parkingInfoWindow.open(map, parkingMarker)

    // Stop animation after 2 seconds
    setTimeout(() => {
      parkingMarker.setAnimation(null)
    }, 2000)
  }, [isMounted])

  useEffect(() => {
    if (!open || !isMounted || typeof window === 'undefined') return

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
  }, [open, isMounted, initMap])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
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
          <div
            ref={mapRef}
            className="w-full h-[400px] rounded-lg overflow-hidden border border-border bg-muted"
            aria-label="Map showing parking location"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="default" size="lg" className="flex-1" asChild>
              <a
                href="https://maps.app.goo.gl/Bybt5QQfCJKHycm86"
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
