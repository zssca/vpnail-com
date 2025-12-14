import fs from 'node:fs';
import path from 'node:path';
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site.config';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface PageConfig {
  source: string[];
  priority: number;
  changeFrequency: ChangeFrequency;
}

function getLastModified(...segments: string[]) {
  try {
    const targetPath = path.join(process.cwd(), ...segments);
    const stats = fs.statSync(targetPath);
    return stats.mtime.toISOString();
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Page configurations with SEO priorities and update frequencies
  const pageConfigs: Record<string, PageConfig> = {
    '/': {
      source: ['features', 'home', 'page.tsx'],
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    '/services': {
      source: ['features', 'services', 'page.tsx'],
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    '/gallery': {
      source: ['features', 'gallery', 'page.tsx'],
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    '/contact': {
      source: ['features', 'contact', 'page.tsx'],
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    '/parking': {
      source: ['features', 'parking', 'page.tsx'],
      priority: 0.6,
      changeFrequency: 'monthly',
    },
    '/privacy': {
      source: ['features', 'privacy', 'page.tsx'],
      priority: 0.3,
      changeFrequency: 'yearly',
    },
    '/terms': {
      source: ['features', 'terms', 'page.tsx'],
      priority: 0.3,
      changeFrequency: 'yearly',
    },
    '/accessibility': {
      source: ['features', 'accessibility', 'page.tsx'],
      priority: 0.3,
      changeFrequency: 'yearly',
    },
  };

  const staticPages: MetadataRoute.Sitemap = Object.entries(pageConfigs).map(
    ([route, config]) => {
      const lastModified = getLastModified(...config.source);
      return {
        url: route === '/' ? baseUrl : `${baseUrl}${route}`,
        priority: config.priority,
        changeFrequency: config.changeFrequency,
        ...(lastModified ? { lastModified } : {}),
      };
    }
  );

  return staticPages;
}
