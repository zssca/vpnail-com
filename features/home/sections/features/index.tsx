import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Section, Container } from '@/components/layouts'
import { Heart, Sparkles, Shield, Microscope, Users, Leaf, Award } from 'lucide-react'
import { featuresData } from './data'
import { H2, Lead, P, Small } from '@/components/ui/typography'

const iconMap = { Heart, Sparkles, Shield, Microscope, Users, Leaf, Award } as const

export function FeaturesSection() {
  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-16">
          <Container size="sm">
            <div className="space-y-4">
              <H2>{featuresData.title}</H2>
              <Lead>{featuresData.subtitle}</Lead>
              <P className="text-muted-foreground">{featuresData.description}</P>
            </div>
          </Container>
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
                    <Small className="text-base font-semibold">{feature.title}</Small>
                  </CardTitle>
                </div>
                <P className="text-sm text-muted-foreground">
                  {feature.description}
                </P>
              </Card>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
