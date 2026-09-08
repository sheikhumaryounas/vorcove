import React, { useState } from 'react';
import { TECH_STACK } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { Cpu, Terminal, Database, Layout, ShieldCheck, Zap } from 'lucide-react';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const categories = ['All', 'AI / LLM', 'Backend & Cloud', 'Data & ML', 'Frontend'];

  const filtered = selectedCategory === 'All'
    ? TECH_STACK
    : TECH_STACK.filter(t => t.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'AI / LLM': return <Cpu size={16} color="#4F46E5" />;
      case 'Backend & Cloud': return <Terminal size={16} color="#10B981" />;
      case 'Data & ML': return <Database size={16} color="#F59E0B" />;
      case 'Frontend': return <Layout size={16} color="#06B6D4" />;
      default: return <Zap size={16} color="#181E26" />;
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
              padding: '5px',
              borderRadius: '999px',
              border: '1px solid var(--border-light)'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  background: selectedCategory === cat ? 'var(--ink-primary)' : 'transparent',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--ink-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
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
              className={`glass-card glass-card-hover reveal-item ${isRevealed ? 'revealed' : ''}`}
              style={{
                padding: '24px',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transitionDelay: `${idx * 50}ms`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getCategoryIcon(tech.category)}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ink-muted)',
                    background: 'var(--bg-surface)',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {tech.category}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink-primary)', margin: 0 }}>
                {tech.name}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.5, margin: 0 }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
