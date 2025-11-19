import { siteConfig } from '@/lib/config/site.config'

export const ctaData = {
  title: "Calgary's Top-Rated Nail Studio. Transparent Pricing. Zero Guesswork.",
  subtitle: "Choose the time that fits - lunch-hour express or weekend escape",
  description:
    "Prime evening and Saturday slots fill quickly. Reserve online in minutes or reach out and we'll help you plan the perfect visit.",
  primaryButton: {
    text: "Check Available Times",
    href: "/services"
  },
  secondaryButton: {
    text: `Call ${siteConfig.business.phone}`,
    href: siteConfig.social.phone
  }
} as const
