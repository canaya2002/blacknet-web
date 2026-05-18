import { cn } from '@/lib/utils';

/**
 * Local hero glow used on top of the global background.
 * Renders a soft top arc + a couple of color orbs. Grid is NOT included
 * here — it lives in GlobalBackground so it flows uninterrupted across sections.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      <div
        className="absolute -top-1/2 left-1/2 h-[700px] w-[1200px] -translate-x-1/2 opacity-60"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 50%, rgba(168,85,247,0.14) 0%, transparent 60%), radial-gradient(40% 30% at 30% 50%, rgba(96,165,250,0.12) 0%, transparent 60%), radial-gradient(40% 30% at 70% 50%, rgba(244,114,182,0.10) 0%, transparent 60%)',
          animation: 'aurora 24s ease infinite',
          backgroundSize: '200% 200%',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(circle, rgba(120,180,255,0.05), transparent 70%)',
        }}
      />
    </div>
  );
}
