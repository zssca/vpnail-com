# Resend Email Setup Guide

## Quick Diagnosis

If contact form shows "sent" but no email arrives, check:

### 1. Check Resend Dashboard
1. Go to https://resend.com/emails
2. Look for recent emails in the "Emails" tab
3. Check the status (delivered, bounced, spam, etc.)

### 2. Domain Verification (MOST COMMON ISSUE)
**The domain `zss.ca` MUST be verified in Resend before emails will actually send.**

#### How to verify:
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Add `zss.ca`
4. Add the DNS records Resend provides to your domain's DNS settings:
   - **SPF** record
   - **DKIM** records (usually 2)
   - **DMARC** record (optional but recommended)
5. Wait for DNS propagation (can take 24-48 hours)
6. Click "Verify" in Resend dashboard

#### Current Sending Address:
- **From:** `contact@zss.ca`
- **To:** `calgaryvpark@gmail.com`
- **BCC:** `info@zss.ca`

### 3. Check Spam Folders
Even with verified domain, emails might go to spam initially. Check:
- Spam folder in calgaryvpark@gmail.com
- Spam folder in info@zss.ca

### 4. Test with Resend Test API
If domain isn't verified yet, you can test with Resend's sandbox:
- Change `fromEmail` in `lib/email/config.ts` to `onboarding@resend.dev` (temporary)
- This bypasses domain verification for testing only

## Environment Variables

Make sure these are set in `.env.local` AND in Vercel/production:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

**IMPORTANT:** The API key in `.env.local` is used for development. Vercel/production needs its own environment variable set in the dashboard.

## Configuration Files

### lib/email/config.ts
Update these for each client:
```typescript
export const emailConfig = {
  recipientEmail: 'calgaryvpark@gmail.com',  // Where to send form submissions
  clientName: 'Victoria Park Nails & Spa',
  websiteDomain: 'vpnail.com',
  fromEmail: 'contact@zss.ca',  // MUST be from verified domain
  fromName: 'Victoria Park Nails Contact',
  brandColor: '#d4a5a5',
  bccEmail: 'info@zss.ca',  // Optional monitoring copy
}
```

## Debugging Steps

### 1. Check Terminal Logs (Development)
Run `npm run dev` and submit the form. You should see:
```
📧 Sending email with Resend...
From: Victoria Park Nails Contact <contact@zss.ca>
To: calgaryvpark@gmail.com
BCC: info@zss.ca
✅ Email sent successfully!
Email ID: abc123...
```

If you see ❌ errors, they'll explain what went wrong.

### 2. Check Vercel Logs (Production)
1. Go to Vercel dashboard
2. Click on your deployment
3. Go to "Functions" tab
4. Find the Server Action execution logs
5. Look for the same console.log output

### 3. Test Email Sending Manually
Create a test API route temporarily:

```typescript
// app/api/test-email/route.ts
import { sendContactFormEmail } from '@/lib/email'

export async function GET() {
  try {
    const result = await sendContactFormEmail({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'This is a test message',
    })
    return Response.json({ success: true, result })
  } catch (error) {
    return Response.json({ success: false, error: String(error) }, { status: 500 })
  }
}
```

Visit `/api/test-email` to test.

## Common Issues & Solutions

### Issue: "Email sent successfully" but nothing in inbox
**Solution:** Domain not verified. Verify `zss.ca` in Resend dashboard.

### Issue: Emails go to spam
**Solutions:**
1. Add DMARC record
2. Start with small volume (don't send 100 emails right away)
3. Ask recipient to mark as "Not Spam"
4. Warm up the domain by sending a few emails first

### Issue: API key error
**Solutions:**
1. Check `.env.local` has `RESEND_API_KEY=re_...`
2. Verify the key is from https://resend.com/api-keys
3. Make sure the key isn't expired

### Issue: Rate limiting
**Solution:** Free tier allows 100 emails/day. Upgrade if needed.

## Production Deployment

### Vercel Setup
1. Go to Vercel dashboard → Project → Settings → Environment Variables
2. Add: `RESEND_API_KEY` = `re_your_key`
3. Redeploy the project

### DNS Records for zss.ca
Add these to your DNS provider (Cloudflare, Namecheap, etc.):

```
# Example - actual values will be in Resend dashboard
TXT    _resend    "resend-domain-verification=abc123..."
TXT    resend._domainkey    "v=DKIM1; k=rsa; p=MIGfMA0GCS..."
TXT    @    "v=spf1 include:_spf.resend.com ~all"
```

## Support

If still not working after domain verification:
1. Check Resend dashboard "Emails" tab for actual status
2. Check spam folders
3. Contact Resend support (very responsive)
4. Check terminal/Vercel logs for detailed error messages

## Success Checklist

- [ ] Domain `zss.ca` verified in Resend
- [ ] DNS records added and propagated
- [ ] `RESEND_API_KEY` set in `.env.local`
- [ ] `RESEND_API_KEY` set in Vercel environment variables
- [ ] Test email sent and received successfully
- [ ] Checked spam folders
- [ ] Confirmed in Resend dashboard "Emails" tab
