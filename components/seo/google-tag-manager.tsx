'use client'

import Script from 'next/script'
import { analyticsConfig } from '@/lib/config/analytics.config'

interface GoogleTagManagerProps {
  gtmId?: string
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const resolvedGtmId = gtmId?.trim() || analyticsConfig.gtmId
  if (!resolvedGtmId || !analyticsConfig.shouldLoadAnalytics) {
    return null
  }

  const dataLayerName = analyticsConfig.dataLayerName

  const initSnippet = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${resolvedGtmId}');
  `

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {initSnippet}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${resolvedGtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
