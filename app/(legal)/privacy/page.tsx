import { PrivacyPage, privacyMetadata } from '@/features/privacy'

export const metadata = privacyMetadata
export const dynamic = 'force-static'
export const revalidate = false

export default async function PrivacyRoute() {
  'use cache'
  return <PrivacyPage />
}
