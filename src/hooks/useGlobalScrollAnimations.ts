import { useEffect } from 'react';

/**
 * Clean & Simple Bidirectional Scroll Observer
 * Consistently triggers simple fade-in on BOTH Scroll Down and Scroll Up.
 */
export function useGlobalScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-item, .scroll-reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right, .spotlight-card, .glass-card').forEach(el => {
        el.classList.add('revealed', 'is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed', 'is-visible');
          } else {
            // Remove classes when off-screen so scrolling back into view re-triggers animation
            entry.target.classList.remove('revealed', 'is-visible');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px'
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-item, .scroll-reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right, .spotlight-card, .glass-card'
      );
      targets.forEach((el) => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
