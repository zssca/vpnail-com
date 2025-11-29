'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Section, Container } from '@/components/layouts'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'
import { TestimonialCard } from '@/components/shared/testimonial-card'

type SectionVariant = React.ComponentProps<typeof Section>['variant']
type SectionSize = React.ComponentProps<typeof Section>['size']

export interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  role?: string
  date?: string
}

export interface TestimonialsContent {
  title: string
  testimonials: Testimonial[]
}

interface TestimonialsCarouselProps extends TestimonialsContent {
  sectionVariant?: SectionVariant
  sectionSize?: SectionSize
}

export function TestimonialsCarousel({
  title,
  testimonials,
  sectionVariant = 'default',
  sectionSize = 'lg',
}: TestimonialsCarouselProps) {
  const autoplayRef = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null)

  if (!testimonials.length) {
    return null
  }

  return (
    <Section variant={sectionVariant} size={sectionSize}>
      <Container noPaddingMobile>
        <div className="mb-16 px-4 text-center md:px-0">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {title}
          </h2>
        </div>

        <div className="relative">
          <Carousel
            plugins={[autoplayRef.current]}
            opts={{ align: 'start', loop: true }}
            className="w-full"
            onMouseEnter={autoplayRef.current.stop}
            onMouseLeave={autoplayRef.current.reset}
            setApi={setCarouselApi}
          >
            <CarouselContent className="-ml-0 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-[calc(85%-1rem)] pl-4 pr-4 sm:basis-[calc(70%-1rem)] md:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard
                    className="h-full"
                    rating={testimonial.rating}
                    content={testimonial.content}
                    name={testimonial.name}
                    role={testimonial.role}
                    date={testimonial.date}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots api={carouselApi} className="mt-8 px-4 md:px-0" />
          </Carousel>
        </div>
      </Container>
    </Section>
  )
}
