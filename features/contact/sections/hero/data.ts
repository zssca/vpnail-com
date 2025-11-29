import { siteConfig } from '@/lib/config/site.config'

export const heroData = {
  title: 'Contact our Calgary nail salon',
  description:
    'Call, message, or book online for Victoria Park appointments. Need a same-day spot, parking directions, or help choosing a service? Reach the team directly and get clear answers fast.',
  cta: {
    primary: {
      text: 'Book Now',
      href: siteConfig.links.booking,
    },
    secondary: {
      text: 'Call now',
      href: siteConfig.social.phone,
    },
  },
} as const
