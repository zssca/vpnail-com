/**
 * Site Configuration
 * Single source of truth for site-wide settings
 */
import type { SiteConfig } from '@/lib/types/config.types'

export const siteConfig = {
  name: 'Victoria Park Nails and Spa',
  description: 'Calgary nail salon in Victoria Park for manicures, pedicures, gel/acrylic nails, custom nail art, massage, and waxing. Near Stampede grounds. Est. 2015.',
  url: 'https://www.vpnail.com',
  ogImage: '/images/gallery/victoria-park-nails-calgary-luxury-gel-manicure-1.webp',
  creator: '@victoriaparknails',
  keywords: [
    'nail salon Calgary',
    'Victoria Park nails',
    'best nail salon Calgary',
    'manicure Calgary',
    'pedicure Calgary',
    'gel manicure Calgary',
    'shellac manicure Calgary',
    'nail art Calgary',
    'custom nail art Calgary',
    'gel nails Calgary',
    'acrylic nails Calgary',
    'acrylic nail extensions Calgary',
    'spa pedicure Calgary',
    'hot stone pedicure Calgary',
    'deluxe pedicure Calgary',
    'custom nail design Calgary',
    'nail extensions Calgary',
    'nail salon Victoria Park',
    'nail salon Downtown Calgary',
    'nail salon Beltline Calgary',
    'nail salon Inglewood Calgary',
    'nail salon Mission Calgary',
    'nail salon East Village Calgary',
    'nail salon Erlton Calgary',
    'shellac pedicure Calgary',
    'gel refill Calgary',
    'acrylic fill Calgary',
    'bridal nails Calgary',
    'wedding nails Calgary',
    'Calgary Stampede nails',
    'downtown Calgary nails',
    'luxury nail salon Calgary',
    'professional nail care Calgary',
    'massage Calgary',
    'hot stone massage Calgary',
    'relaxation massage Calgary',
    'massage therapy Calgary',
    'waxing Calgary',
    'Brazilian waxing Calgary',
    'facial waxing Calgary',
    'facial Calgary',
    'nail salon near me',
    'nail salon near Calgary Stampede',
    'premium nail salon Calgary',
    'nail spa Calgary',
  ],
  authors: [
    {
      name: 'Victoria Park Nails and Spa',
      url: 'https://www.vpnail.com',
    },
  ],
  business: {
    name: 'Victoria Park Nails and Spa',
    tagline: 'Experience Tranquility. Unveil Your Radiance.',
    address: {
      street: '1411 1st Street SE',
      city: 'Calgary',
      province: 'AB',
      postalCode: 'T2G 2J3',
      country: 'Canada',
      mapUrl: 'https://maps.app.goo.gl/GU1sKoYod4EjEQp56',
    },
    phone: '(403) 719-3600',
    email: 'calgaryvpark@gmail.com',
    bookingUrl: 'https://victoriaparknailsspa.setmore.com/',
    hours: [
      { day: 'Monday', hours: '10:00 AM - 7:00 PM' },
      { day: 'Tuesday', hours: '10:00 AM - 7:00 PM' },
      { day: 'Wednesday', hours: '10:00 AM - 7:00 PM' },
      { day: 'Thursday', hours: '10:00 AM - 7:00 PM' },
      { day: 'Friday', hours: '10:00 AM - 7:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 5:30 PM' },
      { day: 'Sunday', hours: '10:00 AM - 5:30 PM' },
    ],
    holidayHours: '10:00 AM - 5:30 PM',
    founded: '2015',
  },
  social: {
    facebook: 'https://www.facebook.com/victoriaparknails',
    instagram: 'https://www.instagram.com/victoriaparknails',
    tiktok: 'https://www.tiktok.com/@victoriaparknails',
    email: 'mailto:calgaryvpark@gmail.com',
    phone: 'tel:+14037193600',
  },
  links: {
    facebook: 'https://www.facebook.com/victoriaparknails',
    instagram: 'https://www.instagram.com/victoriaparknails',
    tiktok: 'https://www.tiktok.com/@victoriaparknails',
    email: 'mailto:calgaryvpark@gmail.com',
    phone: 'tel:+14037193600',
    booking: 'https://victoriaparknailsspa.setmore.com/',
  },
  announcement: {
    enabled: true,
    message: 'NEW! Reward & Redeem Points Program - Earn points with every visit - Ask us how to start earning today!',
  },
  location: {
    coordinates: {
      lat: 51.038759655101806,
      lng: -114.0613124644176,
    },
    parking: {
      lat: 51.038970063563234,
      lng: -114.06128717486601,
    },
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.7772221623454!2d-114.0613071!3d51.0387352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170049b78cad1%3A0xf36de94f8f653d9a!2sVictoria%20Park%20Nails%20and%20Spa!5e0!3m2!1sen!2sca!4v1763939836429!5m2!1sen!2sca',
    streetViewEmbedUrl:
      'https://www.google.com/maps/embed?pb=!4v1763887397939!6m8!1m7!1s_EkkOWxZK4eChv4gkC4R3Q!2m2!1d51.03873346378575!2d-114.0609939510665!3f309.1331154682398!4f0.9946950430054073!5f2.278747367825379',
  },
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
} satisfies SiteConfig

// Derived constants for easy access
export const CONTACT_INFO = {
  phone: siteConfig.business.phone,
  email: siteConfig.business.email,
  address: `${siteConfig.business.address.street}, ${siteConfig.business.address.city}, ${siteConfig.business.address.province} ${siteConfig.business.address.postalCode}`,
  fullAddress: siteConfig.business.address,
} as const

export const SOCIAL_LINKS = siteConfig.social
