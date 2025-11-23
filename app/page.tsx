import { HomePage, homeMetadata } from '@/features/home'

export const metadata = homeMetadata
export const dynamic = 'force-static'
export const revalidate = false

export default async function HomeRoute() {
  'use cache'
  return <HomePage />
}
