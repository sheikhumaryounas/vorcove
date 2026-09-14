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
 * - Repeatable Bidirectional Animations: Triggers smoothly EVERY time an element
 *   enters the viewport, whether scrolling down or scrolling up, on any reload or continuous session.
 * - Generous top/bottom hysteresis buffer to prevent flickering while reading in-viewport content.
 * - Instant above-the-fold visibility on initial load.
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
    // rootMargin: '120px 0px -40px 0px' provides a 120px top buffer (keeps items solid
    // while scrolling past them) and triggers 40px before bottom edge.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed', 'is-visible');
          } else {
            // Re-triggerable: remove classes when completely out of viewport margins
            // so when the user scrolls back into view, the animation plays again!
            entry.target.classList.remove('revealed', 'is-visible');
          }
        });
      },
      {
        threshold: 0.04,
        rootMargin: '120px 0px -30px 0px',
      }
    );

    const observeAllTargets = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const targets = document.querySelectorAll(targetSelector);

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is currently inside or above the viewport on initial pass, show immediately
        if (rect.top <= windowHeight * 0.92 && rect.bottom >= -100) {
          el.classList.add('revealed', 'is-visible');
        }
        observer.observe(el);
      });
    };

    // Initial pass for immediately visible elements
    observeAllTargets();

    // Short delayed check to attach observer to any dynamically mounted components
    const timer1 = setTimeout(observeAllTargets, 150);
    const timer2 = setTimeout(observeAllTargets, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        globalLenis = null;
      }
    };
  }, []);
}
