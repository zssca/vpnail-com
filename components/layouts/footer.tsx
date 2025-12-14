import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { siteConfig, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/config/site.config'

import { Container } from './container'

export function Footer({ id }: { id?: string }) {
  return (
    <footer id={id} className="border-t bg-muted/30">
      <Container className="py-10 pb-32 md:py-12 lg:py-16 lg:pb-16">
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">

          {/* Top Section: Logo & Tagline */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/Victoria_Park_Nails_Spa_Logo_Primary_small.png"
                alt={siteConfig.name}
                width={150}
                height={50}
                className="h-10 w-auto md:h-12 dark:invert"
              />
            </Link>
            <p className="max-w-md text-sm text-muted-foreground md:text-base">
              {siteConfig.business.tagline}
            </p>
          </div>

          <section aria-label="Visit and contact">
            <ItemGroup className="gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4">
              <Item asChild variant="muted" size="sm" role="listitem" className="h-full items-start bg-card hover:bg-accent">
                <Link
                  href={siteConfig.links.booking}
                  data-gtm-event="book_now_click"
                  data-gtm-id="footer-book-now"
                  data-gtm-label="Footer Book Online"
                  className="h-full"
                >
                  <ItemMedia variant="icon">
                    <Calendar className="h-4 w-4" />
                  </ItemMedia>
                  <ItemContent className="gap-1.5">
                    <ItemTitle className="line-clamp-1">Book online</ItemTitle>
                    <ItemDescription>Reserve your appointment in seconds.</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none flex-row items-center justify-end text-muted-foreground/60 transition-colors group-hover/item:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </ItemContent>
                </Link>
              </Item>

              <Item asChild variant="muted" size="sm" role="listitem" className="h-full items-start bg-card hover:bg-accent">
                <a
                  href={siteConfig.business.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-gtm-event="click_get_directions"
                  data-gtm-id="footer-directions"
                  data-gtm-label="Footer Visit Us"
                  data-gtm-href={siteConfig.business.address.mapUrl}
                  className="h-full"
                >
                  <ItemMedia variant="icon">
                    <MapPin className="h-4 w-4" />
                  </ItemMedia>
                  <ItemContent className="gap-1.5">
                    <ItemTitle className="line-clamp-1">Visit us</ItemTitle>
                    <ItemDescription>
                      {CONTACT_INFO.fullAddress.street}, {CONTACT_INFO.fullAddress.city}{' '}
                      {CONTACT_INFO.fullAddress.province} {CONTACT_INFO.fullAddress.postalCode}
                    </ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none flex-row items-center justify-end text-muted-foreground/60 transition-colors group-hover/item:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </ItemContent>
                </a>
              </Item>

              <Item asChild variant="muted" size="sm" role="listitem" className="h-full items-start bg-card hover:bg-accent">
                <a
                  href={SOCIAL_LINKS.phone}
                  data-gtm-event="click_to_call"
                  data-gtm-id="footer-call"
                  data-gtm-label="Footer Call"
                  data-gtm-href={SOCIAL_LINKS.phone}
                  className="h-full"
                >
                  <ItemMedia variant="icon">
                    <Phone className="h-4 w-4" />
                  </ItemMedia>
                  <ItemContent className="gap-1.5">
                    <ItemTitle className="line-clamp-1">Call or text</ItemTitle>
                    <ItemDescription>{CONTACT_INFO.phone}</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none flex-row items-center justify-end text-muted-foreground/60 transition-colors group-hover/item:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </ItemContent>
                </a>
              </Item>

              <Item asChild variant="muted" size="sm" role="listitem" className="h-full items-start bg-card hover:bg-accent">
                <a
                  href={SOCIAL_LINKS.email}
                  data-gtm-event="email_click"
                  data-gtm-id="footer-email"
                  data-gtm-label="Footer Email"
                  data-gtm-href={SOCIAL_LINKS.email}
                  className="h-full"
                >
                  <ItemMedia variant="icon">
                    <Mail className="h-4 w-4" />
                  </ItemMedia>
                  <ItemContent className="gap-1.5">
                    <ItemTitle className="line-clamp-1">Email</ItemTitle>
                    <ItemDescription>{CONTACT_INFO.email}</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none flex-row items-center justify-end text-muted-foreground/60 transition-colors group-hover/item:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </ItemContent>
                </a>
              </Item>
            </ItemGroup>
          </section>

          <div className="flex flex-col items-center gap-4 pt-6 text-xs text-muted-foreground sm:gap-5 sm:pt-8 md:flex-row md:justify-between md:gap-6 md:pt-0">
            <p className="order-2 md:order-1">© {new Date().getFullYear()} {siteConfig.name}</p>

            <div className="order-1 flex items-center gap-2 md:order-2">
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                data-gtm-event="social_outbound_click"
                data-gtm-id="footer-facebook"
                data-gtm-label="facebook"
                data-gtm-href={SOCIAL_LINKS.facebook}
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
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                data-gtm-event="social_outbound_click"
                data-gtm-id="footer-instagram"
                data-gtm-label="instagram"
                data-gtm-href={SOCIAL_LINKS.instagram}
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
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                data-gtm-event="social_outbound_click"
                data-gtm-id="footer-tiktok"
                data-gtm-label="tiktok"
                data-gtm-href={SOCIAL_LINKS.tiktok}
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
              <a href="https://zss.ca" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                zss.ca
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
