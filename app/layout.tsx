import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Plausible } from '@/components/seo/plausible';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com'),
  title: {
    default: 'Blacknel — AI-native presence for modern brands',
    template: '%s · Blacknel',
  },
  description:
    'Blacknel unifies social, reviews, ads, and AI in one platform built for agencies, multi-location brands, and franchises in LATAM and the US.',
  applicationName: 'Blacknel',
  authors: [{ name: 'Blacknel' }],
  creator: 'Blacknel',
  publisher: 'Blacknel',
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        {children}
        <Plausible />
      </body>
    </html>
  );
}
