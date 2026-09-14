import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { HERO_HIGHLIGHTS } from '../data/content';
import { HeroAgentTerminal } from './HeroAgentTerminal';
import { playTactileClick } from '../utils/audio';
import { scrollToTarget } from '../hooks/useGlobalScrollAnimations';

interface HeroProps {
  onExploreDemos?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDemos }) => {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '140px',
        paddingBottom: '88px',
        background: 'radial-gradient(1400px 700px at 75% -10%, rgba(255, 255, 255, 0.6) 0%, rgba(243, 246, 249, 0) 70%), var(--bg-page)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      {/* Real High-Tech Engineering & Software Network Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'min(65vw, 920px)',
          height: '100%',
          backgroundImage: `radial-gradient(ellipse at 70% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(243, 246, 249, 0.75) 60%, var(--bg-page) 98%), url('/assets/network-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.18,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Background Ambient Floating V-Mark */}
      <div
        style={{
          position: 'absolute',
          right: '0vw',
          top: '4vh',
          width: 'min(45vw, 550px)',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <img
          src="/assets/v-mark.png"
          alt=""
          style={{
            display: 'block',
            width: '100%',
            opacity: 0.07,
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
          <div className="reveal-item stagger-1" style={{ maxWidth: '100%', minWidth: 0 }}>
            {/* Top Status & Sticker Cluster (TapTile Touch) */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', maxWidth: '100%' }}>
              <div className="badge-neo-pill">
                <span className="pulse-dot" />
                <span>Custom Software & Workflow Automation</span>
              </div>

              {/* 14-Day Delivery Sticker */}
              <div
                className="sticker-tag"
                style={{
                  background: '#FFFFFF'
                }}
              >
                <span>⚡</span>
                <span>14-Day Working Software</span>
              </div>

              {/* Live in Production Sticker */}
              <div
                className="sticker-tag"
                style={{
                  background: '#FFFFFF'
                }}
              >
                <span>⚡</span>
                <span>100% IP Ownership</span>
              </div>
            </div>

            {/* High-Impact Headline */}
            <h1
              className="heading-editorial hero-headline-text"
              style={{
                fontSize: 'clamp(2.2rem, 4.4vw, 4.4rem)',
                marginTop: '22px',
                marginBottom: '0',
                lineHeight: 1.08,
                maxWidth: '22ch',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              We turn your real-time business bottlenecks into custom automated software.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                lineHeight: 1.6,
                color: 'var(--ink-secondary)',
                marginTop: '20px',
                marginBottom: '0',
                maxWidth: '48ch',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              Vorcove engineers custom software products, intelligent workflow automations, and high-speed operational systems for growing businesses, eliminating manual friction and delivering your first working build in 14 days.
            </p>

            {/* TapTile Quick Stat Neo-Pills Strip */}
            <div
              style={{
                marginTop: '22px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                maxWidth: '100%'
              }}
            >
              <div
                className="sticker-tag"
                style={{
                  padding: '6px 12px',
                  borderRadius: '9px',
                  fontSize: '11.5px'
                }}
              >
                <span style={{ fontWeight: 800 }}>0</span> MANUAL TOIL
              </div>

              <div
                className="sticker-tag"
                style={{
                  padding: '6px 12px',
                  borderRadius: '9px',
                  fontSize: '11.5px'
                }}
              >
                <span style={{ fontWeight: 800 }}>100%</span> SENIOR ENGINEERS
              </div>

              <div
                className="sticker-tag"
                style={{
                  padding: '6px 12px',
                  borderRadius: '9px',
                  fontSize: '11.5px'
                }}
              >
                <span style={{ fontWeight: 800 }}>&lt;14 DAYS</span> TO WORKING BUILD
              </div>
            </div>

            {/* Tactile Neo-Brutalist CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px', maxWidth: '100%' }}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playTactileClick();
                  scrollToTarget('#contact', { offset: -80 });
                }}
                className="btn-neo-primary"
                style={{ padding: '14px 28px', fontSize: '14.5px' }}
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
                style={{ padding: '14px 24px', fontSize: '14.5px', gap: '8px' }}
              >
                <Sparkles size={16} strokeWidth={2} />
                <span>Explore live demos</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Agent Execution Canvas */}
          <div className="reveal-item stagger-2" style={{ maxWidth: '100%', minWidth: 0 }}>
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
          className="reveal-item stagger-3"
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
