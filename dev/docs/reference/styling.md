# Styling

Tailwind + shadcn/ui with next-themes for dark mode.

## Tailwind Basics

```tsx
// Layout primitives
<div className="container mx-auto px-4">
<div className="grid gap-6 md:grid-cols-2">
<div className="flex items-center justify-between">

// Responsive sizing
<div className="w-full md:w-1/2 lg:w-1/3">Content</div>
```

Colors live in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: { primary: { 500: '#3b82f6', 600: '#2563eb' } },
    },
  },
}
```

Use: `<Button className="bg-primary-500 hover:bg-primary-600">`

## Typography

Load fonts with `next/font` in `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

Common sizes: `text-5xl`, `text-4xl`, `text-3xl`, `text-base`. Use `text-balance` on headlines.

## shadcn/ui

- Add components: `npx shadcn@latest add button form input textarea`
- Use form primitives for a11y:

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" aria-invalid={!!form.formState.errors.email} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

## Dark Mode

Install `next-themes` and wrap layout:

```tsx
import { ThemeProvider } from '@/components/theme-provider'

<html suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </body>
</html>
```

Use theme-aware classes: `<div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">`

## Animations

- Simple transitions: `transition-colors duration-200`
- Custom animation in `tailwind.config.ts`:

```typescript
extend: {
  animation: { fadeIn: 'fadeIn 0.5s ease-in' },
  keyframes: { fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } } },
}
```

## Global Styles

`app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { @apply scroll-smooth; }
}
```
