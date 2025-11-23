import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/config/site.config'

const brandCity = siteConfig.business.address.city
const tagline = siteConfig.business.tagline || 'Premier Nail Salon & Spa'
const locationLabel = brandCity || siteConfig.business.name

// OpenGraph gradient colors - custom brand colors
// These are intentionally different from globals.css for visual impact
// Based on sage/olive green theme to match brand identity
const gradientStart = '#8b9a7c' // Muted olive green
const gradientEnd = '#a1b08c'   // Lighter sage green

export const alt = `${siteConfig.name} - ${brandCity ? `${brandCity} ` : ''}${tagline}`
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '80%',
            lineHeight: 1.2,
          }}
        >
          {brandCity ? `${brandCity}'s ${tagline}` : tagline}
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: 40,
            textAlign: 'center',
          }}
        >
          {`Exceptional Service • Beautiful Results • ${locationLabel}`}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
