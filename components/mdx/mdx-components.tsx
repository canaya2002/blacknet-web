import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn('mt-12 text-3xl font-semibold tracking-tight text-gradient md:text-4xl', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn('mt-12 text-2xl font-semibold tracking-tight text-[color:var(--color-fg)] md:text-3xl', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn('mt-8 text-xl font-semibold tracking-tight text-[color:var(--color-fg)]', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn('mt-4 text-base leading-relaxed text-[color:var(--color-fg-secondary)]', className)}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'text-[color:var(--color-fg)] underline underline-offset-4 decoration-white/30 hover:decoration-white',
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('mt-4 flex flex-col gap-2 pl-5 text-[color:var(--color-fg-secondary)] list-disc marker:text-white/40', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('mt-4 flex flex-col gap-2 pl-5 text-[color:var(--color-fg-secondary)] list-decimal marker:text-white/40', className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn('leading-relaxed', className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-white/30 bg-white/[0.02] py-3 pl-5 italic text-[color:var(--color-fg)]',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'mono rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.875em] text-[color:var(--color-fg)]',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mono mt-6 overflow-x-auto rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-4 text-sm leading-relaxed',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn('my-10 border-t border-[color:var(--color-border)]', className)} {...props} />
  ),
};
