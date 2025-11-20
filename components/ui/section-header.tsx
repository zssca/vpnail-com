import * as React from 'react'
import { cn } from '@/lib/utils'
import { Small, H2, Lead } from './typography'
import { Badge, badgeVariants } from './badge'
import { type VariantProps } from 'class-variance-authority'

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Subtitle displayed in Small uppercase text with tracking
   * @required
   */
  subtitle: React.ReactNode
  /**
   * Main heading displayed in H2
   * @required
   */
  title: React.ReactNode
  /**
   * Description displayed in Lead text
   */
  description?: React.ReactNode
  /**
   * Optional badge content and variant
   */
  badge?: {
    content: React.ReactNode
    variant?: VariantProps<typeof badgeVariants>['variant']
  }
  /**
   * Center align the header (default: true)
   */
  centered?: boolean
  /**
   * Maximum width container for centered headers
   */
  maxWidth?: 'sm' | 'md' | 'lg'
  /**
   * Additional spacing below header
   */
  spacing?: 'default' | 'compact' | 'relaxed'
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

const spacingMap = {
  default: 'mb-12',
  compact: 'mb-8',
  relaxed: 'mb-16',
}

/**
 * Section Header Component
 * Standardizes the Small + H2 + Lead pattern used across multiple sections
 * Provides consistent spacing, alignment, and optional badge
 * 
 * Used in 8+ sections (home/testimonials, services, contact, etc.)
 * Reduces duplication and ensures visual consistency
 *
 * @example
 * <SectionHeader
 *   subtitle="CUSTOMER TESTIMONIALS"
 *   title="What Our Clients Say"
 *   description="Real feedback from satisfied customers"
 *   centered
 * />
 *
 * @example
 * <SectionHeader
 *   subtitle="OUR SERVICES"
 *   title="Professional Beauty Services"
 *   badge={{ content: 'New', variant: 'default' }}
 *   centered
 *   maxWidth="lg"
 *   spacing="relaxed"
 * />
 */
export const SectionHeader = React.forwardRef<
  HTMLDivElement,
  SectionHeaderProps
>(
  (
    {
      subtitle,
      title,
      description,
      badge,
      centered = true,
      maxWidth = 'lg',
      spacing = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const containerClasses = cn(
      centered && 'text-center',
      centered && maxWidthMap[maxWidth] && 'mx-auto',
      spacingMap[spacing],
      className
    )

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div className="space-y-4">
          {/* Badge (optional) */}
          {badge && (
            <Badge
              variant={badge.variant}
              className="w-fit mx-auto py-2 px-4 bg-primary/5 text-primary border-primary/20"
            >
              <Small className="text-primary font-semibold tracking-wide uppercase">
                {badge.content}
              </Small>
            </Badge>
          )}

          {/* Subtitle */}
          <Small className="text-primary uppercase tracking-[0.3em] block">
            {subtitle}
          </Small>

          {/* Title */}
          <H2>{title}</H2>

          {/* Description */}
          {description && (
            <Lead>{description}</Lead>
          )}
        </div>
      </div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'

export default SectionHeader
