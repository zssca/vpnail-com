import { siteConfig } from '@/lib/config/site.config'

export const faqsData = {
  title: 'FAQs',
  faqs: [
    {
      question: 'Do I need an appointment?',
      answer: 'Walk-ins are welcomed when seats are open, but booking online or calling ahead guarantees your time—especially evenings, weekends, and Stampede week.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'Cash, debit, Visa, MasterCard, AmEx, and tap-to-pay (Apple Pay/Google Pay) are all accepted.',
    },
    {
      question: 'Is parking available?',
      answer: `Yes—free parking is available in front of the salon and in the adjacent lot at ${siteConfig.business.address.street}. Street parking is on ${siteConfig.business.address.street}, and we're steps from the Victoria Park/Stampede CTrain stop.`,
    },
    {
      question: 'How fast do you respond?',
      answer: `We answer calls during business hours and email within one business day. For fastest booking, use our online system or call ${siteConfig.business.phone}.`,
    },
    {
      question: 'What sanitation practices do you follow?',
      answer: 'Sealed-sterile tools, hospital-grade disinfection between guests, disposable files where possible, and technicians trained on Health Canada hygiene standards.',
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes. Groups of 4+ (bridal, birthdays, Stampede crews) can reserve together and we tailor pricing using our regular menu. Email us with your date and headcount for a quote.',
    },
    {
      question: 'What\'s your cancellation policy?',
      answer: '24 hours notice to cancel or reschedule. No-shows or late changes may be charged up to 50% to cover the reserved technician time.',
    },
    {
      question: 'Are your services safe during pregnancy?',
      answer: 'Yes. Let us know you’re expecting so we can seat you in well-ventilated areas, use pregnancy-safe products, and adjust massage pressure for comfort.',
    },
  ],
  cta: {
    title: 'Have More Questions?',
    description: 'Can\'t find what you need? Reach us now and we\'ll help you book the right service.',
    buttons: {
      primary: {
        text: 'Call now',
        href: siteConfig.social.phone,
      },
      secondary: {
        text: 'Send us a message',
        href: '#contact-form',
      },
    },
  },
} as const
