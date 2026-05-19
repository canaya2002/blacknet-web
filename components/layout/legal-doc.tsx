import type { ReactNode } from 'react';

export function LegalDoc({ children }: { children: ReactNode }) {
  return (
    <article className="container-page mx-auto max-w-3xl pb-24">
      <div className="prose-legal">{children}</div>
    </article>
  );
}

export function LegalSection({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-[color:var(--color-fg-secondary)]">
        {children}
      </div>
    </section>
  );
}
