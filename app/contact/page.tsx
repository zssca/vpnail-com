import { ContactPage, contactMetadata } from '@/features/contact'

export const metadata = contactMetadata
export const dynamic = 'force-static'
export const revalidate = false

export default async function ContactRoute() {
  'use cache'
  return <ContactPage />
}
