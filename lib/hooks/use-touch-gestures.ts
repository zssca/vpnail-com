'use client'

import { useEffect, useRef, useState } from 'react'

interface TouchGestureHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTap?: () => void
  onLongPress?: (duration: number) => void
}

interface TouchGestureOptions {
  /**
   * Minimum distance in pixels to register as swipe
   * @default 50
   */
  swipeThreshold?: number
  /**
   * Minimum duration in milliseconds to register as long press
   * @default 500
   */
  longPressDuration?: number
  /**
   * Whether to prevent default browser behavior
   * @default true
   */
  preventDefault?: boolean
}

/**
 * Hook for detecting touch gestures (swipe, tap, long press)
 * Useful for mobile navigation and interactive elements
 *
 * @param handlers - Object with callback functions for different gestures
 * @param options - Configuration options
 * @returns ref - Ref to attach to the element to track
 *
 * @example
 * const ref = useTouchGestures({
 *   onSwipeLeft: () => console.log('Swiped left'),
 *   onSwipeRight: () => console.log('Swiped right'),
 * }, { swipeThreshold: 50 })
 *
 * return <div ref={ref}>Swipe me!</div>
 */
export function useTouchGestures(
  handlers: TouchGestureHandlers,
  options: TouchGestureOptions = {}
) {
  const {
    swipeThreshold = 50,
    longPressDuration = 500,
    preventDefault = true,
  } = options

  const ref = useRef<HTMLElement>(null)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchStartTime = useRef<number>(0)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      if (preventDefault) {
        e.preventDefault()
      }

      const touch = e.touches[0]
      touchStartX.current = touch.clientX
      touchStartY.current = touch.clientY
      touchStartTime.current = Date.now()

      // Set long press timer
      longPressTimer.current = setTimeout(() => {
        const duration = Date.now() - touchStartTime.current
        handlers.onLongPress?.(duration)
      }, longPressDuration)
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Clear long press timer on move
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // Clear long press timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }

      const touch = e.changedTouches[0]
      const touchEndX = touch.clientX
      const touchEndY = touch.clientY

      // Calculate distance and time
      const distanceX = touchStartX.current - touchEndX
      const distanceY = touchStartY.current - touchEndY
      const duration = Date.now() - touchStartTime.current

      // Only register swipe if not a long press
      if (duration < longPressDuration) {
        // Horizontal swipe
        if (Math.abs(distanceX) > swipeThreshold && Math.abs(distanceY) < swipeThreshold) {
          if (distanceX > 0) {
            handlers.onSwipeLeft?.()
          } else {
            handlers.onSwipeRight?.()
          }
        }
        // Vertical swipe
        else if (Math.abs(distanceY) > swipeThreshold && Math.abs(distanceX) < swipeThreshold) {
          if (distanceY > 0) {
            handlers.onSwipeUp?.()
          } else {
            handlers.onSwipeDown?.()
          }
        }
        // Tap (minimal movement)
        else if (Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10 && duration < 200) {
          handlers.onTap?.()
        }
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventDefault })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }

      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handlers, swipeThreshold, longPressDuration, preventDefault])

  return ref
}

/**
 * Convenience hook for swipe detection only
 * Simpler API for common swipe use cases
 *
 * @param onSwipeLeft - Callback when swiped left
 * @param onSwipeRight - Callback when swiped right
 * @returns ref - Ref to attach to element
 *
 * @example
 * const ref = useSwipe(() => nextSlide(), () => prevSlide())
 * return <div ref={ref}>Carousel content</div>
 */
export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void
) {
  return useTouchGestures({
    onSwipeLeft,
    onSwipeRight,
  })
}

/**
 * Convenience hook for detecting long press
 * Useful for context menus and activation
 *
 * @param onLongPress - Callback with press duration
 * @param duration - How long to press (default 500ms)
 * @returns ref - Ref to attach to element
 *
 * @example
 * const ref = useLongPress((duration) => showMenu())
 * return <div ref={ref}>Long press me</div>
 */
export function useLongPress(
  onLongPress: (duration: number) => void,
  duration: number = 500
) {
  return useTouchGestures(
    { onLongPress },
    { longPressDuration: duration }
  )
}
