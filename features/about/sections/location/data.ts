import { siteConfig } from '@/lib/config/site.config'

export const locationData = {
  title: 'Visit Us in Victoria Park, Calgary',
  description: `We're conveniently located in the heart of Victoria Park at ${siteConfig.business.address.street}, ${siteConfig.business.address.city}, ${siteConfig.business.address.province} ${siteConfig.business.address.postalCode}, near Calgary Stampede grounds. Easy access from Downtown Calgary, Beltline, Inglewood, Mission, and East Village. Come experience our premium nail care, custom nail art, and luxury spa services. Ample parking available. Book your appointment today!`,
} as const
