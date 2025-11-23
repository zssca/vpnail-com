import Link from 'next/link'
import type { ComponentProps } from 'react'
import { Section, Container } from '@/components/layouts'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type SectionVariant = ComponentProps<typeof Section>['variant']
type SectionSize = ComponentProps<typeof Section>['size']

export interface CtaButton {
  text: string
  href: string
  variant?: ButtonProps['variant']
  /**
   * Force link to open in a new tab even if the URL looks internal.
   * Defaults to true for http(s) URLs and false for tel/mailto schemes.
   */
  external?: boolean
}

export interface DualCtaContent {
  title: string
  primary: CtaButton
  secondary: CtaButton
}

interface DualCtaSectionProps extends DualCtaContent {
  sectionVariant?: SectionVariant
  sectionSize?: SectionSize
}

const shouldOpenInNewTab = (href: string, explicit?: boolean) => {
  if (typeof explicit === 'boolean') {
    return explicit
  }

  return !href.startsWith('/') && !href.startsWith('tel:') && !href.startsWith('mailto:')
}

type ButtonProps = React.ComponentProps<typeof Button>

function ActionButton({
  action,
  fallbackVariant,
}: {
  action: CtaButton
  fallbackVariant: ButtonProps['variant']
}) {
  const variant = action.variant ?? fallbackVariant
  const openInNewTab = shouldOpenInNewTab(action.href, action.external)
  const isInternal = action.href.startsWith('/')

  return (
    <Button size="lg" variant={variant} asChild>
      {isInternal ? (
        <Link href={action.href}>
          {action.text}
        </Link>
      ) : (
        <a
          href={action.href}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {action.text}
        </a>
      )}
    </Button>
  )
}

export function DualCtaSection({
  title,
  primary,
  secondary,
  sectionVariant = 'default',
  sectionSize = 'lg',
}: DualCtaSectionProps) {
  return (
    <Section variant={sectionVariant} size={sectionSize}>
      <Container>
        <Card className="w-full text-center py-6 sm:py-8 md:py-10 lg:py-12">
          <CardHeader className="items-center text-center">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {title}
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-0 sm:flex-row sm:justify-center">
            <ActionButton action={primary} fallbackVariant="default" />
            <ActionButton action={secondary} fallbackVariant="outline" />
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}
