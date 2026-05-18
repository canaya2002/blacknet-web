'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

export function NumberCounter({
  to,
  duration = 1.4,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  // Lazy initialiser: server-render with the final target so SSR shows the real
  // number (avoiding the "0" flash). Client hydration drops to 0 only after the
  // element enters the viewport, then animates up.
  const [value, setValue] = useState<number>(to);
  const animationStartedRef = useRef(false);

  useEffect(() => {
    if (!inView || animationStartedRef.current) return;
    animationStartedRef.current = true;
    setValue(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const display = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      ref={ref}
      className="mono tabular-nums"
      aria-label={`${prefix}${to.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
