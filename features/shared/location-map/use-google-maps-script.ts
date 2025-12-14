import { useEffect, useState, useCallback, useRef } from 'react'
import { MAPS_SCRIPT_ID, MAPS_CALLBACK_NAME } from './config'

interface UseGoogleMapsScriptOptions {
  apiKey: string
  enabled: boolean
}

interface UseGoogleMapsScriptResult {
  isLoaded: boolean
  loadError: boolean
  isLoading: boolean
}

/**
 * Check if Google Maps API is fully loaded and ready
 */
function isGoogleMapsReady(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.google?.maps?.Map &&
    window.google?.maps?.importLibrary
  )
}

/**
 * Hook to load Google Maps JavaScript API script
 * Uses callback pattern for reliable load detection and handles race conditions
 */
export function useGoogleMapsScript({
  apiKey,
  enabled,
}: UseGoogleMapsScriptOptions): UseGoogleMapsScriptResult {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const mountedRef = useRef(true)
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Cleanup polling interval
  const clearPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
      pollIntervalRef.current = null
    }
  }, [])

  // Poll for Google Maps readiness (handles async loading race condition)
  const startPolling = useCallback(() => {
    clearPolling()

    let attempts = 0
    const maxAttempts = 50 // 5 seconds max (100ms * 50)

    pollIntervalRef.current = setInterval(() => {
      attempts++

      if (isGoogleMapsReady()) {
        clearPolling()
        if (mountedRef.current) {
          setIsLoaded(true)
          setIsLoading(false)
        }
        return
      }

      if (attempts >= maxAttempts) {
        clearPolling()
        if (mountedRef.current) {
          console.error('[GoogleMaps] API failed to initialize after script load')
          setLoadError(true)
          setIsLoading(false)
        }
      }
    }, 100)
  }, [clearPolling])

  useEffect(() => {
    mountedRef.current = true

    if (!enabled || typeof window === 'undefined') {
      return
    }

    // Already loaded - mark as ready immediately
    if (isGoogleMapsReady()) {
      setIsLoaded(true)
      return
    }

    setIsLoading(true)

    const existingScript = document.getElementById(MAPS_SCRIPT_ID) as HTMLScriptElement | null

    // Script exists but API not ready - could be loading or failed
    if (existingScript) {
      // Check if script finished loading (via callback or polling)
      if (isGoogleMapsReady()) {
        setIsLoaded(true)
        setIsLoading(false)
        return
      }

      // Script exists but still loading - start polling
      startPolling()

      // Also listen for error in case script fails
      const handleError = () => {
        clearPolling()
        if (mountedRef.current) {
          setLoadError(true)
          setIsLoading(false)
        }
      }

      existingScript.addEventListener('error', handleError)

      return () => {
        existingScript.removeEventListener('error', handleError)
        clearPolling()
        mountedRef.current = false
      }
    }

    // Set up global callback for reliable load detection
    const callbackName = MAPS_CALLBACK_NAME
    ;(window as unknown as Record<string, () => void>)[callbackName] = () => {
      clearPolling()
      if (mountedRef.current) {
        setIsLoaded(true)
        setIsLoading(false)
      }
      // Cleanup callback
      delete (window as unknown as Record<string, unknown>)[callbackName]
    }

    // Create and inject script with callback
    const script = document.createElement('script')
    script.id = MAPS_SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=weekly&loading=async&callback=${callbackName}`
    script.async = true
    script.defer = true

    const handleError = () => {
      clearPolling()
      if (mountedRef.current) {
        console.error('[GoogleMaps] Script failed to load')
        setLoadError(true)
        setIsLoading(false)
      }
      // Cleanup callback
      delete (window as unknown as Record<string, unknown>)[callbackName]
    }

    script.addEventListener('error', handleError)

    // Start polling as backup (in case callback doesn't fire)
    startPolling()

    document.head.appendChild(script)

    return () => {
      script.removeEventListener('error', handleError)
      clearPolling()
      mountedRef.current = false
      // Cleanup callback if still exists
      delete (window as unknown as Record<string, unknown>)[callbackName]
    }
  }, [apiKey, enabled, startPolling, clearPolling])

  return { isLoaded, loadError, isLoading }
}
