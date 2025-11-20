import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StarRating } from '@/components/ui/star-rating'

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Star rating (1-5)
   */
  rating: number
  /**
   * Customer testimonial text
   */
  content: string
  /**
   * Customer name
   */
  name: string
  /**
   * Customer title or role (optional)
   * @example "Regular Customer", "Salon Manager"
   */
  role?: string
  /**
   * Publication/review date
   */
  date?: string
  /**
   * Customer avatar URL
   */
  avatarUrl?: string
  /**
   * Custom avatar fallback (initials)
   * Auto-generated from name if not provided
   */
  avatarFallback?: string
  /**
   * Whether to show the rating value
   */
  showRatingValue?: boolean
  /**
   * Whether the card should be interactive/elevated
   */
  interactive?: boolean
}

/**
 * Testimonial Card Component
 * Standardized testimonial/review display
 * Includes star rating, content, author info, and date
 * 
 * Used in testimonials sections across multiple pages
 * Replaces repeated Card + Star + Avatar compositions
 *
 * @example
 * <TestimonialCard
 *   rating={5}
 *   content="Amazing service and professional staff! The best salon in Calgary."
 *   name="Sarah Johnson"
 *   role="Regular Customer"
 *   date="2 weeks ago"
 *   avatarUrl="/avatars/sarah.jpg"
 * />
 *
 * @example
 * <TestimonialCard
 *   rating={4.5}
 *   content="Great experience, will definitely come back!"
 *   name="Michael Chen"
 *   showRatingValue
 *   interactive
 * />
 */
export const TestimonialCard = React.forwardRef<
  HTMLDivElement,
  TestimonialCardProps
>(
  (
    {
      rating,
      content,
      name,
      role,
      date,
      avatarUrl,
      avatarFallback,
      showRatingValue = false,
      interactive = false,
      className,
      ...props
    },
    ref
  ) => {
    // Auto-generate avatar fallback from name if not provided
    const initials =
      avatarFallback ||
      name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()

    return (
      <Card
        ref={ref}
        className={cn(
          'flex flex-col h-full p-5',
          interactive && 'hover:shadow-lg hover:border-primary/50 transition-all duration-200',
          className
        )}
        {...props}
      >
        {/* Star Rating & Date Header */}
        <CardHeader className="p-0 pb-3 flex items-start justify-between">
          <div className="flex items-center gap-1">
            <StarRating
              rating={rating}
              size="sm"
              showRating={showRatingValue}
              ariaLabel={`Rating: ${rating} out of 5 stars`}
            />
          </div>
          {date && (
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {date}
            </span>
          )}
        </CardHeader>

        {/* Testimonial Content */}
        <CardContent className="flex-1 p-0 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        </CardContent>

        {/* Author Info Footer */}
        <CardFooter className="p-0 pt-3 border-t">
          <div className="flex items-center gap-3 w-full">
            <Avatar className="h-9 w-9 shrink-0">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight truncate">
                {name}
              </p>
              {role && (
                <p className="text-xs text-muted-foreground truncate">
                  {role}
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    )
  }
)

TestimonialCard.displayName = 'TestimonialCard'

export default TestimonialCard
