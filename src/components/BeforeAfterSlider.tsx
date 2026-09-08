import React, { useState } from 'react';
import { XCircle, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { playTactileClick } from '../utils/audio';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const comparisonRows = [
    {
      metric: 'Time to First Working Code',
      before: '3 to 6 months of theoretical discovery decks',
      after: 'Clickable vertical slice in your hands in 14 days',
      delta: '10x Faster'
    },
    {
      metric: 'Support Inquiry Resolution',
      before: '9.2 hours average wait across email queues',
      after: '11 minutes with 98.4% auto-resolution triage',
      delta: '-98% Latency'
    },
    {
      metric: 'Engineering Squad Structure',
      before: 'Junior offshore teams & account manager layers',
      after: 'Senior/staff engineers with direct Slack/Git access',
      delta: 'Zero Middlemen'
    },
    {
      metric: 'Pricing & Catalog Margin',
      before: 'Static quarterly PDF price sheets leaking 6-9%',
      after: 'Real-time dynamic pricing engine recalculating in 45ms',
      delta: '+7.4% Gross Margin'
    },
    {
      metric: 'Code Ownership & IP',
      before: 'Proprietary vendor lock-in & hidden licensing fees',
      after: '100% clean code committed to your organization repos',
      delta: '100% Client Owned'
    }
  ];

  return (
    <section
      id="comparison"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div className="kicker" style={{ justifyContent: 'center' }}>
            <span className="kicker-dot" />
            <span>The Vorcove Contrast</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              marginTop: '14px',
              marginBottom: '16px'
            }}
          >
            Traditional Consulting vs. Vorcove
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            Most agencies sell billable hours and discovery theatre. We ship production software measured strictly in gross margin, revenue velocity, and customer retention.
          </p>
        </div>

        {/* Comparison Grid */}
        <div
          style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          {/* Column A: Legacy Approach */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '22px',
              border: '1px solid #FCA5A5',
              padding: '36px 32px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#DC2626',
                  background: '#FEF2F2',
                  padding: '4px 10px',
                  borderRadius: '999px'
                }}
              >
                Traditional Agency / Enterprise IT
              </span>
              <XCircle size={22} color="#DC2626" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                color: 'var(--ink-primary)',
                fontWeight: 400,
                margin: 0
              }}
            >
              The Billable Hours Trap
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {comparisonRows.map((row, idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: '10px', background: '#FFF5F5', border: '1px solid #FEE2E2' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: '#991B1B' }}>
                    {row.metric}
                  </div>
                  <div style={{ fontSize: '14px', color: '#7F1D1D', marginTop: '3px', lineHeight: 1.4 }}>
                    {row.before}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column B: The Vorcove Way */}
          <div
            style={{
              background: 'var(--bg-dark)',
              color: '#FFFFFF',
              borderRadius: '22px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '36px 32px',
              boxShadow: 'var(--shadow-dark)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Glow Highlight */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #10B981, #34D399, #60A5FA)'
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#34D399',
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                The Vorcove Engineering Loop
              </span>
              <CheckCircle2 size={22} color="#34D399" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                color: '#FFFFFF',
                fontWeight: 400,
                margin: 0
              }}
            >
              Fixed Price • 14-Day Velocity • Zero Fluff
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {comparisonRows.map((row, idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: '#9DA7B5' }}>
                      {row.metric}
                    </span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 700, background: 'rgba(16, 185, 129, 0.2)', padding: '1px 6px', borderRadius: '4px' }}>
                      {row.delta}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#FFFFFF', marginTop: '3px', lineHeight: 1.4, fontWeight: 500 }}>
                    {row.after}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
              <a
                href="#contact"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  color: '#181E26'
                }}
              >
                <span>Experience the difference</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
