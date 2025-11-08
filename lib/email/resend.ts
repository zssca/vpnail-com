import { Resend } from 'resend';
import { emailConfig } from './config';
import { generateContactEmail, generateContactEmailText } from './templates';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send contact form email using Resend
 *
 * @param formData - Contact form submission data
 * @returns Promise with email send result
 */
export async function sendContactFormEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Validate API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not set in environment variables');
      throw new Error('Email service not configured. Please contact support.');
    }

    // Add timestamp
    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'America/Edmonton',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const emailData = {
      ...formData,
      submittedAt,
    };

    // Generate email content
    const htmlContent = generateContactEmail(emailData);
    const textContent = generateContactEmailText(emailData);

    console.log('📧 Sending email with Resend...');
    console.log('From:', `${emailConfig.fromName} <${emailConfig.fromEmail}>`);
    console.log('To:', emailConfig.recipientEmail);
    console.log('BCC:', emailConfig.bccEmail);

    // Send email via Resend
    const result = await resend.emails.send({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.recipientEmail,
      replyTo: formData.email, // Customer's email for easy reply
      subject: `New Contact Form - ${emailConfig.clientName}`,
      html: htmlContent,
      text: textContent,
      // Optional: BCC yourself for monitoring
      ...(emailConfig.bccEmail && { bcc: emailConfig.bccEmail }),
    });

    // Log the full result for debugging
    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data?.id);
    console.log('Full result:', JSON.stringify(result, null, 2));

    // Check for errors in response
    if (result.error) {
      console.error('❌ Resend returned an error:', result.error);
      throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
    }

    return {
      success: true,
      emailId: result.data?.id,
    };
  } catch (error) {
    console.error('❌ Resend email error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error('Failed to send email');
  }
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}
