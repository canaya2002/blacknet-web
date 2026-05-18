import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const immutableCacheControl = {
  key: 'Cache-Control',
  value: 'public, max-age=31536000, immutable',
};

const cacheControl = [
  {
    source: '/:path*.svg',
    headers: [immutableCacheControl],
  },
  {
    source: '/:path*.png',
    headers: [immutableCacheControl],
  },
  {
    source: '/:path*.jpg',
    headers: [immutableCacheControl],
  },
  {
    source: '/:path*.jpeg',
    headers: [immutableCacheControl],
  },
  {
    source: '/:path*.webp',
    headers: [immutableCacheControl],
  },
  {
    source: '/:path*.avif',
    headers: [immutableCacheControl],
  },
  {
    source: '/:path*.ico',
    headers: [immutableCacheControl],
  },
  {
    source: '/:path*.woff2',
    headers: [immutableCacheControl],
  },
  {
    source: '/_next/static/:path*',
    headers: [immutableCacheControl],
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.blacknel.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion', '@react-three/drei'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      ...cacheControl,
    ];
  },
};

export default withNextIntl(nextConfig);
