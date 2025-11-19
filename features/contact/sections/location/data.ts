import { siteConfig } from '@/lib/config/site.config'

export const locationData = {
  title: 'Find Us',
  description: `Visit our Calgary nail salon at ${siteConfig.business.address.street} in Victoria Park, steps from the Stampede grounds with free parking and CTrain access. We look forward to pampering you!`,
} as const
