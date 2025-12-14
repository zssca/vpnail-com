import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from '@/lib/config/site.config';

const siteUrl = new URL(siteConfig.url);
const canonicalHostname = siteUrl.hostname.toLowerCase();
const bareHostname = canonicalHostname.replace(/^www\./, '');
const localLikeHosts = new Set(['localhost', '127.0.0.1']);

/**
 * Rate limiting for contact form submissions at the edge
 * Note: Resets on deployment. For distributed rate limiting, use Vercel KV or Upstash.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 requests per hour per IP for POST requests
};

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1 };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - record.count };
}

/**
 * Block common attack patterns
 */
const SUSPICIOUS_PATTERNS = [
  /\.\.\//, // Path traversal
  /<script/i, // XSS attempts
  /union.*select/i, // SQL injection
  /eval\s*\(/i, // Code injection
  /javascript:/i, // JavaScript protocol
  /on\w+\s*=/i, // Event handlers
];

function isSuspiciousRequest(url: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(url));
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = url.hostname.toLowerCase();
  const isLocalLikeHost = localLikeHosts.has(hostname) || hostname.endsWith('.vercel.app');

  // Get client IP for rate limiting
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'anonymous';

  // Block suspicious requests (attack patterns)
  const fullUrl = request.url + (request.nextUrl.search || '');
  if (isSuspiciousRequest(fullUrl)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Rate limit POST requests (contact form, etc.)
  if (request.method === 'POST') {
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '3600',
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }
  }

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
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://tagmanager.google.com https://maps.googleapis.com https://maps.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://tagmanager.google.com https://api.web3forms.com https://maps.googleapis.com https://maps.gstatic.com",
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
