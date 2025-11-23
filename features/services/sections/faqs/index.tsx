import { Section, Container } from '@/components/layouts'
import { faqsData } from './data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FaqsSection() {
  return (
    <Section variant="muted" size="lg">
      <Container>
        <div className="text-center mb-16">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{faqsData.title}</h2>
        </div>

        <div className="space-y-12">
          {faqsData.categories.map((category) => (
            <div key={category.id}>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">{category.title}</h3>
              <Accordion type="single" collapsible>
                {category.faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
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
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
