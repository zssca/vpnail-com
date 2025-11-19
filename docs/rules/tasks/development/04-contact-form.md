# Playbook · Contact Form with Server Actions

Use this when adding or modifying a contact form on any marketing page.

## 1. Create Schema

```ts
// features/marketing/contact/schemas/contact.schema.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})
```

## 2. Create Server Action

```ts
// features/marketing/contact/actions/send-email.action.ts
'use server'

import { contactSchema } from '../schemas/contact.schema'
import { sendContactEmail } from '@/lib/email/send-contact'

export async function sendEmail(formData: FormData) {
  const payload = contactSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  })

  await sendContactEmail(payload)
}
```

## 3. Wire the UI

```tsx
'use client'
import { useState, useTransition } from 'react'
import { sendEmail } from '../actions/send-email.action'

export function ContactForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await sendEmail(formData)
        setSuccess(true)
      } catch (err) {
        setError('Something went wrong. Please try again.')
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* inputs */}
      <button disabled={pending}>Send</button>
      {success && <p>Thanks! We’ll be in touch.</p>}
      {error && <p className="text-destructive">{error}</p>}
    </form>
  )
}
```

## 4. Email Templates & Config

- Update `emails/templates/` if the email copy changes.
- Confirm `lib/config/email.config.ts` reads from `site.config.ts` for sender/recipient addresses.
- Configure environment variables (Resend API key, etc.) per `tasks/email-and-config.md`.

## 5. Verification

- [ ] Form validates client-side and server-side (try invalid data)
- [ ] Success + error states render proper copy
- [ ] Email (or mock) sends once per submission (use logs locally)
- [ ] No sensitive values are logged to the client console
- [ ] `npm run lint && npm run type-check`
