import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function AnimatedShinyText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 bg-clip-text text-transparent',
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(110deg, #71717a 30%, #ffffff 50%, #71717a 70%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s ease-in-out infinite',
      }}
    >
      {children}
    </span>
  );
}
