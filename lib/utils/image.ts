/**
 * Image Optimization Utilities
 * Provides responsive sizes, blur placeholders, and image loading strategies
 */

export type ImageType = 'hero' | 'gallery' | 'card' | 'avatar' | 'testimonial' | 'section'

/**
 * Generate responsive image sizes string for srcset
 * Optimized for different screen sizes and device types
 */
export function getImageSizes(type: ImageType): string {
  const sizes = {
    hero: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 85vw, 1200px',
    gallery: '(max-width: 400px) 48vw, (max-width: 640px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw',
    card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 30vw',
    avatar: '(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px',
    testimonial: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
    section: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw',
  }
  return sizes[type]
}

/**
 * Determine loading strategy based on image position
 * Critical images (above fold) use eager loading with priority
 * Below fold images use lazy loading
 */
export function getLoadingStrategy(index: number, totalImages: number, criticalCount: number = 6) {
  const isPriority = index < criticalCount
  return {
    priority: isPriority,
    loading: isPriority ? ('eager' as const) : ('lazy' as const),
  }
}

/**
 * Base64 encoded placeholder images for different contexts
 * These minimal blur placeholders provide visual feedback while images load
 */
export const imagePlaceholders = {
  default: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  dark: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  transparent: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
}

/**
 * Check if browser supports WebP format
 * Used for progressive enhancement and fallback strategies
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return true

  try {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5
  } catch (e) {
    return false
  }
}

/**
 * Check if browser supports AVIF format
 * Most modern browsers support it, provides best compression
 */
export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return true

  try {
    const canvas = document.createElement('canvas')
    return canvas.toDataURL('image/avif').indexOf('image/avif') === 5
  } catch (e) {
    return false
  }
}

/**
 * Get the optimal image format based on browser support
 * Falls back to WebP, then to base format
 */
export function getOptimalImageFormat(): 'avif' | 'webp' | 'jpeg' {
  if (supportsAVIF()) return 'avif'
  if (supportsWebP()) return 'webp'
  return 'jpeg'
}

/**
 * Generate a srcset string for responsive images
 * Used when custom image loading is needed beyond Next.js Image component
 */
export function generateSrcSet(
  basePath: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string {
  return widths
    .map((width) => `${basePath}?w=${width} ${width}w`)
    .join(', ')
}

/**
 * Format bytes to human readable size
 * Useful for debugging and monitoring image sizes
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Image optimization config constants
 */
export const imageConfig = {
  maxSizes: {
    hero: 1920,
    gallery: 1280,
    card: 1024,
    avatar: 128,
    testimonial: 1024,
    section: 1600,
  },
  aspectRatios: {
    hero: '16/9',
    gallery: '1/1',
    card: '4/3',
    avatar: '1/1',
    testimonial: '16/9',
    section: '16/9',
  },
  cacheTTL: 60 * 60 * 24 * 365,
  preloadThreshold: 100,
} as const
