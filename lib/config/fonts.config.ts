import { Lato } from 'next/font/google'
import localFont from 'next/font/local'

export const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

export const cormorant = localFont({
  src: [
    {
      path: '../../public/fonts/Cormorant_Garamond/CormorantGaramond-VariableFont_wght.ttf',
      weight: '400 700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Cormorant_Garamond/CormorantGaramond-Italic-VariableFont_wght.ttf',
      weight: '400 700',
      style: 'italic',
    },
  ],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
})

export const fontVariables = [lato.variable, cormorant.variable]
