import { siteConfig } from '@/lib/config/site.config'
import type { DualCtaContent } from '@/components/shared/dual-cta-section'

export const ctaData: DualCtaContent = {
  title: 'Book Your Appointment',
  primary: { text: 'Book Now', href: siteConfig.links.booking, trackingEvent: 'book_now_click', trackingId: 'home-cta-book' },
  secondary: { text: 'Call now', href: siteConfig.social.phone, trackingEvent: 'click_to_call', trackingId: 'home-cta-call' },
}
