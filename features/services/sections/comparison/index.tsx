'use client'

import { useState } from 'react'
import { Section, Container } from '@/components/layouts'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { comparisonData } from './data'

export function ComparisonSection() {
  const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <Section size="lg" variant="muted">
      <Container>
        <div className="text-center mb-16">
          <Container size="sm">
            <div className="space-y-4">
              <small className="text-sm font-medium leading-none text-primary uppercase tracking-[0.3em]">
                Find Your Perfect Match
              </small>
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{comparisonData.title}</h2>
              <p className="text-xl text-muted-foreground">{comparisonData.description}</p>
            </div>
          </Container>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory.toString()} onValueChange={(val) => setSelectedCategory(Number(val))}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md gap-2">
              {comparisonData.categories.map((category, idx) => (
                <TabsTrigger
                  key={category.name}
                  value={idx.toString()}
                  className="text-sm"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {comparisonData.categories.map((category, idx) => (
            <TabsContent key={category.name} value={idx.toString()} className="mt-0">
              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {category.services.map((service, serviceIdx) => (
                  <Card
                    key={`${category.name}-${service.name}`}
                    className="group relative flex flex-col overflow-hidden transition-all duration-300 hover: hover:-translate-y-1"
                  >
                    {/* Featured Badge for Most Popular */}
                    {serviceIdx === 1 && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    )}

                    <CardHeader className="pb-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                            {service.name}
                          </CardTitle>
                          {serviceIdx === 1 && (
                            <Badge variant="default" className="flex-shrink-0">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-primary">
                            {service.price}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {service.duration}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-foreground mb-3">
                          Includes:
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Information */}
              <div className="mt-12 p-6 bg-background rounded-lg border">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">Need Help Choosing?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {category.name === "Manicures"
                    ? "Choose regular polish for a quick refresh, shellac for long-lasting color, or gel extensions for maximum durability and style options."
                    : category.name === "Pedicures"
                    ? "Select regular pedicure for standard care, spa pedicure for added relaxation with hot stones, or deluxe for the ultimate pampering experience."
                    : "Select acrylic for strength and customization, gel for a lighter feel, or hybrid for the ultimate combination of durability and aesthetics."}
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}
