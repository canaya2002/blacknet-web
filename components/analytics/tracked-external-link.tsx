'use client';

import type { ReactNode } from 'react';
import { TrackedAnchor } from '@/components/analytics/tracked-anchor';
import type { ExternalDestination } from '@/types/analytics';

type Props = {
  href: string;
  destination: ExternalDestination;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export function TrackedExternalLink({ href, destination, className, ariaLabel, children }: Props) {
  return (
    <TrackedAnchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      event={{
        name: 'external_link_clicked',
        properties: {
          destination,
          source_page: typeof window === 'undefined' ? '' : window.location.pathname,
        },
      }}
    >
      {children}
    </TrackedAnchor>
  );
}
