export interface BusinessAddress {
  street: string
  city: string
  province: string
  postalCode: string
  country: string
  mapUrl: string
}

export interface BusinessHour {
  day: string
  hours: string
}

export interface BusinessInfo {
  name: string
  tagline: string
  address: BusinessAddress
  phone: string
  email: string
  bookingUrl: string
  hours: BusinessHour[]
  holidayHours?: string
  founded?: string
}

export interface SocialLinks {
  facebook: string
  instagram: string
  tiktok: string
  email: string
  phone: string
}

export interface SiteLinks extends SocialLinks {
  booking: string
}

export interface Announcement {
  id: string
  enabled: boolean
  title?: string
  message: string
  link?: string
  variant?: 'default' | 'neutral'
}

export interface Author {
  name: string
  url: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Landmark {
  name: string
  coordinates: Coordinates
}

export interface LocationConfig {
  coordinates: Coordinates
  parking: Coordinates
  landmarks: {
    shoppersDrugMart: Landmark
  }
  mapEmbedUrl: string
  streetViewEmbedUrl: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  creator: string
  keywords: string[]
  authors: Author[]
  business: BusinessInfo
  social: SocialLinks
  links: SiteLinks
  announcements: Announcement[]
  location: LocationConfig
  googleMapsApiKey: string
}

export interface AnalyticsConfig {
  gtmId: string
  dataLayerName: string
  allowInDevelopment: boolean
  isProduction: boolean
  shouldLoadAnalytics: boolean
}

export interface EmailConfig {
  recipientEmail: string
  clientName: string
  websiteDomain: string
  fromEmail: string
  fromName: string
  brandColor: string
}
