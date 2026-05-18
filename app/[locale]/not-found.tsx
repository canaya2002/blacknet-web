import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { AuroraBackground } from '@/components/aceternity/aurora-background';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-24">
      <AuroraBackground />
      <div className="container-page text-center">
        <p className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-fg-tertiary)]">
          Error 404
        </p>
        <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight text-gradient md:text-7xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-[color:var(--color-fg-secondary)]">
          The link is broken or the page was moved. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary" size="lg">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
