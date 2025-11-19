'use client'

import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { formData } from './data'
import { sendContactEmail } from '../../actions/send-email.action'
import { validateField, formatPhoneNumber } from './form-validation'
import { NameField, EmailField, PhoneField, ServiceField, MessageField, HoneypotField } from './form-fields'
import { trackFormSubmission, trackFormError, handleFormError } from './form-utils'

export function FormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
  const honeypotRef = useRef<HTMLInputElement>(null)

  const checkRateLimit = (): boolean => {
    const now = Date.now()
    const timeSinceLastSubmission = now - lastSubmissionTime
    const minInterval = 30000 // 30 seconds

    if (timeSinceLastSubmission < minInterval) {
      const remainingTime = Math.ceil((minInterval - timeSinceLastSubmission) / 1000)
      toast.error('Please wait before submitting again', {
        description: `You can submit another message in ${remainingTime} seconds.`
      })
      return false
    }
    return true
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === 'phone') {
      const formatted = formatPhoneNumber(value)
      setFormState({ ...formState, [fieldName]: formatted })
    } else {
      setFormState({ ...formState, [fieldName]: value })
    }

    if (errors[fieldName as keyof typeof errors]) {
      setErrors({ ...errors, [fieldName]: '' })
    }
  }

  const validateForm = (): boolean => {
    const newErrors = {
      name: validateField('name', formState.name),
      email: validateField('email', formState.email),
      phone: validateField('phone', formState.phone),
      message: validateField('message', formState.message)
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check honeypot (anti-spam)
    if (formState.website) {
      console.warn('Bot submission detected')
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      })
      return
    }

    if (!checkRateLimit()) return
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        description: 'Check the fields marked with errors and try again.'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const cleanPhone = formState.phone.replace(/\D/g, '')
      let messageContent = formState.message.trim()
      if (formState.service) {
        messageContent = `Service Interest: ${formState.service}\n\n${messageContent}`
      }

      const submissionPayload = {
        name: formState.name.trim(),
        email: formState.email.trim(),
        phone: cleanPhone || undefined,
        message: messageContent,
      }

      const result = await sendContactEmail(submissionPayload)

      if (result.success) {
        setLastSubmissionTime(Date.now())
        trackFormSubmission(formState)

        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 24 hours.",
        })

        // Reset form
        setFormState({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          website: ''
        })
        setErrors({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        throw new Error(result.error || 'Form submission failed')
      }

    } catch (error) {
      console.error('Form submission error:', error)
      trackFormError(error as Error)
      handleFormError(error, formState)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card id="contact-form" className="flex flex-col">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="sr-only" aria-live="polite">
            Fields marked with an asterisk (*) are required.
          </div>

          <NameField
            value={formState.name}
            onChange={(value) => handleFieldChange('name', value)}
            error={errors.name}
            disabled={isSubmitting}
          />

          <EmailField
            value={formState.email}
            onChange={(value) => handleFieldChange('email', value)}
            error={errors.email}
            disabled={isSubmitting}
          />

          <PhoneField
            value={formState.phone}
            onChange={(value) => handleFieldChange('phone', value)}
            error={errors.phone}
            disabled={isSubmitting}
          />

          <ServiceField
            value={formState.service}
            onChange={(value) => setFormState({ ...formState, service: value })}
            disabled={isSubmitting}
          />

          <MessageField
            value={formState.message}
            onChange={(value) => handleFieldChange('message', value)}
            error={errors.message}
            disabled={isSubmitting}
          />

          <HoneypotField
            value={formState.website}
            onChange={(value) => setFormState({ ...formState, website: value })}
            inputRef={honeypotRef}
          />

          <p className="text-xs text-muted-foreground">
            * Required fields
          </p>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Sending Message...</span>
              </>
            ) : (
              formData.submitButton
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
