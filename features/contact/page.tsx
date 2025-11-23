import { Section, Container } from '@/components/layouts'
import { HeroSection } from './sections/hero'
import { MainSection } from './sections/main'
import { FaqsSection } from './sections/faqs'
import { StructuredData } from '@/components/seo'
import { getFAQSchema } from '@/lib/seo/structured-data'
import { faqsData as contactFaqs } from './sections/faqs/data'

export function ContactPage() {
  const faqEntities = contactFaqs.faqs.map((f) => ({ question: f.question, answer: f.answer }))

  return (
    <main>
      {/* FAQPage JSON-LD for Contact page */}
      <StructuredData schema={getFAQSchema(faqEntities)} />

      <HeroSection />

      {/* Contact 2x2 Grid: Info, Hours, Location, Form */}
      <Section variant="muted">
        <Container>
          <MainSection />
        </Container>
      </Section>

      <FaqsSection />
    </main>
  )
}
