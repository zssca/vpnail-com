import { ContactPage, contactMetadata } from '@/features/contact'

export const metadata = contactMetadata

export default async function ContactRoute() {
  'use cache'
  return <ContactPage />
}
