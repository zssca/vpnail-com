import { siteConfig } from '@/lib/config/site.config'

export const contactInfoData = {
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
} as const
