'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, Calendar, Mail, MapPin, Phone } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
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
  Calendar,
  Phone,
  Mail,
  MapPin,
} as const

export function MainSection() {
  const formRef = useRef<HTMLFormElement>(null)

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

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    form.setValue('phone', formatted)
  }

  const { isSubmitting, onSubmit } = useFormSubmission(form, formRef)

  return (
    <div className="flex flex-col gap-6">
      {/* Contact Items - Full Width Grid matching footer */}
      <ItemGroup className="gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {mainData.contactItems.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isExternal = item.external
          const LinkComponent = isExternal ? 'a' : Link

          return (
            <Item key={index} asChild variant="muted" size="sm" className="h-full items-start hover:bg-muted">
              <LinkComponent
                href={item.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                data-gtm-event={item.trackingEvent}
                data-gtm-id={item.trackingId}
                data-gtm-label={item.trackingLabel}
                data-gtm-href={item.href}
                className="h-full"
              >
                <ItemMedia variant="icon">
                  <Icon className="h-4 w-4" />
                </ItemMedia>
                <ItemContent className="gap-1.5">
                  <ItemTitle className="line-clamp-1">{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
                <ItemContent className="flex-none flex-row items-center justify-end text-muted-foreground/60 transition-colors group-hover/item:text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </ItemContent>
              </LinkComponent>
            </Item>
          )
        })}
      </ItemGroup>

      {/* Two column grid for Hours and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours */}
        <Card className="flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>{mainData.hours.title}</CardTitle>
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

        {/* Contact Form */}
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
                      <span>Sending...</span>
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

      {/* Location Map - Full Width */}
      <Card id="location" className="flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>{mainData.location.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <LocationMap showInfoWindow={false} className="min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]" />
          <Button
            variant="default"
            size="lg"
            className="w-full sm:w-auto"
            asChild
            data-gtm-event={mainData.location.cta.trackingEvent}
            data-gtm-id={mainData.location.cta.trackingId}
            data-gtm-label={mainData.location.cta.text}
            data-gtm-href={mainData.location.cta.href}
          >
            <a href={mainData.location.cta.href} target="_blank" rel="noopener noreferrer">
              {mainData.location.cta.text}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
