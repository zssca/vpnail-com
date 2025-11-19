import { Section, Container } from '@/components/layouts'
import { HeroSection } from './sections/hero'
import { StorySection } from './sections/story'
import { StatsSection } from './sections/stats'
import { ValuesSection } from './sections/values'
import { LocationSection } from './sections/location'
import { PhilosophySection } from './sections/philosophy'
import { CredentialsSection } from './sections/credentials'
import { WhoWeServeSection } from './sections/who-we-serve'
import { TestimonialsSection } from './sections/testimonials'
import { CtaSection } from './sections/cta'
import { StructuredData } from '@/components/seo'
import { siteConfig } from '@/lib/config/site.config'

export function AboutPage() {
  return (
    <main>
      {/* Article schema for About page */}
      <StructuredData
        type="Article"
        data={{
          title: `About ${siteConfig.business.name}`,
          description:
            `Discover the family-owned story behind ${siteConfig.business.name}, our safety standards, and the values that keep Calgary guests returning since 2015.`,
          url: '/about',
          publishedTime: '2015-01-01T00:00:00Z',
          authorName: siteConfig.business.name,
        }}
      />
      <HeroSection />
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StorySection />
            <StatsSection />
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ValuesSection />
            <LocationSection />
          </div>
        </Container>
      </Section>
      <PhilosophySection />
      <CredentialsSection />
      <WhoWeServeSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}
