import { siteConfig } from '@/lib/config/site.config'

export const faqsData = {
  title: "FAQs",
  categories: [
    {
      id: "services",
      title: "Services",
      faqs: [
        {
          id: "gel-vs-regular",
          question: "What's the difference between gel and regular polish?",
          answer: "Gel (shellac) is cured under LED for 2–3 weeks of wear and high gloss. Regular polish air-dries, costs less, and typically lasts 5–7 days."
        },
        {
          id: "french-manicure-options",
          question: "Do you offer French manicures?",
          answer: "Yes—classic or modern French tips in regular or gel. Add French to any manicure for $10.",
        },
        {
          id: "nail-art-pricing",
          question: "How much does nail art cost?",
          answer: "Accent art starts at $10; detailed or full-set designs are priced by complexity. Bring an inspo photo for an exact quote.",
        },
        {
          id: "extension-duration",
          question: "How long do nail extensions last?",
          answer: "Acrylic or gel sets need fills about every 2–3 weeks. With regular fills, sets can last 6–8+ weeks.",
        }
      ]
    },
    {
      id: "general",
      title: "General",
      faqs: [
        {
          id: "hours-location",
          question: "What are your hours and location?",
          answer: `Find us at ${siteConfig.business.address.street}, ${siteConfig.business.address.city}—minutes from the Stampede with free parking and CTrain access. Hours: ${siteConfig.business.hours.map(({ day, hours }) => `${day} ${hours}`).join(' | ')}. Holidays: ${siteConfig.business.holidayHours}.`,
        },
        {
          id: "appointment-booking",
          question: "Do I need an appointment?",
          answer: "Walk-ins are welcome when seats are open. For guaranteed times, book online 24/7 or call us during business hours.",
        },
        {
          id: "walk-ins",
          question: "Do you take walk-ins?",
          answer: "Yes when seats are free, but evenings and weekends book up. Reserve online to skip waits.",
        },
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer: "Cash, debit, Visa, MasterCard, AmEx, and tap-to-pay (Apple Pay/Google Pay)."
        }
      ]
    },
    {
      id: "health-safety",
      title: "Health & Safety",
      faqs: [
        {
          id: "sanitation-practices",
          question: "What sanitation practices do you follow?",
          answer: "Hospital-grade sterilization, sealed pouches for tools, disinfected stations between guests, and disposable files where possible—aligned with Health Canada guidance.",
        },
        {
          id: "bring-own-tools",
          question: "Can I bring my own tools?",
          answer: "Yes. Bring your own tools if you prefer; we\'re happy to use them.",
        },
        {
          id: "allergic-reactions",
          question: "What if I have allergies or sensitivities?",
          answer: "Tell us before your service. We have hypoallergenic options and can patch test if needed.",
        },
        {
          id: "pregnancy-safe",
          question: "Are your services safe during pregnancy?",
          answer: "Yes. We seat you in well-ventilated areas, adjust massage pressure, and use pregnancy-safe products—just let us know you\'re expecting.",
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing",
      faqs: [
        {
          id: "pricing-range",
          question: "What are your service prices?",
          answer: "Manicures start at $25, shellac at $35, pedicures at $40, acrylic or gel sets at $60, massage from $120, and waxing from $12. See the menu above for every price.",
        },
        {
          id: "group-discounts",
          question: "Do you offer group discounts?",
          answer: "Yes—groups of 4+ (bridal parties, birthdays, Stampede events) receive tailored packages based on our regular menu. Email us with your date and headcount.",
        },
        {
          id: "cancellation-policy",
          question: "What's your cancellation policy?",
          answer: "24 hours notice to cancel or reschedule. Late changes or no-shows may be charged up to 50% of the service to cover reserved technician time.",
        }
      ]
    }
  ]
} as const
