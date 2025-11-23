import { Hero } from '@/features/shared'
import { heroData } from './data'

export function HeroSection() {
  return (
    <Hero
      title={heroData.title}
      description={heroData.description}
      variant="muted"
      background={{ type: 'muted' }}
      actions={[
        { text: heroData.cta.primary.text, href: heroData.cta.primary.href },
        { text: heroData.cta.secondary.text, href: heroData.cta.secondary.href, variant: 'outline' },
      ]}
    />
  )
}
