import { cn } from '@/lib/utils'

type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
  variant?: 'default' | 'muted' | 'muted-light' | 'primary' | 'primary-light' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: '',
  muted: 'bg-muted',
  'muted-light': 'bg-muted/30',
  primary: 'bg-primary',
  'primary-light': 'bg-primary/5',
  accent: 'bg-accent/10',
}

const sizeStyles = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-24',
}

export function Section({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'w-full',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
