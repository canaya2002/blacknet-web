import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { routing } from '@/i18n/routing';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com';

const commitmentSlugs = [
  'professional-development',
  'diversity-equity-inclusion',
  'sustainability',
  'social-impact',
  'work-life-balance',
];

const staticPaths = [
  '',
  '/features',
  '/pricing',
  '/customers',
  '/about',
  '/contact',
  '/integrations',
  '/changelog',
  '/blog',
  '/docs',
  '/status',
  '/security',
  '/careers',
  '/press',
  '/commitments',
  ...commitmentSlugs.map((s) => `/commitments/${s}`),
  '/privacy',
  '/data-deletion',
  '/terms',
  '/cookies',
  '/dpa',
];

function priorityFor(path: string): number {
  if (path === '') return 1.0;
  if (path === '/features' || path === '/pricing') return 0.9;
  if (path === '/customers' || path === '/integrations' || path === '/security' || path === '/about')
    return 0.8;
  if (path === '/blog' || path === '/changelog' || path === '/contact' || path === '/docs')
    return 0.7;
  if (path === '/commitments') return 0.7;
  if (path.startsWith('/commitments/')) return 0.65;
  if (path === '/careers' || path === '/press' || path === '/status') return 0.6;
  return 0.5;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Load posts for both locales (some may only exist in one language).
  const postsPerLocale = await Promise.all(
    routing.locales.map(async (l) => ({ locale: l, posts: await getAllPosts(l) })),
  );

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: priorityFor(p),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l === 'es' ? 'es-MX' : 'en-US', `${base}/${l}${p}`]),
        ),
      },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = postsPerLocale.flatMap(({ locale, posts }) =>
    posts.map((p) => ({
      url: `${base}/${locale}/blog/${p.slug}`,
      lastModified: new Date(p.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...postEntries];
}
