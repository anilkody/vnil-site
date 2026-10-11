'use client';

import { useEffect } from 'react';

export default function BtnRollInitializer() {
  useEffect(() => {
    // Check if the current device/browser supports hover interactions
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    const initBtnRoll = (el: HTMLElement) => {
      if (el.dataset.btnRollInitialized === 'true') return;
      el.dataset.btnRollInitialized = 'true';

      const text = el.textContent || '';
      el.innerHTML = '';
      
      // 1. Screen Reader accessible element
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = text;
      el.appendChild(srText);
      
      // 2. Visual container
      const visualContainer = document.createElement('span');
      visualContainer.className = 'btn-roll-visual';
      visualContainer.setAttribute('aria-hidden', 'true');
      
      // Helper to generate a character span layer
      const makeLayer = (layerClass: string) => {
        const layer = document.createElement('span');
        layer.className = `btn-roll-layer ${layerClass}`;
        
        let charIndex = 0;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const span = document.createElement('span');
          span.className = 'btn-roll-char';
          
          if (char === ' ') {
            span.innerHTML = '&nbsp;';
          } else {
            span.textContent = char;
          }
          
          span.style.setProperty('--char-index', charIndex.toString());
          charIndex++;
          layer.appendChild(span);
        }
        return layer;
      };
      
      const topLayer = makeLayer('btn-roll-layer-top');
      const bottomLayer = makeLayer('btn-roll-layer-bottom');
      
      visualContainer.appendChild(topLayer);
      visualContainer.appendChild(bottomLayer);
      el.appendChild(visualContainer);

      // Animation State Machine (Ignored on touch-only devices)
      if (!supportsHover) return;

      const stagger = 0.012; // 12ms stagger
      const duration = 0.48; // 480ms duration
      const totalAnimationTime = (duration + text.length * stagger) * 1000;

      let state: 'idle' | 'animating-in' | 'hovered' | 'animating-out' = 'idle';
      let isMouseOver = false;
      let timeoutId: NodeJS.Timeout | null = null;

      const startHoverIn = () => {
        state = 'animating-in';
        el.classList.add('is-hovered');

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (isMouseOver) {
            state = 'hovered';
          } else {
            startHoverOut();
          }
        }, totalAnimationTime);
      };

      const startHoverOut = () => {
        state = 'animating-out';
        el.classList.remove('is-hovered');

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          state = 'idle';
          if (isMouseOver) {
            startHoverIn();
          }
        }, totalAnimationTime);
      };

      // Use the whole button/link as the hover target (not just the text span),
      // so hovering anywhere on the button (e.g. its background) triggers the text animation
      const hoverTarget = (el.closest('a, button') as HTMLElement | null) || el;

      hoverTarget.addEventListener('mouseenter', () => {
        isMouseOver = true;
        if (state === 'idle') {
          startHoverIn();
        }
      });

      hoverTarget.addEventListener('mouseleave', () => {
        isMouseOver = false;
        if (state === 'hovered') {
          startHoverOut();
        }
      });
    };

    // Scan initial elements
    document.querySelectorAll('.btn-roll').forEach((el) => {
      initBtnRoll(el as HTMLElement);
    });

    // Set up MutationObserver to handle dynamic additions/updates
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('btn-roll')) {
              initBtnRoll(node);
            }
            node.querySelectorAll('.btn-roll').forEach((el) => {
              initBtnRoll(el as HTMLElement);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
