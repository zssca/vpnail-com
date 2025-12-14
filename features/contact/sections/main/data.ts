import { siteConfig, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/config/site.config'

export const mainData = {
  contactItems: [
    {
      icon: 'Calendar',
      title: 'Book online',
      description: 'Reserve your appointment in seconds.',
      href: siteConfig.links.booking,
      trackingEvent: 'book_now_click',
      trackingId: 'contact-book-now',
      trackingLabel: 'Contact Book Online',
      external: true,
    },
    {
      icon: 'MapPin',
      title: 'Visit us',
      description: `${CONTACT_INFO.fullAddress.street}, ${CONTACT_INFO.fullAddress.city} ${CONTACT_INFO.fullAddress.province} ${CONTACT_INFO.fullAddress.postalCode}`,
      href: siteConfig.business.address.mapUrl,
      trackingEvent: 'click_get_directions',
      trackingId: 'contact-directions',
      trackingLabel: 'Contact Visit Us',
      external: true,
    },
    {
      icon: 'Phone',
      title: 'Call or text',
      description: CONTACT_INFO.phone,
      href: SOCIAL_LINKS.phone,
      trackingEvent: 'click_to_call',
      trackingId: 'contact-call',
      trackingLabel: 'Contact Call',
      external: false,
    },
    {
      icon: 'Mail',
      title: 'Email',
      description: CONTACT_INFO.email,
      href: SOCIAL_LINKS.email,
      trackingEvent: 'email_click',
      trackingId: 'contact-email',
      trackingLabel: 'Contact Email',
      external: false,
    },
  ],
  hours: {
    title: 'Hours',
    schedule: siteConfig.business.hours,
    holiday: {
      title: 'Holiday Hours',
      hours: siteConfig.business.holidayHours,
    },
  },
  location: {
    title: 'Location',
    cta: {
      text: 'Get Directions',
      href: siteConfig.business.address.mapUrl,
      trackingEvent: 'click_get_directions',
      trackingId: 'contact-location-directions',
    },
  },
  form: {
    title: 'Message',
    submitButton: 'Send Message',
  },
} as const
