'use client'

import * as React from 'react'
import Link from 'next/link'

import { Section, Container } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { servicesGridData } from './data'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'

export function ServicesGridSection() {
  return (
    <Section id="services" size="lg" variant="muted-light">
      <Container className="px-0">
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
              {/* Subcategories */}
              {category.subcategories.map((subcategory) => (
                <div key={`${category.id}-${subcategory.name}`} className="mb-12">
                  {/* Subcategory Header */}
                  <div className="text-center mb-6">
                    <Badge variant="secondary" className="py-2 px-4 mb-4 bg-primary text-primary-foreground border-primary">
                      <small className="text-sm font-medium leading-none text-primary-foreground font-semibold tracking-wide uppercase">
                        {subcategory.name}
                      </small>
                    </Badge>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto"></div>
                  </div>

                  {/* Services List */}
                  <ItemGroup className="max-w-5xl mx-auto">
                    {subcategory.services.map((service, serviceIndex) => (
                      <React.Fragment key={service.id}>
                        <Item
                          size="sm"
                          className="flex-row items-start gap-3 sm:gap-4"
                        >
                          <ItemMedia
                            variant="icon"
                            className="size-12 rounded-md bg-primary/10 text-sm font-semibold text-primary sm:size-10 sm:self-start"
                          >
                            {service.price}
                          </ItemMedia>
                          <ItemContent className="min-w-0 flex-1 gap-1">
                            <ItemTitle className="text-base font-semibold leading-snug">{service.title}</ItemTitle>
                            <ItemDescription className="text-sm leading-relaxed text-muted-foreground truncate">
                              {service.description}
                            </ItemDescription>
                          </ItemContent>
                          <ItemActions className="shrink-0">
                            <Button
                              asChild
                              size="lg"
                              aria-label={`Book ${service.title}`}
                              variant="default"
                            >
                              <Link href={service.href} target="_blank" rel="noopener noreferrer">
                                Book
                              </Link>
                            </Button>
                          </ItemActions>
                        </Item>
                        {serviceIndex !== subcategory.services.length - 1 && <ItemSeparator />}
                      </React.Fragment>
                    ))}
                  </ItemGroup>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}
