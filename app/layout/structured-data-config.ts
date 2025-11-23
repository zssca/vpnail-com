import { siteConfig } from '@/lib/config/site.config'

export const localBusinessStructuredDataOverrides = {
  areaServed: [
    { '@type': 'Place', name: 'Victoria Park, Calgary' },
    { '@type': 'Place', name: 'Beltline, Calgary' },
    { '@type': 'Place', name: 'Mission, Calgary' },
    { '@type': 'City', name: 'Calgary, Alberta' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '51.0447',
      longitude: '-114.0719',
    },
    geoRadius: '6000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${siteConfig.name} Services`,
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Manicures & Pedicures in Downtown Calgary',
          url: `${siteConfig.url}/services#nail-services`,
          areaServed: 'Calgary Beltline',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Gel & Acrylic Nail Enhancements',
          url: `${siteConfig.url}/services#nail-services`,
          areaServed: 'Victoria Park, Calgary',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Spa Massage & Relaxation Treatments',
          url: `${siteConfig.url}/services#massage-spa`,
          areaServed: 'Downtown Calgary & Mission',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Professional Waxing Services',
          url: `${siteConfig.url}/services#waxing`,
          areaServed: 'Calgary Stampede District',
        },
      },
    ],
  },
} as const
