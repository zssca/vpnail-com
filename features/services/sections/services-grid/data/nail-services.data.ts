import type { ServiceCategory } from '../types'

export const nailServicesData: ServiceCategory = {
  id: "nail-services",
  title: "Nail Services",
  subcategories: [
    {
      name: "Manicures",
      services: [
        {
          id: "manicure",
          title: "Manicure with regular polish",
          description: "A standard manicure service that includes nail shaping, cuticle care, hand massage, and application of regular polish in your choice of color.",
          price: "$25",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=0e19aa9b-86a5-4bd5-804a-26e9dabb3725&type=service"
        },
        {
          id: "shellac-manicure",
          title: "Shellac Manicure",
          description: "A manicure service using shellac polish, which is a hybrid gel formula that provides longer wear than regular polish and typically lasts 2-3 weeks.",
          price: "$35",
          duration: "45 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=96dcf9ac-8f37-4c1d-bd12-7e7caafad618&type=service"
        },
        {
          id: "shellac-gel-top",
          title: "Shellac Manicure with Gel Top",
          description: "A shellac manicure with an additional gel top coat layer applied for enhanced durability and extended wear time beyond standard shellac.",
          price: "$40",
          duration: "50 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=0bd9debc-a1f5-4487-bd99-c952afb44201&type=service"
        },
        {
          id: "shellac-gel-overlay",
          title: "Shellac Manicure with Gel Overlay",
          description: "A shellac manicure with a full gel overlay applied over the natural nail to add thickness and strength, providing maximum protection for natural nails.",
          price: "$45",
          duration: "60 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=379fedbf-35d8-4816-9098-ba8ba0a875e2&type=service"
        }
      ]
    },
    {
      name: "Pedicures",
      services: [
        {
          id: "pedicure",
          title: "Pedicure with regular polish",
          description: "A standard pedicure service that includes foot soak, nail trimming and shaping, cuticle care, exfoliation, foot massage, and regular polish application.",
          price: "$40",
          duration: "45 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=35658703-d882-4ca9-b970-e47bd2d187ac&type=service"
        },
        {
          id: "spa-pedicure",
          title: "Spa Pedicure with Hot Stones",
          description: "An enhanced pedicure service that includes all standard pedicure elements plus a hot stone massage treatment applied to the feet and lower legs.",
          price: "$50",
          duration: "60 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=22ec16a1-b447-4bbe-a33f-a797a9740040&type=service"
        },
        {
          id: "shellac-pedicure",
          title: "Shellac Pedicure",
          description: "A pedicure service using shellac polish on the toenails, providing a chip-resistant finish that typically lasts 2-3 weeks longer than regular polish.",
          price: "$45",
          duration: "50 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=177ec3cb-4941-441f-a651-75c530357458&type=service"
        },
        {
          id: "deluxe-spa-pedicure",
          title: "Deluxe Spa Pedicure",
          description: "An extended pedicure service with additional time for thorough exfoliation, extended massage, hot stone treatment, and premium moisturizing products.",
          price: "$55",
          duration: "75 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=267056b5-9fdb-48e0-8c55-28b3c67d25d4&type=service"
        }
      ]
    },
    {
      name: "Nail Extensions",
      services: [
        {
          id: "acrylic-new-set",
          title: "Acrylic New Set",
          description: "A complete set of acrylic nail extensions applied to natural nails, including nail preparation, tip or form application, acrylic application, shaping, and polish.",
          price: "$60",
          duration: "90 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/3cf5dc61-a989-46a6-b2ae-f7075266cb4a"
        },
        {
          id: "gel-new-set",
          title: "Gel New Set",
          description: "A complete set of gel nail extensions applied to natural nails using hard gel product, including nail preparation, extension application, shaping, and polish.",
          price: "$60",
          duration: "90 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/3cf5dc61-a989-46a6-b2ae-f7075266cb4a"
        },
        {
          id: "acrylic-refill",
          title: "Acrylic Refill",
          description: "Maintenance service for existing acrylic nails that fills in the growth area near the cuticle with fresh acrylic product to maintain the appearance and integrity of the nails.",
          price: "$45",
          duration: "60 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/cf9f0b27-3b4e-49b0-9f4d-faa1fa7e4183"
        },
        {
          id: "gel-refill",
          title: "Gel Refill",
          description: "Maintenance service for existing gel nail extensions that fills in the regrowth area with fresh gel product and includes reshaping and refinishing as needed.",
          price: "$45",
          duration: "60 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/238fde8d-6edd-486d-9597-a7e6449ad4a8"
        }
      ]
    },
    {
      name: "Add-Ons",
      services: [
        {
          id: "hand-polish-change",
          title: "Hand Polish Change",
          description: "Removal of existing regular polish from fingernails and application of new polish color without additional nail care services.",
          price: "$15",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/d2716f81-7773-4cee-afb9-faa6d37ba759"
        },
        {
          id: "foot-polish-change",
          title: "Foot Polish Change",
          description: "Removal of existing regular polish from toenails and application of new polish color without additional pedicure services.",
          price: "$20",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/99698d3a-fc94-430d-8ef3-6a4dee18c3ed"
        },
        {
          id: "hand-shellac-change",
          title: "Hand Shellac Polish Change",
          description: "Removal of existing shellac or gel polish from fingernails and application of new shellac color, including curing under UV/LED lamp.",
          price: "$30",
          duration: "20 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/13c29f88-b561-4104-bdf4-65366ff9b528"
        },
        {
          id: "foot-shellac-change",
          title: "Foot Shellac Polish Change",
          description: "Removal of existing shellac or gel polish from toenails and application of new shellac color, including proper curing under UV/LED lamp.",
          price: "$35",
          duration: "20 mins",
          href: "https://victoriaparknailsspa.setmore.com/services/473751a4-644d-40ef-ad10-9de8bdd8423d"
        },
        {
          id: "hand-nail-trim-shape",
          title: "Hand Nail Trim & Shape",
          description: "Fingernail trimming and shaping service using files and clippers to achieve desired nail length and shape, without polish application.",
          price: "$15",
          duration: "10 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=67a49dc4-0de6-44da-8d1d-cc30b7fda0f4&type=service"
        },
        {
          id: "foot-nail-trim-shape",
          title: "Foot Nail Trim & Shape",
          description: "Toenail trimming and shaping service that includes proper cutting technique and filing to maintain healthy nail shape and prevent ingrown nails.",
          price: "$25",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=1cea68ef-bc0d-4e47-aa39-bf725a438f11&type=service"
        },
        {
          id: "shellac-removal",
          title: "Shellac Removal",
          description: "Safe removal of shellac or gel polish from nails using acetone-based products and proper technique to minimize damage to the natural nail.",
          price: "$15",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=63d78b40-d53d-44fd-9ad2-df431c61423c&type=service"
        },
        {
          id: "acrylic-gel-removal",
          title: "Acrylic/Gel Removal (up)",
          description: "Complete removal of acrylic or hard gel nail extensions using appropriate removal methods, including soaking and careful filing to protect natural nails.",
          price: "$20+",
          duration: "20 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=87a3bd9a-9435-48e8-a448-1e0a9e13d7fc&type=service"
        },
        {
          id: "paraffin-wax-hands",
          title: "Paraffin Wax Treatment - Hands",
          description: "A hand treatment using warm paraffin wax to moisturize and soften skin, which involves dipping hands in melted wax and allowing it to set before removal.",
          price: "$15",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=88c89c89-7ffd-4611-84fd-cb903bbc65ea&type=service"
        },
        {
          id: "paraffin-wax-feet",
          title: "Paraffin Wax Treatment - Feet",
          description: "A foot treatment using warm paraffin wax to deeply moisturize and condition the skin of the feet, helping to soften rough or dry areas.",
          price: "$25",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=62e389f2-7cff-4b50-ae7b-96f55904c7b0&type=service"
        },
        {
          id: "callus-removal",
          title: "Callus Removal",
          description: "Removal of hardened, thickened skin on the feet using professional tools and techniques to reduce calluses and create smoother foot texture.",
          price: "$10",
          duration: "10 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=29b13cdf-35c9-40c9-aba5-e47c4d42ddca&type=service"
        },
        {
          id: "nail-repair",
          title: "Nail Repair",
          description: "Repair service for a single damaged or broken nail using appropriate materials such as silk wrap, fiberglass, or acrylic to restore nail integrity.",
          price: "$5",
          duration: "10 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=69cd19e9-764a-492a-8ff7-f2d86430b10d&type=service"
        },
        {
          id: "french-tip-cat-eye",
          title: "French Tip or Cat Eye",
          description: "Choose from a classic French Tip nail design with white tips, or a Cat Eye specialty nail finish with magnetic striped effect. Both available as add-on finishes.",
          price: "$10",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=f3eea388-d341-4603-9ab6-0bdd81fce4ca&type=service"
        },
        {
          id: "chrome-ombre",
          title: "Chrome or Ombre",
          description: "Choose from a chrome powder finish for a luxurious metallic mirror effect, or an ombre gradient blend for a smooth color transition. Both available as specialty nail finishes.",
          price: "$15",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=c5d3c7de-4eeb-48e9-87b0-a85d91e06b4c&type=service"
        },
        {
          id: "simple-nail-art",
          title: "Simple Nail Art",
          description: "Basic decorative nail art designs applied to two accent nails, including simple patterns, lines, dots, or single-color detail work.",
          price: "$10",
          duration: "10 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=6d135edb-ab76-45d6-8e8a-0a5229e529a4&type=service"
        },
        {
          id: "custom-nail-art",
          title: "Custom Nail Art",
          description: "Custom decorative nail designs applied to 2-4 nails, featuring more detailed patterns, multiple colors, or moderately complex artistic elements.",
          price: "$15",
          duration: "20 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=b98b98d2-f2f0-4673-a6ac-64bc265cee8a&type=service"
        },
        {
          id: "intricate-nail-art",
          title: "Intricate Nail Art",
          description: "Highly detailed nail art with complex designs, multiple techniques, 3D elements, or hand-painted artwork requiring advanced skill and additional time. Pricing varies by design.",
          price: "$By Quote",
          duration: "Varies",
          href: "https://victoriaparknailsspa.setmore.com"
        }
      ]
    },
    {
      name: "Kids' Services",
      services: [
        {
          id: "little-princess-manicure",
          title: "Little Princess Manicure",
          description: "A manicure service designed for children ages 8 and under that includes gentle nail shaping, cuticle care, and polish application with age-appropriate products.",
          price: "$15",
          duration: "20 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=f107e0d7-a52e-4be7-bb06-1b8727113712&type=service"
        },
        {
          id: "little-princess-pedicure",
          title: "Little Princess Pedicure",
          description: "A pedicure service tailored for young children that includes foot soaking, gentle nail care, brief massage, and polish application in a child-friendly manner.",
          price: "$25",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=37a14e1c-a55e-4826-9b1c-3d6f8fb2c984&type=service"
        }
      ]
    }
  ]
} as const
