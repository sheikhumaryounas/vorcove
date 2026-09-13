import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { playTactileClick } from '../utils/audio';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [filter, setFilter] = useState<'all' | 'engagements' | 'engineering' | 'pricing'>('all');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const toggleOpen = (id: string) => {
    playTactileClick();
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
              padding: '6px',
              borderRadius: '999px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'engagements', label: 'Engagements' },
              { id: 'engineering', label: 'Engineering & Evals' },
              { id: 'pricing', label: 'Pricing & IP' }
            ].map(tab => {
              const isSelected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playTactileClick();
                    setFilter(tab.id as any);
                  }}
                  className={`faq-filter-btn ${isSelected ? 'is-selected' : ''}`}
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
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ marginTop: '52px', display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '900px', margin: '52px auto 0' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`glass-card faq-accordion-item reveal-item ${isOpen ? 'is-open' : ''} ${isRevealed ? 'revealed' : ''}`}
                style={{
                  borderRadius: '16px',
                  border: isOpen ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                  background: isOpen ? 'linear-gradient(180deg, #FFFFFF 0%, #FAF9F5 100%)' : '#FFFFFF',
                  overflow: 'hidden',
                  boxShadow: isOpen ? '0 8px 24px -4px rgba(30, 37, 48, 0.12)' : '0 1px 3px rgba(30, 37, 48, 0.04)',
                  transitionDelay: `${idx * 40}ms`
                }}
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  style={{
                    width: '100%',
                    padding: '22px 28px',
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
                      fontSize: '16.5px',
                      fontWeight: 600,
                      color: 'var(--ink-primary)',
                      lineHeight: 1.35
                    }}
                  >
                    {faq.question}
                  </span>

                  <div
                    className="faq-toggle-icon"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--ink-primary)' : '#EFECE3',
                      border: isOpen ? '1px solid var(--ink-primary)' : '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? '#FFFFFF' : 'var(--ink-primary)',
                      flexShrink: 0
                    }}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
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

      <style>{`
        .faq-filter-btn {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease !important;
          user-select: none;
        }

        .faq-filter-btn:hover {
          transform: translateY(-2px);
        }

        .faq-filter-btn:not(.is-selected):hover {
          background: rgba(30, 37, 48, 0.06) !important;
          color: var(--ink-primary) !important;
        }

        .faq-filter-btn.is-selected:hover {
          box-shadow: 0 6px 18px rgba(30, 37, 48, 0.3) !important;
        }

        .faq-filter-btn:active {
          transform: translateY(0) scale(0.97);
        }

        .faq-accordion-item {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease !important;
        }

        .faq-accordion-item:not(.is-open):hover {
          transform: translateY(-2.5px);
          border-color: var(--ink-primary) !important;
          box-shadow: 0 10px 26px -4px rgba(30, 37, 48, 0.12), 0 2px 6px rgba(30, 37, 48, 0.04) !important;
        }

        .faq-accordion-item.is-open:hover {
          box-shadow: 0 12px 28px -4px rgba(30, 37, 48, 0.16) !important;
        }

        .faq-accordion-item:hover .faq-toggle-icon {
          transform: scale(1.1);
          background: var(--ink-primary) !important;
          color: #FFFFFF !important;
          border-color: var(--ink-primary) !important;
        }

        .faq-toggle-icon {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
        }
      `}</style>
    </section>
  );
};
