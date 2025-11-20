import { z } from 'zod'

/**
 * Contact Form Validation Schema
 *
 * Consolidates all contact form validation using Zod
 * Used by both client-side validation (React Hook Form) and server-side validation
 */

// Phone number formatter utility
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, '')

  // Format as (XXX) XXX-XXXX
  if (phoneNumber.length <= 3) {
    return phoneNumber
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }
}

// Available service options
export const SERVICE_OPTIONS = [
  'Manicures',
  'Pedicures',
  'Nail Extensions',
  'Nail Art',
  'Massage',
  'Waxing',
  'Other',
] as const

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true // Optional field
        const phoneDigits = val.replace(/\D/g, '')
        return phoneDigits.length === 10
      },
      { message: 'Please enter a valid 10-digit phone number' }
    ),
  service: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true // Optional field
        return SERVICE_OPTIONS.includes(val as typeof SERVICE_OPTIONS[number])
      },
      { message: 'Please select a valid service' }
    ),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
  // Honeypot field for spam protection - should always be empty
  website: z
    .string()
    .max(0, 'Invalid submission')
    .optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
