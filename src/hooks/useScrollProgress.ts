import { useState, useEffect, useRef } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentProgress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
          // Only trigger state update if progress difference is meaningful
          if (Math.abs(currentProgress - lastProgressRef.current) >= 0.25) {
            lastProgressRef.current = currentProgress;
            setProgress(currentProgress);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return progress;
}
