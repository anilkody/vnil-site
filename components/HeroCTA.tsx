'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BookCallLink from './BookCallLink';

/**
 * The one CTA button used site-wide (hero, home About, /about, 404).
 * Only the label (and where it links) changes; size, spacing and the
 * text + arrow roll animation are identical everywhere.
 *
 * Animation: the label rolls via the global .btn-roll effect; the arrow is a real
 * SVG icon that rolls with the same duration/easing, starting at the end of the
 * label's stagger (see .cta-arrow in globals.css).
 */
const BUTTON_CLASS =
  'group inline-flex items-center gap-4 text-[17px] md:text-[22px] font-medium tracking-[-0.04em] md:tracking-[-0.06em] leading-[1.25] text-brand-black focus:outline-none cursor-pointer no-underline';

const ARROW_CLASS = 'w-[18px] h-[18px] md:w-[22px] md:h-[22px] shrink-0';

const Content = ({ label, children }: { label: string; children?: React.ReactNode }) => (
  <>
    <span className="inline-flex items-center gap-2">
      <span className="btn-roll py-0.5">{label}</span>
      <span
        className="cta-arrow w-[18px] h-[18px] md:w-[22px] md:h-[22px]"
        style={{ ['--arrow-delay' as string]: `${label.length * 0.012}s` }}
        aria-hidden="true"
      >
        <ArrowRight className={`cta-arrow-glyph cta-arrow-top ${ARROW_CLASS}`} strokeWidth={1.75} />
        <ArrowRight className={`cta-arrow-glyph cta-arrow-bottom ${ARROW_CLASS}`} strokeWidth={1.75} />
      </span>
    </span>
    {children}
  </>
);

interface HeroCTAProps {
  label: string;
  /** Booking CTA: opens cal.com/itsvnil in a new tab and fires GA4 cta_click with this location */
  bookingLocation?: string;
  /** Internal link (used when bookingLocation is not set) */
  href?: string;
  /** Optional extras rendered after the arrow inside the same link (hero avatar badges) */
  children?: React.ReactNode;
}

export default function HeroCTA({ label, bookingLocation, href = '/', children }: HeroCTAProps) {
  if (bookingLocation) {
    return (
      <BookCallLink location={bookingLocation} label={label} className={BUTTON_CLASS}>
        <Content label={label}>{children}</Content>
      </BookCallLink>
    );
  }
  return (
    <Link href={href} className={BUTTON_CLASS}>
      <Content label={label}>{children}</Content>
    </Link>
  );
}
