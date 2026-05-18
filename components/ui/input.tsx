import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-4 py-2 text-sm text-[color:var(--color-fg)] backdrop-blur-sm transition-colors',
        'placeholder:text-[color:var(--color-fg-tertiary)]',
        'hover:border-[color:var(--color-border-hover)]',
        'focus-visible:outline-none focus-visible:border-white/30 focus-visible:bg-white/[0.04]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
