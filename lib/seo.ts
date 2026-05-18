import type { Metadata } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com';

type SeoArgs = {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImage?: string;
};

export function siteUrl(path: string = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${clean}`;
}

export function buildMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
}: SeoArgs): Metadata {
  const url = siteUrl(`/${locale}${path === '/' ? '' : path}`);
  const image = ogImage ?? `/api/og?title=${encodeURIComponent(title)}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'es-MX': siteUrl(`/es${path === '/' ? '' : path}`),
        'en-US': siteUrl(`/en${path === '/' ? '' : path}`),
        'x-default': siteUrl(`/es${path === '/' ? '' : path}`),
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'Blacknel',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@blacknel',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}
