'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function Spotlight({
  className,
  size = 600,
}: {
  className?: string;
  size?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setOpacity(1);
    };
    const onLeave = () => setOpacity(0);

    const parent = el.parentElement;
    parent?.addEventListener('mousemove', onMove);
    parent?.addEventListener('mouseleave', onLeave);
    return () => {
      parent?.removeEventListener('mousemove', onMove);
      parent?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className="absolute rounded-full transition-opacity duration-500 ease-out"
        style={{
          width: size,
          height: size,
          left: position.x - size / 2,
          top: position.y - size / 2,
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%)',
          opacity,
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}
