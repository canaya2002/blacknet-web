import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { GlobalBackground } from '@/components/layout/global-background';
import { JsonLd, organizationSchema, softwareApplicationSchema } from '@/components/seo/structured-data';
import { SmoothScroll } from '@/components/animations/smooth-scroll';
import { Plausible } from '@/components/seo/plausible';
import { Analytics } from '@vercel/analytics/next';
import '../globals.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Blacknel — AI-native presence for modern brands',
    template: '%s · Blacknel',
  },
  description:
    'Blacknel unifies social, reviews, ads, and AI in one platform built for agencies, multi-location brands, and franchises in LATAM and the US.',
  keywords: [
    'social media management',
    'unified inbox',
    'reputation management',
    'AI marketing',
    'multi-tenant SaaS',
    'hootsuite alternative',
    'sprout social alternative',
    'birdeye alternative',
    'WhatsApp Business',
    'agency tools',
  ],
  applicationName: 'Blacknel',
  authors: [{ name: 'Blacknel', url: baseUrl }],
  creator: 'Blacknel',
  publisher: 'Blacknel',
  category: 'business',
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  referrer: 'origin-when-cross-origin',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://app.blacknel.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.blacknel.com" />
        <link rel="dns-prefetch" href="https://api.blacknel.com" />
      </head>
      <body>
        <NextIntlClientProvider>
          <JsonLd data={organizationSchema} />
          <JsonLd data={softwareApplicationSchema} />
          <GlobalBackground />
          <SmoothScroll />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
        </NextIntlClientProvider>
        <Plausible />
        <Analytics />
      </body>
    </html>
  );
}
