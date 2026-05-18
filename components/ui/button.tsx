import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]',
        secondary:
          'border border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-fg)] backdrop-blur hover:bg-[color:var(--color-card-hover)] hover:border-[color:var(--color-border-hover)]',
        ghost:
          'text-[color:var(--color-fg-secondary)] hover:bg-white/[0.04] hover:text-[color:var(--color-fg)]',
        outline:
          'border border-[color:var(--color-border-strong)] text-[color:var(--color-fg)] hover:bg-white/[0.04] hover:border-white/30',
        link: 'text-[color:var(--color-fg)] underline-offset-4 hover:underline',
        danger: 'bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-5',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
