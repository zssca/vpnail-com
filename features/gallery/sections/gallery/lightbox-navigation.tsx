interface NavigationButtonProps {
  direction: 'previous' | 'next'
  canNavigate: boolean
  onNavigate: () => void
}

export function NavigationButton({ direction, canNavigate, onNavigate }: NavigationButtonProps) {
  const isPrevious = direction === 'previous'
  const label = isPrevious ? 'Previous image' : 'Next image'
  const noLabel = isPrevious ? 'No previous image' : 'No next image'

  return (
    <div
      className={`absolute ${isPrevious ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transform p-4 text-white/40 transition-colors ${
        canNavigate ? 'cursor-pointer hover:text-white/80' : 'cursor-not-allowed opacity-25'
      }`}
      onClick={onNavigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNavigate()
        }
      }}
      role="button"
      tabIndex={canNavigate ? 0 : -1}
      aria-label={canNavigate ? label : noLabel}
    >
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isPrevious ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </div>
  )
}

interface LightboxNavigationProps {
  currentIndex: number
  totalImages: number
  canNavigatePrevious: boolean
  canNavigateNext: boolean
  onNavigatePrevious: () => void
  onNavigateNext: () => void
}

export function LightboxNavigation({
  currentIndex,
  totalImages,
  canNavigatePrevious,
  canNavigateNext,
  onNavigatePrevious,
  onNavigateNext,
}: LightboxNavigationProps) {
  if (totalImages <= 1) return null

  return (
    <>
      {/* Image counter badge */}
      <div className="absolute right-4 top-4 rounded bg-black/50 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Navigation buttons */}
      <NavigationButton
        direction="previous"
        canNavigate={canNavigatePrevious}
        onNavigate={onNavigatePrevious}
      />
      <NavigationButton
        direction="next"
        canNavigate={canNavigateNext}
        onNavigate={onNavigateNext}
      />
    </>
  )
}
