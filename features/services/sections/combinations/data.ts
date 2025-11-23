import type { PackageCarouselContent } from '@/components/shared/packages-carousel'

export const combinationsData = {
  title: 'Service Packages',
  packages: [
    {
      name: 'Deluxe',
      price: '85',
      originalPrice: '90',
      duration: '2 hrs',
      popular: true,
      icon: 'crown',
      bookingUrl:
        'https://victoriaparknailsspa.setmore.com/book?step=staff&products=33278099-dbf1-454a-b169-30b2ff093286&type=service',
      services: [
        { name: 'Shellac Manicure', included: true },
        { name: 'Deluxe Spa Pedicure', included: true },
      ],
      description: 'Long-wear shellac plus deluxe hot stone pedicure—ideal before events or vacations.',
    },
    {
      name: 'Refresh',
      price: '60',
      originalPrice: '65',
      duration: '1 hr 15 mins',
      popular: false,
      icon: 'award',
      bookingUrl:
        'https://victoriaparknailsspa.setmore.com/book?step=staff&products=d95a021e-d7ca-4e44-b065-f22a634955ea&type=service',
      services: [
        { name: 'Manicure with regular polish', included: true },
        { name: 'Pedicure with regular polish', included: true },
      ],
      description: 'Classic polish on hands and feet for a quick reset.',
    },
    {
      name: 'Essential',
      price: '70',
      originalPrice: '75',
      duration: '1 hr 35 mins',
      popular: false,
      icon: 'star',
      bookingUrl:
        'https://victoriaparknailsspa.setmore.com/book?step=staff&products=e23a8336-3303-4193-a9dc-47025c307144&type=service',
      services: [
        { name: 'Shellac Manicure', included: true },
        { name: 'Pedicure with regular polish', included: true },
      ],
      description: 'Chip-resistant shellac on hands plus a fresh pedicure that fits a lunch break.',
    },
    {
      name: 'Perfection',
      price: '75',
      originalPrice: '80',
      duration: '1 hr 45 mins',
      popular: false,
      icon: 'gem',
      bookingUrl:
        'https://victoriaparknailsspa.setmore.com/book?step=staff&products=cae22bc2-9fa6-4555-a560-67adb65db4ae&type=service',
      services: [
        { name: 'Shellac Manicure', included: true },
        { name: 'Shellac Pedicure', included: true },
      ],
      description: 'All shellac, all shine—for matching hands and feet that last.',
    },
  ],
} satisfies PackageCarouselContent
