'use client';

import { ChevronDown } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Item = {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
};

export function NavDropdown({
  label,
  items,
  cta,
}: {
  label: string;
  items: Item[];
  cta?: {
    title: string;
    description: string;
    href: string;
    eyebrow?: string;
    ctaLabel?: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors',
          open
            ? 'text-[color:var(--color-fg)]'
            : 'text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)]',
        )}
      >
        {label}
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
        />
      </button>

      <div
        className={cn(
          'absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <div
          role="menu"
          className="overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--color-bg-secondary)]/95 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl"
          style={{ minWidth: cta ? 560 : 320 }}
        >
          <div className={cn('grid gap-1', cta ? 'grid-cols-[1fr_240px]' : 'grid-cols-1')}>
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
                  onClick={() => setOpen(false)}
                >
                  {item.icon && (
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-[color:var(--color-fg)] transition-colors group-hover:border-white/20">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[color:var(--color-fg)]">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 mono text-[9px] uppercase tracking-wider text-emerald-300">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-[color:var(--color-fg-tertiary)]">
                      {item.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            {cta && (
              <Link
                href={cta.href}
                className="group relative ml-2 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-4 transition-colors hover:border-white/20"
                onClick={() => setOpen(false)}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      'radial-gradient(at 80% 0%, rgba(168,85,247,0.18), transparent 60%)',
                  }}
                />
                <div className="relative flex h-full flex-col gap-2">
                  <span className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {cta.eyebrow ?? 'Featured'}
                  </span>
                  <span className="text-sm font-medium text-[color:var(--color-fg)]">
                    {cta.title}
                  </span>
                  <span className="text-xs text-[color:var(--color-fg-tertiary)]">
                    {cta.description}
                  </span>
                  <span className="mt-auto mono text-[11px] text-[color:var(--color-fg-secondary)] group-hover:text-white">
                    {cta.ctaLabel ?? 'Read more →'}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
