'use client'

import { useEffect, useState } from 'react'

interface UseScrollLockOptions {
  /**
   * Element to lock scroll on (default: document.body)
   */
  element?: HTMLElement | null
  /**
   * Whether to preserve scroll position when unlocking
   * @default true
   */
  preservePosition?: boolean
}

/**
 * Hook for locking/unlocking body scroll
 * Useful for modals, drawers, and fullscreen experiences
 * Prevents scrolling while preserving scroll position on unlock
 *
 * @param isLocked - Whether scroll should be locked
 * @param options - Configuration options
 *
 * @example
 * // Lock scroll when modal is open
 * useScrollLock(isModalOpen)
 *
 * @example
 * // Lock scroll with custom element
 * useScrollLock(isLocked, { element: containerRef.current })
 */
export function useScrollLock(
  isLocked: boolean = false,
  options: UseScrollLockOptions = {}
): void {
  const { element = typeof document !== 'undefined' ? document.body : null, preservePosition = true } =
    options

  useEffect(() => {
    if (!element) return

    if (isLocked) {
      // Store scroll position
      const scrollX = window.scrollX || window.pageXOffset
      const scrollY = window.scrollY || window.pageYOffset

      // Get current scroll position before locking
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      // Lock scroll
      element.style.overflow = 'hidden'
      
      // Add padding to compensate for scrollbar width (prevent layout shift)
      if (scrollbarWidth > 0) {
        element.style.paddingRight = `${scrollbarWidth}px`
      }

      // For mobile browsers that support it
      if (document.documentElement) {
        document.documentElement.style.overflow = 'hidden'
        if (scrollbarWidth > 0) {
          document.documentElement.style.paddingRight = `${scrollbarWidth}px`
        }
      }

      return () => {
        // Unlock scroll
        element.style.overflow = ''
        element.style.paddingRight = ''

        if (document.documentElement) {
          document.documentElement.style.overflow = ''
          document.documentElement.style.paddingRight = ''
        }

        // Restore scroll position
        if (preservePosition) {
          window.scrollTo(scrollX, scrollY)
        }
      }
    }
  }, [isLocked, element, preservePosition])
}

/**
 * Hook for temporary scroll lock (e.g., during animations)
 * Automatically unlocks after specified duration
 *
 * @param duration - How long to lock scroll in milliseconds
 * @param options - Configuration options
 *
 * @example
 * // Lock scroll for 300ms
 * useScrollLockDuration(300)
 */
export function useScrollLockDuration(
  duration: number,
  options: UseScrollLockOptions = {}
): void {
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsLocked(true))
    const timer = window.setTimeout(() => {
      setIsLocked(false)
    }, duration)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [duration])

  useScrollLock(isLocked, options)
}

/**
 * Hook that returns controls for manual scroll locking
 * Useful when you need more control over when to lock/unlock
 *
 * @param options - Configuration options
 * @returns Object with lock(), unlock() functions and isLocked state
 *
 * @example
 * const { lock, unlock, isLocked } = useScrollLockControl()
 * 
 * const handleOpenModal = () => {
 *   lock()
 * }
 * 
 * const handleCloseModal = () => {
 *   unlock()
 * }
 */
export function useScrollLockControl(
  options: UseScrollLockOptions = {}
): {
  lock: () => void
  unlock: () => void
  isLocked: boolean
} {
  const [isLocked, setIsLocked] = useState(false)

  useScrollLock(isLocked, options)

  return {
    lock: () => setIsLocked(true),
    unlock: () => setIsLocked(false),
    isLocked,
  }
}
