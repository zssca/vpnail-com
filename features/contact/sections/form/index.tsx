'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { formData } from './data'
import { sendContactEmail } from '../../actions/send-email.action'
import { contactFormSchema, formatPhoneNumber, SERVICE_OPTIONS, type ContactFormData } from '../../schemas/contact.schema'
import { siteConfig } from '@/lib/config/site.config'

export function FormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      website: '',
    },
    mode: 'onBlur',
  })

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

  // Handle phone number formatting
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    form.setValue('phone', formatted)
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
      const cleanPhone = data.phone.replace(/\D/g, '')

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

  return (
    <Card id="contact-form" className="flex flex-col">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Accessibility: Form instructions */}
            <div className="text-sm text-muted-foreground">
              Fields marked with <span className="text-destructive font-medium">*</span> are required
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formData.fields.name.label}
                    <span className="text-destructive ml-1" aria-label="required">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={formData.fields.name.placeholder}
                      disabled={isSubmitting}
                      maxLength={100}
                      className="min-h-[44px]"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formData.fields.email.label}
                    <span className="text-destructive ml-1" aria-label="required">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={formData.fields.email.placeholder}
                      disabled={isSubmitting}
                      className="min-h-[44px]"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formData.fields.phone.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="(403) 555-0123"
                      disabled={isSubmitting}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      maxLength={14}
                      className="min-h-[44px]"
                      autoComplete="tel"
                    />
                  </FormControl>
                  <FormDescription>Optional. Format: (403) 555-0123</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Field */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formData.fields.service.label}</FormLabel>
                  <Select value={field.value || ''} onValueChange={field.onChange} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder={formData.fields.service.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Optional. Select the service you&apos;re interested in</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formData.fields.message.label}
                    <span className="text-destructive ml-1" aria-label="required">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={formData.fields.message.placeholder}
                      disabled={isSubmitting}
                      rows={5}
                      maxLength={1000}
                      className="min-h-[120px] resize-none"
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <FormDescription>
                      {field.value.length}/1000 characters
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Honeypot field (hidden from users, visible to bots) */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <div className="hidden" aria-hidden="true">
                  <FormItem>
                    <FormLabel htmlFor="website">Website</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full sm:w-auto min-h-[44px]"
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
        </Form>
      </CardContent>
    </Card>
  )
}
