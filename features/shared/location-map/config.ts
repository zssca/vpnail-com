/**
 * Google Maps configuration and constants
 * Used by LocationMap component
 */

export const MAPS_SCRIPT_ID = 'google-maps-sdk'

export const MAP_CONFIG = {
  zoom: 17,
  mapTypeId: 'hybrid' as const,
  tilt: 45,
  heading: 0,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  rotateControl: false,
  mapId: 'fe2159529f939848deb400aa', // Required for Advanced Markers
  clickableIcons: false,
  gestureHandling: 'cooperative' as const,
  maxZoom: 19,
} as const

export const MARKER_Z_INDEX = {
  business: 1000,
  parking: 500,
  landmark: 450,
} as const

export const MARKER_ICONS = {
  parking: '/free-parking-sign.svg',
  shoppersDrugMart: '/Shoppers-Drug-Mart-Logo.svg',
} as const

export const MARKER_SIZES = {
  large: { width: 140, height: 60 },
  medium: { width: 100, height: 50 },
} as const

/**
 * Creates a Google Maps pin element with custom styling
 */
export function createStyledPin() {
  return new google.maps.marker.PinElement({
    background: '#EA4335', // Google Maps red
    borderColor: '#C5221F',
    glyphColor: '#ffffff',
    scale: 1.2,
  })
}

/**
 * Creates a label element for the business marker
 */
export function createBusinessLabel(businessName: string) {
  const labelDiv = document.createElement('div')
  labelDiv.style.cssText = `
    background: rgba(255, 255, 255, 0.5);
    padding: 2px 4px;
    border-radius: 10px;
    font-family: Roboto, Arial, sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #000000;
    margin-top: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
    text-align: center;
    line-height: 1;
    backdrop-filter: blur(6px);
    border: 1px solid rgba(0,0,0,0.08);
  `
  labelDiv.innerHTML = 'Victoria Park<br>Nails and Spa'
  return labelDiv
}

/**
 * Creates InfoWindow content HTML for the business
 */
export function createInfoWindowContent(businessName: string, address: {
  street: string
  city: string
  province: string
  postalCode: string
}) {
  return `
    <div style="padding:12px 16px;min-width:240px;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <div style="width:10px;height:10px;background:#dc2626;border-radius:50%;box-shadow:0 0 8px rgba(220,38,38,0.5);"></div>
        <strong style="font-size:16px;color:#111827;">
          ${businessName}
        </strong>
      </div>
      <p style="margin:0 0 8px 0;font-size:13px;color:#6b7280;line-height:1.6;">
        ${address.street}<br/>
        ${address.city}, ${address.province} ${address.postalCode}
      </p>
      <div style="display:flex;align-items:center;gap:4px;padding:6px 10px;background:#fef2f2;border-radius:6px;border-left:3px solid #dc2626;">
        <span style="font-size:12px;color:#991b1b;font-weight:600;">
          📍 Main Location
        </span>
      </div>
    </div>
  `
}
