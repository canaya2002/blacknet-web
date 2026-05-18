import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center mx-auto max-w-3xl' : 'items-start',
        className,
      )}
    >
      {eyebrow && (
        <Badge variant="mono" className="uppercase">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-gradient md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-pretty max-w-2xl text-base text-[color:var(--color-fg-secondary)] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
