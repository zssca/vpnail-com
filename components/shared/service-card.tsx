import * as React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Service name/title
   */
  title: string
  /**
   * Brief description of the service
   */
  description?: string
  /**
   * Price display (e.g., "$50+", "$80-120")
   */
  price: string
  /**
   * Duration display (e.g., "30 min", "1 hour")
   */
  duration: string
  /**
   * URL to booking page
   */
  href: string
  /**
   * Whether the link opens in a new tab
   */
  external?: boolean
  /**
   * CTA button text
   * @default "Book Now"
   */
  ctaText?: string
  /**
   * Additional metadata or badge content
   */
  badge?: string
}

/**
 * Service Card Component
 * Standardized card for displaying service information
 * Includes pricing, duration, description, and booking CTA
 * 
 * Used in services grid to ensure visual consistency
 * Replaces hand-rolled service card implementations across the app
 *
 * @example
 * <ServiceCard
 *   title="Classic Manicure"
 *   description="Professional manicure with polish"
 *   price="$35"
 *   duration="45 min"
 *   href="https://booking.example.com/manicure"
 *   external
 * />
 *
 * @example
 * <ServiceCard
 *   title="Gel Manicure"
 *   description="Long-lasting gel polish application"
 *   price="$50+"
 *   duration="1 hour"
 *   href="/services/gel-manicure"
 *   badge="Popular"
 *   ctaText="Book This Service"
 * />
 */
export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      title,
      description,
      price,
      duration,
      href,
      external = false,
      ctaText = 'Book Now',
      badge,
      className,
      ...props
    },
    ref
  ) => {
    const linkProps = external
      ? {
          href,
          target: '_blank' as const,
          rel: 'noopener noreferrer',
        }
      : { href }

    return (
      <Card
        ref={ref}
        className={cn(
          'flex flex-col gap-4 p-4 hover:border-primary/50 transition-all duration-200 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
        {...props}
      >
        {/* Badge */}
        {badge && (
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {badge}
            </span>
          </div>
        )}

        {/* Header - Title & Price */}
        <div className="flex items-start justify-between gap-3">
          {/* Service Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold leading-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground leading-snug mt-1">
                {description}
              </p>
            )}
          </div>

          {/* Price & Duration Badge */}
          <div className="flex-shrink-0">
            <div className="flex flex-col items-end bg-primary px-3 py-1.5 rounded-md gap-0.5">
              <span className="text-base font-bold text-primary-foreground whitespace-nowrap leading-none">
                {price}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-primary-foreground/80 mt-0.5">
                <Clock className="h-3 w-3" />
                <span className="whitespace-nowrap">{duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button asChild size="sm" variant="outline" className="w-full" aria-label={`Book ${title}`}>
          <Link
            {...linkProps}
            className="flex items-center justify-center gap-1.5 focus-visible:outline-none"
          >
            <span className="font-medium">{ctaText}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </Card>
    )
  }
)

ServiceCard.displayName = 'ServiceCard'

export default ServiceCard
