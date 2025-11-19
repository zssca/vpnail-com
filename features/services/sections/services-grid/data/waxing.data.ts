import type { ServiceCategory } from '../types'

export const waxingData: ServiceCategory = {
  id: "waxing",
  title: "Waxing",
  subcategories: [
    {
      name: "Facial Waxing",
      services: [
        {
          id: "eyebrow-shaping",
          title: "Eyebrow Shaping",
          description: "Professional eyebrow shaping using wax and tweezing methods to define and clean up the brow area, removing unwanted hair to create desired shape.",
          price: "$15",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=d781203f-7db9-4623-8df3-a27faeaa8ffe&type=service&staff=cLetBzJqo9uYtJFldrdZpDYEbgo7v4ne&staffSelected=false"
        },
        {
          id: "facial-hair-removal",
          title: "Facial Hair Removal",
          description: "Waxing service to remove unwanted hair from specific facial areas including upper lip, chin, or cheeks using appropriate wax products for facial skin.",
          price: "$12",
          duration: "10 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=eef37418-d05a-4e81-a3fa-a409b06355e2&type=service&staff=cLetBzJqo9uYtJFldrdZpDYEbgo7v4ne&staffSelected=false"
        },
        {
          id: "complete-facial-waxing",
          title: "Complete Facial Waxing",
          description: "Comprehensive facial waxing service that includes multiple areas such as eyebrows, upper lip, chin, and cheeks for complete facial hair removal.",
          price: "$45",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=b09b3ad6-c492-4d6f-93b2-89c77aa8106f&type=service&staff=cLetBzJqo9uYtJFldrdZpDYEbgo7v4ne&staffSelected=false"
        }
      ]
    },
    {
      name: "Body Waxing",
      services: [
        {
          id: "underarm-waxing",
          title: "Underarm Waxing",
          description: "Hair removal service for both underarm areas using professional waxing techniques and appropriate products for sensitive skin areas.",
          price: "$20",
          duration: "15 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=425908d7-945e-4ae6-aeba-4d836f096fcc&type=service"
        },
        {
          id: "full-arm-waxing",
          title: "Full Arm Waxing",
          description: "Complete hair removal for both arms from shoulders to wrists, including both upper arms and forearms using standard waxing methods.",
          price: "$40",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=a37cc4f0-ec48-4a1d-9315-8cd1292dc1f7&type=service"
        },
        {
          id: "lower-leg-waxing",
          title: "Lower Leg Waxing",
          description: "Hair removal service for both lower legs from knees to ankles, covering the calf and shin areas using professional waxing products.",
          price: "$30",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=1a45a4fc-5a67-4f3c-a918-5a79bbf1a0b8&type=service"
        },
        {
          id: "full-leg-waxing",
          title: "Full Leg Waxing",
          description: "Complete hair removal service for both legs from thighs to ankles, including upper legs, lower legs, knees, and feet using standard waxing techniques.",
          price: "$50",
          duration: "60 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=043f3b56-dc6e-4d2f-b84f-62201eb48fe3&type=service"
        },
        {
          id: "bikini-line-waxing",
          title: "Bikini Line Waxing",
          description: "Hair removal along the bikini line that removes hair visible outside of standard swimwear or underwear, covering the outer edges of the bikini area.",
          price: "$35",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=4490dba0-ef2f-490d-8ed0-b7c0cfd04a89&type=service&staff=cLetBzJqo9uYtJFldrdZpDYEbgo7v4ne&staffSelected=false"
        },
        {
          id: "brazilian-waxing",
          title: "Brazilian Waxing",
          description: "Comprehensive hair removal service for the entire bikini area including front, back, and all hair in the intimate region using specialized waxing techniques.",
          price: "$60",
          duration: "30 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=additional-products&products=9f75ae91-e66f-4177-9182-d1f8dcce06f1&type=service&staff=cLetBzJqo9uYtJFldrdZpDYEbgo7v4ne&staffSelected=false"
        },
        {
          id: "back-chest-waxing",
          title: "Back or Chest Waxing",
          description: "Hair removal service for either the full back area or full chest area, removing unwanted hair from the selected large body surface using appropriate waxing methods.",
          price: "$55",
          duration: "40 mins",
          href: "https://victoriaparknailsspa.setmore.com/book?step=staff&products=757faa06-320f-4908-84e5-102e1c1d712f&type=service"
        }
      ]
    }
  ]
} as const
