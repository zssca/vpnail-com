import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function SkipLinks() {
  return (
    <>
      <a
        href="#main-content"
        className={cn(
          buttonVariants({ variant: 'default', size: 'sm' }),
          'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[900]'
        )}
      >
        Skip to main content
      </a>
      <a
        href="#footer"
        className={cn(
          buttonVariants({ variant: 'default', size: 'sm' }),
          'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 z-[900]'
        )}
      >
        Skip to footer
      </a>
    </>
  )
}
