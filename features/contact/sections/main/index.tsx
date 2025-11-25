'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { LocationMapClient as LocationMap } from '@/features/shared/location-map-client'
import { ContactFormFields } from '../form/form-fields'
import { useFormSubmission } from '../form/use-form-submission'
import { contactFormSchema, formatPhoneNumber, type ContactFormData } from '../../schemas/contact.schema'
import { mainData } from './data'

const iconMap = {
  Phone: '/geist-icons/phone.svg',
  Mail: '/geist-icons/email.svg',
  MapPin: '/geist-icons/location.svg',
} as const

export function MainSection() {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Contact Info - Top Left */}
      <Card className="flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>{mainData.contactInfo.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <ItemGroup className="space-y-2">
            {mainData.contactInfo.methods.map((method, index) => {
              const iconSrc = iconMap[method.icon as keyof typeof iconMap]
              return (
                <Item key={index} asChild variant="muted" size="sm">
                  <a href={method.href}>
                    <ItemMedia>
                      <Avatar className="h-10 w-10 bg-primary/10 rounded-lg">
                        <AvatarFallback className="bg-primary/10">
                          <Image
                            src={iconSrc}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 text-primary"
                          />
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{method.label}</ItemTitle>
                      <ItemDescription>{method.value}</ItemDescription>
                    </ItemContent>
                  </a>
                </Item>
              )
            })}
          </ItemGroup>
        </CardContent>
      </Card>

      {/* Hours - Top Right */}
      <Card className="flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <Image
              src="/geist-icons/clock.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
            {mainData.hours.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <Table>
            <TableBody>
              {mainData.hours.schedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.day}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {mainData.hours.holiday?.hours && (
            <div className="mt-6 rounded-md border bg-primary/5 p-4">
              <p className="font-semibold">{mainData.hours.holiday.title}</p>
              <p className="text-muted-foreground">{mainData.hours.holiday.hours}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location - Bottom Left */}
      <Card id="location" className="flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center justify-between">
            <span>{mainData.location.title}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {mainData.location.description}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <LocationMap showInfoWindow={false} className="min-h-[360px] sm:min-h-[420px]" />
        </CardContent>
      </Card>

      {/* Contact Form - Bottom Right */}
      <Card id="contact-form" className="flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>{mainData.form.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
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
                  mainData.form.submitButton
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
