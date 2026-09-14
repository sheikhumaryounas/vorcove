import { useEffect } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

/**
 * Universal helper to smoothly scroll to any element target, selector, or numeric offset.
 * Integrates with Lenis when active, falling back to window scroll.
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) {
  if (globalLenis) {
    globalLenis.scrollTo(target, {
      offset: options?.offset ?? (typeof target === 'number' ? 0 : -80),
      duration: options?.duration ?? 1.1,
      immediate: options?.immediate ?? false,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    } else if (target) {
      target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
    }
  }
}

/**
 * Universal High-Performance Repeatable Scroll & Reveal Animation Controller
 * - Silky smooth momentum scrolling with Lenis (60-120fps).
 * - Repeatable Bidirectional Animations: Triggers smoothly every time an element
 *   enters the viewport, whether scrolling down or up.
 * - Mutation-Resilient: React state changes and re-renders NEVER cause elements
 *   to get stuck in hidden opacity: 0 state.
 */
export function useGlobalScrollAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Initialize Lenis Smooth Scrolling Engine
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
        infinite: false,
      });

      globalLenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }

    // 2. Target Selector for all Animated Elements across the Website
    const targetSelector =
      '.reveal-item, .reveal-left, .reveal-right, .reveal-scale, .reveal-up, .reveal-card, .reveal-heading, .scroll-reveal';

    // If user prefers reduced motion, reveal everything immediately
    if (prefersReducedMotion) {
      document.querySelectorAll(targetSelector).forEach((el) => {
        el.classList.add('revealed', 'is-visible');
      });
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (lenis) {
          lenis.destroy();
          globalLenis = null;
        }
      };
    }

    // 3. Repeatable IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed', 'is-visible');
          } else {
            // Only reset when truly scrolled away outside margins
            entry.target.classList.remove('revealed', 'is-visible');
          }
        });
      },
      {
        threshold: 0.03,
        rootMargin: '140px 0px -20px 0px',
      }
    );

    const checkAndObserveAll = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const targets = document.querySelectorAll(targetSelector);

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is currently within the visible viewport bounds, ensure it is revealed
        if (rect.top <= windowHeight * 0.95 && rect.bottom >= -80) {
          if (!el.classList.contains('revealed')) {
            el.classList.add('revealed', 'is-visible');
          }
        }
        observer.observe(el);
      });
    };

    // Initial scan
    checkAndObserveAll();

    // 4. MutationObserver to catch React re-renders or dynamic tab/accordion content
    const mutationObserver = new MutationObserver(() => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const targets = document.querySelectorAll(targetSelector);

      targets.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.95 && rect.bottom >= -80) {
            el.classList.add('revealed', 'is-visible');
          }
        }
        observer.observe(el);
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        globalLenis = null;
      }
    };
  }, []);
}
