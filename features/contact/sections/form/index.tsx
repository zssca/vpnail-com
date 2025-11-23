'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { formData } from './data'
import { ContactFormFields } from './form-fields'
import { useFormSubmission } from './use-form-submission'
import { contactFormSchema, formatPhoneNumber, type ContactFormData } from '../../schemas/contact.schema'

export function FormSection() {
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

  // Handle phone number formatting
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    form.setValue('phone', formatted)
  }

  // Use custom hook for form submission logic
  const { isSubmitting, onSubmit } = useFormSubmission(form, formRef)

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
            <ContactFormFields
              form={form}
              isSubmitting={isSubmitting}
              onPhoneChange={handlePhoneChange}
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
                  <Image
                    src="/geist-icons/loader-circle.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
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
