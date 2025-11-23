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

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconCloud />
          </EmptyMedia>
          <EmptyTitle>Page Not Found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find that page on {siteConfig.name}. Head back
            home or reach out to our team for help.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild size="sm">
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
