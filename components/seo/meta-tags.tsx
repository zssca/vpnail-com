import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config/site.config'

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

export function generateMetaTags({
  title,
  description,
  keywords = [],
  image = '/images/ui/placeholder.svg',
  url = siteConfig.url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = siteConfig.name,
  noindex = false,
}: MetaTagsProps): Metadata {
  const city = siteConfig.business.address.city
  const fullTitle = `${title} | ${siteConfig.name}${city ? ` ${city}` : ''}`
  const fullImageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
  
  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords].join(', '),
    authors: [{ name: author }],
    creator: siteConfig.creator,
    publisher: siteConfig.business.name,
    metadataBase: new URL(siteConfig.url),
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_CA',
      type: type === 'article' ? 'article' : 'website',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: siteConfig.creator,
    },
    
    // Additional meta tags
    alternates: {
      canonical: url,
    },
    
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification tags
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? 'ui2QmsBUe9UxFkSEGhEoVgoy_V2K-qRywpR7hLEMZko',
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    },
  };
}

// Service-specific meta tags generator
export function generateServiceMetaTags(service: {
  name: string;
  shortDescription: string;
  slug: string;
  image?: string;
  pricing?: { basePrice: { displayPrice: string } };
}): Metadata {
  const price = service.pricing?.basePrice.displayPrice || '';
  const title = `${service.name} Calgary${price ? ` - ${price}` : ''}`;
  
  return generateMetaTags({
    title,
    description: service.shortDescription,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} Calgary`,
      'Calgary aesthetic treatment',
      `${siteConfig.name} ${siteConfig.business.address.city}`,
    ],
    image: service.image,
    url: `${siteConfig.url}/services/${service.slug}`,
    type: 'article',
  });
}
