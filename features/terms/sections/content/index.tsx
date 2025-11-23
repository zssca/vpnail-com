import { Section, Container } from '@/components/layouts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { termsContentData } from './data'

export function TermsContentSection() {
  return (
    <Section variant="muted">
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-balance">{termsContentData.title}</h2>
            </CardTitle>
            <p className="leading-7 text-xs sm:text-sm text-muted-foreground">
              Last updated: {termsContentData.lastUpdated}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {termsContentData.sections.map((section, index) => (
              <div key={index}>
                {index > 0 && <Separator className="mb-6" />}
                <section className="space-y-3">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-balance">{section.heading}</h3>
                  <p className="leading-7 text-muted-foreground">{section.content}</p>
                </section>
              </div>
            ))}
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}
