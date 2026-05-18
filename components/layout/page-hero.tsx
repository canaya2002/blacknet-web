import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
  variant?: 'default' | 'compact' | 'wide' | 'split';
  visual?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  children,
  variant = 'default',
  visual,
}: PageHeroProps) {
  const isCompact = variant === 'compact';
  const isWide = variant === 'wide';
  const isSplit = variant === 'split' && Boolean(visual);

  const TextContent = (
    <div
      className={cn(
        'relative flex flex-col gap-6',
        isSplit
          ? 'items-center text-center lg:items-start lg:text-left'
          : align === 'center'
            ? cn('mx-auto items-center text-center', isWide ? 'max-w-5xl' : 'max-w-3xl')
            : 'items-start',
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'flex items-center gap-2',
            isSplit ? 'justify-center lg:justify-start' : align === 'center' ? 'justify-center' : 'justify-start',
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-6 bg-gradient-to-r from-transparent via-white/40 to-white/40"
          />
          <Badge variant="mono" className="uppercase">
            {eyebrow}
          </Badge>
          <span
            aria-hidden="true"
            className="h-px w-6 bg-gradient-to-l from-transparent via-white/40 to-white/40"
          />
        </div>
      )}

      <h1
        className={cn(
          'text-balance font-semibold tracking-[-0.04em] text-gradient-strong',
          isCompact
            ? 'text-4xl md:text-5xl lg:text-6xl'
            : isSplit
              ? 'text-5xl md:text-6xl xl:text-7xl'
              : 'text-5xl md:text-6xl lg:text-7xl xl:text-[88px] xl:leading-[0.95]',
        )}
        style={{ filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.08))' }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className={cn(
            'text-pretty text-base text-[color:var(--color-fg-secondary)] md:text-lg',
            isSplit ? 'max-w-xl' : 'max-w-2xl',
          )}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );

  return (
    <section
      className={cn(
        'relative isolate overflow-visible',
        isCompact ? 'pb-12 pt-20 md:pt-24' : 'pb-20 pt-24 md:pb-28 md:pt-32',
        isSplit && 'md:pb-32',
        className,
      )}
    >
      {/* Soft top arc only — grid lives globally so it never cuts at section edges */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 80% at 50% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%)',
          }}
        />
      </div>

      <div className="container-page relative z-10">
        {isSplit ? (
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {TextContent}
            <div className="flex justify-center lg:justify-end">{visual}</div>
          </div>
        ) : (
          TextContent
        )}
      </div>
    </section>
  );
}
