'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const KEY = 'blacknel-cookie-ack';

export function CookieBanner() {
  const t = useTranslations('cookies.banner');
  // We start with `null` (unknown) so server-render matches the
  // first client render (banner hidden). After mount we read localStorage
  // and only flip to `true` if the user hasn't acknowledged.
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    // Reading localStorage is a browser-only side effect; we deliberately
    // sync external storage state into React on mount.
    let acknowledged = true;
    try {
      acknowledged = Boolean(localStorage.getItem(KEY));
    } catch {
      // no localStorage available; do not show banner
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(!acknowledged);
  }, []);

  if (show !== true) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      // ignore
    }
    setShow(false);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex w-full max-w-2xl items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]/90 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex-1">
          <p className="text-sm font-medium text-[color:var(--color-fg)]">{t('title')}</p>
          <p className="mt-1 text-xs text-[color:var(--color-fg-secondary)]">{t('body')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/cookies">{t('details')}</Link>
          </Button>
          <Button variant="primary" size="sm" onClick={dismiss}>
            {t('accept')}
          </Button>
          <button
            type="button"
            aria-label="Close"
            onClick={dismiss}
            className="rounded-md p-1 text-[color:var(--color-fg-tertiary)] hover:text-[color:var(--color-fg)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
