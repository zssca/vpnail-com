import { siteConfig } from '@/lib/config/site.config'

export const heroData = {
  title: 'Nail salon in Victoria Park, Calgary',
  description: `Premium gel manicures, spa pedicures, waxing, and custom nail art near the Stampede grounds. Meticulous care with sealed-sterile tools.`,
  cta: {
    primary: { text: 'Book online', href: siteConfig.links.booking },
    secondary: { text: 'Call now', href: siteConfig.social.phone },
  },
} as const
