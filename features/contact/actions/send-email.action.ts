'use server'

import { contactFormSchema, type ContactFormData } from '../schemas/contact.schema'
import { sendContactFormEmail } from '@/lib/email'

type ActionResponse = {
  success: boolean
  error?: string
  emailId?: string
}

/**
 * Send Contact Email Server Action
 *
 * Validates form data and sends email via Resend
 * Used by contact form component
 */
export async function sendContactEmail(data: ContactFormData): Promise<ActionResponse> {
  try {
    // Validate data with Zod schema
    const validatedData = contactFormSchema.parse(data)

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
