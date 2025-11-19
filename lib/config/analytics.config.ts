// Google Tag Manager (GTM) configuration
const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? ''
const dataLayerName = 'dataLayer'
const allowInDevelopment = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'

const isProduction = process.env.NODE_ENV === 'production'
const shouldLoadAnalytics = Boolean(gtmId) && (isProduction || allowInDevelopment)

export const analyticsConfig = {
  gtmId,
  dataLayerName,
  allowInDevelopment,
  isProduction,
  shouldLoadAnalytics,
} as const

export type AnalyticsConfig = typeof analyticsConfig
