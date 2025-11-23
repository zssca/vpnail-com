import { GalleryPage, galleryMetadata } from '@/features/gallery'

export const metadata = galleryMetadata

export default async function GalleryRoute() {
  'use cache'
  return <GalleryPage />
}
