import { HomePage, homeMetadata } from '@/features/home'

export const metadata = homeMetadata

export default async function HomeRoute() {
  'use cache'
  return <HomePage />
}
