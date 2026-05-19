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
      // Explicit allowlist for social-media preview/validator bots.
      // Some validators (Meta Sharing Debugger, etc.) check for explicit
      // user-agent rules and emit warnings otherwise.
      {
        userAgent: ['facebookexternalhit', 'Facebot'],
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'Slackbot',
        allow: '/',
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
      },
      {
        userAgent: 'TelegramBot',
        allow: '/',
      },
      {
        userAgent: 'Discordbot',
        allow: '/',
      },
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Pinterestbot',
        allow: '/',
      },
      {
        userAgent: 'redditbot',
        allow: '/',
      },
      {
        userAgent: 'TikTokBot',
        allow: '/',
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
