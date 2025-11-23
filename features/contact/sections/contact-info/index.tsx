import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { contactInfoData } from './data'

const iconMap = {
  Phone: '/geist-icons/phone.svg',
  Mail: '/geist-icons/email.svg',
  MapPin: '/geist-icons/location.svg',
} as const

export function ContactInfoSection() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{contactInfoData.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ItemGroup className="space-y-2">
          {contactInfoData.methods.map((method, index) => {
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
  )
}
