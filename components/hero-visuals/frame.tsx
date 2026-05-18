import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Premium visual frame shared by every page hero on the right column.
 * Provides perspective tilt, layered glow, and concentric border.
 */
export function VisualFrame({
  children,
  className,
  tilt = true,
  glow = 'purple',
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: 'purple' | 'blue' | 'pink' | 'amber' | 'emerald';
}) {
  const glowColors: Record<NonNullable<typeof glow>, string> = {
    purple:
      'radial-gradient(ellipse, rgba(168,85,247,0.35), rgba(96,165,250,0.20) 40%, transparent 70%)',
    blue:
      'radial-gradient(ellipse, rgba(96,165,250,0.35), rgba(244,114,182,0.18) 45%, transparent 70%)',
    pink:
      'radial-gradient(ellipse, rgba(244,114,182,0.30), rgba(168,85,247,0.20) 45%, transparent 70%)',
    amber:
      'radial-gradient(ellipse, rgba(251,191,36,0.25), rgba(244,114,182,0.18) 45%, transparent 70%)',
    emerald:
      'radial-gradient(ellipse, rgba(74,222,128,0.25), rgba(96,165,250,0.18) 45%, transparent 70%)',
  };

  return (
    <div
      className={cn(
        'relative w-full max-w-[560px]',
        tilt && 'lg:[perspective:1800px]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-4 bottom-[-30px] h-32 rounded-full blur-3xl"
        style={{ background: glowColors[glow] }}
      />
      <div
        className="relative"
        style={tilt ? { transformStyle: 'preserve-3d', transform: 'rotateX(6deg) rotateY(-4deg)' } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
