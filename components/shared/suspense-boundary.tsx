import React, { Suspense } from 'react'
import { cn } from '@/lib/utils'

interface SuspenseBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
  className?: string
}

/**
 * Suspense Boundary Wrapper
 * Provides consistent error handling and loading states
 *
 * Usage:
 * <SuspenseBoundary fallback={<Skeleton />}>
 *   <AsyncComponent />
 * </SuspenseBoundary>
 */
export function SuspenseBoundary({
  children,
  fallback,
  className,
}: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback}>
      <div className={cn(className)}>
        {children}
      </div>
    </Suspense>
  )
}

interface SuspenseContainerProps {
  children: React.ReactNode
  fallback: React.ReactNode
  delay?: number
}

/**
 * Suspense Container with Optional Delay
 * Useful for preventing layout shift for very fast loading
 */
export function SuspenseContainer({
  children,
  fallback,
  delay = 0,
}: SuspenseContainerProps) {
  return (
    <Suspense
      fallback={
        delay > 0 ? (
          <DelayedFallback delay={delay}>{fallback}</DelayedFallback>
        ) : (
          fallback
        )
      }
    >
      {children}
    </Suspense>
  )
}

/**
 * Delayed Fallback Component
 * Prevents showing loading state for very fast operations
 */
function DelayedFallback({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return show ? children : null
}

/**
 * Section Suspense Boundary
 * Pre-configured for section-level components
 */
export function SectionSuspenseBoundary({
  children,
  fallback,
  className,
}: SuspenseBoundaryProps) {
  return (
    <section className={cn(className)}>
      <Suspense fallback={<div className="w-full">{fallback}</div>}>
        {children}
      </Suspense>
    </section>
  )
}
