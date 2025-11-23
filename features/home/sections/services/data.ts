import { siteConfig } from '@/lib/config/site.config'

export const servicesData = {
  title: 'Our Services',
  categories: [
    {
      id: 'nail-services',
      title: 'Nail Services',
      description:
        'Classic manicures, chip-resistant gel, sculpted acrylic or gel extensions, and custom nail art that survive meetings, weddings, and Stampede nights.',
      serviceCount: 29,
      href: '/services#nail-services',
    },
    {
      id: 'massage-spa',
      title: 'Massage & Spa',
      description:
        'Relaxation and hot stone massage plus glow-boosting facials to reset between meetings without leaving Victoria Park.',
      serviceCount: 7,
      href: '/services#massage-spa',
    },
    {
      id: 'waxing',
      title: 'Waxing',
      description:
        'Gentle facial and body waxing with precise finishing so you leave smooth and ready for the day.',
      serviceCount: 10,
      href: '/services#waxing',
    },
  ],
  cta: { text: 'View services & pricing', href: '/services' },
} as const
