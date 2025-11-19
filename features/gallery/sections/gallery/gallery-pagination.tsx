import type { MouseEvent } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

interface GalleryPaginationProps {
  activePage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function GalleryPagination({ activePage, totalPages, onPageChange }: GalleryPaginationProps) {
  if (totalPages <= 1) return null

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
  const disablePrevious = activePage === 1
  const disableNext = activePage === totalPages
  const getPageHref = (page: number) => `/gallery?page=${page}`
  const previousPageHref = getPageHref(Math.max(activePage - 1, 1))
  const nextPageHref = getPageHref(Math.min(activePage + 1, totalPages))

  const handlePrevious = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (!disablePrevious) {
      onPageChange(activePage - 1)
    }
  }

  const handleNext = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (!disableNext) {
      onPageChange(activePage + 1)
    }
  }

  return (
    <Pagination className="mt-10 flex-col items-center gap-4">
      <PaginationContent className="flex flex-wrap items-center justify-center gap-3">
        <PaginationItem>
          <PaginationPrevious
            href={previousPageHref}
            onClick={handlePrevious}
            aria-disabled={disablePrevious}
            className={cn(disablePrevious && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={getPageHref(pageNumber)}
              isActive={pageNumber === activePage}
              size="default"
              className="min-w-10 justify-center"
              onClick={(event) => {
                event.preventDefault()
                if (pageNumber !== activePage) {
                  onPageChange(pageNumber)
                }
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={nextPageHref}
            onClick={handleNext}
            aria-disabled={disableNext}
            className={cn(disableNext && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
