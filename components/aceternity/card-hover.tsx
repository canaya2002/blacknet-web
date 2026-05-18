'use client';

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function GlowCard({
  children,
  className,
  glowColor = 'rgba(255,255,255,0.18)',
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        'relative overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur-md transition-colors duration-300 hover:border-[color:var(--color-border-hover)]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
