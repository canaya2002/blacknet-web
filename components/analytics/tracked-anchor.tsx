'use client';

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import type { AnalyticsEvent } from '@/types/analytics';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event?: AnalyticsEvent;
  children: ReactNode;
};

export const TrackedAnchor = forwardRef<HTMLAnchorElement, Props>(
  ({ event, onClick, children, ...rest }, ref) => {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (event) {
        trackEvent(event.name, event.properties);
      }
      onClick?.(e);
    };
    return (
      <a ref={ref} {...rest} onClick={handleClick}>
        {children}
      </a>
    );
  },
);
TrackedAnchor.displayName = 'TrackedAnchor';
