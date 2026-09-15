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
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.3,
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
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '100px 0px -40px 0px',
      }
    );

    // Observe all targets
    const targets = document.querySelectorAll(targetSelector);
    targets.forEach((el) => {
      observer.observe(el);
    });

    // 4. Magnetic Buttons Engine (Cursor Attraction on Desktop)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const magneticCleanups: Array<() => void> = [];

    if (isPointerFine && !prefersReducedMotion) {
      const magneticButtons = document.querySelectorAll<HTMLElement>(
        '.magnetic-btn, .btn-primary, .btn-secondary, .nav-start-btn, .contact-copy-btn'
      );

      magneticButtons.forEach((btn) => {
        let bounds: DOMRect | null = null;

        const onMouseEnter = () => {
          bounds = btn.getBoundingClientRect();
          btn.style.transition = 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease';
        };

        const onMouseMove = (e: MouseEvent) => {
          if (!bounds) bounds = btn.getBoundingClientRect();
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;
          const deltaX = (e.clientX - centerX) * 0.28;
          const deltaY = (e.clientY - centerY) * 0.28;

          btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        };

        const onMouseLeave = () => {
          bounds = null;
          btn.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease';
          btn.style.transform = 'translate3d(0, 0, 0)';
        };

        btn.addEventListener('mouseenter', onMouseEnter);
        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);

        magneticCleanups.push(() => {
          btn.removeEventListener('mouseenter', onMouseEnter);
          btn.removeEventListener('mousemove', onMouseMove);
          btn.removeEventListener('mouseleave', onMouseLeave);
        });
      });

      // 5. 3D Card Hover Tilt & Spotlight Tracking
      const tiltCards = document.querySelectorAll<HTMLElement>('.glass-card-hover, .spotlight-card, .tilt-card');
      tiltCards.forEach((card) => {
        let cardBounds: DOMRect | null = null;

        const onCardEnter = () => {
          cardBounds = card.getBoundingClientRect();
        };

        const onCardMove = (e: MouseEvent) => {
          if (!cardBounds) cardBounds = card.getBoundingClientRect();
          const x = e.clientX - cardBounds.left;
          const y = e.clientY - cardBounds.top;
          const xPercent = (x / cardBounds.width) * 100;
          const yPercent = (y / cardBounds.height) * 100;

          card.style.setProperty('--mouse-x', `${xPercent}%`);
          card.style.setProperty('--mouse-y', `${yPercent}%`);

          // Micro 3D Tilt (Max 2.5 degrees for buttery subtle feel)
          const rotateX = ((y / cardBounds.height) - 0.5) * -4;
          const rotateY = ((x / cardBounds.width) - 0.5) * 4;
          card.style.setProperty('--tilt-rx', `${rotateX}deg`);
          card.style.setProperty('--tilt-ry', `${rotateY}deg`);
        };

        const onCardLeave = () => {
          cardBounds = null;
          card.style.setProperty('--tilt-rx', '0deg');
          card.style.setProperty('--tilt-ry', '0deg');
        };

        card.addEventListener('mouseenter', onCardEnter);
        card.addEventListener('mousemove', onCardMove);
        card.addEventListener('mouseleave', onCardLeave);

        magneticCleanups.push(() => {
          card.removeEventListener('mouseenter', onCardEnter);
          card.removeEventListener('mousemove', onCardMove);
          card.removeEventListener('mouseleave', onCardLeave);
        });
      });
    }

    return () => {
      observer.disconnect();
      magneticCleanups.forEach((cleanup) => cleanup());
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        globalLenis = null;
      }
    };
  }, []);
}
