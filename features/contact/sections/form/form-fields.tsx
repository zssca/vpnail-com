'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formData } from './data'
import { SERVICE_OPTIONS } from '../../schemas/contact.schema'
import type { UseFormReturn } from 'react-hook-form'
import type { ContactFormData } from '../../schemas/contact.schema'

interface FormFieldsProps {
  form: UseFormReturn<ContactFormData>
  isSubmitting: boolean
  onPhoneChange: (value: string) => void
}

export function ContactFormFields({ form, isSubmitting, onPhoneChange }: FormFieldsProps) {
  return (
    <>
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
                onChange={(e) => onPhoneChange(e.target.value)}
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
    </>
  )
}
