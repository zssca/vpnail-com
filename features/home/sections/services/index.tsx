import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Section, Container } from '@/components/layouts'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { servicesData } from './data'

export function ServicesSection() {
  return (
    <Section variant="muted-light">
      <Container>
        <div className="text-center mb-16">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{servicesData.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {servicesData.categories.map((category) => (
            <Card key={category.id} className="flex flex-col h-full border">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  <small className="text-sm font-medium leading-none tracking-wide uppercase text-xs">
                    {category.serviceCount} services
                  </small>
                </Badge>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-lg">
                  {category.title}
                </h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="leading-7 text-muted-foreground text-sm sm:text-base">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="lg">
                  <Link href={category.href} className="flex w-full items-center justify-center">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" asChild>
            <Link href={servicesData.cta.href}>{servicesData.cta.text}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
