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
        padding: '80px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Dark Obsidian Container Band */}
        <div
          className="obsidian-band reveal-item"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Real Architectural Studio Backdrop (Dark Atmosphere Texture) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage: `radial-gradient(ellipse at 80% 20%, rgba(30, 37, 48, 0.4) 0%, rgba(30, 37, 48, 0.94) 80%), url('/assets/studio-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.08,
              filter: 'grayscale(100%) contrast(140%)',
              mixBlendMode: 'luminosity',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

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
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '36px',
              alignItems: 'start'
            }}
          >
            {/* Left Column Overview */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-inverse-muted)'
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#10B981'
                  }}
                />
                <span>Our Process</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.12,
                  color: '#FFFFFF',
                  marginTop: '12px',
                  maxWidth: '18ch'
                }}
              >
                From business bottleneck to custom software in 14 days.
              </h2>

              <p
                style={{
                  marginTop: '14px',
                  fontSize: '14px',
                  color: '#B0B7C3',
                  lineHeight: 1.58,
                  maxWidth: '46ch'
                }}
              >
                Every engagement follows a disciplined, transparent rhythm: diagnose the operational bottleneck in week one, test a working custom software build within two weeks, then ship weekly releases directly to your team.
              </p>

              <div style={{ marginTop: '24px' }}>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    borderRadius: '999px',
                    background: '#FFFFFF',
                    color: '#181E26',
                    fontFamily: 'var(--font-display)',
                    fontSize: '13.5px',
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
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Right Column 4 Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {APPROACH_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr',
                    gap: '16px',
                    padding: '16px 0',
                    borderTop: '1px solid var(--border-dark)',
                    borderBottom: idx === APPROACH_STEPS.length - 1 ? '1px solid var(--border-dark)' : 'none'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#656F80'
                    }}
                  >
                    {step.number}
                  </span>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                        {step.title}
                      </h3>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8F99A8', background: 'rgba(255,255,255,0.08)', padding: '2px 7px', borderRadius: '5px' }}>
                        {step.timing}
                      </span>
                    </div>

                    <p style={{ marginTop: '5px', fontSize: '13px', color: '#9DA7B5', lineHeight: 1.5 }}>
                      {step.description}
                    </p>

                    <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#6EE7B7' }}>
                      <CheckCircle size={12} />
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
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-dark)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '20px'
            }}
          >
            {STUDIO_STATS.map((stat, sIdx) => (
              <div key={sIdx}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.1rem, 3.5vw, 2.7rem)',
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
                    marginTop: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#E0E4EC'
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ marginTop: '3px', fontSize: '11.5px', color: '#8F99A8' }}>
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
