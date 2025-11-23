import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type SemanticColor = 'success' | 'warning' | 'error' | 'info' | 'primary'

interface IconColoredProps extends React.SVGAttributes<SVGElement> {
  /**
   * Lucide icon component
   */
  icon: LucideIcon
  /**
   * Semantic color variant
   * - success: Green (HSL var --color-success)
   * - warning: Amber (HSL var --color-warning)
   * - error: Red (HSL var --color-error)
   * - info: Blue (HSL var --color-info)
   * - primary: Brand color (HSL var --color-primary)
   */
  color?: SemanticColor
  /**
   * Size of the icon in pixels
   * @default 24
   */
  size?: number
  /**
   * Icon variants: only-fill, only-outline, both
   * both = filled background with outlined icon
   */
  variant?: 'only-fill' | 'only-outline' | 'both'
}

const colorMap: Record<SemanticColor, string> = {
  success: 'text-[oklch(var(--color-success))] fill-[oklch(var(--color-success))]',
  warning: 'text-[oklch(var(--color-warning))] fill-[oklch(var(--color-warning))]',
  error: 'text-[oklch(var(--color-error))] fill-[oklch(var(--color-error))]',
  info: 'text-[oklch(var(--color-info))] fill-[oklch(var(--color-info))]',
  primary: 'text-[oklch(var(--color-primary))] fill-[oklch(var(--color-primary))]',
}

const bgColorMap: Record<SemanticColor, string> = {
  success: 'bg-[oklch(var(--color-success)/0.1)]',
  warning: 'bg-[oklch(var(--color-warning)/0.1)]',
  error: 'bg-[oklch(var(--color-error)/0.1)]',
  info: 'bg-[oklch(var(--color-info)/0.1)]',
  primary: 'bg-[oklch(var(--color-primary)/0.1)]',
}

/**
 * Icon Colored Component
 * Utility for displaying semantic colored icons using CSS variables
 * Supports different color semantics: success, warning, error, info, primary
 * 
 * Variants:
 * - only-fill: Icon with fill color only
 * - only-outline: Icon outline only (no background)
 * - both: Icon in a colored background container
 *
 * @example
 * <IconColored icon={CheckCircle} color="success" size={32} variant="both" />
 * <IconColored icon={AlertCircle} color="warning" size={24} />
 * <IconColored icon={AlertTriangle} color="error" variant="only-fill" />
 */
export const IconColored = React.forwardRef<
  SVGSVGElement,
  IconColoredProps
>(
  (
    {
      icon: Icon,
      color = 'primary',
      size = 24,
      variant = 'only-fill',
      className,
      ...props
    },
    ref
  ) => {
    const colorClasses = colorMap[color]

    // Only fill variant
    if (variant === 'only-fill') {
      return (
        <Icon
          ref={ref}
          size={size}
          className={cn(colorClasses, className)}
          {...props}
          aria-hidden="true"
        />
      )
    }

    // Only outline variant
    if (variant === 'only-outline') {
      return (
        <Icon
          ref={ref}
          size={size}
          className={cn(
            colorClasses,
            'fill-none',
            className
          )}
          strokeWidth={2}
          {...props}
          aria-hidden="true"
        />
      )
    }

    // Both variant (icon in background container)
    const bgClasses = bgColorMap[color]
    const padding = size <= 20 ? 'p-2' : size <= 24 ? 'p-2.5' : 'p-3'

    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-lg',
          bgClasses,
          padding,
          className
        )}
        aria-hidden="true"
      >
        <Icon
          ref={ref}
          size={size}
          className={colorClasses}
          {...props}
        />
      </div>
    )
  }
)

IconColored.displayName = 'IconColored'

export default IconColored
