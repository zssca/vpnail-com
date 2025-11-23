'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { IconCloud } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { siteConfig } from '@/lib/config/site.config'

type ErrorBoundaryProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Page Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconCloud />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading {siteConfig.name}. Try again or head
            back to a safe page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" onClick={() => reset()}>
            Try Again
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
