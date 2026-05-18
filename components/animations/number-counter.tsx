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
  // Start at the target value so SSR and initial hydration paint the real
  // number — the counter only resets to 0 and animates after mount + intersection.
  const [value, setValue] = useState(to);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setValue(0);
  }, []);

  useEffect(() => {
    if (!mounted || !inView) return;
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
  }, [mounted, inView, to, duration]);

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
