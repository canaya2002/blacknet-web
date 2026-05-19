import type { ComponentType, SVGProps } from 'react';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { NewsletterForm } from '@/components/forms/newsletter-form';
import { TrackedExternalLink } from '@/components/analytics/tracked-external-link';

type IconProps = SVGProps<SVGSVGElement>;

const LinkedInIcon: ComponentType<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5.001A2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3V9zm7 0h3.84v1.64h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21H18.6v-5.55c0-1.32-.03-3.02-1.84-3.02-1.85 0-2.13 1.44-2.13 2.92V21H10V9z" />
  </svg>
);

const GithubIcon: ComponentType<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.02c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.04.78 2.1v3.11c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const XIcon: ComponentType<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.013L4.6 22H1.343l8.02-9.165L1 2h7.014l4.847 6.41L18.244 2zm-2.4 18h1.89L7.262 4H5.244l10.6 16z" />
  </svg>
);

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

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/blacknel',
    destination: 'linkedin' as const,
    icon: LinkedInIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/blacknel-app',
    destination: 'github' as const,
    icon: GithubIcon,
  },
  {
    name: 'X',
    href: 'https://x.com/blacknelapp',
    destination: 'twitter' as const,
    icon: XIcon,
  },
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
                <NewsletterForm sourceLocation="footer" />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socials.map((s) => (
                <TrackedExternalLink
                  key={s.name}
                  href={s.href}
                  destination={s.destination}
                  ariaLabel={s.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-fg-secondary)] backdrop-blur transition-colors hover:border-[color:var(--color-border-hover)] hover:text-[color:var(--color-fg)]"
                >
                  <s.icon className="h-4 w-4" />
                </TrackedExternalLink>
              ))}
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
