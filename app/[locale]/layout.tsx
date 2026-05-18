import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { GlobalBackground } from '@/components/layout/global-background';
import { JsonLd, organizationSchema } from '@/components/seo/structured-data';
import { SmoothScroll } from '@/components/animations/smooth-scroll';

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
    <NextIntlClientProvider>
      <JsonLd data={organizationSchema} />
      <GlobalBackground />
      <SmoothScroll />
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
