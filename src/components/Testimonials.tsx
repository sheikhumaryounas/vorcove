import React from 'react';
import { Quote, Star, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

export const Testimonials: React.FC = () => {
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  return (
    <section
      id="testimonials"
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
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div className="kicker" style={{ justifyContent: 'center' }}>
            <span className="kicker-dot" />
            <span>Executive Feedback</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(2.2rem, 4.6vw, 3.5rem)',
              marginTop: '14px',
              marginBottom: '16px'
            }}
          >
            Built for leaders who measure in EBITDA.
          </h2>
          <p style={{ fontSize: '16.5px', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            What founders, VPs of Operations, and Heads of Product say after their first 60 days in production with Vorcove.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`glass-card glass-card-hover reveal-item ${isRevealed ? 'revealed' : ''}`}
              style={{
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '24px',
                transitionDelay: `${idx * 120}ms`
              }}
            >
              <div>
                {/* Metric Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#10B981',
                      background: '#ECFDF5',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      border: '1px solid #A7F3D0'
                    }}
                  >
                    {t.highlightMetric}
                  </span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15.5px',
                    fontWeight: 500,
                    color: 'var(--ink-primary)',
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Author Profile */}
              <div
                style={{
                  paddingTop: '18px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--border-light)'
                  }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
                    {t.role} • <strong style={{ color: 'var(--ink-primary)' }}>{t.company}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
