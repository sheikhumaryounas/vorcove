import React from 'react';
import { Quote, Star, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      style={{
        padding: '80px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}
          className="reveal-item"
        >
          <div className="kicker" style={{ justifyContent: 'center' }}>
            <span className="kicker-dot" />
            <span>Executive Feedback</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
              marginTop: '12px',
              marginBottom: '12px'
            }}
          >
            Built for leaders who measure in EBITDA.
          </h2>
          <p style={{ fontSize: '14.5px', color: 'var(--ink-secondary)', lineHeight: 1.55 }}>
            What founders, VPs of Operations, and Heads of Product say after their first 60 days in production with Vorcove.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            marginTop: '44px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px'
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`glass-card glass-card-hover reveal-up stagger-${idx + 1}`}
              style={{
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                {/* Metric Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#10B981',
                      background: '#ECFDF5',
                      padding: '3px 9px',
                      borderRadius: '999px',
                      border: '1px solid #A7F3D0'
                    }}
                  >
                    {t.highlightMetric}
                  </span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={13} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--ink-primary)',
                    lineHeight: 1.55,
                    margin: 0
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Author Profile */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--border-light)'
                  }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>
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
