import { useEffect, useState } from 'react'
import { MAPS_SCRIPT_ID } from './config'

interface UseGoogleMapsScriptOptions {
  apiKey: string
  enabled: boolean
}

interface UseGoogleMapsScriptResult {
  isLoaded: boolean
  loadError: boolean
}

/**
 * Hook to load Google Maps JavaScript API script
 * Handles script injection, loading state, and error handling
 */
export function useGoogleMapsScript({
  apiKey,
  enabled,
}: UseGoogleMapsScriptOptions): UseGoogleMapsScriptResult {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return
    }

    // If already loaded, mark as loaded immediately
    if (window.google?.maps) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true)
      return
    }

    const existingScript = document.getElementById(MAPS_SCRIPT_ID) as HTMLScriptElement | null

    // If script is already in DOM, wait for it to load
    if (existingScript) {
      const handleLoad = () => setIsLoaded(true)
      const handleError = () => setLoadError(true)

      existingScript.addEventListener('load', handleLoad)
      existingScript.addEventListener('error', handleError)

      return () => {
        existingScript.removeEventListener('load', handleLoad)
        existingScript.removeEventListener('error', handleError)
      }
    }

    // Create and inject new script
    const script = document.createElement('script')
    script.id = MAPS_SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=weekly&loading=async`
    script.async = true
    script.defer = true

    const handleLoad = () => setIsLoaded(true)
    const handleError = () => setLoadError(true)

    script.addEventListener('load', handleLoad)
    script.addEventListener('error', handleError)

    document.head.appendChild(script)

    return () => {
      script.removeEventListener('load', handleLoad)
      script.removeEventListener('error', handleError)
    }
  }, [apiKey, enabled])

  return { isLoaded, loadError }
}
