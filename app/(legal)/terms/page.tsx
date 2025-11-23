import { TermsPage, termsMetadata } from '@/features/terms'

export const metadata = termsMetadata

export default async function TermsRoute() {
  'use cache'
  return <TermsPage />
}
