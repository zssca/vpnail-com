import { DualCtaSection } from '@/components/shared/dual-cta-section'
import { ctaData } from './data'

export function CtaSection() {
  return <DualCtaSection sectionSize='lg' {...ctaData} />
}
