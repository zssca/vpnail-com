/**
 * Centralized route constants for the application
 * All application routes should be defined here
 */

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  ARTICLES: '/articles',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  PARKING: '/parking',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  ACCESSIBILITY: '/accessibility',
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteValue = typeof ROUTES[RouteKey]
