'use client';
import { useEffect } from 'react';

export function useReveal(options: IntersectionObserverInit = {}): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!elements.length) return;

    const { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.1 } = options;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.dataset.reveal = 'in';
            intersectionObserver.unobserve(element);
          }
        });
      },
      { root, rootMargin, threshold },
    );

    elements.forEach((element, i) => {
      if (!element.style.transitionDelay) {
        element.style.transitionDelay = `${(i % 6) * 80}ms`;
      }
      intersectionObserver.observe(element);
    });

    return () => intersectionObserver.disconnect();
  }, [options]);
}
