import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { VorcoveLogo } from './VorcoveLogo';
import { scrollToTarget } from '../hooks/useGlobalScrollAnimations';
import { playTactileClick } from '../utils/audio';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const [usTime, setUsTime] = useState<string>('');
  const [euTime, setEuTime] = useState<string>('');

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playTactileClick();
    scrollToTarget(href, { offset: -76 });
  };

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

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #0F172A 0%, #090D16 100%)',
        color: '#F8FAFC',
        padding: '56px 0 32px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Real Tech Infrastructure Atmospheric Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(2, 132, 199, 0.08) 0%, transparent 65%), url('/assets/network-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.06,
          mixBlendMode: 'luminosity',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: '32px',
            paddingBottom: '44px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Brand Col */}
          <div className="reveal-left stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <VorcoveLogo inverted={true} markSize={24} fontSize="16px" />

            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.55, maxWidth: '28ch', margin: 0 }}>
              A specialized software studio engineering custom automated software products, intelligent operational systems, and tailored business applications.
            </p>

            {/* Live Global Timezone Clocks */}
            <div style={{ marginTop: '4px', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={11} color="#38BDF8" />
                <span>Live Studio Coverage</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#F8FAFC' }}>
                <span>New York: {usTime || '10:00 AM ET'}</span>
                <span>London: {euTime || '03:00 PM GMT'}</span>
              </div>
            </div>
          </div>

          {/* Col 2 Capabilities */}
          <div className="reveal-up stagger-2">
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '14px' }}>
              Capabilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94A3B8' }}>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Workflow Automation & Triage</a>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Custom Business Portals</a>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Dynamic Quoting Engines</a>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Full-Stack Web Engineering</a>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Deterministic Validation & Sync</a>
            </div>
          </div>

          {/* Col 3 Selected Work */}
          <div className="reveal-up stagger-3">
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '14px' }}>
              Selected Work
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94A3B8' }}>
              <a href="#demos" onClick={(e) => handleLinkClick(e, '#demos')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Logistics Triage Platform (9h → 11m)</a>
              <a href="#demos" onClick={(e) => handleLinkClick(e, '#demos')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Dynamic Quoting Engine (+7.4% Margin)</a>
              <a href="#demos" onClick={(e) => handleLinkClick(e, '#demos')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Client Onboarding Hub (2.1x Conversion)</a>
              <a href="#demos" onClick={(e) => handleLinkClick(e, '#demos')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Operational Retention Radar (82% Early)</a>
              <a href="#demos" onClick={(e) => handleLinkClick(e, '#demos')} className="hover-underline-link" style={{ alignSelf: 'flex-start' }}>Live Interactive Simulators</a>
            </div>
          </div>

          {/* Col 4 Direct Contact */}
          <div className="reveal-right stagger-4">
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '14px' }}>
              Direct Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94A3B8' }}>
              <a href="mailto:hello@vorcove.com" className="hover-underline-link" style={{ color: '#FFFFFF', fontWeight: 500, alignSelf: 'flex-start' }}>
                hello@vorcove.com
              </a>
              <span>US & EU Operational Coverage</span>
              <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                Senior partner response within 24h
              </span>
              <div style={{ marginTop: '6px' }}>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="hover-underline-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#38BDF8'
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
          className="reveal-scale stagger-2"
          style={{
            marginTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#64748B'
          }}
        >
          <div>
            © {new Date().getFullYear()} Vorcove Inc. All rights reserved. Software measured in revenue, not story points.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>SOC 2 Type II Compliant Architectures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
