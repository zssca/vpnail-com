import { AccessibilityPage, accessibilityMetadata } from '@/features/accessibility'

export const metadata = accessibilityMetadata

export default async function AccessibilityRoute() {
  'use cache'
  return <AccessibilityPage />
}
