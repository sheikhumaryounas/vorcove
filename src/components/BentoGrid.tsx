import React, { useState } from 'react';
import { Bot, Layers, BarChart3, ShieldCheck, Zap, ArrowRight, Check, Code, GitBranch, Cpu, Activity } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { playTactileClick } from '../utils/audio';

export const BentoGrid: React.FC = () => {
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  // Mouse spotlight coordinates tracking for each card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section
      id="services"
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
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              <span>Tailored Solutions</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
                marginTop: '14px',
                marginBottom: 0
              }}
            >
              Engineered to eliminate friction, proven by business ROI.
            </h2>
          </div>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--ink-secondary)',
              maxWidth: '42ch',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Senior engineering squad only. We scope your largest operational bottleneck, build the custom software solution, and deliver production-ready systems tied to verifiable financial outcomes.
          </p>
        </div>

        {/* 2026 Bento Grid Layout */}
        <div
          style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px'
          }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          {/* Card 1: Large Operational Workflow Automation Banner (Span 8 cols) */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card"
            style={{
              gridColumn: 'span 12',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid var(--border-light)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '36px',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)'
                  }}
                >
                  01 • Core Capability
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    background: '#ECFDF5',
                    color: '#10B981',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontWeight: 600
                  }}
                >
                  98.4% Accuracy SLA
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  marginTop: '12px',
                  marginBottom: '12px',
                  color: 'var(--ink-primary)',
                  lineHeight: 1.15
                }}
              >
                Intelligent Workflow Automation
              </h3>

              <p style={{ fontSize: '15.5px', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: '0 0 20px' }}>
                Automated document intake, invoice parsing, and multi-system data routing wired directly into your existing ERP, CRM, and databases with zero error drift.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Document Processing', 'Automated Triage', 'ERP & Database Sync', 'Human-in-the-Loop'].map((tag) => (
                  <span
                    key={tag}
                    className="sticker-tag"
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      boxShadow: '0 1px 3px rgba(30, 37, 48, 0.05)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Visual Element */}
            <div
              style={{
                background: 'var(--ink-primary)',
                borderRadius: '16px',
                padding: '24px',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={16} color="#FFFFFF" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                    Automated Processing Stream
                  </span>
                </div>
                <span className="sticker-tag" style={{ fontSize: '10px', padding: '2px 7px', background: '#FFFFFF', color: 'var(--ink-primary)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  Latency: 280ms
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF' }}>
                  <Check size={13} strokeWidth={3} />
                  <span>Verified JWT auth & data sanitized</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF' }}>
                  <Check size={13} strokeWidth={3} />
                  <span>Document parser matched 3 customs manifests</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF' }}>
                  <Check size={13} strokeWidth={3} />
                  <span>Automated sync executed on internal ERP</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2E8F0' }}>
                  <Activity size={13} />
                  <span>Verification test: 100% data integrity</span>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                  Processing Time: <strong style={{ color: '#FFFFFF' }}>11m (was 9h)</strong>
                </span>
                <a href="#demos" style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textDecoration: 'underline' }}>
                  Test Live Demo →
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Dynamic Quoting & Pricing Engine (Span 6 cols) */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card"
            style={{
              gridColumn: 'span 12',
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>
                  02 • Revenue & Quoting
                </span>
                <span className="sticker-tag" style={{ fontSize: '11px' }}>
                  +7.4% Margin Lift
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.025em', marginTop: '12px', marginBottom: '8px', color: 'var(--ink-primary)' }}>
                Real-Time Quoting & Calculation Engines
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                High-speed custom calculation engines recalculating 180,000+ catalog SKU prices in 45ms based on live supplier costs, purchase tiers, and margin protection rules.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Calculation SLA</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--ink-primary)', marginTop: '2px' }}>45 Milliseconds</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Quarterly Margin Gain</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--ink-primary)', fontWeight: 800 }}>+$640,000</div>
              </div>
            </div>
          </div>

          {/* Card 3: Custom Business Applications & Portals (Span 6 cols) */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card"
            style={{
              gridColumn: 'span 12',
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>
                  03 • Custom Software
                </span>
                <span className="sticker-tag" style={{ fontSize: '11px' }}>
                  14-Day Delivery
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.025em', marginTop: '12px', marginBottom: '8px', color: 'var(--ink-primary)' }}>
                Custom Software & Operations Portals
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                Tailored web platforms, client onboarding hubs, and internal management systems built by staff-level engineers to replace spreadsheet chaos with bulletproof software.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Time to First Build</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--ink-primary)', marginTop: '2px' }}>14 Days</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Activation Boost</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--ink-primary)', fontWeight: 800 }}>2.1x Conversion</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .spotlight-card:nth-child(2),
          .spotlight-card:nth-child(3) {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </section>
  );
};
