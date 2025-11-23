'use client'

import { useState, type RefObject } from 'react'
import { toast } from 'sonner'
import { sendContactEmail } from '../../actions/send-email.action'
import { siteConfig } from '@/lib/config/site.config'
import type { UseFormReturn } from 'react-hook-form'
import type { ContactFormData } from '../../schemas/contact.schema'

export function useFormSubmission(
  form: UseFormReturn<ContactFormData>,
  formRef: RefObject<HTMLFormElement | null>
) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)

  // Rate limiting check
  const checkRateLimit = (): boolean => {
    const now = Date.now()
    const timeSinceLastSubmission = now - lastSubmissionTime
    const minInterval = 30000 // 30 seconds between submissions

    if (timeSinceLastSubmission < minInterval) {
      const remainingTime = Math.ceil((minInterval - timeSinceLastSubmission) / 1000)
      toast.error('Please wait before submitting again', {
        description: `You can submit another message in ${remainingTime} seconds.`,
      })
      return false
    }
    return true
  }

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot (anti-spam)
    if (data.website) {
      console.warn('Bot submission detected')
      // Silently succeed for bots to avoid detection
      toast.success('Message sent successfully!', {
        description: "We'll get back to you as soon as possible.",
      })
      return
    }

    // Rate limiting
    if (!checkRateLimit()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Clean phone number (remove formatting)
      const cleanPhone = data.phone ? data.phone.replace(/\D/g, '') : ''

      // Prepare message with service selection if provided
      let messageContent = data.message.trim()
      if (data.service) {
        messageContent = `Service Interest: ${data.service}\n\n${messageContent}`
      }

      // Prepare submission payload
      const submissionPayload = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: cleanPhone || undefined,
        message: messageContent,
      }

      // Submit using Server Action
      const result = await sendContactEmail(submissionPayload)

      if (result.success) {
        // Update last submission time
        setLastSubmissionTime(Date.now())

        // Push to dataLayer for GTM
        try {
          const w = window as Window & { dataLayer?: Record<string, unknown>[] }
          w.dataLayer = w.dataLayer || []
          w.dataLayer.push({
            event: 'generate_lead',
            form_id: 'contact_form',
            form_name: 'Contact Form',
            page_path: window.location.pathname,
            page_title: document.title,
            service: data.service || 'Not specified',
          })
        } catch {
          // GTM tracking failed silently
        }

        toast.success('Message sent successfully!', {
          description: "We'll get back to you within 24 hours.",
        })

        // Reset form
        form.reset()

        // Set focus back to form for accessibility
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          formRef.current.focus()
        }
      } else {
        throw new Error(result.error || 'Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)

      // Track error in GTM
      try {
        const w = window as Window & { dataLayer?: Record<string, unknown>[] }
        w.dataLayer = w.dataLayer || []
        w.dataLayer.push({
          event: 'form_submit_error',
          form_id: 'contact_form',
          form_name: 'Contact Form',
          page_path: window.location.pathname,
          page_title: document.title,
          error: (error as Error)?.message || 'unknown_error',
        })
      } catch {
        // GTM tracking failed silently
      }

      // Determine error type and provide appropriate message
      if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
        const formValues = form.getValues()
        const subject = encodeURIComponent(`Contact Form Inquiry from ${formValues.name.trim()}`)
        const body = encodeURIComponent(
          `Name: ${formValues.name}\n` +
          `Email: ${formValues.email}\n` +
          `Phone: ${formValues.phone || 'Not provided'}\n` +
          `Service: ${formValues.service || 'Not specified'}\n\n` +
          `Message:\n${formValues.message}`
        )

        toast.error('Form Temporarily Unavailable', {
          description: "We're experiencing technical issues. Please use an alternative method below:",
          duration: 15000,
        })

        // Show alternative contact methods after a brief delay
        setTimeout(() => {
          toast.info('Alternative Contact Methods', {
            description: (
              <div className="space-y-2">
                <p>You can reach us through:</p>
                <div className="space-y-1">
                  <a
                    href={`mailto:${siteConfig.business.email}?subject=${subject}&body=${body}`}
                    className="block text-primary hover:text-primary/80 hover:underline"
                  >
                    📧 Email: {siteConfig.business.email}
                  </a>
                  <a
                    href={siteConfig.social.phone}
                    className="block text-primary hover:text-primary/80 hover:underline"
                  >
                    📱 Call: {siteConfig.business.phone}
                  </a>
                </div>
              </div>
            ),
            duration: 30000,
            action: {
              label: 'Copy Email',
              onClick: () => {
                navigator.clipboard.writeText(siteConfig.business.email)
                toast.success('Email copied to clipboard!')
              },
            },
          })
        }, 500)
      } else if (error instanceof TypeError) {
        toast.error('Network error', {
          description: 'Please check your internet connection and try again.',
          action: {
            label: 'Retry',
            onClick: () => form.handleSubmit(onSubmit)(),
          },
        })
      } else {
        const errorMessage = (error as Error)?.message || 'Unknown error'
        toast.error('Error sending message', {
          description: `${errorMessage}. Please try again or email us at ${siteConfig.business.email}.`,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    onSubmit,
  }
}
