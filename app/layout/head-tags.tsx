import { StructuredData } from '@/components/seo'
import { localBusinessStructuredDataOverrides } from './structured-data-config'

export function HeadTags() {
  return (
    <>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Prefetch likely navigation */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/consultation" />

      {/* Geo & Local business meta for local SEO */}
      <meta name="geo.region" content="CA-AB" />
      <meta name="geo.placename" content="Calgary" />
      <meta name="geo.position" content="51.0447;-114.0719" />
      <meta name="ICBM" content="51.0447, -114.0719" />

      {/* Structured Data for Local Business */}
      <StructuredData type="LocalBusiness" data={localBusinessStructuredDataOverrides} />
      {/* Structured Data for Organization */}
      <StructuredData type="Organization" />
      {/* WebSite structured data (enables richer understanding, sitelinks eligibility) */}
      <StructuredData type="WebSite" data={{ inLanguage: 'en-CA' }} />
      {/* SiteNavigationElement structured data */}
      <StructuredData type="SiteNavigationElement" />
    </>
  )
}
