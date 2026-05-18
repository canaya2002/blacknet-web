import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Common AI scrapers we don't want indexing for unsupervised LLM training.
      // Search engine crawlers (Googlebot, Bingbot, etc.) are NOT blocked here.
      {
        userAgent: ['GPTBot', 'CCBot', 'ChatGPT-User', 'anthropic-ai', 'Claude-Web'],
        disallow: ['/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
