import type { HeroAction, HeroBackground } from '@/features/shared'

export interface HeroData {
  title: string
  description: string
  background: HeroBackground
  cta: {
    primary: HeroAction
    secondary: HeroAction
  }
}
