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

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return (
    <html>
      <body className="bg-background">
        <div className="flex min-h-screen w-full items-center justify-center p-6">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconCloud />
              </EmptyMedia>
              <EmptyTitle>Critical error</EmptyTitle>
              <EmptyDescription>
                {siteConfig.name} encountered a site-wide issue. Try again or
                reach out to our team.
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
                <Link href="/contact">Contact Support</Link>
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </body>
    </html>
  )
}
