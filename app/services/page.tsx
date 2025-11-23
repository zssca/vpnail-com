import { ServicesPage, servicesMetadata } from '@/features/services'

export const metadata = servicesMetadata

export default async function ServicesRoute() {
  'use cache'
  return <ServicesPage />
}
