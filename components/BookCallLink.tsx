'use client';

import { BOOKING_URL } from '@/lib/links';
import { trackEvent } from '@/lib/analytics';

interface BookCallLinkProps {
  /** Where the CTA lives, e.g. "header", "hero", "home_about" (sent to GA4 as cta_location) */
  location: string;
  /** Visible label, sent to GA4 as cta_text */
  label: string;
  className?: string;
  children: React.ReactNode;
}

export default function BookCallLink({ location, label, className, children }: BookCallLinkProps) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent('cta_click', { cta_location: location, cta_text: label, link_url: BOOKING_URL })
      }
    >
      {children}
    </a>
  );
}
