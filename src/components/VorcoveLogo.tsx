import React from 'react';

interface VorcoveMarkProps {
  size?: number | string;
  inverted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const VorcoveMark: React.FC<VorcoveMarkProps> = ({
  size = 26,
  inverted = false,
  className = '',
  style = {}
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <img
      src="/assets/v-mark.png"
      alt="Vorcove"
      className={className}
      style={{
        display: 'block',
        width: pixelSize,
        height: pixelSize,
        objectFit: 'contain',
        flexShrink: 0,
        filter: inverted ? 'brightness(0) invert(1)' : undefined,
        opacity: inverted ? 0.9 : 1,
        ...style
      }}
    />
  );
};

interface VorcoveLogoProps {
  markSize?: number | string;
  fontSize?: number | string;
  color?: string;
  textColor?: string;
  inverted?: boolean;
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const VorcoveLogo: React.FC<VorcoveLogoProps> = ({
  markSize = 26,
  fontSize = '17px',
  color = 'var(--ink-primary)',
  textColor,
  inverted = false,
  showText = true,
  className = '',
  style = {}
}) => {
  const resolvedTextColor = textColor || (inverted ? '#EFEDE5' : color);

  return (
    <div
      className={`vorcove-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '11px',
        textDecoration: 'none',
        userSelect: 'none',
        ...style
      }}
    >
      <VorcoveMark size={markSize} inverted={inverted} />
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-sans), 'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: resolvedTextColor,
            lineHeight: 1,
            display: 'inline-block'
          }}
        >
          Vorcove
        </span>
      )}
    </div>
  );
};

export default VorcoveLogo;
