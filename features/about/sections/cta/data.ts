import { siteConfig } from '@/lib/config/site.config'

export const ctaData = {
  title: "Let's Plan Your Next Visit Together",
  subtitle: 'Tell us the occasion - every detail is tailored to you',
  description:
    "Whether it's a first-time consultation, bridal party, or standing bi-weekly fill, our team maps out the perfect service plan and keeps notes so you never have to repeat yourself.",
  cta: {
    primary: { text: 'Start a Quick Consultation', href: '/consultation' },
    secondary: { text: `Call ${siteConfig.business.phone}`, href: siteConfig.social.phone },
  },
} as const
