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
          'flex flex-col h-full border hover:border-primary/50 transition-all duration-200 overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Badge */}
        {badge && (
          <div className="px-6 pt-6 pb-0">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {badge}
            </span>
          </div>
        )}

        {/* Header - Title & Price */}
        <CardHeader className="flex items-start justify-between gap-3 pb-2">
          {/* Service Info */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-xs leading-snug mt-1">
                {description}
              </CardDescription>
            )}
          </div>

          {/* Price & Duration Badge */}
          <div className="flex-shrink-0">
            <div className="flex flex-col items-end bg-primary/10 px-2.5 py-1.5 rounded-md">
              <span className="text-base font-bold text-primary whitespace-nowrap leading-none">
                {price}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                <span className="whitespace-nowrap">{duration}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* CTA Button */}
        <CardContent className="flex-1 flex items-end pt-0">
          <Button asChild size="sm" className="w-full">
            <Link
              {...linkProps}
              className="flex items-center justify-center gap-1.5"
            >
              <span className="font-medium">{ctaText}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
)

ServiceCard.displayName = 'ServiceCard'

export default ServiceCard
