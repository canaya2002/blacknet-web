'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  Inbox,
  LineChart,
  Menu,
  Newspaper,
  Plug,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './logo';
import { LanguageSwitcher } from './language-switcher';
import { NavDropdown } from './nav-dropdown';

export function Header() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const productItems = [
    {
      title: t('features'),
      description: t('descriptions.features'),
      href: '/features',
      icon: <Sparkles className="h-3.5 w-3.5" />,
    },
    {
      title: t('pricing'),
      description: t('descriptions.pricing'),
      href: '/pricing',
      icon: <LineChart className="h-3.5 w-3.5" />,
    },
    {
      title: t('integrations'),
      description: t('descriptions.integrations'),
      href: '/integrations',
      icon: <Plug className="h-3.5 w-3.5" />,
    },
    {
      title: t('changelog'),
      description: t('descriptions.changelog'),
      href: '/changelog',
      icon: <Calendar className="h-3.5 w-3.5" />,
      badge: t('badges.new'),
    },
  ];

  const resourcesItems = [
    {
      title: t('blog'),
      description: t('descriptions.blog'),
      href: '/blog',
      icon: <Newspaper className="h-3.5 w-3.5" />,
    },
    {
      title: t('customers'),
      description: t('descriptions.customers'),
      href: '/customers',
      icon: <Inbox className="h-3.5 w-3.5" />,
    },
    {
      title: t('docs'),
      description: t('descriptions.docs'),
      href: '/docs',
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
    {
      title: t('security'),
      description: t('descriptions.security'),
      href: '/security',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
    },
  ];

  const companyItems = [
    {
      title: t('about'),
      description: t('descriptions.about'),
      href: '/about',
      icon: <Building2 className="h-3.5 w-3.5" />,
    },
    {
      title: t('careers'),
      description: t('descriptions.careers'),
      href: '/careers',
      icon: <Users2 className="h-3.5 w-3.5" />,
    },
    {
      title: t('press'),
      description: t('descriptions.press'),
      href: '/press',
      icon: <ScrollText className="h-3.5 w-3.5" />,
    },
    {
      title: t('contact'),
      description: t('descriptions.contact'),
      href: '/contact',
      icon: <ArrowRight className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-white/[0.06] bg-[color:var(--color-bg)]/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-[color:var(--color-bg)]/60'
          : 'border-b border-transparent bg-[color:var(--color-bg)]/0',
      )}
    >
      {/* Top thin gradient bar */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 -bottom-px h-px transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className="mx-auto h-full max-w-5xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-1.5 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            aria-label="Blacknel home"
            className="transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <NavDropdown
              label={t('product')}
              items={productItems}
              cta={{
                title: t('featured.title'),
                description: t('featured.description'),
                href: '/features',
                eyebrow: t('featured.label'),
                ctaLabel: t('featured.cta'),
              }}
            />
            <NavDropdown label={t('resources')} items={resourcesItems} />
            <NavDropdown label={t('company')} items={companyItems} />
            <Link
              href="/pricing"
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors',
                pathname.startsWith('/pricing')
                  ? 'text-[color:var(--color-fg)]'
                  : 'text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)]',
              )}
            >
              {t('pricing')}
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-white/10" />
          <Button asChild variant="ghost" size="sm">
            <a href="https://app.blacknel.com/login">{tc('signIn')}</a>
          </Button>
          <Button asChild variant="primary" size="sm">
            <a href="https://app.blacknel.com/signup">
              {tc('startTrial')}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={t('menu')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.02] text-[color:var(--color-fg)] backdrop-blur lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
            <Logo />

            <div className="mt-2 flex flex-col">
              {[
                { label: t('product'), items: productItems },
                { label: t('resources'), items: resourcesItems },
                { label: t('company'), items: companyItems },
              ].map((group) => (
                <div key={group.label} className="border-b border-white/[0.06] py-3">
                  <p className="mb-2 mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {group.label}
                  </p>
                  <div className="flex flex-col gap-1">
                    {group.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-[color:var(--color-fg)] hover:bg-white/[0.04]"
                      >
                        {it.icon && (
                          <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
                            {it.icon}
                          </span>
                        )}
                        {it.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                href="/pricing"
                className="border-b border-white/[0.06] py-3 text-base text-[color:var(--color-fg)]"
              >
                {t('pricing')}
              </Link>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <LanguageSwitcher />
              <Button asChild variant="primary" size="lg">
                <a href="https://app.blacknel.com/signup">{tc('startTrial')}</a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="https://app.blacknel.com/login">{tc('signIn')}</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
