import type { NextConfig } from 'next'
import { siteConfig } from './lib/config/site.config'

const siteHostname = new URL(siteConfig.url).hostname
const bareHostname = siteHostname.replace(/^www\./, '')

const allowedActionOrigins = Array.from(
  new Set([siteHostname, bareHostname, 'localhost:3000', '127.0.0.1:3000']),
)

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://tagmanager.google.com https://*.googleapis.com https://*.gstatic.com *.google.com blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com *.google.com *.googleusercontent.com https://*.ggpht.com https: http:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://tagmanager.google.com https://api.web3forms.com https://*.googleapis.com https://*.gstatic.com *.google.com data: blob:",
  "frame-src 'self' *.google.com https://www.googletagmanager.com https://tagmanager.google.com",
  "worker-src blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=(), accelerometer=(), gyroscope=(), magnetometer=(), payment=()' },
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
]

const staticAssetCache = { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    serverActions: {
      allowedOrigins: allowedActionOrigins,
    },
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/assets/:path*',
        headers: [staticAssetCache],
      },
      {
        source: '/_next/image/:path*',
        headers: [staticAssetCache],
      },
      {
        source: '/_next/static/:path*',
        headers: [staticAssetCache],
      },
      {
        source: '/favicons/browserconfig.xml',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
  async redirects() {
    const canonicalDomain = siteConfig.url.replace(/\/+$/, '')

    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: bareHostname }],
        destination: `${canonicalDomain}/:path*`,
        permanent: true,
      },
      {
        source: '/services/',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/gallery/',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/consultation',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/consultation/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/parking/',
        destination: '/parking',
        permanent: true,
      },
      {
        source: '/offers',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/offers/',
        destination: '/services',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
