'use client';

import { createElement, useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '@/lib/gsap';

export type RevealType = 'lines' | 'chars' | 'words' | 'fade';

interface RevealProps {
  as?: ElementType;
  type?: RevealType;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** ScrollTrigger start, e.g. "top 90%". */
  start?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Zeyna text/section reveal (`peTextAnimation`): lines/chars/words rise out of a mask
 * with expo.out; blocks fade up. Waits for loader/transitions, triggers on scroll.
 */
export default function Reveal({
  as = 'div',
  type = 'lines',
  delay = 0,
  duration,
  stagger,
  start = 'top 92%',
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add('reveal-ready');
      return;
    }

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    const build = () => {
      if (cancelled) return;

      if (type === 'fade') {
        tween = gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: duration ?? 1.2,
            delay,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start, once: true },
          }
        );
        el.classList.add('reveal-ready');
        return;
      }

      const isChars = type === 'chars';
      const isWords = type === 'words';
      split = SplitText.create(el, {
        type: isChars ? 'chars,words' : isWords ? 'words' : 'lines',
        mask: isChars ? 'chars' : isWords ? 'words' : 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) => {
          const targets = isChars ? self.chars : isWords ? self.words : self.lines;
          tween?.scrollTrigger?.kill();
          tween?.kill();
          tween = gsap.from(targets, {
            yPercent: 110,
            duration: duration ?? (isChars ? 1.2 : 1.4),
            delay,
            stagger: stagger ?? (isChars ? 0.025 : 0.12),
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start, once: true },
          });
          return tween;
        },
      });
      el.classList.add('reveal-ready');
    };

    // VNIL has no loader/page-wipe to wait for: build once fonts are ready
    const run = () => {
      if (!cancelled) build();
    };
    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [type, delay, duration, stagger, start]);

  return createElement(
    as,
    { ref, className, style, 'data-reveal': type },
    children
  );
}

export { ScrollTrigger };
