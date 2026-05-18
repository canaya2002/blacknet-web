import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  variant?: 'full' | 'mark';
  size?: number;
};

export function Logo({ className, variant = 'full', size = 28 }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-semibold text-[color:var(--color-fg)]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative inline-flex shrink-0"
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-60 blur-md"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)',
          }}
        />
        <Image
          src="/logos/BlackNelLog.png"
          alt=""
          width={size}
          height={size}
          priority
          className="relative h-full w-full object-contain"
          style={{
            filter: 'brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.35))',
          }}
        />
      </span>
      {variant === 'full' && (
        <span className="text-base tracking-tight">Blacknel</span>
      )}
    </span>
  );
}
