import { TestimonialsCarousel } from '@/components/shared/testimonials-carousel'
import { testimonialsData } from './data'

export function TestimonialsSection() {
  return <TestimonialsCarousel {...testimonialsData} />
}
