import { siteConfig, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/config/site.config'

export const contactInfoData = {
  title: 'Contact',
  items: [
    {
      icon: 'Calendar',
      title: 'Book online',
      description: 'Reserve your appointment in seconds.',
      href: siteConfig.links.booking,
      trackingEvent: 'book_now_click',
      trackingId: 'contact-info-book-now',
      trackingLabel: 'Contact Info Book Online',
      external: true,
    },
    {
      icon: 'MapPin',
      title: 'Visit us',
      description: `${CONTACT_INFO.fullAddress.street}, ${CONTACT_INFO.fullAddress.city} ${CONTACT_INFO.fullAddress.province} ${CONTACT_INFO.fullAddress.postalCode}`,
      href: siteConfig.business.address.mapUrl,
      trackingEvent: 'click_get_directions',
      trackingId: 'contact-info-directions',
      trackingLabel: 'Contact Info Visit Us',
      external: true,
    },
    {
      icon: 'Phone',
      title: 'Call or text',
      description: CONTACT_INFO.phone,
      href: SOCIAL_LINKS.phone,
      trackingEvent: 'click_to_call',
      trackingId: 'contact-info-call',
      trackingLabel: 'Contact Info Call',
      external: false,
    },
    {
      icon: 'Mail',
      title: 'Email',
      description: CONTACT_INFO.email,
      href: SOCIAL_LINKS.email,
      trackingEvent: 'email_click',
      trackingId: 'contact-info-email',
      trackingLabel: 'Contact Info Email',
      external: false,
    },
  ],
} as const
