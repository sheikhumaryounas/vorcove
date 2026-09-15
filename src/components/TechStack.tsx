import React, { useState } from 'react';
import { TECH_STACK } from '../data/content';
import { Cpu, Terminal, Database, Layout, ShieldCheck, Zap } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
      style={{
        padding: '80px 0',
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
            gap: '20px',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}
          className="reveal-item"
        >
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              <span>Enterprise Standards</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
                marginTop: '12px',
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
              gap: '5px',
              background: '#FFFFFF',
              padding: '5px',
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
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: 'none',
                    background: isSelected ? 'var(--ink-primary)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--ink-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 3px 12px rgba(30, 37, 48, 0.2)' : 'none'
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
          className="reveal-scale stagger-1"
          style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '14px'
          }}
        >
          {filtered.map((tech, idx) => (
            <div
              key={tech.name}
              className="glass-card tech-stack-card"
              style={{
                padding: '18px 16px',
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transitionDelay: `${idx * 30}ms`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  className="tech-icon-box"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--ink-primary)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(30, 37, 48, 0.16)'
                  }}
                >
                  {getCategoryIcon(tech.category)}
                </div>
                <span
                  className="tech-category-pill"
                  style={{
                    fontSize: '10.5px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: 'var(--ink-secondary)',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    boxShadow: '0 1px 2px rgba(30, 37, 48, 0.04)'
                  }}
                >
                  {tech.category}
                </span>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink-primary)', margin: 0, letterSpacing: '-0.015em' }}>
                {tech.name}
              </h3>

              <p style={{ fontSize: '12.5px', color: 'var(--ink-secondary)', lineHeight: 1.5, margin: 0 }}>
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
