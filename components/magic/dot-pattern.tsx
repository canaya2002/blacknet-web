import { cn } from '@/lib/utils';

export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 dot-pattern',
        '[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]',
        className,
      )}
    />
  );
}
