import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
};

export default withNextIntl(nextConfig);
