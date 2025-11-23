/**
 * Standardized form error messages for consistent UX across all forms
 * These messages are user-friendly and provide clear guidance on how to fix errors
 */

export const formErrorMessages = {
  // Required field validation
  required: 'This field is required',

  // Email validation
  email: 'Please enter a valid email address',
  emailInvalid: 'Invalid email format',

  // Phone validation
  phone: 'Please enter a valid phone number',
  phoneInvalid: 'Phone number must be 10-15 digits',

  // Text length validation
  minLength: (min: number) => `Must be at least ${min} character${min !== 1 ? 's' : ''}`,
  maxLength: (max: number) => `Must be no more than ${max} character${max !== 1 ? 's' : ''}`,
  length: (min: number, max: number) => `Must be between ${min} and ${max} characters`,

  // Number validation
  minValue: (min: number) => `Must be at least ${min}`,
  maxValue: (max: number) => `Must be no more than ${max}`,
  number: 'Please enter a valid number',

  // Password validation
  password: 'Password must contain uppercase, lowercase, number, and special character',
  passwordLength: 'Password must be at least 8 characters',

  // URL validation
  url: 'Please enter a valid URL',

  // Date validation
  date: 'Please enter a valid date',
  dateInFuture: 'Date must be in the future',
  dateInPast: 'Date must be in the past',

  // Match validation
  mustMatch: (fieldName: string) => `Passwords do not match`,

  // Server errors
  serverError: 'An error occurred. Please try again.',
  networkError: 'Network error. Please check your connection.',
  timeout: 'Request timed out. Please try again.',

  // Form submission
  submitting: 'Submitting...',
  success: 'Success! Your message has been sent.',
  tryAgain: 'Try again',
}

/**
 * Toast message presets for consistent feedback
 * Use with Sonner toast library
 */
export const toastMessages = {
  success: {
    consultationBooked: 'Consultation booked successfully!',
    messageSent: 'Your message has been sent. We\'ll get back to you soon!',
    saved: 'Changes saved successfully',
    copied: 'Copied to clipboard',
  },
  error: {
    consultationFailed: 'Failed to book consultation. Please try again.',
    messageFailed: 'Failed to send message. Please check your connection and try again.',
    saveFailed: 'Failed to save changes. Please try again.',
    generic: 'Something went wrong. Please try again.',
  },
  info: {
    processingPayment: 'Processing your payment...',
    loadingMore: 'Loading more items...',
    noResults: 'No results found',
  },
}

/**
 * Validation helper to check if a string is a valid email
 * Uses basic regex - adjust if stricter validation needed
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validation helper to check if a string is a valid phone number
 * Allows formats: 123-456-7890, 123.456.7890, 1234567890, +1 123 456 7890, etc.
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)\.]{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Validation helper to check if a string is a valid URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Format error message for display in UI
 * Handles both string and object error responses from API
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (typeof error === 'object' && error !== null) {
    // Handle common API error response formats
    if ('message' in error && typeof error.message === 'string') {
      return error.message
    }
    if ('error' in error && typeof error.error === 'string') {
      return error.error
    }
  }

  return formErrorMessages.serverError
}

/**
 * Sanitize user input to prevent XSS attacks
 * Use before displaying user-generated content
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Format phone number for display
 * Converts 1234567890 to (123) 456-7890
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (!match) return phone
  return `(${match[1]}) ${match[2]}-${match[3]}`
}

/**
 * Format phone number for href (removes all non-digits)
 * Use in <a href={`tel:${formatPhoneForHref(phone)}`}>
 */
export function formatPhoneForHref(phone: string): string {
  return phone.replace(/\D/g, '')
}
