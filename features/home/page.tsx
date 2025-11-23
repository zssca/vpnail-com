import { AnnouncementBanner } from '@/components/layouts'
import { StructuredData } from '@/components/seo'
import { siteConfig } from '@/lib/config/site.config'
import { HeroSection } from './sections/hero'
import { CombinationsSection } from './sections/combinations'
import { HomeGallerySection } from './sections/gallery'
import { FeaturesSection } from './sections/features'
import { ServicesSection } from './sections/services'
import { TeamSection } from './sections/team'
import { TestimonialsSection } from './sections/testimonials'
import { CtaSection } from './sections/cta'
import { homeFaqData, homeBreadcrumbData } from './home.schema'

export function HomePage() {
  return (
    <>
      {/* FAQ Schema for Google's "People Also Ask" sections */}
      <StructuredData type="FAQPage" data={{ items: homeFaqData }} />
      {/* Breadcrumb Schema for better search appearance */}
      <StructuredData type="BreadcrumbList" data={{ items: homeBreadcrumbData }} />

      <main itemScope itemType="https://schema.org/LocalBusiness">
        {siteConfig.announcement.enabled && (
          <AnnouncementBanner message={siteConfig.announcement.message} />
        )}
        <HeroSection />
        <CombinationsSection />
        <HomeGallerySection />
        <FeaturesSection />
        <ServicesSection />
        <TeamSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </>
  )
}
