import * as React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
  name: string
  role?: string
  date?: string
  avatarUrl?: string
  avatarFallback?: string
}

export const TestimonialCard = React.forwardRef<
  HTMLDivElement,
  TestimonialCardProps
>(
  (
    {
      content,
      name,
      role,
      date,
      avatarUrl,
      avatarFallback,
      className,
      ...props
    },
    ref
  ) => {
    const initials =
      avatarFallback ||
      name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    return (
      <Card
        ref={ref}
        className={cn('h-full flex flex-col', className)}
        {...props}
      >
        <CardHeader>
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
              <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight truncate">
                {name}
              </p>
              {role && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {role}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Image
              src="/google-logo.svg"
              alt="Google"
              width={16}
              height={16}
              className="shrink-0"
            />
            <div className="flex items-center gap-0.5" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  fill="currentColor"
                  className="size-3.5 text-amber-500"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {date && (
            <CardAction>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {date}
              </span>
            </CardAction>
          )}
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        </CardContent>
      </Card>
    )
  }
)

TestimonialCard.displayName = 'TestimonialCard'

export default TestimonialCard
