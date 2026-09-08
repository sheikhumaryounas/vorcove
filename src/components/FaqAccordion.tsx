import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [filter, setFilter] = useState<'all' | 'engagements' | 'engineering' | 'pricing'>('all');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const filteredFaqs = filter === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === filter);

  return (
    <section
      id="faq"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-surface)',
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
              <span>Frequently Asked Questions</span>
            </div>
            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2.2rem, 4.6vw, 3.5rem)',
                marginTop: '14px',
                marginBottom: 0
              }}
            >
              Clear answers, zero ambiguity.
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
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'engagements', label: 'Engagements' },
              { id: 'engineering', label: 'Engineering & Evals' },
              { id: 'pricing', label: 'Pricing & IP' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  background: filter === tab.id ? 'var(--ink-primary)' : 'transparent',
                  color: filter === tab.id ? '#FFFFFF' : 'var(--ink-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ marginTop: '52px', display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '900px', margin: '52px auto 0' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card"
                style={{
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  background: '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--ink-primary)',
                      lineHeight: 1.35
                    }}
                  >
                    {faq.question}
                  </span>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--ink-primary)',
                      flexShrink: 0
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 28px 24px',
                      fontSize: '15.5px',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '16px'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
