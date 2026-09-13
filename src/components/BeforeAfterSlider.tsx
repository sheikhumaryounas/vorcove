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
      metric: 'Fit to Your Business Workflow',
      before: 'Rigid off-the-shelf software forcing messy workarounds',
      after: 'Custom automated software tailored to your exact bottleneck',
      delta: '100% Custom'
    },
    {
      metric: 'Operational Latency & Backlog',
      before: '9.2 hours average wait across manual email & ERP queues',
      after: '11 minutes with automated data extraction & triage',
      delta: '-98% Latency'
    },
    {
      metric: 'Quoting & Pricing Accuracy',
      before: 'Static price sheets with frequent errors & 6-9% margin leaks',
      after: 'Real-time dynamic quoting engine recalculating in 45ms',
      delta: '+7.4% Margin'
    },
    {
      metric: 'Code Ownership & Pricing',
      before: 'Endless hourly billing and proprietary vendor lock-in',
      after: 'Fixed-price sprints & 100% clean code ownership in your repo',
      delta: 'Zero Lock-In'
    }
  ];

  return (
    <section
      id="comparison"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
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
            Generic Software vs. Vorcove Custom Automation
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            Most agencies sell billable hours, and off-the-shelf software never fits your workflow. We engineer custom automated software built specifically around your operational bottlenecks.
          </p>
        </div>

        {/* Comparison Grid */}
        <div
          style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
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
                Traditional Software & Generic IT
              </span>
              <XCircle size={22} color="#DC2626" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                color: 'var(--ink-primary)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                margin: 0
              }}
            >
              The Generic & Rigid Trap
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
                The Vorcove Custom Automation Model
              </span>
              <CheckCircle2 size={22} color="#34D399" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                margin: 0
              }}
            >
              Tailored Software • 14-Day Delivery • Full IP Ownership
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
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  color: '#1E2530',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
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
