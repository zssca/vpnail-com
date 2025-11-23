import { PrivacyPage, privacyMetadata } from '@/features/privacy'

export const metadata = privacyMetadata

export default async function PrivacyRoute() {
  'use cache'
  return <PrivacyPage />
}
