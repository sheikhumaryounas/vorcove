import { useEffect, useRef, useState } from 'react';

export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const elementRef = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  return { elementRef, isRevealed };
}
