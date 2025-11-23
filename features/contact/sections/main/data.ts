import { siteConfig } from '@/lib/config/site.config'

export const mainData = {
  contactInfo: {
    title: 'Call, email, or visit',
    description: 'Talk to our Victoria Park team for bookings, parking help, or service recommendations.',
    methods: [
      {
        icon: 'Phone',
        label: 'Phone',
        value: siteConfig.business.phone,
        href: siteConfig.links.phone,
      },
      {
        icon: 'Mail',
        label: 'Email',
        value: siteConfig.business.email,
        href: `mailto:${siteConfig.business.email}`,
      },
      {
        icon: 'MapPin',
        label: 'Address',
        value: `${siteConfig.business.address.street}, ${siteConfig.business.address.city}, ${siteConfig.business.address.province} ${siteConfig.business.address.postalCode}`,
        href: siteConfig.business.address.mapUrl,
      },
    ],
  },
  hours: {
    title: 'Business Hours',
    description: 'Open seven days a week so Calgary guests can book when it works for them.',
    schedule: siteConfig.business.hours,
    holiday: {
      title: 'Holiday Hours',
      hours: siteConfig.business.holidayHours,
    },
  },
  location: {
    title: 'Find Us',
    description: `Visit our Calgary nail salon at ${siteConfig.business.address.street}, minutes from the Stampede grounds with free parking and Victoria Park/Stampede CTrain access.`,
  },
  form: {
    title: 'Send a Message',
    submitButton: 'Send Message',
  },
} as const
