'use client'

import { useEffect, useState } from 'react'
import { LocationMap, type LocationMapProps } from './location-map'

type Props = LocationMapProps

export function LocationMapClient(props: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <LocationMap {...props} />
}
