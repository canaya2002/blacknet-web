import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-fg-secondary)] backdrop-blur',
        outline: 'border-[color:var(--color-border-strong)] text-[color:var(--color-fg)]',
        accent:
          'border-white/15 bg-white/[0.06] text-white shadow-[0_0_24px_rgba(255,255,255,0.06)]',
        success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
        warning: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
        danger: 'border-red-500/20 bg-red-500/10 text-red-300',
        info: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
        mono: 'mono border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-fg-secondary)] uppercase tracking-wider text-[10px]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
