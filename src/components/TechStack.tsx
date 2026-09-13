import React, { useState } from 'react';
import { TECH_STACK } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { Cpu, Terminal, Database, Layout, ShieldCheck, Zap } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const categories = ['All', 'AI / LLM', 'Backend & Cloud', 'Data & ML', 'Frontend'];

  const filtered = selectedCategory === 'All'
    ? TECH_STACK
    : TECH_STACK.filter(t => t.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'AI / LLM': return <Cpu size={17} color="#A5B4FC" />;
      case 'Backend & Cloud': return <Terminal size={17} color="#6EE7B7" />;
      case 'Data & ML': return <Database size={17} color="#FDE047" />;
      case 'Frontend': return <Layout size={17} color="#7DD3FC" />;
      default: return <Zap size={17} color="#F7F5EF" />;
    }
  };

  return (
    <section
      id="stack"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
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
              <span>Enterprise Standards</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2.2rem, 4.6vw, 3.5rem)',
                marginTop: '14px',
                marginBottom: 0
              }}
            >
              Enterprise-grade foundation. Zero toys.
            </h2>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              background: '#FFFFFF',
              padding: '6px',
              borderRadius: '999px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playTactileClick();
                    setSelectedCategory(cat);
                  }}
                  className={`tech-filter-btn ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: 'none',
                    background: isSelected ? 'var(--ink-primary)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--ink-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.22)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech Grid */}
        <div
          style={{
            marginTop: '52px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '18px'
          }}
        >
          {filtered.map((tech, idx) => (
            <div
              key={tech.name}
              className={`glass-card tech-stack-card reveal-item ${isRevealed ? 'revealed' : ''}`}
              style={{
                padding: '24px',
                background: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                transitionDelay: `${idx * 40}ms`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  className="tech-icon-box"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'var(--ink-primary)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(30, 37, 48, 0.2)'
                  }}
                >
                  {getCategoryIcon(tech.category)}
                </div>
                <span
                  className="tech-category-pill"
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: 'var(--ink-secondary)',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    boxShadow: '0 1px 3px rgba(30, 37, 48, 0.04)'
                  }}
                >
                  {tech.category}
                </span>
              </div>

              <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--ink-primary)', margin: 0, letterSpacing: '-0.015em' }}>
                {tech.name}
              </h3>

              <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', lineHeight: 1.5, margin: 0 }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-filter-btn {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease !important;
          user-select: none;
        }

        .tech-filter-btn:hover {
          transform: translateY(-2px);
        }

        .tech-filter-btn:not(.is-selected):hover {
          background: rgba(30, 37, 48, 0.06) !important;
          color: var(--ink-primary) !important;
        }

        .tech-filter-btn.is-selected:hover {
          box-shadow: 0 6px 18px rgba(30, 37, 48, 0.3) !important;
        }

        .tech-filter-btn:active {
          transform: translateY(0) scale(0.97);
        }

        .tech-stack-card {
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s ease, border-color 0.24s ease !important;
        }

        .tech-stack-card:hover {
          transform: translateY(-4px);
          border-color: var(--ink-primary) !important;
          box-shadow: 0 16px 36px -8px rgba(30, 37, 48, 0.14) !important;
        }

        .tech-stack-card:hover .tech-icon-box {
          transform: scale(1.08) rotate(2deg);
        }

        .tech-icon-box {
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};
