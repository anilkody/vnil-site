'use client';

import { useEffect, useRef } from 'react';

/**
 * Same interaction as Futured's custom cursor: a labelled disc appears over any
 * [data-cursor-text] element (the case-study cards) and follows the pointer.
 * Differences: frosted-glass disc instead of solid black, and a small follow lag
 * (eased lerp) instead of being locked to the mouse. The native cursor stays visible.
 * Desktop pointers only.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Fraction of the remaining distance covered per 60fps frame (lower = more lag)
    const FOLLOW = reduceMotion ? 1 : 0.16;

    let targetX = -200;
    let targetY = -200;
    let x = targetX;
    let y = targetY;
    let active = false;
    let raf = 0;
    let last = 0;
    let scrollQueued = false;

    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16.67;
      last = now;
      // Frame-rate independent easing
      const k = 1 - Math.pow(1 - FOLLOW, dt / 16.67);
      x += (targetX - x) * k;
      y += (targetY - y) * k;
      render();
      raf = active ? requestAnimationFrame(tick) : 0;
    };

    const activate = (label: string) => {
      textEl.textContent = label;
      if (active) return;
      active = true;
      // Start from the pointer so the disc doesn't sweep in from elsewhere
      x = targetX;
      y = targetY;
      render();
      el.classList.add('is-active');
      last = 0;
      raf = requestAnimationFrame(tick);
    };

    const deactivate = () => {
      if (!active) return;
      active = false;
      el.classList.remove('is-active');
    };

    const check = (target: Element | null) => {
      const labelled = target && (target as HTMLElement).closest
        ? (target as HTMLElement).closest<HTMLElement>('[data-cursor-text]')
        : null;
      if (labelled) activate(labelled.dataset.cursorText || '');
      else deactivate();
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      check(e.target as Element | null);
    };

    // Smooth scrolling moves cards under a still pointer: re-check what's underneath
    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        check(document.elementFromPoint(targetX, targetY));
      });
    };

    const onLeave = () => deactivate();

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div id="mouseCursor" ref={ref} aria-hidden="true">
      <div className="cursor-disc">
        <span className="cursor-text" ref={textRef} />
      </div>
    </div>
  );
}
