import { AreasHeroSection } from './sections/hero'
import { StructuredData } from '@/components/seo'
import { siteConfig } from '@/lib/config/site.config'

export function AreasPage() {
  return (
    <main>
      {/* Article schema for Areas page */}
      <StructuredData
        type="Article"
        data={{
          title: `Calgary Service Areas | ${siteConfig.business.name}`,
          description:
            `${siteConfig.business.name} proudly serves eight Calgary neighborhoods: Victoria Park, Downtown Calgary, Beltline, Mission, Mount Royal, Inglewood, East Village, and Erlton with professional manicures, pedicures, gel nails, acrylics, custom nail art, spa pedicures, massage, and waxing services.`,
          url: '/areas',
          publishedTime: '2015-01-01T00:00:00Z',
          authorName: siteConfig.business.name,
        }}
      />
      <AreasHeroSection />
    </main>
  )
}
