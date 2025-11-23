import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Section, Container } from '@/components/layouts'
import { Heart, Sparkles, Shield, Microscope, Users, Leaf, Award } from 'lucide-react'
import { featuresData } from './data'

const iconMap = { Heart, Sparkles, Shield, Microscope, Users, Leaf, Award } as const

export function FeaturesSection() {
  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-16">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{featuresData.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <Card key={index} className="flex flex-col gap-4 p-6 text-center">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary text-primary-foreground">
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <CardTitle>
                    <small className="text-sm font-medium leading-none text-base font-semibold">{feature.title}</small>
                  </CardTitle>
                </div>
                <p className="leading-7 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
