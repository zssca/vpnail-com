import { siteConfig } from '@/lib/config/site.config'

export const ctaData = {
  title: 'Need a Specific Time Held for You?',
  subtitle: 'Let us know if you need a lunch break, evening, or group slot',
  description:
    'Add a note with your goals - chip-proof manicure, bridal trial, or self-care reset - and we will prep products and design ideas before you arrive.',
  cta: {
    primary: {
      text: 'Hold My Appointment Now',
      href: 'https://victoriaparknailsspa.setmore.com/',
    },
    secondary: {
      text: `Call ${siteConfig.business.phone}`,
      href: siteConfig.social.phone,
    },
  },
} as const
