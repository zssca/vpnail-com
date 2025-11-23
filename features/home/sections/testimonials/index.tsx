import { TestimonialsCarousel } from '@/components/shared/testimonials-carousel'
import { homeTestimonialsData } from './data'

export function TestimonialsSection() {
  return <TestimonialsCarousel {...homeTestimonialsData} />
}
