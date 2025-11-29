'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { LocationMap, type LocationMapProps } from './location-map'

type Props = LocationMapProps & {
  fallback?: ReactNode
}

export function LocationMapClient({ fallback, className, ...props }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return fallback ?? (
      <div className={cn('relative overflow-hidden rounded-md border border-border bg-muted', className)}>
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    )
  }

  return <LocationMap className={className} {...props} />
}
