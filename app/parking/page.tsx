import { ParkingPage, parkingMetadata } from '@/features/parking'

export const metadata = parkingMetadata

export default async function ParkingRoute() {
  'use cache'
  return <ParkingPage />
}
