import { emailConfig } from './config';

/**
 * Email Template for Contact Form Submissions
 *
 * This template can be customized per client by:
 * 1. Changing colors (hardcoded hex values below)
 * 2. Modifying layout/structure here
 * 3. Adding client logo (update logoUrl)
 *
 * Note: Email templates use hex colors since CSS variables are not supported in email clients.
 */

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt?: string;
}

export function generateContactEmail(data: ContactFormData): string {
  const { name, email, phone, message, submittedAt } = data;
  const { clientName, websiteDomain, brandColor } = emailConfig;

  // Email-safe colors (hardcoded hex values)
  const colors = {
    background: '#f5f5f5',       // Muted background
    cardBackground: '#ffffff',    // White cards
    border: '#e4e4e7',           // Border color
    textPrimary: '#18181b',      // Primary text
    textSecondary: '#71717a',    // Secondary text
    textMuted: '#3f3f46',        // Muted text
  };

  return `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>New Contact Form Submission</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          background-color: ${colors.background};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        table {
          border-spacing: 0;
        }
        td {
          padding: 0;
        }
        img {
          border: 0;
        }
        @media screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
          }
          .fluid {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .stack-column,
          .stack-column-center {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            direction: ltr !important;
          }
          .center-on-narrow {
            text-align: center !important;
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
            float: none !important;
          }
          table.center-on-narrow {
            display: inline-block !important;
          }
          .mobile-padding {
            padding: 20px !important;
          }
          .mobile-font-size {
            font-size: 16px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${colors.background};">
      <center style="width: 100%; background-color: ${colors.background}; padding: 20px 0;">

        <!-- Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" class="email-container" style="margin: auto; background-color: ${colors.cardBackground}; border: 1px solid ${colors.border}; border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: ${brandColor}; padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #fafafa;">
                ${clientName}
              </h1>
              <p style="margin: 10px 0 0 0; font-size: 15px; color: #fafafa; opacity: 0.95;">
                New Contact Form Submission
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 30px;">

              <!-- Contact Details -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="background: ${colors.cardBackground}; border: 1px solid ${colors.border}; padding: 24px; border-radius: 6px;">

                    <!-- Contact Details Table -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: ${colors.textSecondary}; font-size: 14px; width: 80px; vertical-align: top;">
                          Name
                        </td>
                        <td style="padding: 8px 0; color: ${colors.textPrimary}; font-size: 15px;">
                          ${name}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: ${colors.textSecondary}; font-size: 14px; vertical-align: top;">
                          Email
                        </td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${email}" style="color: ${brandColor}; text-decoration: none; font-size: 15px;">
                            ${email}
                          </a>
                        </td>
                      </tr>
                      ${phone ? `
                      <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: ${colors.textSecondary}; font-size: 14px; vertical-align: top;">
                          Phone
                        </td>
                        <td style="padding: 8px 0;">
                          <a href="tel:${phone}" style="color: ${brandColor}; text-decoration: none; font-size: 15px;">
                            ${phone}
                          </a>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: ${colors.textPrimary};">
                      Message
                    </h3>
                    <div style="background: ${colors.cardBackground}; padding: 20px; border-radius: 6px; border: 1px solid ${colors.border};">
                      <p style="margin: 0; line-height: 1.6; color: ${colors.textMuted}; font-size: 15px; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Timestamp -->
              ${submittedAt ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 1px solid ${colors.border}; padding-top: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 13px; color: ${colors.textSecondary};">
                      <strong style="color: ${colors.textMuted};">Submitted:</strong> ${submittedAt}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: ${colors.background}; padding: 24px 30px; text-align: center; border-top: 1px solid ${colors.border};">
              <p style="margin: 0; font-size: 13px; color: ${colors.textSecondary}; line-height: 1.6;">
                This email was sent from the contact form at
                <a href="https://${websiteDomain}" style="color: ${brandColor}; text-decoration: none; font-weight: 500;">
                  ${websiteDomain}
                </a>
              </p>
            </td>
          </tr>

        </table>

      </center>
    </body>
    </html>
  `;
}

/**
 * Plain text version for email clients that don't support HTML
 */
export function generateContactEmailText(data: ContactFormData): string {
  const { name, email, phone, message, submittedAt } = data;
  const { clientName, websiteDomain } = emailConfig;

  return `
${clientName} - New Contact Form Submission
${'='.repeat(50)}

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

${submittedAt ? `Submitted: ${submittedAt}` : ''}

---
This email was sent from the contact form at ${websiteDomain}
  `.trim();
}
