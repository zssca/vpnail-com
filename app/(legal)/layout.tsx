import { Container } from '@/components/layouts'

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  'use cache'
  return (
    <Container className="py-8">
      <div className="prose prose-lg max-w-4xl mx-auto">
        {children}
      </div>
    </Container>
  );
}
