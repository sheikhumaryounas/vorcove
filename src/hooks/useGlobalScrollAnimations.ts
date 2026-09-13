import { useEffect } from 'react';

/**
 * Universal Bidirectional Scroll Animation Controller
 * Smoothly triggers animations on both scroll-down and scroll-up.
 * Zero flicker, zero premature unmounting, silky-smooth 60fps performance.
 */
export function useGlobalScrollAnimations() {
  useEffect(() => {
    const targetSelector =
      '.reveal-item, .reveal-left, .reveal-right, .reveal-scale, .reveal-up, .reveal-card, .reveal-heading, .scroll-reveal';

    // If user prefers reduced motion, reveal everything immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(targetSelector).forEach((el) => {
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
            entry.target.classList.remove('revealed', 'is-visible');
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '40px 0px -10px 0px'
      }
    );

    const observeTargets = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const targets = document.querySelectorAll(targetSelector);
      targets.forEach((el) => {
        // Reveal immediately if already within viewport on initial load
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          el.classList.add('revealed', 'is-visible');
        }
        observer.observe(el);
      });
    };

    // Initial pass
    observeTargets();

    // Re-scan when dynamic content changes or renders
    const mutationObserver = new MutationObserver(() => {
      observeTargets();
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
