import { siteConfig } from '@/lib/config/site.config'
import type { HeroData } from './types'

export const heroData: HeroData = {
  title: 'Nail salon in Victoria Park, Calgary',
  description: `Premium gel manicures, spa pedicures, waxing, and custom nail art near the Stampede grounds. Meticulous care with sealed-sterile tools.`,
  background: {
    type: 'carousel',
    images: ['/images/home-hero-001.webp', '/images/home-hero-002.webp'],
    alt: 'Victoria Park Nails spa atmosphere',
  },
  cta: {
    primary: {
      text: 'Book Now',
      href: siteConfig.links.booking,
      trackingEvent: 'book_now_click',
      trackingId: 'hero-book-now',
    },
    secondary: {
      text: 'Call now',
      href: siteConfig.social.phone,
      variant: 'outline',
      trackingEvent: 'click_to_call',
      trackingId: 'hero-call',
    },
  },
}
