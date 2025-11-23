'use client'

import * as React from 'react'
import { LucideIcon, Sparkles, Crown, Award, Star, Gem } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import { Section, Container } from '@/components/layouts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'

type SectionVariant = React.ComponentProps<typeof Section>['variant']
type SectionSize = React.ComponentProps<typeof Section>['size']

const packageIcons = {
  crown: Crown,
  award: Award,
  star: Star,
  gem: Gem,
} as const

export type PackageIcon = keyof typeof packageIcons

export interface PackageService {
  name: string
  included?: boolean
}

export interface ServicePackage {
  name: string
  price: string
  originalPrice?: string
  duration: string
  popular?: boolean
  icon?: PackageIcon
  bookingUrl: string
  description: string
  services: PackageService[]
}

export interface PackageCarouselContent {
  title: string
  packages: ServicePackage[]
}

interface PackagesCarouselProps extends PackageCarouselContent {
  id?: string
  sectionVariant?: SectionVariant
  sectionSize?: SectionSize
}

export function PackagesCarouselSection({
  title,
  packages,
  id = 'packages',
  sectionVariant = 'muted',
  sectionSize = 'lg',
}: PackagesCarouselProps) {
  const autoplayRef = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null)

  if (!packages.length) {
    return null
  }

  return (
    <Section variant={sectionVariant} size={sectionSize} id={id}>
      <Container noPaddingMobile>
        <div className="mb-16 px-4 text-center md:px-0">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {title}
          </h2>
        </div>

        <Carousel
          plugins={[autoplayRef.current]}
          opts={{ align: 'start', loop: true }}
          onMouseEnter={autoplayRef.current.stop}
          onMouseLeave={autoplayRef.current.reset}
          setApi={setCarouselApi}
        >
          <CarouselContent className="-ml-0 md:-ml-4">
            {packages.map((pkg) => {
              const Icon = pkg.icon ? packageIcons[pkg.icon] : undefined
              return (
                <CarouselItem
                  key={pkg.name}
                  className="basis-[calc(85%-1rem)] pl-4 pr-4 sm:basis-[calc(70%-1rem)] md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-background py-0">
                    {pkg.popular && (
                      <>
                        <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
                        <Badge
                          variant="secondary"
                          className="absolute right-6 top-6 gap-2 bg-primary text-primary-foreground"
                        >
                          <Sparkles className="h-3 w-3" />
                          Popular
                        </Badge>
                      </>
                    )}

                    <CardHeader className="space-y-4 pb-4 pt-6">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/20 bg-primary text-primary-foreground">
                              {Icon ? <Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                            </span>
                          <div className="space-y-2">
                            <CardTitle className="text-lg font-semibold tracking-tight">
                              {pkg.name}
                            </CardTitle>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              {pkg.duration}
                            </p>
                          </div>
                        </div>
                      </div>

                      <CardDescription className="text-sm leading-relaxed text-foreground">
                        {pkg.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4 px-6 pb-4 pt-4">
                      <div className="text-center">
                        <div className="mx-auto inline-flex flex-col items-center gap-2">
                          <span className="text-4xl font-semibold leading-none text-primary sm:text-5xl">
                            ${pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${pkg.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          What&apos;s Included
                        </p>
                        <ol className="list-decimal space-y-2 pl-4 text-sm leading-relaxed text-foreground marker:text-primary/80 marker:font-medium">
                          {pkg.services.map((service, idx) => (
                            <li key={`${pkg.name}-${idx}`} className="text-sm leading-relaxed text-foreground">
                              {service.name}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>

                    <CardFooter className="border-t border-border/70 pb-6 pt-4">
                      <Button asChild size="lg" variant={pkg.popular ? 'default' : 'outline'}>
                        <a
                          href={pkg.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center"
                        >
                          Book {pkg.name}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselDots api={carouselApi} className="mt-8 px-4 md:px-0" />
        </Carousel>
      </Container>
    </Section>
  )
}
