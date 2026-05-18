import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { NewsletterForm } from '@/components/forms/newsletter-form';

const columns = [
  {
    keyTitle: 'product' as const,
    links: [
      { href: '/features', key: 'features' },
      { href: '/pricing', key: 'pricing' },
      { href: '/integrations', key: 'integrations' },
      { href: '/changelog', key: 'changelog' },
    ],
  },
  {
    keyTitle: 'resources' as const,
    links: [
      { href: '/blog', key: 'blog' },
      { href: '/customers', key: 'customers' },
      { href: '/docs', key: 'docs' },
      { href: '/security', key: 'security' },
    ],
  },
  {
    keyTitle: 'company' as const,
    links: [
      { href: '/about', key: 'about' },
      { href: '/careers', key: 'careers' },
      { href: '/press', key: 'press' },
      { href: '/contact', key: 'contact' },
    ],
  },
] as const;

const legalLinks = [
  { href: '/privacy', key: 'privacy' as const },
  { href: '/terms', key: 'terms' as const },
  { href: '/cookies', key: 'cookies' as const },
  { href: '/dpa', key: 'dpa' as const },
  { href: '/status', key: 'statusPage' as const },
];

export function Footer() {
  const t = useTranslations('footer');
  const tnav = useTranslations('nav');
  const tc = useTranslations('common');
  // Helper to read optional keys without throwing in i18n strict mode.
  const tHas = (key: string): string => {
    try {
      return t(key);
    } catch {
      return '';
    }
  };
  const contactEmail = tHas('contactEmail') || 'hello@blacknel.com';

  return (
    <footer className="relative mt-24 border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px">
        <div className="mx-auto h-full max-w-5xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-[color:var(--color-fg-secondary)]">
              {t('tagline')}
            </p>
            <p className="mt-2 text-xs text-[color:var(--color-fg-tertiary)]">{t('made')}</p>

            <div className="mt-6">
              <h3 className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {tc('newsletter.title')}
              </h3>
              <div className="mt-3 max-w-sm">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.keyTitle}>
                <h3 className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {t(col.keyTitle)}
                </h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-[color:var(--color-fg-secondary)] transition-colors hover:text-[color:var(--color-fg)]"
                      >
                        {tnav(l.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-[color:var(--color-border)] pt-8 md:flex-row md:items-center">
          <p className="text-xs text-[color:var(--color-fg-tertiary)]">
            © {new Date().getFullYear()} Blacknel. {t('rights')}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-xs text-[color:var(--color-fg-secondary)]">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[color:var(--color-fg)] transition-colors"
              >
                {t(l.key)}
              </Link>
            ))}
            <span className="inline-flex items-center gap-1.5 text-emerald-300/80">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t('status')}
            </span>
          </div>
          <a
            href={`mailto:${contactEmail}`}
            aria-label={contactEmail}
            className="inline-flex items-center gap-1.5 text-xs text-[color:var(--color-fg-tertiary)] transition-colors hover:text-[color:var(--color-fg)]"
          >
            <Mail className="h-3.5 w-3.5" />
            {contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
