'use client';

import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { pickLocale, trackEvent } from '@/lib/analytics';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: string) => {
    const to = pickLocale(next);
    const from = pickLocale(locale);
    if (from !== to) {
      trackEvent('language_switched', {
        from,
        to,
        page: typeof window !== 'undefined' ? window.location.pathname : pathname,
      });
    }
    startTransition(() => {
      router.replace(pathname, { locale: next as (typeof routing.locales)[number] });
    });
  };

  return (
    <Select value={locale} onValueChange={onChange} disabled={isPending}>
      <SelectTrigger
        aria-label="Language"
        className="h-9 w-auto gap-1.5 border-transparent bg-transparent px-2 hover:bg-white/[0.04]"
      >
        <Globe className="h-4 w-4 opacity-70" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
