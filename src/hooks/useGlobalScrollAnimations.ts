import { useEffect } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export function getGlobalLenis(): Lenis | null {
  return globalLenis;
}

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
      duration: options?.duration ?? 0.9,
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
 * Universal High-Speed 60-120fps Scroll & Reveal Animation Controller
 * - Silky smooth, low-latency Lenis momentum scrolling.
 * - Pure, non-blocking IntersectionObserver running on compositor thread.
 * - Zero forced reflows / zero layout thrashing during scroll.
 */
export function useGlobalScrollAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Initialize High-Performance Lenis Smooth Scrolling Engine
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });

      globalLenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }

    // 2. Target Selector for Animated Elements across the Website
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

    // 3. Ultra-Lightweight Repeatable IntersectionObserver (Compositor Thread)
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
        threshold: 0.02,
        rootMargin: '120px 0px -20px 0px',
      }
    );

    // Observe all targets
    const targets = document.querySelectorAll(targetSelector);
    targets.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        globalLenis = null;
      }
    };
  }, []);
}
