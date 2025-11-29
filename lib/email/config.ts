import { siteConfig } from '@/lib/config/site.config'
import type { EmailConfig } from '@/lib/types/config.types'

/**
 * Client Email Configuration
 *
 * Update these values for each client:
 * - recipientEmail: Where contact form emails are sent
 * - clientName: Client business name
 * - websiteDomain: Client website domain
 * - brandColor: Primary brand color for email styling (from CSS variables)
 *
 * Note: Email templates require hex colors since CSS variables aren't supported.
 */

const websiteDomain = (() => {
  try {
    return new URL(siteConfig.url).hostname.replace(/^www\./, '')
  } catch {
    return 'localhost'
  }
})()

export const emailConfig = {
  // Client Information
  recipientEmail: siteConfig.business.email,
  clientName: siteConfig.business.name,
  websiteDomain,

  // Email Settings
  fromEmail: 'noreply@contact.zss.ca',  // ✅ Matches verified domain in Resend
  fromName: `${siteConfig.name} Contact`,

  // Branding - primary brand color
  brandColor: '#8b6959', // Mocha brown (matches --primary CSS variable)
} satisfies EmailConfig
