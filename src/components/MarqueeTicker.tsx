import React from 'react';
import { MARQUEE_ITEMS } from '../data/content';

export const MarqueeTicker: React.FC = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        background: '#EFEDE5',
        padding: '12px 0',
        userSelect: 'none'
      }}
    >
      <div className="marquee-track">
        {/* First Loop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            paddingRight: '24px',
            whiteSpace: 'nowrap'
          }}
        >
          {MARQUEE_ITEMS.map((item, idx) => (
            <React.Fragment key={`m1-${idx}`}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ink-primary)',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 1px 3px rgba(30, 37, 48, 0.05)',
                  padding: '5px 14px',
                  borderRadius: '999px'
                }}
              >
                <span>⚡</span>
                <span>{item}</span>
              </span>
              <span style={{ color: 'var(--ink-muted)', fontSize: '12px', fontWeight: 600 }}>•</span>
            </React.Fragment>
          ))}
        </div>

        {/* Second Duplicate Loop for Infinite Scroll */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            paddingRight: '24px',
            whiteSpace: 'nowrap'
          }}
          aria-hidden="true"
        >
          {MARQUEE_ITEMS.map((item, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ink-primary)',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 1px 3px rgba(30, 37, 48, 0.05)',
                  padding: '5px 14px',
                  borderRadius: '999px'
                }}
              >
                <span>⚡</span>
                <span>{item}</span>
              </span>
              <span style={{ color: 'var(--ink-muted)', fontSize: '12px', fontWeight: 600 }}>•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
