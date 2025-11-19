// Form validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // Accept various phone formats but must have 10 digits
  const phoneDigits = phone.replace(/\D/g, '')
  return phoneDigits.length === 0 || phoneDigits.length === 10
}

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

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100
}

export const validateField = (fieldName: string, value: string): string => {
  switch (fieldName) {
    case 'name':
      if (!value.trim()) return 'Name is required'
      if (!validateName(value)) return 'Name must be between 2 and 100 characters'
      return ''
    case 'email':
      if (!value.trim()) return 'Email is required'
      if (!validateEmail(value)) return 'Please enter a valid email address'
      return ''
    case 'phone':
      if (value && !validatePhone(value)) return 'Please enter a valid 10-digit phone number'
      return ''
    case 'message':
      if (!value.trim()) return 'Message is required'
      if (value.trim().length < 10) return 'Message must be at least 10 characters'
      if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
      return ''
    default:
      return ''
  }
}
