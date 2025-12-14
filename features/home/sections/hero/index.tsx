import { Hero } from '@/features/shared'
import { heroData } from './data'

export function HeroSection() {
  return (
    <Hero
      title={heroData.title}
      description={heroData.description}
      variant="default"
      background={heroData.background}
      actions={[heroData.cta.primary, heroData.cta.secondary]}
    />
  )
}
