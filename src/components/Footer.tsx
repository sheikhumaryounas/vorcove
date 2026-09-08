import React, { useState, useEffect } from 'react';
import { ArrowUp, Globe, Clock, Mail, ShieldCheck } from 'lucide-react';
import { VorcoveLogo } from './VorcoveLogo';

interface FooterProps {
  onOpenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal }) => {
  const [usTime, setUsTime] = useState<string>('');
  const [euTime, setEuTime] = useState<string>('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setUsTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) + ' ET'
      );
      setEuTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) + ' GMT'
      );
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-dark)',
        color: '#FFFFFF',
        padding: '80px 0 40px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '40px',
            paddingBottom: '64px',
            borderBottom: '1px solid var(--border-dark)'
          }}
        >
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <VorcoveLogo inverted={true} markSize={26} fontSize="17px" />

            <p style={{ fontSize: '14px', color: '#9DA7B5', lineHeight: 1.6, maxWidth: '28ch', margin: 0 }}>
              A specialized software studio engineering autonomous AI systems, dynamic pricing engines, and enterprise full-stack web products.
            </p>

            {/* Live Global Timezone Clocks */}
            <div style={{ marginTop: '8px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-dark)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8F99A8', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={12} color="#10B981" />
                <span>Live Studio Coverage</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#FFFFFF' }}>
                <span>New York: {usTime || '10:00 AM ET'}</span>
                <span>London: {euTime || '03:00 PM GMT'}</span>
              </div>
            </div>
          </div>

          {/* Col 2 Capabilities */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '18px' }}>
              Capabilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#9DA7B5' }}>
              <a href="#services" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>AI Agents & Copilots</a>
              <a href="#services" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Hybrid RAG Pipelines</a>
              <a href="#services" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Dynamic Pricing Engines</a>
              <a href="#services" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Full-Stack Web Engineering</a>
              <a href="#services" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Continuous Evals & Guardrails</a>
            </div>
          </div>

          {/* Col 3 Selected Work */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '18px' }}>
              Selected Work
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#9DA7B5' }}>
              <a href="#work" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Support Triage Copilot (9h → 11m)</a>
              <a href="#work" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Dynamic Pricing Engine (+7.4% Margin)</a>
              <a href="#work" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>B2B Onboarding (2.1x Conversion)</a>
              <a href="#work" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Churn Forecasting Suite (82% Early)</a>
              <a href="#demos" className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Live Interactive Demos</a>
            </div>
          </div>

          {/* Col 4 Direct Contact */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '18px' }}>
              Direct Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#9DA7B5' }}>
              <a href="mailto:hello@vorcove.com" className="hover-underline-link" style={{ color: '#FFFFFF', fontWeight: 500, alignSelf: 'flex-start' }}>
                hello@vorcove.com
              </a>
              <span>US & EU Operational Coverage</span>
              <span style={{ fontSize: '12.5px', color: '#7E8794' }}>
                Senior partner response within 24h
              </span>
              <div style={{ marginTop: '8px' }}>
                <a
                  href="#contact"
                  className="hover-underline-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#6EE7B7'
                  }}
                >
                  <span>Book Phase 1 Sprint →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: '36px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: '#767D8A'
          }}
        >
          <div>
            © {new Date().getFullYear()} Vorcove Inc. All rights reserved. Software measured in revenue, not story points.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 87, 34, 0.4)',
                  color: '#FF7043',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>⚙ Studio Portal</span>
              </button>
            )}
            <span>SOC 2 Type II Compliant Architectures</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid var(--border-dark)',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                transition: 'background 0.2s ease'
              }}
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
