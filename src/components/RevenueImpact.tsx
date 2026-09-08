import React, { useEffect, useState } from 'react';
import { TrendingUp, ShieldCheck, DollarSign, ArrowUpRight } from 'lucide-react';
import { REVENUE_METRICS } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

export const RevenueImpact: React.FC = () => {
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);
  const [animatedKpi, setAnimatedKpi] = useState({
    0: 0,
    1: 0,
    2: 0
  });

  useEffect(() => {
    if (!isRevealed) return;

    const targets = [640, 98.4, 11];
    const duration = 1200;
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedKpi({
        0: Math.round(targets[0] * eased),
        1: parseFloat((targets[1] * eased).toFixed(1)),
        2: Math.round(targets[2] * eased)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isRevealed]);

  return (
    <section
      id="revenue"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'end'
          }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              <span>Why It Pays</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2.2rem, 4.6vw, 3.5rem)',
                maxWidth: '18ch',
                marginTop: '14px'
              }}
            >
              Every build carries a number.
            </h2>
          </div>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--ink-secondary)',
              maxWidth: '44ch',
              lineHeight: 1.6,
              margin: '0 0 8px'
            }}
          >
            Before writing a single line of code, we agree on the financial or operational metric the software has to move: new revenue pipeline, recovered margin, or automated hours returned to the team.
          </p>
        </div>

        {/* 3 Impact Columns */}
        <div
          style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {REVENUE_METRICS.map((item, idx) => (
            <div
              key={item.id}
              className={`glass-card glass-card-hover reveal-item ${isRevealed ? 'revealed' : ''}`}
              style={{
                padding: '38px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transitionDelay: `${idx * 130}ms`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)'
                  }}
                >
                  {item.tag}
                </span>

                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.iconType === 'chart-up' && <TrendingUp size={18} color="#181E26" />}
                  {item.iconType === 'shield-check' && <ShieldCheck size={18} color="#181E26" />}
                  {item.iconType === 'trending-up' && <DollarSign size={18} color="#181E26" />}
                </div>
              </div>

              {/* Card Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.2,
                  color: 'var(--ink-primary)'
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {item.description}
              </p>

              {/* High-Impact Stat Banner */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      fontWeight: 800,
                      letterSpacing: '-0.025em',
                      color: 'var(--ink-primary)',
                      lineHeight: 1
                    }}
                  >
                    {idx === 0 && `+$${animatedKpi[0]}k`}
                    {idx === 1 && `${animatedKpi[1]}%`}
                    {idx === 2 && `<${animatedKpi[2]}m`}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                    {item.kpiLabel}
                  </div>
                </div>

                <a
                  href="#work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--ink-primary)'
                  }}
                >
                  <span>Case studies</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
