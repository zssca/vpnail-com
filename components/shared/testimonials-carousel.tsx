'use client'

import * as React from 'react'
import { Section, Container } from '@/components/layouts'
import { Marquee, MarqueeItem } from '@/components/ui/marquee'
import { TestimonialCard } from '@/components/shared/testimonial-card'

type SectionVariant = React.ComponentProps<typeof Section>['variant']
type SectionSize = React.ComponentProps<typeof Section>['size']

export interface Testimonial {
  id: string
  name: string
  content: string
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

/**
 * Calculate card width based on content length
 * Shorter reviews get smaller cards, longer reviews get larger cards
 */
function getCardWidth(contentLength: number): { min: number; max: number } {
  // Base measurements
  const MIN_WIDTH = 280
  const MAX_WIDTH = 420

  // Character thresholds
  const SHORT_THRESHOLD = 100
  const MEDIUM_THRESHOLD = 200
  const LONG_THRESHOLD = 350

  if (contentLength <= SHORT_THRESHOLD) {
    return { min: MIN_WIDTH, max: 300 }
  } else if (contentLength <= MEDIUM_THRESHOLD) {
    return { min: 300, max: 350 }
  } else if (contentLength <= LONG_THRESHOLD) {
    return { min: 340, max: 400 }
  } else {
    return { min: 380, max: MAX_WIDTH }
  }
}

export function TestimonialsCarousel({
  title,
  testimonials,
  sectionVariant = 'default',
  sectionSize = 'lg',
}: TestimonialsCarouselProps) {
  if (!testimonials.length) {
    return null
  }

  return (
    <Section variant={sectionVariant} size={sectionSize}>
      <Container>
        <div className="mb-16 text-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {title}
          </h2>
        </div>
      </Container>

      <Marquee speed={0.5} gap={16}>
        {testimonials.map((testimonial) => {
          const { min, max } = getCardWidth(testimonial.content.length)
          return (
            <MarqueeItem
              key={testimonial.id}
              minWidth={min}
              maxWidth={max}
            >
              <TestimonialCard
                className="h-full"
                content={testimonial.content}
                name={testimonial.name}
                role={testimonial.role}
                date={testimonial.date}
              />
            </MarqueeItem>
          )
        })}
      </Marquee>
    </Section>
  )
}
