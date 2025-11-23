import { AccessibilityPage, accessibilityMetadata } from '@/features/accessibility'

export const metadata = accessibilityMetadata
export const dynamic = 'force-static'
export const revalidate = false

export default async function AccessibilityRoute() {
  'use cache'
  return <AccessibilityPage />
}
