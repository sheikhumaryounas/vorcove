import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { HERO_HIGHLIGHTS } from '../data/content';
import { HeroAgentTerminal } from './HeroAgentTerminal';
import { playTactileClick } from '../utils/audio';

interface HeroProps {
  onExploreDemos?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDemos }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 16;
    const y = ((clientY - top) / height - 0.5) * 16;
    setMousePos({ x, y });
  };

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '140px',
        paddingBottom: '88px',
        background: 'radial-gradient(1400px 700px at 75% -10%, #EDEAE0 0%, rgba(239, 237, 229, 0) 70%), var(--bg-page)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      {/* Background Ambient Floating V-Mark */}
      <div
        style={{
          position: 'absolute',
          right: '-7vw',
          top: '4vh',
          width: 'min(58vw, 700px)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: `translate3d(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px, 0)`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <img
          src="/assets/v-mark.png"
          alt=""
          style={{
            display: 'block',
            width: '100%',
            opacity: 0.085,
            animation: 'vc-float 9s ease-in-out infinite'
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* 2-Column Hero Layout */}
        <div
          className="hero-grid-layout"
          style={{
            alignItems: 'center'
          }}
        >
          {/* Left Column: Editorial Value Proposition */}
          <div>
            {/* Top Status & Sticker Cluster (TapTile Touch) */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div className="badge-neo-pill">
                <span className="pulse-dot" />
                <span>A smarter way to ship enterprise AI</span>
              </div>

              {/* 14-Day Delivery Sticker */}
              <div
                className="sticker-tag"
                style={{
                  background: '#FFFFFF'
                }}
              >
                <span>⚡</span>
                <span>14-Day Delivery</span>
              </div>

              {/* Live in Production Sticker */}
              <div
                className="sticker-tag"
                style={{
                  background: '#FFFFFF'
                }}
              >
                <span>⚡</span>
                <span>Live in Production</span>
              </div>
            </div>

            {/* High-Impact Headline */}
            <h1
              className="heading-editorial hero-headline-text"
              style={{
                fontSize: 'clamp(2.4rem, 4.6vw, 4.4rem)',
                marginTop: '24px',
                marginBottom: '0',
                lineHeight: 1.08,
                maxWidth: '22ch',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              We ship the AI product your roadmap keeps postponing.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.22rem)',
                lineHeight: 1.6,
                color: 'var(--ink-secondary)',
                marginTop: '24px',
                marginBottom: '0',
                maxWidth: '46ch'
              }}
            >
              Vorcove builds enterprise AI agents, dynamic pricing engines, and custom full-stack web products for companies in the US and EU, tied directly to EBITDA, revenue, and retention from day one.
            </p>

            {/* TapTile Quick Stat Neo-Pills Strip */}
            <div
              style={{
                marginTop: '24px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div
                className="sticker-tag"
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '12px'
                }}
              >
                <span style={{ fontWeight: 800 }}>0</span> ROADMAP DELAYS
              </div>

              <div
                className="sticker-tag"
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '12px'
                }}
              >
                <span style={{ fontWeight: 800 }}>100%</span> SENIOR SQUADS
              </div>

              <div
                className="sticker-tag"
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '12px'
                }}
              >
                <span style={{ fontWeight: 800 }}>&lt;14 DAYS</span> TO LIVE DEMO
              </div>
            </div>

            {/* Tactile Neo-Brutalist CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '32px' }}>
              <a
                href="#contact"
                onClick={() => playTactileClick()}
                className="btn-neo-primary"
                style={{ padding: '15px 30px', fontSize: '15px' }}
              >
                <span>Start a project</span>
                <ArrowRight size={17} strokeWidth={2.5} />
              </a>

              <a
                href="#demos"
                onClick={(e) => {
                  playTactileClick();
                  if (onExploreDemos) {
                    e.preventDefault();
                    onExploreDemos();
                  }
                }}
                className="btn-neo-secondary"
                style={{ padding: '15px 26px', fontSize: '15px', gap: '8px' }}
              >
                <Sparkles size={16} strokeWidth={2} />
                <span>Explore live demos</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Agent Execution Canvas */}
          <div>
            <HeroAgentTerminal />
          </div>
        </div>

        {/* Bottom Feature Value Strip */}
        <div
          style={{
            marginTop: '64px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}
        >
          {HERO_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13.5px',
                fontWeight: 600,
                color: 'var(--ink-secondary)'
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--ink-primary)',
                  border: '1px solid var(--ink-primary)'
                }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
