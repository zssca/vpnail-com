'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Route } from 'next'
import { AnimatePresence, motion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { getImageSizes, imagePlaceholders } from '@/lib/utils/image'
import { Container } from '@/components/layouts'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { BlurFade } from '@/components/ui/blur-fade'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type HeroAction = {
  text: string
  href: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  external?: boolean
  trackingEvent?: string
  trackingId?: string
  trackingLabel?: string
  icon?: React.ReactNode
}

export type HeroBackground =
  | { type: 'default' }
  | { type: 'muted' }
  | { type: 'gradient' }
  | { type: 'image'; src: string; alt?: string; overlay?: boolean }
  | { type: 'carousel'; images: string[]; alt?: string; interval?: number; overlay?: boolean }

export type HeroProps = {
  label?: string
  labelVariant?: VariantProps<typeof badgeVariants>['variant']
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: HeroAction[]
  background?: HeroBackground
  align?: 'center' | 'left'
  variant?: VariantProps<typeof heroVariants>['variant']
  className?: string
}

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------

const heroVariants = cva(
  'relative flex w-full items-center overflow-hidden py-12 sm:py-20 lg:py-32',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        muted: 'bg-muted/50 text-foreground',
        primary: 'bg-primary/5 text-foreground',
      },
      size: {
        default: 'min-h-[500px] md:min-h-[calc(100vh-4rem)]',
        compact: 'min-h-[400px] md:min-h-[60vh]',
        full: 'min-h-[calc(100svh)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function useCarousel(images: string[], interval: number = 5000) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return currentIndex
}

function ImageBackground({ src, alt, withOverlay }: { src: string; alt?: string; withOverlay?: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-background">
        <Image
          src={src}
          alt={alt || 'Hero background'}
          fill
          sizes={getImageSizes('hero')}
          className="object-cover"
          priority
          quality={90}
          placeholder="blur"
          blurDataURL={imagePlaceholders.default}
        />
      </div>
      {withOverlay && (
        <div className="absolute inset-0 z-0 bg-background/60 backdrop-blur-[1px]" />
      )}
    </>
  )
}

function CarouselBackground({ images, alt, interval, withOverlay }: { images: string[]; alt?: string; interval?: number; withOverlay?: boolean }) {
  const currentIndex = useCarousel(images, interval)

  return (
    <>
      <div className="absolute inset-0 z-0 bg-background">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full bg-background"
          >
            <Image
              src={images[currentIndex]}
              alt={alt || 'Hero background'}
              fill
              sizes={getImageSizes('hero')}
              className="object-cover"
              priority
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {withOverlay && (
        <div className="absolute inset-0 z-10 bg-background/40" />
      )}
    </>
  )
}

function HeroBackground({ background }: { background?: HeroBackground }) {
  if (!background || background.type === 'default') return null

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
      <ImageBackground
        src={background.src}
        alt={background.alt}
        withOverlay={background.overlay !== false}
      />
    )
  }

  if (background.type === 'carousel') {
    return (
      <CarouselBackground
        images={background.images}
        alt={background.alt}
        interval={background.interval}
        withOverlay={background.overlay !== false}
      />
    )
  }

  return null
}

function HeroButton({ action, index }: { action: HeroAction; index: number }) {
  const variant = action.variant ?? (index === 0 ? 'default' : 'outline')
  const size = action.size ?? 'lg'
  const isExternal = action.external || /^(https?:\/\/|mailto:|tel:)/.test(action.href)

  const commonClasses = "min-w-[140px] shadow-sm hover:shadow-md transition-all w-full sm:w-auto"

  const content = (
    <>
      {action.text}
      {action.icon && <span className="ml-2">{action.icon}</span>}
    </>
  )

  const trackingProps = action.trackingEvent ? {
    'data-gtm-event': action.trackingEvent,
    'data-gtm-id': action.trackingId,
    'data-gtm-label': action.trackingLabel ?? action.text,
    'data-gtm-href': action.href,
  } : {}

  if (isExternal) {
    return (
      <Button variant={variant} size={size} className={commonClasses} asChild {...trackingProps}>
        <a
          href={action.href}
          target={action.external ? '_blank' : undefined}
          rel={action.external ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size} className={commonClasses} asChild {...trackingProps}>
      <Link href={action.href as Route}>{content}</Link>
    </Button>
  )
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function Hero({
  label,
  labelVariant = 'secondary',
  title,
  description,
  actions = [],
  background,
  align = 'center',
  variant = 'default',
  className,
}: HeroProps) {
  const isCenter = align === 'center'
  const isCarousel = background?.type === 'carousel'

  // Logic for dark backgrounds:
  // When we have a dark background (carousel or image with overlay), we apply the 'dark'
  // class to the section. This leverages the globals.css theme variables to inversed colors
  // (white text, dark background, etc.) naturally, without maintaining hardcoded color logic.
  const isDarkBackground = isCarousel || (background?.type === 'image' && background.overlay !== false)
  const themeClass = isDarkBackground ? 'dark' : ''

  return (
    <section
      className={cn(heroVariants({ variant }), themeClass, className)}
      aria-label="Hero section"
    >
      <HeroBackground background={background} />

      <Container className="relative z-10 w-full">
        <div
          className={cn(
            "mx-auto flex max-w-4xl flex-col space-y-8",
            isCenter ? "items-center text-center" : "items-start text-left"
          )}
        >
          {label && (
            <BlurFade delay={0} duration={0.5} direction="up" inView>
              <Badge variant={labelVariant} className="mb-2 px-3 py-1 text-sm backdrop-blur-sm">
                {label}
              </Badge>
            </BlurFade>
          )}

          {title && (
            <BlurFade delay={0.1} duration={0.5} direction="up" inView>
              <h1
                className={cn(
                  "text-balance font-bold tracking-tight text-4xl sm:text-5xl lg:text-7xl",
                  "text-foreground" // Uses derived semantic token
                )}
              >
                {title}
              </h1>
            </BlurFade>
          )}

          {description && (
            <BlurFade delay={0.2} duration={0.5} direction="up" inView>
              <p
                className={cn(
                  "max-w-2xl text-pretty text-lg sm:text-xl leading-relaxed",
                  "text-foreground/70" // Uses derived semantic token with requested opacity
                )}
              >
                {description}
              </p>
            </BlurFade>
          )}

          {actions.length > 0 && (
            <BlurFade delay={0.3} duration={0.5} direction="up" inView>
              <div
                className={cn(
                  "flex w-full flex-col gap-4 sm:flex-row",
                  isCenter ? "sm:items-center sm:justify-center" : "sm:justify-start"
                )}
              >
                {actions.map((action, index) => (
                  <HeroButton key={`${action.href}-${index}`} action={action} index={index} />
                ))}
              </div>
            </BlurFade>
          )}
        </div>
      </Container>
    </section>
  )
}

Hero.displayName = 'Hero'
