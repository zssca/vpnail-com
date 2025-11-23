import Image from 'next/image'
import { ArrowUpRight, Facebook, Instagram } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { siteConfig, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/config/site.config'

import { Container } from './container'

export function Footer({ id }: { id?: string }) {
  return (
    <footer id={id} className="border-t bg-background">
      <Container className="py-12 pb-20">
        <div className="flex flex-col gap-10">

          <section aria-label="Visit and contact" className="space-y-4">
            <ItemGroup className="space-y-2">
              <Item asChild variant="muted" size="sm">
                <a href={siteConfig.links.booking} target="_blank" rel="noopener noreferrer">
                  <ItemMedia>
                    <Avatar className="h-12 w-12 bg-primary/10 rounded-xl">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Image
                          src="/geist-icons/calendar.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 text-primary"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Book online</ItemTitle>
                    <ItemDescription>Reserve your appointment in seconds.</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </ItemActions>
                </a>
              </Item>

              <Item asChild variant="muted" size="sm">
                <a href={siteConfig.business.address.mapUrl} target="_blank" rel="noopener noreferrer">
                  <ItemMedia>
                    <Avatar className="h-12 w-12 bg-primary/10 rounded-xl">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Image
                          src="/geist-icons/location.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 text-primary"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Visit us</ItemTitle>
                    <ItemDescription>
                      {CONTACT_INFO.fullAddress.street}, {CONTACT_INFO.fullAddress.city}{' '}
                      {CONTACT_INFO.fullAddress.province} {CONTACT_INFO.fullAddress.postalCode}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </ItemActions>
                </a>
              </Item>

              <Item asChild variant="muted" size="sm">
                <a href={SOCIAL_LINKS.phone}>
                  <ItemMedia>
                    <Avatar className="h-12 w-12 bg-primary/10 rounded-xl">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Image
                          src="/geist-icons/phone.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 text-primary"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Call or text</ItemTitle>
                    <ItemDescription>{CONTACT_INFO.phone}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </ItemActions>
                </a>
              </Item>

              <Item asChild variant="muted" size="sm">
                <a href={SOCIAL_LINKS.email}>
                  <ItemMedia>
                    <Avatar className="h-12 w-12 bg-primary/10 rounded-xl">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Image
                          src="/geist-icons/email.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 text-primary"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Email</ItemTitle>
                    <ItemDescription>{CONTACT_INFO.email}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </ItemActions>
                </a>
              </Item>
            </ItemGroup>
          </section>

          <div className="flex flex-col items-center gap-4 text-xs text-muted-foreground md:flex-row md:justify-between">
            <p className="order-1 md:order-1">© {new Date().getFullYear()} {siteConfig.name}</p>

            <div className="order-2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
                className="h-8 w-8"
              >
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon-sm"
                asChild
                className="h-8 w-8"
              >
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon-sm"
                asChild
                className="h-8 w-8"
              >
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </Button>
            </div>

            <p className="order-3 font-mono">
              Built by{' '}
              <a href="https://zss.ca" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                zss.ca
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
