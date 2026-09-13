import { useEffect, useRef, useState } from 'react';

export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.05
) {
  const elementRef = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      el.classList.add('revealed', 'is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          el.classList.add('revealed', 'is-visible');
        } else {
          setIsRevealed(false);
          el.classList.remove('revealed', 'is-visible');
        }
      },
      { threshold: Math.min(threshold, 0.05), rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  return { elementRef, isRevealed };
}
