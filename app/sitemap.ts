import fs from 'node:fs';
import path from 'node:path';
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site.config';

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

  const staticContentSources: Record<string, string[]> = {
    '/': ['features', 'home', 'page.tsx'],
    '/services': ['features', 'services', 'page.tsx'],
    '/contact': ['features', 'contact', 'page.tsx'],
    '/gallery': ['features', 'gallery', 'page.tsx'],
    '/privacy': ['features', 'privacy', 'page.tsx'],
    '/terms': ['features', 'terms', 'page.tsx'],
    '/accessibility': ['features', 'accessibility', 'page.tsx'],
  };

  const staticPages: MetadataRoute.Sitemap = Object.entries(staticContentSources).map(
    ([route, source]) => {
      const lastModified = getLastModified(...source);
      return {
        url: route === '/' ? baseUrl : `${baseUrl}${route}`,
        ...(lastModified ? { lastModified } : {}),
      };
    }
  );

  return staticPages;
}
