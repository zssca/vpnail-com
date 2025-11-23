import { TermsPage, termsMetadata } from '@/features/terms'

export const metadata = termsMetadata
export const dynamic = 'force-static'
export const revalidate = false

export default async function TermsRoute() {
  'use cache'
  return <TermsPage />
}
