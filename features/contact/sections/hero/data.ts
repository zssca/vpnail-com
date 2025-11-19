import { siteConfig } from '@/lib/config/site.config'

export const heroData = {
  title: "Let's Plan Your Visit to Victoria Park Nails & Spa",
  subtitle: 'Questions about timing, parking, or the right service? We are a message away.',
  description:
    "Reach out for real-time availability, parking directions, or help choosing the perfect manicure, pedicure, or spa treatment. Our team replies quickly during business hours.",
  cta: {
    primary: {
      text: 'Check Live Availability',
      href: '/consultation',
    },
    secondary: {
      text: `Call ${siteConfig.business.phone}`,
      href: siteConfig.social.phone,
    },
  },
} as const
