import React, { useState } from 'react';
import { Bot, Layers, BarChart3, ShieldCheck, Zap, ArrowRight, Check, Code, GitBranch, Cpu, Activity } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

export const BentoGrid: React.FC = () => {
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
      style={{
        padding: '80px 0',
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
            gap: '20px',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}
          className="reveal-item"
        >
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              <span>Tailored Solutions</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
                marginTop: '12px',
                marginBottom: 0
              }}
            >
              Engineered to eliminate friction, proven by business ROI.
            </h2>
          </div>

          <p
            style={{
              fontSize: '14.5px',
              color: 'var(--ink-secondary)',
              maxWidth: '44ch',
              lineHeight: 1.58,
              margin: 0
            }}
          >
            Senior engineering squad only. We scope your largest operational bottleneck, build the custom software solution, and deliver production-ready systems tied to verifiable financial outcomes.
          </p>
        </div>

        {/* 2026 Bento Grid Layout */}
        <div
          style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '18px'
          }}
        >
          {/* Card 1: Large Operational Workflow Automation Banner (Span 8 cols) */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card reveal-item stagger-1"
            style={{
              gridColumn: 'span 12',
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '28px 30px',
              border: '1px solid var(--border-light)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)'
                  }}
                >
                  01 • Core Capability
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontFamily: 'var(--font-mono)',
                    background: '#ECFDF5',
                    color: '#10B981',
                    padding: '2px 7px',
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
                  fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  marginTop: '10px',
                  marginBottom: '10px',
                  color: 'var(--ink-primary)',
                  lineHeight: 1.18
                }}
              >
                Intelligent Workflow Automation
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', lineHeight: 1.55, margin: '0 0 16px' }}>
                Automated document intake, invoice parsing, and multi-system data routing wired directly into your existing ERP, CRM, and databases with zero error drift.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Document Processing', 'Automated Triage', 'ERP & Database Sync', 'Human-in-the-Loop'].map((tag) => (
                  <span
                    key={tag}
                    className="sticker-tag"
                    style={{
                      padding: '3px 8px',
                      fontSize: '10.5px',
                      boxShadow: '0 1px 2px rgba(30, 37, 48, 0.04)'
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
                borderRadius: '14px',
                padding: '20px',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.16)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Bot size={15} color="#FFFFFF" />
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#FFFFFF' }}>
                    Automated Processing Stream
                  </span>
                </div>
                <span className="sticker-tag" style={{ fontSize: '9.5px', padding: '2px 6px', background: '#FFFFFF', color: 'var(--ink-primary)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  Latency: 280ms
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '11.5px', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF' }}>
                  <Check size={12} strokeWidth={3} />
                  <span>Verified JWT auth & data sanitized</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF' }}>
                  <Check size={12} strokeWidth={3} />
                  <span>Document parser matched 3 customs manifests</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF' }}>
                  <Check size={12} strokeWidth={3} />
                  <span>Automated sync executed on internal ERP</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2E8F0' }}>
                  <Activity size={12} />
                  <span>Verification test: 100% data integrity</span>
                </div>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11.5px', color: '#CBD5E1' }}>
                  Processing Time: <strong style={{ color: '#FFFFFF' }}>11m (was 9h)</strong>
                </span>
                <a href="#demos" style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF', textDecoration: 'underline' }}>
                  Test Live Demo →
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Dynamic Quoting & Pricing Engine (Span 6 cols) */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card reveal-item stagger-2"
            style={{
              gridColumn: 'span 12',
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '26px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>
                  02 • Revenue & Quoting
                </span>
                <span className="sticker-tag" style={{ fontSize: '10.5px' }}>
                  +7.4% Margin Lift
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '6px', color: 'var(--ink-primary)' }}>
                Real-Time Quoting & Calculation Engines
              </h3>

              <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', lineHeight: 1.55, margin: 0 }}>
                High-speed custom calculation engines recalculating 180,000+ catalog SKU prices in 45ms based on live supplier costs, purchase tiers, and margin protection rules.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Calculation SLA</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-primary)', marginTop: '2px' }}>45 Milliseconds</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Quarterly Margin Gain</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '19px', color: 'var(--ink-primary)', fontWeight: 800 }}>+$640,000</div>
              </div>
            </div>
          </div>

          {/* Card 3: Custom Business Applications & Portals (Span 6 cols) */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card reveal-item stagger-3"
            style={{
              gridColumn: 'span 12',
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '26px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>
                  03 • Custom Software
                </span>
                <span className="sticker-tag" style={{ fontSize: '10.5px' }}>
                  14-Day Delivery
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '6px', color: 'var(--ink-primary)' }}>
                Custom Software & Operations Portals
              </h3>

              <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', lineHeight: 1.55, margin: 0 }}>
                Tailored web platforms, client onboarding hubs, and internal management systems built by staff-level engineers to replace spreadsheet chaos with bulletproof software.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Time to First Build</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-primary)', marginTop: '2px' }}>14 Days</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Activation Boost</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '19px', color: 'var(--ink-primary)', fontWeight: 800 }}>2.1x Conversion</div>
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
