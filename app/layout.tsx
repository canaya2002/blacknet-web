import type { ReactNode } from 'react';

// Per next-intl + Next.js 16 app router: the <html> and <body> live in
// app/[locale]/layout.tsx so the lang attribute reflects the active locale.
// This wrapper exists only to satisfy the root layout convention.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
