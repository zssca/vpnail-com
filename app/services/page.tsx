import { ServicesPage, servicesMetadata } from '@/features/services'

export const metadata = servicesMetadata
export const dynamic = 'force-static'
export const revalidate = false

export default async function ServicesRoute() {
  'use cache'
  return <ServicesPage />
}
