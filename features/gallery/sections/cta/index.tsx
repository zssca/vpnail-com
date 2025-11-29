import { DualCtaSection } from '@/components/shared/dual-cta-section'
import { ctaData } from './data'

export function CtaSection() {
  return <DualCtaSection sectionVariant="primary-light" sectionSize='lg' {...ctaData} />
}
