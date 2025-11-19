import type { ServiceCategory } from '../types'

export const massageSpaData: ServiceCategory = {
  id: "massage-spa",
  title: "Massage & Spa",
  subcategories: [
    {
      name: "Massage Therapy",
      services: [
        {
          id: "relaxation-massage-60",
          title: "1-Hour Relaxation Massage",
          description: "A 60-minute full-body massage session using various techniques to address muscle tension, promote circulation, and provide general relaxation.",
          price: "$120",
          duration: "60 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=79e22787-9882-4c6e-bbb6-bc86a49dc3f3&type=service&staff=cyenzUfc96WJtwAUlopx7DhYQ83kffxi&staffSelected=false"
        },
        {
          id: "hot-stone-massage-60",
          title: "1-Hour Hot Stone Massage",
          description: "A 60-minute massage session that incorporates heated smooth stones placed on the body and used as massage tools to warm muscles and enhance the treatment.",
          price: "$130",
          duration: "60 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=ab304f4c-87a7-4e47-b08b-ff2670ce1b0e&type=service&staff=cyenzUfc96WJtwAUlopx7DhYQ83kffxi&staffSelected=false"
        },
        {
          id: "extended-massage-90",
          title: "90-Minute Extended Massage",
          description: "An extended 90-minute massage session providing additional time to address multiple areas of concern and allow for more thorough muscle work and relaxation.",
          price: "$180",
          duration: "90 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=cad7b49f-9d7d-4e18-a1dc-025ed2b6f89b&type=service&staff=cyenzUfc96WJtwAUlopx7DhYQ83kffxi&staffSelected=false"
        },
        {
          id: "hot-stone-massage-90",
          title: "90-Minute Hot Stone Massage",
          description: "An extended 90-minute hot stone massage that allows more time for heat therapy and deep muscle work using heated stones throughout the session.",
          price: "$190",
          duration: "90 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=223b51c2-4e50-4ef9-8309-b1cfb3852e65&type=service&staff=cyenzUfc96WJtwAUlopx7DhYQ83kffxi&staffSelected=false"
        },
        {
          id: "ultimate-massage-120",
          title: "2-Hour Ultimate Massage",
          description: "A comprehensive 120-minute massage session that provides extensive time to work on the full body with customized techniques based on individual needs and preferences.",
          price: "$240",
          duration: "120 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=6105a80e-e1ea-47a3-ba15-5b00b565b4d7&type=service&staff=cyenzUfc96WJtwAUlopx7DhYQ83kffxi&staffSelected=false"
        },
        {
          id: "ultimate-hot-stone-120",
          title: "2-Hour Ultimate Hot Stone",
          description: "A comprehensive 120-minute hot stone massage combining extended hands-on massage with continuous use of heated stones for maximum therapeutic benefit.",
          price: "$250",
          duration: "120 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=8ce64029-993f-42ab-a744-724385467b3e&type=service&staff=cyenzUfc96WJtwAUlopx7DhYQ83kffxi&staffSelected=false"
        }
      ]
    },
    {
      name: "Spa Treatments",
      services: [
        {
          id: "refreshing-facial",
          title: "Refreshing Facial",
          description: "A 30-minute facial treatment that includes cleansing, exfoliation, facial massage, and mask application to refresh and improve the appearance of facial skin.",
          price: "$45",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com"
        }
      ]
    }
  ]
} as const
