import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { NewsletterForm } from '@/components/forms/newsletter-form';

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

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
          <div className="flex items-center gap-3 text-[color:var(--color-fg-tertiary)]">
            <a
              href="https://twitter.com/blacknel"
              aria-label="Twitter"
              className="hover:text-[color:var(--color-fg)] transition-colors"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/company/blacknel"
              aria-label="LinkedIn"
              className="hover:text-[color:var(--color-fg)] transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/blacknel"
              aria-label="GitHub"
              className="hover:text-[color:var(--color-fg)] transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
