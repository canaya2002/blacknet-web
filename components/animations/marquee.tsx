import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  className,
  speed = 'normal',
}: {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}) {
  const durationMap = { slow: '60s', normal: '40s', fast: '24s' };
  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden mask-fade-x',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-8 pr-8',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${durationMap[speed]} linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
