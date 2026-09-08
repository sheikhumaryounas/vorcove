import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}
