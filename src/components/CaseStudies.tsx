import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Filter } from 'lucide-react';
import { CASE_STUDIES } from '../data/content';
import { CaseStudy } from '../types';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

interface CaseStudiesProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const categories = [
    { id: 'all', label: 'All Builds' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'revenue', label: 'Revenue & Pricing' },
    { id: 'product', label: 'Product Engineering' },
    { id: 'data', label: 'Data & ML' }
  ];

  const filteredStudies = selectedCategory === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category === selectedCategory);

  return (
    <section
      id="work"
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
              <span>Selected Work</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2.2rem, 4.6vw, 3.5rem)',
                marginTop: '14px',
                marginBottom: 0
              }}
            >
              Four builds, four numbers.
            </h2>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              background: 'var(--bg-surface)',
              padding: '5px',
              borderRadius: '999px',
              border: '1px solid var(--border-light)'
            }}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  background: selectedCategory === cat.id ? 'var(--ink-primary)' : 'transparent',
                  color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--ink-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div
          style={{
            marginTop: '52px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredStudies.map((study, idx) => (
            <div
              key={study.id}
              onClick={() => onSelectCaseStudy(study)}
              className={`glass-card glass-card-hover reveal-item ${isRevealed ? 'revealed' : ''}`}
              style={{
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                cursor: 'pointer',
                transitionDelay: `${idx * 100}ms`,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)'
                  }}
                >
                  {study.tag}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ink-secondary)',
                    background: 'var(--bg-surface)',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {study.timeline.split(' ')[0]} {study.timeline.split(' ')[1]}
                </span>
              </div>

              {/* Title & Client Type */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '28px',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: 'var(--ink-primary)',
                    margin: '0 0 6px'
                  }}
                >
                  {study.title}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
                  {study.clientType}
                </div>
              </div>

              {/* Summary */}
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {study.summary}
              </p>

              {/* High-Impact Metric Result Card */}
              <div
                style={{
                  marginTop: 'auto',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '30px',
                      fontWeight: 400,
                      color: 'var(--ink-primary)',
                      lineHeight: 1
                    }}
                  >
                    {study.metricHeadline}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '4px' }}>
                    {study.metricSub}
                  </div>
                </div>

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--ink-primary)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <ArrowUpRight size={17} />
                </div>
              </div>

              {/* Action Link */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px', fontSize: '13px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                <span>View technical breakdown</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
