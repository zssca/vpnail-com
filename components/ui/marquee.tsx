'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  /** Speed in pixels per frame (default: 1) */
  speed?: number
  /** Direction of scroll (default: 'forward') */
  direction?: 'forward' | 'backward'
  /** Gap between items in pixels (default: 16) */
  gap?: number
  /** Enable drag interaction (default: true) */
  draggable?: boolean
}

/**
 * Marquee - A continuous auto-scrolling carousel with drag-free navigation
 *
 * Features:
 * - Continuous infinite scrolling
 * - Drag-free interaction
 * - Variable item widths
 * - Smooth 60fps animation
 *
 * @example
 * ```tsx
 * <Marquee speed={0.5}>
 *   <MarqueeItem>Content 1</MarqueeItem>
 *   <MarqueeItem>Content 2</MarqueeItem>
 * </Marquee>
 * ```
 */
export function Marquee({
  children,
  className,
  speed = 1,
  direction = 'forward',
  gap = 16,
  draggable = true,
}: MarqueeProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: draggable,
    containScroll: false,
    align: 'start',
    watchDrag: draggable,
  })

  const animationRef = React.useRef<number>(0)
  const isDraggingRef = React.useRef(false)

  const animate = React.useCallback(() => {
    if (!emblaApi) return

    // Don't auto-scroll while user is dragging
    if (isDraggingRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    // Access Embla's internal engine for smooth scrolling
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const engine = (emblaApi as any).internalEngine()

    if (!engine) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    // Calculate scroll direction
    const scrollDirection = direction === 'forward' ? -1 : 1

    // Update scroll position
    engine.location.add(speed * scrollDirection)
    engine.target.set(engine.location)

    // Handle loop wrapping
    const scrollBody = engine.scrollBody.direction()
    const directionValue = typeof scrollBody === 'number' ? scrollBody : scrollBody.get()

    engine.scrollLooper.loop(directionValue)
    engine.slideLooper.loop()

    // Apply translation
    engine.translate.to(engine.location)

    animationRef.current = requestAnimationFrame(animate)
  }, [emblaApi, speed, direction])

  // Start animation and setup drag handlers
  React.useEffect(() => {
    if (!emblaApi) return

    const handlePointerDown = () => {
      isDraggingRef.current = true
    }

    const handlePointerUp = () => {
      isDraggingRef.current = false
    }

    const handleSettle = () => {
      isDraggingRef.current = false
    }

    if (draggable) {
      emblaApi.on('pointerDown', handlePointerDown)
      emblaApi.on('pointerUp', handlePointerUp)
      emblaApi.on('settle', handleSettle)
    }

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (draggable) {
        emblaApi.off('pointerDown', handlePointerDown)
        emblaApi.off('pointerUp', handlePointerUp)
        emblaApi.off('settle', handleSettle)
      }
    }
  }, [emblaApi, animate, draggable])

  // Inject gap into children as margin-right
  const childrenWithGap = React.useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(child as any, {
          __marqueeGap: gap,
        })
      }
      return child
    })
  }, [children, gap])

  if (!mounted) {
    return null
  }

  return (
    <div
      ref={emblaRef}
      className={cn('overflow-hidden', className)}
      role="region"
      aria-roledescription="carousel"
      aria-live="off"
    >
      <div
        className={cn(
          'flex touch-pan-y touch-pinch-zoom',
          draggable && 'cursor-grab active:cursor-grabbing'
        )}
      >
        {childrenWithGap}
      </div>
    </div>
  )
}

interface MarqueeItemProps {
  children: React.ReactNode
  className?: string
  /** Width in pixels or CSS value (e.g., '300px', 'auto') */
  width?: string | number
  /** Minimum width in pixels */
  minWidth?: number
  /** Maximum width in pixels */
  maxWidth?: number
  /** @internal Gap injected by Marquee parent */
  __marqueeGap?: number
}

/**
 * MarqueeItem - A container for marquee content with flexible sizing
 *
 * @example
 * ```tsx
 * <MarqueeItem width={300}>Content</MarqueeItem>
 * <MarqueeItem minWidth={280} maxWidth={420}>Variable content</MarqueeItem>
 * ```
 */
export function MarqueeItem({
  children,
  className,
  width,
  minWidth,
  maxWidth,
  __marqueeGap = 0,
}: MarqueeItemProps) {
  const style = React.useMemo(() => {
    const styles: React.CSSProperties = {
      flexShrink: 0,
    }

    if (width !== undefined) {
      styles.width = typeof width === 'number' ? `${width}px` : width
    } else {
      styles.width = 'auto'
    }

    if (minWidth !== undefined) {
      styles.minWidth = `${minWidth}px`
    }

    if (maxWidth !== undefined) {
      styles.maxWidth = `${maxWidth}px`
    }

    // Apply gap as margin-right for consistent spacing in infinite loop
    if (__marqueeGap > 0) {
      styles.marginRight = `${__marqueeGap}px`
    }

    return styles
  }, [width, minWidth, maxWidth, __marqueeGap])

  return (
    <div className={cn('shrink-0', className)} style={style}>
      {children}
    </div>
  )
}
