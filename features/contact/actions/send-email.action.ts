'use server'

import { headers } from 'next/headers'
import { contactFormSchema, type ContactFormData } from '../schemas/contact.schema'
import { sendContactFormEmail } from '@/lib/email'

type ActionResponse = {
  success: boolean
  error?: string
  emailId?: string
}

/**
 * Simple in-memory rate limiter for server actions
 * Note: Resets on deployment. For distributed rate limiting, use Vercel KV or Upstash.
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 60 * 1000, // 1 hour window
  maxRequests: 5, // Max 5 submissions per hour per IP
}

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  // Clean up old entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_CONFIG.windowMs })
    return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - 1 }
  }

  if (record.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - record.count }
}

/**
 * Send Contact Email Server Action
 *
 * Validates form data and sends email via Resend
 * Includes rate limiting and spam protection
 * Used by contact form component
 */
export async function sendContactEmail(data: ContactFormData): Promise<ActionResponse> {
  try {
    // Get client IP for rate limiting
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() ?? headersList.get('x-real-ip') ?? 'anonymous'

    // Check rate limit
    const { allowed } = checkRateLimit(ip)
    if (!allowed) {
      return {
        success: false,
        error: 'Too many submissions. Please try again in an hour.',
      }
    }

    // Validate data with Zod schema
    const validatedData = contactFormSchema.parse(data)

    // Check honeypot field (spam protection)
    if (validatedData.website && validatedData.website.length > 0) {
      // Silently reject spam but return success to not tip off bots
      console.warn('Honeypot triggered from IP:', ip)
      return { success: true }
    }

    // Send email using existing email utility
    const result = await sendContactFormEmail({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
    })

    return {
      success: true,
      emailId: result.emailId,
    }
  } catch (error) {
    console.error('Contact form server action error:', error)

    // Return user-friendly error message
    if (error instanceof Error && error.message.includes('validation')) {
      return {
        success: false,
        error: 'Invalid form data. Please check your inputs.',
      }
    }

    return {
      success: false,
      error: 'Failed to send message. Please try again later.',
    }
  }
}
