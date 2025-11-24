# Forms

Server Actions + shadcn/ui Form components (React Hook Form or `useActionState`) with Zod validation.

## Stack

- Validation: `zod`
- UI: shadcn/ui form primitives (`Form`, `Field`, `FieldError`, `Input`, `Button`)
- State: `useActionState` (for Server Actions) or `react-hook-form` (client-managed)

## Setup (Server Action + useActionState)

1) **Schema**

`features/contact/schemas/contact.schema.ts`

```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export type ContactValues = z.infer<typeof contactSchema>
```

2) **Action**

`features/contact/actions/contact.action.ts`

```typescript
'use server'

import { contactSchema, type ContactValues } from '../schemas/contact.schema'

export type ContactState = {
  values?: ContactValues
  errors: null | Partial<Record<keyof ContactValues, string[]>>
  success: boolean
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  }

  const result = contactSchema.safeParse(values)
  if (!result.success) {
    return {
      values,
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  // Send email/CRM here
  // revalidatePath('/contact') if the page is cached
  return { success: true, errors: null }
}
```

3) **Form component**

`features/contact/sections/contact-form/index.tsx`

```tsx
'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { submitContact, type ContactState } from '../../actions/contact.action'

const initialState: ContactState = { errors: null, success: false, values: undefined }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)

  return (
    <Form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!state.errors?.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state.values?.email}
            disabled={pending}
            aria-invalid={!!state.errors?.email}
            autoComplete="email"
          />
          <FieldDescription>We respond within one business day.</FieldDescription>
          {state.errors?.email && <FieldError>{state.errors.email[0]}</FieldError>}
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Send'}
      </Button>
    </Form>
  )
}
```

## React Hook Form variant (client-managed)

Use when you need immediate client-side validation/UI control:

```tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { contactSchema, type ContactValues } from '../../schemas/contact.schema'
import { submitContact } from '../../actions/contact.action'

export function ContactFormRHF() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  async function onSubmit(values: ContactValues) {
    const data = new FormData()
    Object.entries(values).forEach(([key, value]) => data.append(key, value))
    await submitContact({ errors: null, success: false }, data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  )
}
```

## Hardening

- Validate on the server; never trust client state.
- Configure `experimental.serverActions.allowedOrigins` in `next.config.ts`.
- Add anti-spam (rate limiting, honeypot) and guard Server Actions like public endpoints.
- After successful mutations, call `revalidatePath`/`revalidateTag` to refresh cached routes or tagged fetches.
- Keep errors accessible with `aria-invalid`, `FieldError`, and disabled states while pending.

## Best Practices

- One Server Action per form file; start action files with `'use server'`.
- Return structured state `{ success, errors, values }` so UI can persist inputs on validation failure.
- Use shadcn/ui form primitives for consistent spacing and a11y.
- Debounce client-side autosave actions to avoid Server Action spam.
- Keep form components small and colocated with their section.
