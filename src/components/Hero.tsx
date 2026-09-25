import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { HERO_HIGHLIGHTS } from '../data/content';
import { HeroAgentTerminal } from './HeroAgentTerminal';
import { playTactileClick } from '../utils/audio';
import { scrollToTarget } from '../hooks/useGlobalScrollAnimations';
import { HaikeiWaveMesh, HaikeiOrganicMesh } from './HaikeiBackgrounds';

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
        paddingTop: '104px',
        paddingBottom: '60px',
        background: 'radial-gradient(1400px 700px at 75% -10%, rgba(255, 255, 255, 0.7) 0%, rgba(244, 247, 250, 0) 70%), var(--bg-page)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      {/* Haikei Generative Layered Vector Wave */}
      <HaikeiWaveMesh opacity={0.06} />

      {/* Haikei Fluid Organic Morphing Blob */}
      <HaikeiOrganicMesh
        color1="#00C8F8"
        color2="#10B981"
        top="8%"
        left="10%"
        size="460px"
        opacity={0.07}
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
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '7px', maxWidth: '100%' }}>
              <div className="badge-neo-pill motion-shimmer-badge">
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
                <Zap size={11} strokeWidth={2.5} />
                <span>14-Day Working Software</span>
              </div>

              {/* Live in Production Sticker */}
              <div
                className="sticker-tag"
                style={{
                  background: '#FFFFFF'
                }}
              >
                <Zap size={11} strokeWidth={2.5} />
                <span>100% IP Ownership</span>
              </div>
            </div>

            {/* High-Impact Headline with Text Shimmer */}
            <h1
              className="heading-editorial hero-headline-text text-shimmer"
              style={{
                fontSize: 'clamp(1.9rem, 3.5vw, 3.1rem)',
                marginTop: '18px',
                marginBottom: '0',
                lineHeight: 1.12,
                maxWidth: '24ch',
                textWrap: 'balance',
                wordBreak: 'normal',
                overflowWrap: 'break-word'
              }}
            >
              We turn your real-time business bottlenecks into custom automated software.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
                lineHeight: 1.58,
                color: 'var(--ink-secondary)',
                marginTop: '16px',
                marginBottom: '0',
                maxWidth: '52ch',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              Vorcove engineers custom software products, intelligent workflow automations, and high-speed operational systems for growing businesses, eliminating manual friction and delivering your first working build in 14 days.
            </p>

            {/* TapTile Quick Stat Neo-Pills Strip */}
            <div
              style={{
                marginTop: '18px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '7px',
                maxWidth: '100%'
              }}
            >
              <div
                className="sticker-tag"
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '10.5px'
                }}
              >
                <span style={{ fontWeight: 800 }}>0</span> MANUAL TOIL
              </div>

              <div
                className="sticker-tag"
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '10.5px'
                }}
              >
                <span style={{ fontWeight: 800 }}>100%</span> SENIOR ENGINEERS
              </div>

              <div
                className="sticker-tag"
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '10.5px'
                }}
              >
                <span style={{ fontWeight: 800 }}>&lt;14 DAYS</span> TO WORKING BUILD
              </div>
            </div>

            {/* Tactile Neo-Brutalist CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px', maxWidth: '100%' }}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playTactileClick();
                  scrollToTarget('#contact', { offset: -72 });
                }}
                className="btn-neo-primary"
                style={{ padding: '11px 22px', fontSize: '13.5px' }}
              >
                <span>Start a project</span>
                <ArrowRight size={15} strokeWidth={2.5} />
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
                style={{ padding: '11px 20px', fontSize: '13.5px', gap: '7px' }}
              >
                <Sparkles size={15} strokeWidth={2} />
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
            marginTop: '44px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px'
          }}
          className="reveal-item stagger-3"
        >
          {HERO_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--ink-secondary)'
              }}
            >
              <div
                style={{
                  width: '5px',
                  height: '5px',
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
