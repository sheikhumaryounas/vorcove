import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';
import { playTactileClick } from '../utils/audio';

export const FaqAccordion: React.FC = () => {
  // Allow multiple or single open tabs smoothly
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);
  const [filter, setFilter] = useState<'all' | 'engagements' | 'engineering' | 'pricing'>('all');

  const toggleOpen = (id: string) => {
    playTactileClick();
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = filter === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === filter);

  return (
    <section
      id="faq"
      style={{
        padding: '120px 0',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative'
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
          className="reveal-item"
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
            ].map((tab) => {
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
                    boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.22)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List Container */}
        <div
          className="reveal-scale stagger-1"
          style={{
            marginTop: '52px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            maxWidth: '900px',
            margin: '52px auto 0'
          }}
        >
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`glass-card faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                style={{
                  borderRadius: '16px',
                  border: isOpen ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                  background: isOpen ? 'linear-gradient(180deg, #FFFFFF 0%, #FAF9F5 100%)' : '#FFFFFF',
                  overflow: 'hidden',
                  boxShadow: isOpen
                    ? '0 8px 24px -4px rgba(30, 37, 48, 0.12)'
                    : '0 1px 3px rgba(30, 37, 48, 0.04)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease'
                }}
              >
                {/* Question Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  aria-expanded={isOpen}
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
                    textAlign: 'left',
                    outline: 'none',
                    userSelect: 'none'
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
                      flexShrink: 0,
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                  >
                    {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                  </div>
                </button>

                {/* Animated Answer Body via Smooth Grid Height Transition */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.32s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        padding: '0 28px 24px',
                        fontSize: '15.5px',
                        color: 'var(--ink-secondary)',
                        lineHeight: 1.65,
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '16px',
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'opacity 0.28s ease, transform 0.28s ease'
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-filter-btn {
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

        .faq-accordion-item:not(.is-open):hover {
          transform: translateY(-2px);
          border-color: var(--ink-primary) !important;
          box-shadow: 0 10px 26px -4px rgba(30, 37, 48, 0.12), 0 2px 6px rgba(30, 37, 48, 0.04) !important;
        }

        .faq-accordion-item:hover .faq-toggle-icon {
          background: var(--ink-primary) !important;
          color: #FFFFFF !important;
          border-color: var(--ink-primary) !important;
        }
      `}</style>
    </section>
  );
};
