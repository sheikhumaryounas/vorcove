import React, { useState } from 'react';
import { Bot, Layers, BarChart3, ArrowRight, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

export const Services: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>('ai-automation');
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    'ai-automation': true
  });
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const toggleExpand = (id: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'ai-automation':
        return <Bot size={22} color="#181E26" />;
      case 'product-engineering':
        return <Layers size={22} color="#181E26" />;
      case 'data-ml':
        return <BarChart3 size={22} color="#181E26" />;
      default:
        return <Sparkles size={22} color="#181E26" />;
    }
  };

  return (
    <section
      id="services"
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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'end'
          }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              <span>What We Do</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2.2rem, 4.6vw, 3.5rem)',
                maxWidth: '18ch',
                marginTop: '14px'
              }}
            >
              Three capabilities, done properly.
            </h2>
          </div>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--ink-secondary)',
              maxWidth: '44ch',
              lineHeight: 1.6,
              margin: '0 0 8px'
            }}
          >
            No discovery theatre, no junior staffing pyramids. We scope narrowly, build the real product, and stay until it holds up under production traffic and moves the agreed revenue metric.
          </p>
        </div>

        {/* 3 Core Pillar Cards */}
        <div
          style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '24px'
          }}
        >
          {SERVICES.map((service, index) => {
            const isExpanded = !!expandedDetails[service.id];
            return (
              <article
                key={service.id}
                className={`glass-card glass-card-hover reveal-item ${isRevealed ? 'revealed' : ''}`}
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  transitionDelay: `${index * 120}ms`,
                  position: 'relative'
                }}
              >
                {/* Card Top Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getServiceIcon(service.id)}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '32px',
                      color: 'var(--ink-muted)'
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Tag & Title */}
                <div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)'
                    }}
                  >
                    {service.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '28px',
                      fontWeight: 400,
                      marginTop: '8px',
                      lineHeight: 1.15,
                      color: 'var(--ink-primary)'
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '15.5px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {service.description}
                </p>

                {/* Feature Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {service.pills.map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '999px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-light)',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--ink-secondary)'
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {/* Expandable Technical Capabilities */}
                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-light)'
                  }}
                >
                  <button
                    onClick={() => toggleExpand(service.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      fontFamily: 'var(--font-display)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--ink-primary)'
                    }}
                  >
                    <span>{isExpanded ? 'Hide Architecture Details' : 'View Architecture Capabilities'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {service.capabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          style={{
                            background: 'var(--bg-surface)',
                            borderRadius: '10px',
                            padding: '10px 14px',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Check size={14} color="#10B981" />
                            <span>{cap.title}</span>
                          </div>
                          <p style={{ fontSize: '12.5px', color: 'var(--ink-secondary)', margin: '4px 0 0 20px', lineHeight: 1.45 }}>
                            {cap.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metric Bottom Banner */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-light)'
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '26px',
                        color: 'var(--ink-primary)',
                        fontWeight: 400
                      }}
                    >
                      {service.metricHighlight}
                    </span>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                      {service.metricLabel}
                    </div>
                  </div>

                  <a
                    href="#contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--ink-primary)'
                    }}
                  >
                    <span>Scope this</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
