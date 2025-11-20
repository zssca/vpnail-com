import * as React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rating value (0-5)
   */
  rating: number
  /**
   * Size of stars: sm (16px), md (20px), lg (24px)
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether to show the numeric rating value
   */
  showRating?: boolean
  /**
   * Custom aria-label for accessibility
   */
  ariaLabel?: string
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

/**
 * Star Rating Component
 * Displays a visual star rating using CSS variables for color
 * Supports partial ratings and different sizes
 * Uses semantic color variables (fill-star, text-star)
 *
 * @example
 * <StarRating rating={4} size="md" showRating />
 * <StarRating rating={3.5} size="lg" />
 */
export const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  (
    {
      rating,
      size = 'md',
      showRating = false,
      ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClass = sizeMap[size]
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - Math.ceil(rating)

    const ariaLabelText =
      ariaLabel || `Rating: ${rating} out of 5 stars`

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1.5', className)}
        role="img"
        aria-label={ariaLabelText}
        {...props}
      >
        <div className="flex items-center gap-0.5">
          {/* Full Stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star
              key={`full-${i}`}
              className={cn(
                sizeClass,
                'fill-[hsl(var(--star-fill))] text-[hsl(var(--star-fill))]'
              )}
              aria-hidden="true"
            />
          ))}

          {/* Half Star */}
          {hasHalfStar && (
            <div
              key="half"
              className="relative"
              aria-hidden="true"
            >
              <Star
                className={cn(
                  sizeClass,
                  'text-[hsl(var(--star-empty))]'
                )}
              />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star
                  className={cn(
                    sizeClass,
                    'fill-[hsl(var(--star-fill))] text-[hsl(var(--star-fill))]'
                  )}
                />
              </div>
            </div>
          )}

          {/* Empty Stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star
              key={`empty-${i}`}
              className={cn(
                sizeClass,
                'text-[hsl(var(--star-empty))]'
              )}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Rating Value */}
        {showRating && (
          <span
            className="text-sm font-semibold text-foreground ml-1"
            aria-hidden="true"
          >
            {rating}
          </span>
        )}
      </div>
    )
  }
)

StarRating.displayName = 'StarRating'

export default StarRating
