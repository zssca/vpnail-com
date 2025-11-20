'use client'

import { Section, Container } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { servicesGridData } from './data'
import { H3, Lead, Small } from '@/components/ui/typography'

export function ServicesGridSection() {
  return (
    <Section id="services" size="lg">
      <Container>
        {/* Detailed Services Tabs */}
        <Tabs defaultValue={servicesGridData.categories[0].id} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              {servicesGridData.categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm"
                  id={category.id}
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {servicesGridData.categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0 space-y-12">
              {/* Category description */}
              <div className="text-center mb-8">
                <H3 className="mb-2">{category.title}</H3>
                <Lead className="text-muted-foreground max-w-2xl mx-auto">
                  {category.id === 'nail-services' && 'Professional nail care services including manicures, pedicures, and artistic nail enhancements.'}
                  {category.id === 'massage-spa' && 'Luxurious spa treatments designed to relax, rejuvenate, and restore your body and mind.'}
                  {category.id === 'waxing' && 'Professional waxing services for smooth, hair-free skin using gentle, effective techniques.'}
                </Lead>
              </div>

              {/* Subcategories */}
              {category.subcategories.map((subcategory) => (
                <div key={`${category.id}-${subcategory.name}`} className="mb-12">
                  {/* Subcategory Header */}
                  <div className="text-center mb-6">
                    <Badge variant="secondary" className="py-2 px-4 mb-4 bg-primary text-primary-foreground border-primary">
                      <Small className="text-primary-foreground font-semibold tracking-wide uppercase">
                        {subcategory.name}
                      </Small>
                    </Badge>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto"></div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 max-w-7xl mx-auto">
                    {subcategory.services.map((service) => (
                      <Card
                        key={service.id}
                        className="flex flex-col gap-4 p-4 hover:border-primary/50 transition-all duration-200 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Service Info */}
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base leading-tight">
                              {service.title}
                            </CardTitle>
                            {service.description && (
                              <CardDescription className="text-xs leading-snug">
                                {service.description}
                              </CardDescription>
                            )}
                          </div>

                          {/* Price Badge */}
                          <div className="flex-shrink-0">
                            <div className="flex flex-col items-end bg-primary px-3 py-1.5 rounded-md gap-0.5">
                              <span className="text-base font-bold text-primary-foreground whitespace-nowrap leading-none">
                                {service.price}
                              </span>
                              <div className="flex items-center gap-1 text-[10px] text-primary-foreground/80 mt-0.5">
                                <Clock className="h-3 w-3" />
                                <span className="whitespace-nowrap">{service.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button asChild size="sm" variant="outline" className="w-full" aria-label={`Book ${service.title}`}>
                          <Link
                            href={service.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 focus-visible:outline-none"
                          >
                            <span className="font-medium">Book This Service</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}
