import React from 'react';
import { MARQUEE_ITEMS } from '../data/content';

export const MarqueeTicker: React.FC = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '2px solid var(--ink-primary)',
        borderBottom: '2px solid var(--ink-primary)',
        background: '#EFEDE5',
        padding: '14px 0',
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
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--ink-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--ink-primary)',
                  boxShadow: '2px 2px 0px var(--ink-primary)',
                  padding: '5px 14px',
                  borderRadius: '999px'
                }}
              >
                <span>⚡</span>
                <span>{item}</span>
              </span>
              <span style={{ color: 'var(--ink-primary)', fontSize: '14px', fontWeight: 800 }}>•</span>
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
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--ink-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--ink-primary)',
                  boxShadow: '2px 2px 0px var(--ink-primary)',
                  padding: '5px 14px',
                  borderRadius: '999px'
                }}
              >
                <span>⚡</span>
                <span>{item}</span>
              </span>
              <span style={{ color: 'var(--ink-primary)', fontSize: '14px', fontWeight: 800 }}>•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
