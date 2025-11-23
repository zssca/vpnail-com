import { Section, Container } from '@/components/layouts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { faqsData } from './data'

export function FaqsSection() {
  return (
    <Section variant="muted" size="lg">
      <Container>
        <div className="text-center mb-16">
          <Container size="sm">
            <div className="space-y-4">
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{faqsData.title}</h2>
            </div>
          </Container>
        </div>

        <div className="space-y-12">
          <Accordion type="single" collapsible>
            {faqsData.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="bg-muted/30">
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="h-6 w-6 text-primary mr-2" />
                <CardTitle>
                  <small className="text-sm font-medium leading-none text-base font-semibold uppercase tracking-wide">
                    {faqsData.cta.title}
                  </small>
                </CardTitle>
              </div>
              <CardDescription className="text-center">
                <p className="leading-7 text-sm text-muted-foreground">
                  {faqsData.cta.description}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm" asChild>
                <Link href={faqsData.cta.buttons.secondary.href}>
                  {faqsData.cta.buttons.secondary.text}
                </Link>
              </Button>
              <Button size="sm" asChild>
                <a href={faqsData.cta.buttons.primary.href}>
                  {faqsData.cta.buttons.primary.text}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
