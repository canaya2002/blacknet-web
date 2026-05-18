import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { routing } from '@/i18n/routing';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com';

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
  '/privacy',
  '/terms',
  '/cookies',
  '/dpa',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l === 'es' ? 'es-MX' : 'en-US', `${base}/${l}${p}`]),
        ),
      },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    posts.map((p) => ({
      url: `${base}/${locale}/blog/${p.slug}`,
      lastModified: new Date(p.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  );

  return [...staticEntries, ...postEntries];
}
