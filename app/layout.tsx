import { Suspense } from 'react'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider, ToastProvider, AnalyticsEvents } from '@/components/providers'
import { Header } from '@/components/layouts/header'
import { Breadcrumbs } from '@/components/layouts/breadcrumbs'
import { Footer } from '@/components/layouts/footer'
import { StickyBottomNav } from '@/components/layouts/sticky-bottom-nav'
import { GoogleTagManager } from '@/components/seo'
import { rootMetadata, rootViewport } from '@/lib/config/metadata.config'
import { analyticsConfig } from '@/lib/config/analytics.config'
import { lato, cormorant } from '@/lib/config/fonts.config'
import { HeadTags } from './layout/head-tags'
import { SkipLinks } from './layout/skip-links'

export const metadata = rootMetadata
export const viewport = rootViewport

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  'use cache'
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        <HeadTags />
      </head>
      <body className={cn(
        'min-h-screen bg-background antialiased',
        lato.variable,
        cormorant.variable
      )}>
        {/* Google Tag Manager */}
        {analyticsConfig.shouldLoadAnalytics && analyticsConfig.gtmId && (
          <GoogleTagManager gtmId={analyticsConfig.gtmId} />
        )}

        {/* Skip Links */}
        <SkipLinks />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ToastProvider>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={null}>
                <AnalyticsEvents />
              </Suspense>
              <Header />
              <Breadcrumbs />
              <main id="main-content" className="flex-1 pb-[72px] lg:pb-0 transition-padding duration-300" tabIndex={-1}>{children}</main>
              <Footer id="footer" />
              <StickyBottomNav />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
