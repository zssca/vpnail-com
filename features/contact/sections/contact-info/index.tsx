import Link from 'next/link'
import { ArrowUpRight, Calendar, Mail, MapPin, Phone } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { contactInfoData } from './data'

const iconMap = {
  Calendar,
  Phone,
  Mail,
  MapPin,
} as const

export function ContactInfoSection() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{contactInfoData.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ItemGroup className="gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {contactInfoData.items.map((item, index) => {
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
      </CardContent>
    </Card>
  )
}
