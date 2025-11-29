import { siteConfig } from '@/lib/config/site.config'
import type { DualCtaContent } from '@/components/shared/dual-cta-section'

export const ctaData: DualCtaContent = {
  title: 'Book Your Appointment',
  primary: {
    text: 'Book Now',
    href: siteConfig.links.booking,
  },
  secondary: {
    text: 'Call now',
    href: siteConfig.social.phone,
  },
}
