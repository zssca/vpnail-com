import { siteConfig } from '@/lib/config/site.config'

export const ctaData = {
  title: 'Your Best Nails Are Just One Appointment Away',
  subtitle: 'Join thousands of Calgary guests who trust our top-rated team',
  description:
    'Reserve a time that fits your calendar, then arrive to sterilized tools, heated massage chairs, and technicians who remember your preferences. Same-day spots fill fast.',
  cta: {
    primary: { text: 'Reserve Your Spot Online', href: '/services' },
    secondary: { text: `Call ${siteConfig.business.phone} Now`, href: siteConfig.social.phone },
  },
} as const
