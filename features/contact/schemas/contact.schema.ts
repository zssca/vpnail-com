import { z } from 'zod'

/**
 * Contact Form Validation Schema
 *
 * Validates contact form submissions using Zod
 * Used by both client-side validation and server-side validation in Server Action
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Invalid email address')
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
      { message: 'Phone number must be 10 digits' }
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
