import React from 'react'
import { toast } from 'sonner'
import { siteConfig } from '@/lib/config/site.config'

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export const trackFormSubmission = (formState: FormState) => {
  try {
    const w = window as Window & { dataLayer?: Record<string, unknown>[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: 'generate_lead',
      form_id: 'contact_form',
      form_name: 'Contact Form',
      page_path: window.location.pathname,
      page_title: document.title,
      service: formState.service || 'Not specified',
    })
  } catch {}
}

export const trackFormError = (error: Error) => {
  try {
    const w = window as Window & { dataLayer?: Record<string, unknown>[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: 'form_submit_error',
      form_id: 'contact_form',
      form_name: 'Contact Form',
      page_path: window.location.pathname,
      page_title: document.title,
      error: error.message || 'unknown_error',
    })
  } catch {}
}

export const handleFormError = (error: unknown, formState: FormState) => {
  if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
    showFallbackContactOptions(formState)
  } else if (error instanceof TypeError) {
    toast.error("Network error", {
      description: "Please check your internet connection and try again.",
    })
  } else {
    const errorMessage = (error as Error)?.message || 'Unknown error'
    toast.error("Error sending message", {
      description: `${errorMessage}. Please try again or email us directly at ${siteConfig.business.email}.`,
    })
  }
}

const showFallbackContactOptions = (formState: FormState) => {
  const subject = encodeURIComponent(`Contact Form Inquiry from ${formState.name.trim()}`)
  const body = encodeURIComponent(
    `Name: ${formState.name}\n` +
    `Email: ${formState.email}\n` +
    `Phone: ${formState.phone || 'Not provided'}\n` +
    `Service: ${formState.service || 'Not specified'}\n\n` +
    `Message:\n${formState.message}`
  )

  toast.error("Form Temporarily Unavailable", {
    description: "We're experiencing technical issues with our contact form. Please use one of the alternative methods below:",
    duration: 15000,
  })

  setTimeout(() => {
    toast.info("Alternative Contact Methods", {
      description: (
        <div className="space-y-2">
          <p>You can reach us through:</p>
          <div className="space-y-1">
            <a
              href={`mailto:${siteConfig.business.email}?subject=${subject}&body=${body}`}
              className="block text-blue-600 hover:underline"
            >
              📧 Email: {siteConfig.business.email}
            </a>
            <a
              href={siteConfig.social.phone}
              className="block text-blue-600 hover:underline"
            >
              📱 Call: {siteConfig.business.phone}
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Click email to open with your form data pre-filled
          </p>
        </div>
      ),
      duration: 30000,
      action: {
        label: "Copy Email",
        onClick: () => {
          navigator.clipboard.writeText(siteConfig.business.email)
          toast.success('Email copied to clipboard!')
        }
      }
    })
  }, 500)
}
