import { siteConfig } from '@/lib/config/site.config'

export const heroData = {
  title: 'Calgary nail art gallery',
  description: 'See real manicures, pedicures, and custom designs crafted at our Victoria Park studio for Calgary clients. Browse our work and book your appointment with confidence.',
  cta: {
    primary: {
      text: 'Book nail art online',
      href: siteConfig.links.booking,
    },
    secondary: {
      text: 'View services & pricing',
      href: '/services',
    },
  },
} as const
