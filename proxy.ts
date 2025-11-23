import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from '@/lib/config/site.config';

const siteUrl = new URL(siteConfig.url);
const canonicalHostname = siteUrl.hostname.toLowerCase();
const bareHostname = canonicalHostname.replace(/^www\./, '');
const localLikeHosts = new Set(['localhost', '127.0.0.1']);

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = url.hostname.toLowerCase();
  const isLocalLikeHost = localLikeHosts.has(hostname) || hostname.endsWith('.vercel.app');

  if (!isLocalLikeHost) {
    const forwardedProto = request.headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '');

    // Enforce HTTPS
    if (forwardedProto !== 'https') {
      url.protocol = 'https:';
      return NextResponse.redirect(url, 308);
    }

    // Canonical host redirect to www.vpnail.com
    if (hostname === bareHostname) {
      url.hostname = canonicalHostname;
      return NextResponse.redirect(url, 308);
    }

    // Trim trailing slash (except for root path)
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.replace(/\/+$/, '');
      return NextResponse.redirect(url, 308);
    }
  }

  // Handle plural to singular redirects
  if (request.nextUrl.pathname === '/consultations') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/consultation';
    return NextResponse.redirect(redirectUrl, 308);
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), browsing-topics=()');

  // Content Security Policy - mirror next.config.ts for consistency
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://tagmanager.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://tagmanager.google.com https://api.web3forms.com",
    "frame-src 'self' https://www.google.com https://www.googletagmanager.com https://tagmanager.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://api.web3forms.com",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Performance headers
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store');
  } else if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (request.nextUrl.pathname.match(/\.(css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
