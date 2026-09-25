import React from 'react';

/**
 * Haikei-inspired Generative SVG Backgrounds
 * Ultra-lightweight, razor-sharp vector backdrops, organic layered waves, 
 * isometric technical matrices, and ambient circuit traces.
 */

// 1. Organic Layered Wave Mesh (For Hero & Highlights)
export const HaikeiWaveMesh: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.06
}) => (
  <svg
    className={`haikei-svg ${className}`}
    viewBox="0 0 1440 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '1800px',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      opacity
    }}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="haikei-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#6366F1" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="haikei-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0F172A" stopOpacity="0.2" />
      </linearGradient>
      <filter id="haikei-blur-hero" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="40" />
      </filter>
    </defs>
    <path
      d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,176C672,171,768,213,864,229.3C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z"
      fill="url(#haikei-grad-1)"
    />
    <path
      d="M0,320L60,309.3C120,299,240,277,360,282.7C480,288,600,320,720,304C840,288,960,224,1080,202.7C1200,181,1320,203,1380,213.3L1440,224L1440,600L1380,600C1320,600,1200,600,1080,600C960,600,840,600,720,600C600,600,480,600,360,600C240,600,120,600,60,600L0,600Z"
      fill="url(#haikei-grad-2)"
    />
  </svg>
);

// 2. High-Tech Isometric Matrix & Constellation Grid (For Dark Obsidian Bands)
export const HaikeiIsometricMatrix: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.12
}) => (
  <svg
    className={`haikei-svg ${className}`}
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      opacity
    }}
    aria-hidden="true"
  >
    <defs>
      <pattern id="haikei-iso-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.75" />
        <circle cx="0" cy="0" r="1.5" fill="#38BDF8" />
        <circle cx="40" cy="40" r="1" fill="#10B981" />
      </pattern>
      <radialGradient id="haikei-iso-mask" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <mask id="haikei-mask-pattern">
        <rect width="100%" height="100%" fill="url(#haikei-iso-mask)" />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#haikei-iso-grid)" mask="url(#haikei-mask-pattern)" />
  </svg>
);

// 3. Generative Circuit Stream Lines (For Architecture & Systems)
export const HaikeiCircuitStream: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.15
}) => (
  <svg
    className={`haikei-svg ${className}`}
    viewBox="0 0 1200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      opacity
    }}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="circuit-grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0284C7" stopOpacity="0.1" />
        <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path
      d="M50,200 L250,200 L300,120 L550,120 L600,280 L850,280 L900,200 L1150,200"
      stroke="url(#circuit-grad-cyan)"
      strokeWidth="1.75"
      strokeDasharray="6 6"
    />
    <path
      d="M100,280 L350,280 L400,200 L700,200 L750,120 L1050,120"
      stroke="rgba(99, 102, 241, 0.4)"
      strokeWidth="1.25"
      strokeDasharray="4 8"
    />
    {/* Pulsing Signal Nodes */}
    <circle cx="300" cy="120" r="4" fill="#38BDF8" className="pulse-glow-dot" />
    <circle cx="600" cy="280" r="4" fill="#10B981" className="pulse-glow-dot" />
    <circle cx="900" cy="200" r="4" fill="#6366F1" className="pulse-glow-dot" />
  </svg>
);

// 4. Fluid Organic Blob Mesh (For Ambient Section Transitions)
export const HaikeiOrganicMesh: React.FC<{
  color1?: string;
  color2?: string;
  top?: string;
  left?: string;
  size?: string;
  opacity?: number;
}> = ({
  color1 = '#38BDF8',
  color2 = '#10B981',
  top = '10%',
  left = '10%',
  size = '450px',
  opacity = 0.08
}) => (
  <div
    style={{
      position: 'absolute',
      top,
      left,
      width: size,
      height: size,
      borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
      filter: 'blur(70px)',
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
      animation: 'haikei-blob-morph 16s ease-in-out infinite alternate',
      willChange: 'transform, border-radius'
    }}
    aria-hidden="true"
  />
);
