import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgressBar: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div
      id="top-scroll-progress-indicator"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.5px',
        background: 'linear-gradient(90deg, #1E2530 0%, #334155 35%, #0284C7 65%, #10B981 100%)',
        transform: `scaleX(${Math.max(0.005, scrollProgress / 100)})`,
        transformOrigin: '0% 50%',
        zIndex: 999999,
        pointerEvents: 'none',
        willChange: 'transform',
        transition: 'transform 0.04s linear, opacity 0.15s ease',
        opacity: scrollProgress > 0.3 ? 1 : 0,
        boxShadow: scrollProgress > 1 ? '0 0 12px rgba(16, 185, 129, 0.8), 0 1px 4px rgba(0, 0, 0, 0.25)' : 'none'
      }}
    />
  );
};
