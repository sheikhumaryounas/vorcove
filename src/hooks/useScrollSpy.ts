import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(sectionIds: string[], offset: number = 100): string {
  const [activeId, setActiveId] = useState<string>('');
  const rafRef = useRef<number | null>(null);
  const lastActiveIdRef = useRef<string>('');

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollPosition = scrollY + offset;

        let nextActiveId = '';
        if (scrollY >= 200) {
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const section = document.getElementById(sectionIds[i]);
            if (section && scrollPosition >= section.offsetTop) {
              nextActiveId = sectionIds[i];
              break;
            }
          }
        }

        if (nextActiveId !== lastActiveIdRef.current) {
          lastActiveIdRef.current = nextActiveId;
          setActiveId(nextActiveId);
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
  }, [sectionIds, offset]);

  return activeId;
}
