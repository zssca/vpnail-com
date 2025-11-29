import type { PackageCarouselContent } from '@/components/shared/packages-carousel'

export const combinationsData = {
  title: 'Service Packages',
  packages: [
    {
      name: 'Deluxe',
      price: '80',
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
      name: 'Classic',
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
  ],
} satisfies PackageCarouselContent
