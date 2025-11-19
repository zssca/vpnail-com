import { siteConfig } from '@/lib/config/site.config'

export const heroData = {
  title: 'Lock In Your Spot in Under a Minute',
  subtitle: 'Real-time booking for manicures, pedicures, gel upgrades, and spa services',
  description:
    'Choose your service, add notes for inspiration, and receive instant confirmation via email and text. If you need help pairing services or booking a group, our team is a quick call away.',
  badge: 'Online Booking',
  cta: {
    primary: {
      text: 'Reserve Online Now',
      href: 'https://victoriaparknailsspa.setmore.com/',
    },
    secondary: {
      text: `Need Help? Call ${siteConfig.business.phone}`,
      href: siteConfig.social.phone,
    },
  },
} as const
