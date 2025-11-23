import * as React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

/**
 * Skeleton Loader Components
 * Predefined skeleton patterns matching component layouts
 */

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
}

/**
 * Service Card Skeleton
 */
export const ServiceCardSkeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonLoaderProps
>(({ count = 3, className, ...props }, ref) => (
  <div ref={ref} className={cn('grid grid-cols-1 lg:grid-cols-2 gap-4', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex flex-col gap-4 p-5 border rounded-xl">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex justify-end">
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-9 w-full mt-2" />
      </div>
    ))}
  </div>
))
ServiceCardSkeleton.displayName = 'ServiceCardSkeleton'

/**
 * Testimonial Card Skeleton
 */
export const TestimonialCardSkeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonLoaderProps
>(({ count = 3, className, ...props }, ref) => (
  <div ref={ref} className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex flex-col gap-3 p-5 border rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-4 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <div className="border-t my-2" />
        <div className="flex gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
))
TestimonialCardSkeleton.displayName = 'TestimonialCardSkeleton'

/**
 * Section Header Skeleton
 */
export const SectionHeaderSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-center space-y-4 mb-12 max-w-2xl mx-auto', className)} {...props}>
    <Skeleton className="h-8 w-32 mx-auto" />
    <Skeleton className="h-4 w-40 mx-auto" />
    <Skeleton className="h-8 w-2/3 mx-auto" />
    <Skeleton className="h-8 w-1/2 mx-auto" />
    <Skeleton className="h-4 w-full mx-auto mt-4" />
    <Skeleton className="h-4 w-5/6 mx-auto" />
  </div>
))
SectionHeaderSkeleton.displayName = 'SectionHeaderSkeleton'

/**
 * Hero Section Skeleton
 */
export const HeroSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-12 items-center', className)} {...props}>
    <div className="space-y-6">
      <Skeleton className="h-8 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
    <Skeleton className="aspect-[3/2] rounded-lg" />
  </div>
))
HeroSkeleton.displayName = 'HeroSkeleton'

/**
 * List Item Skeleton
 */
export const ListItemSkeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonLoaderProps
>(({ count = 5, className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-3', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex gap-3 p-4 border rounded-lg">
        <Skeleton className="h-12 w-12 rounded-md shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    ))}
  </div>
))
ListItemSkeleton.displayName = 'ListItemSkeleton'

/**
 * Grid Skeleton
 */
export const GridSkeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonLoaderProps & { columns?: number }
>(({ count = 9, columns = 3, className, ...props }, ref) => (
  <div ref={ref} className={cn('grid gap-4', columns === 2 && 'grid-cols-1 md:grid-cols-2', columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
      </div>
    ))}
  </div>
))
GridSkeleton.displayName = 'GridSkeleton'

/**
 * Form Skeleton
 */
export const FormSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-6', className)} {...props}>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-10 w-full" />
  </div>
))
FormSkeleton.displayName = 'FormSkeleton'

/**
 * Page Header Skeleton
 */
export const PageHeaderSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-4 mb-8', className)} {...props}>
    <Skeleton className="h-10 w-1/3" />
    <Skeleton className="h-4 w-2/3" />
  </div>
))
PageHeaderSkeleton.displayName = 'PageHeaderSkeleton'

/**
 * Image Skeleton - Aspect Ratio Preserved
 */
export const ImageSkeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonLoaderProps & { aspectRatio?: 'square' | '3/2' | '16/9' | '4/3' }
>(({ aspectRatio = '3/2', className, ...props }, ref) => (
  <Skeleton
    ref={ref}
    className={cn(
      'rounded-lg',
      aspectRatio === 'square' && 'aspect-square',
      aspectRatio === '3/2' && 'aspect-[3/2]',
      aspectRatio === '16/9' && 'aspect-video',
      aspectRatio === '4/3' && 'aspect-[4/3]',
      className
    )}
    {...props}
  />
))
ImageSkeleton.displayName = 'ImageSkeleton'

/**
 * Card Skeleton - Generic Card Layout
 */
export const CardSkeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonLoaderProps
>(({ count = 3, className, ...props }, ref) => (
  <div ref={ref} className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-4 p-4 border rounded-lg">
        <Skeleton className="aspect-[3/2] rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))}
  </div>
))
CardSkeleton.displayName = 'CardSkeleton'

/**
 * Article Skeleton - Blog Post Layout
 */
export const ArticleSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article ref={ref} className={cn('space-y-6 max-w-4xl', className)} {...props}>
    <Skeleton className="aspect-video rounded-lg mb-8" />
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <div className="flex gap-3 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
      <Skeleton className="h-4 w-5/6" />
    </div>
  </article>
))
ArticleSkeleton.displayName = 'ArticleSkeleton'

/**
 * Table Skeleton
 */
export const TableSkeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonLoaderProps & { rows?: number; columns?: number }
>(({ count = 5, rows = count, columns = 4, className, ...props }, ref) => (
  <div ref={ref} className={cn('overflow-x-auto', className)} {...props}>
    <div className="min-w-full border rounded-lg">
      {/* Table Header */}
      <div className="flex border-b bg-muted/50 p-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-24 flex-1" />
        ))}
      </div>
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex border-b p-4 last:border-b-0">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={colIdx} className="h-4 w-16 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
))
TableSkeleton.displayName = 'TableSkeleton'

/**
 * Profile Skeleton - Avatar + Info Layout
 */
export const ProfileSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex gap-4 items-start', className)} {...props}>
    <Skeleton className="h-16 w-16 rounded-full shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-40" />
    </div>
  </div>
))
ProfileSkeleton.displayName = 'ProfileSkeleton'
