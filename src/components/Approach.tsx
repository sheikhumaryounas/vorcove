import React, { useEffect, useState } from 'react';
import { APPROACH_STEPS, STUDIO_STATS } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const Approach: React.FC = () => {
  const { elementRef, isRevealed } = useIntersectionReveal(0.15);
  const [counts, setCounts] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
    3: 0
  });

  useEffect(() => {
    if (!isRevealed) return;

    STUDIO_STATS.forEach((stat, idx) => {
      const duration = 1200;
      const start = performance.now();
      const target = stat.value;

      const animate = (time: number) => {
        const elapsed = time - start;
        const progress = Math.min(1, elapsed / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        setCounts(prev => ({
          ...prev,
          [idx]: stat.suffix.includes('.') ? parseFloat(current.toFixed(1)) : Math.round(current)
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  }, [isRevealed]);

  return (
    <section
      id="approach"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Dark Obsidian Container Band */}
        <div
          className={`obsidian-band reveal-item ${isRevealed ? 'revealed' : ''}`}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Watermark Vorcove Logo */}
          <div
            style={{
              position: 'absolute',
              right: '0px',
              top: '-30px',
              width: 'min(45vw, 420px)',
              opacity: 0.05,
              pointerEvents: 'none',
              zIndex: 0,
              overflow: 'hidden'
            }}
          >
            <img
              src="/assets/v-mark.png"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '48px',
              alignItems: 'start'
            }}
          >
            {/* Left Column Overview */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-inverse-muted)'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10B981'
                  }}
                />
                <span>How We Work</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.08,
                  color: '#FFFFFF',
                  marginTop: '18px',
                  maxWidth: '15ch'
                }}
              >
                A short loop, run in the open.
              </h2>

              <p
                style={{
                  marginTop: '22px',
                  fontSize: '16.5px',
                  color: '#B0B7C3',
                  lineHeight: 1.65,
                  maxWidth: '44ch'
                }}
              >
                Every engagement follows the exact same velocity rhythm: sharp initial scoping, a working build in your hands within two weeks, then weekly deployments directly to your repositories.
              </p>

              <div style={{ marginTop: '36px' }}>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 26px',
                    borderRadius: '999px',
                    background: '#FFFFFF',
                    color: '#181E26',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,255,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.25)';
                  }}
                >
                  <span>Book Phase 1 Sprint</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Right Column 4 Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {APPROACH_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr',
                    gap: '20px',
                    padding: '24px 0',
                    borderTop: '1px solid var(--border-dark)',
                    borderBottom: idx === APPROACH_STEPS.length - 1 ? '1px solid var(--border-dark)' : 'none',
                    transitionDelay: `${idx * 80}ms`
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#656F80'
                    }}
                  >
                    {step.number}
                  </span>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                        {step.title}
                      </h3>
                      <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#8F99A8', background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '6px' }}>
                        {step.timing}
                      </span>
                    </div>

                    <p style={{ marginTop: '6px', fontSize: '14.5px', color: '#9DA7B5', lineHeight: 1.55 }}>
                      {step.description}
                    </p>

                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#6EE7B7' }}>
                      <CheckCircle size={13} />
                      <span>{step.deliverable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Live Animated KPI Row */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              marginTop: '64px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border-dark)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
              gap: '24px'
            }}
          >
            {STUDIO_STATS.map((stat, sIdx) => (
              <div key={sIdx}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3.4rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: '#FFFFFF'
                  }}
                >
                  {counts[sIdx] ?? 0}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: '#E0E4EC'
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ marginTop: '4px', fontSize: '12.5px', color: '#8F99A8' }}>
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
