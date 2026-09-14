import { useState, useEffect } from 'react';
import { getGlobalLenis } from './useGlobalScrollAnimations';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let active = true;

    const calculateProgress = () => {
      if (!active) return;
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );

      const totalHeight = docHeight - window.innerHeight;
      if (totalHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setProgress(pct);
      }
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });
    calculateProgress();

    // Check lenis immediately and after a short mount delay to bind smooth scroll event
    let unsubscribeLenis: (() => void) | null = null;
    const bindLenis = () => {
      if (!active) return;
      const lenis = getGlobalLenis();
      if (lenis && !unsubscribeLenis) {
        const onLenisScroll = (e: any) => {
          if (!active) return;
          if (typeof e?.progress === 'number') {
            setProgress(Math.min(100, Math.max(0, e.progress * 100)));
          } else {
            calculateProgress();
          }
        };
        lenis.on('scroll', onLenisScroll);
        unsubscribeLenis = () => {
          lenis.off('scroll', onLenisScroll);
        };
      }
    };

    bindLenis();
    const timer1 = setTimeout(bindLenis, 100);
    const timer2 = setTimeout(bindLenis, 400);

    return () => {
      active = false;
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
      if (unsubscribeLenis) unsubscribeLenis();
    };
  }, []);

  return progress;
}
