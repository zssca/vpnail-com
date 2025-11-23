import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import Image from 'next/image'
import { cva, type VariantProps } from 'class-variance-authority'
import { Container } from '@/components/layouts'
import { Button, buttonVariants } from '@/components/ui/button'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'
import { getImageSizes, imagePlaceholders } from '@/lib/utils/image'

// Types
export type HeroAction = {
  text: string
  href: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  external?: boolean
}

export type HeroBackground =
  | { type: 'default' }
  | { type: 'muted' }
  | { type: 'gradient' }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; poster?: string }
  | {
      type: 'iframe'
      src: string
      title?: string
      allowFullScreen?: boolean
      loading?: 'lazy' | 'eager'
      referrerPolicy?: string
    }

export type HeroProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: HeroAction[]
  background?: HeroBackground
  variant?: VariantProps<typeof heroVariants>['variant']
  className?: string
}

// Variants
const heroVariants = cva(
  'relative flex min-h-[500px] md:min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden py-14 sm:py-16 lg:py-20',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        muted: 'bg-muted/50 text-foreground',
        primary: 'bg-primary/5 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Background Component
function HeroBackground({ background }: { background?: HeroBackground }) {
  if (!background) return null

  if (background.type === 'muted') {
    return <div className="absolute inset-0 z-0 bg-muted/50" />
  }

  if (background.type === 'gradient') {
    return (
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-background to-muted/50"
        aria-hidden="true"
      />
    )
  }

  if (background.type === 'image') {
    return (
      <>
        <div className="absolute inset-0 z-0">
          <Image
            src={background.src}
            alt={background.alt || 'Hero background'}
            fill
            sizes={getImageSizes('hero')}
            className="object-cover"
            priority
            quality={90}
            placeholder="blur"
            blurDataURL={imagePlaceholders.default}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-background/60" />
      </>
    )
  }

  if (background.type === 'video') {
    return (
      <>
        <div className="absolute inset-0 z-0">
          <video
            key={background.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            aria-hidden="true"
            title="Background video"
            poster={background.poster}
          >
            <source src={background.src} type="video/mp4" />
            <track kind="captions" />
          </video>
        </div>
        <div className="absolute inset-0 z-0 bg-background/60" />
      </>
    )
  }

  if (background.type === 'iframe') {
    return (
      <>
        <div className="absolute inset-0 z-0">
          <iframe
            src={background.src}
            title={background.title || 'Embedded content'}
            className="h-full w-full border-0"
            loading={background.loading || 'lazy'}
            allowFullScreen={background.allowFullScreen ?? true}
            referrerPolicy={(background.referrerPolicy as React.HTMLAttributeReferrerPolicy) || 'no-referrer-when-downgrade'}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-background/60" />
      </>
    )
  }

  return null
}

// Button Component
function HeroButton({ action, index }: { action: HeroAction; index: number }) {
  const variant = action.variant ?? (index === 0 ? 'default' : 'outline')
  const isExternal = action.external || /^(https?:\/\/|mailto:|tel:)/.test(action.href)

  if (isExternal) {
    return (
      <div className="w-full sm:w-auto">
        <Button variant={variant} size="2xl" className="w-full sm:w-auto" asChild>
          <a
            href={action.href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
          >
            {action.text}
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full sm:w-auto">
      <Button variant={variant} size="2xl" className="w-full sm:w-auto" asChild>
        <Link href={action.href as Route}>
          {action.text}
        </Link>
      </Button>
    </div>
  )
}

export function Hero({
  title,
  description,
  actions = [],
  background,
  variant = 'default',
  className,
}: HeroProps) {
  return (
    <section className={cn(heroVariants({ variant }), className)} aria-label="Hero section">
      <HeroBackground background={background} />

      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          {title && (
            <BlurFade delay={0.1} duration={0.5} direction="up" offset={8} blur="4px" inView inViewMargin="-100px">
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {title}
              </h1>
            </BlurFade>
          )}

          {description && (
            <BlurFade delay={0.25} duration={0.5} direction="up" offset={6} blur="4px" inView inViewMargin="-100px">
              <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
                {description}
              </p>
            </BlurFade>
          )}

          {actions.length > 0 && (
            <div className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              {actions.slice(0, 2).map((action, index) => (
                <BlurFade
                  key={`${action.href}-${index}`}
                  delay={0.4 + index * 0.08}
                  duration={0.4}
                  direction="up"
                  offset={4}
                  blur="4px"
                  inView
                  inViewMargin="-100px"
                >
                  <HeroButton action={action} index={index} />
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

Hero.displayName = 'Hero'
