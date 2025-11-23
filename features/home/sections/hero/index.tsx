import { Hero } from '@/features/shared'
import { heroData } from './data'

export function HeroSection() {
  return (
    <Hero
      title={heroData.title}
      description={heroData.description}
      variant="default"
      background={{ type: 'image', src: '/images/home-hero-001.webp', alt: 'Victoria Park Nails spa' }}
      actions={[
        { text: heroData.cta.primary.text, href: heroData.cta.primary.href },
        { text: heroData.cta.secondary.text, href: heroData.cta.secondary.href, variant: 'outline' },
      ]}
    />
  )
}
