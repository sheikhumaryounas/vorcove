import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Mail, Clock, Globe, Shield } from 'lucide-react';
import { CONTACT_PRESETS } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { playTactileClick } from '../utils/audio';

import { submitContactInquiry } from '../services/api';

export const ContactSection: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Workflow Automation System']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$25k to $50k (Phase 1 Build)');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('ASAP (within 2 weeks)');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    brief: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const toggleService = (svc: string) => {
    setSelectedServices(prev =>
      prev.includes(svc)
        ? prev.filter(s => s !== svc)
        : [...prev, svc]
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@vorcove.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        brief: formData.brief,
        selectedServices,
        selectedBudget,
        selectedTimeline
      });

      if (response.success) {
        setIsSubmitted(true);
      } else {
        setSubmissionError(response.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setSubmissionError(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div
          className={`glass-card reveal-item ${isRevealed ? 'revealed' : ''}`}
          style={{
            padding: '56px 44px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F4 100%)',
            borderRadius: '28px',
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}
        >
          {/* Left Column Studio Info */}
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              <span>Start a Project</span>
            </div>

            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2.3rem, 4.4vw, 3.5rem)',
                marginTop: '16px',
                marginBottom: '18px',
                maxWidth: '18ch'
              }}
            >
              Tell us what's stuck in your operations. We'll show you what we'd build.
            </h2>

            <p
              style={{
                fontSize: '16.5px',
                color: 'var(--ink-secondary)',
                lineHeight: 1.6,
                maxWidth: '42ch'
              }}
            >
              One direct conversation to pinpoint your manual bottleneck or software requirement. Within one business day, our senior engineering squad will reply with a preliminary technical architecture and fixed-price scope.
            </p>

            {/* Studio Commitments */}
            <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--ink-primary)' }}>
                <Clock size={18} color="#10B981" />
                <span>Replies within <strong>one business day</strong> with technical feasibility notes</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--ink-primary)' }}>
                <Globe size={18} color="#10B981" />
                <span>Operating across <strong>US (ET/PT) and EU (CET/GMT)</strong> business hours</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--ink-primary)' }}>
                <Shield size={18} color="#10B981" />
                <span>Standard NDA signed automatically prior to code review</span>
              </div>
            </div>

            {/* Email Copy Card */}
            <div
              style={{
                marginTop: '36px',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--ink-secondary)" />
                <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                  hello@vorcove.com
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  handleCopyEmail();
                }}
                className="contact-copy-btn"
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-light)',
                  background: copiedEmail ? '#10B981' : '#FFFFFF',
                  color: copiedEmail ? '#FFFFFF' : 'var(--ink-primary)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Right Column Form */}
          <div>
            {isSubmitted ? (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid var(--border-light)',
                  padding: '48px 36px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981'
                  }}
                >
                  <Check size={32} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: 'var(--ink-primary)',
                    margin: 0
                  }}
                >
                  Brief Received. Thank You.
                </h3>

                <p style={{ fontSize: '15.5px', color: 'var(--ink-secondary)', maxWidth: '42ch', lineHeight: 1.6, margin: 0 }}>
                  A senior engineering partner will review your system requirements and reply within one business day with a preliminary technical take and fixed sprint scope.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary"
                  style={{ marginTop: '12px' }}
                >
                  Submit another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {submissionError && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#DC2626',
                      fontSize: '13.5px'
                    }}
                  >
                    {submissionError}
                  </div>
                )}
                {/* Services Tags */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '10px' }}>
                    What are you looking to build?
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {CONTACT_PRESETS.services.map((svc) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => {
                            playTactileClick();
                            toggleService(svc);
                          }}
                          className={`contact-chip-btn ${isSelected ? 'is-selected' : ''}`}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '999px',
                            border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'var(--ink-primary)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--ink-primary)',
                            fontSize: '12.5px',
                            fontWeight: isSelected ? 600 : 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.18)' : '0 1px 3px rgba(30, 37, 48, 0.04)'
                          }}
                        >
                          <span>{svc}</span>
                          {isSelected && (
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Budget Range */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '10px' }}>
                    Estimated Project Budget
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {CONTACT_PRESETS.budgets.map((b) => {
                      const isSelected = selectedBudget === b;
                      return (
                        <button
                          type="button"
                          key={b}
                          onClick={() => {
                            playTactileClick();
                            setSelectedBudget(b);
                          }}
                          className={`contact-budget-btn ${isSelected ? 'is-selected' : ''}`}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'var(--bg-surface)' : '#FFFFFF',
                            color: 'var(--ink-primary)',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                            boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.12)' : '0 1px 3px rgba(30, 37, 48, 0.04)'
                          }}
                        >
                          <span>{b}</span>
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: isSelected ? '#10B981' : 'transparent',
                              border: isSelected ? 'none' : '1.5px solid var(--border-light)',
                              flexShrink: 0
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Timeline */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '10px' }}>
                    Target Start Timeline
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {CONTACT_PRESETS.timelines.map((tl) => {
                      const isSelected = selectedTimeline === tl;
                      return (
                        <button
                          type="button"
                          key={tl}
                          onClick={() => {
                            playTactileClick();
                            setSelectedTimeline(tl);
                          }}
                          className={`contact-timeline-btn ${isSelected ? 'is-selected' : ''}`}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '10px',
                            border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'var(--ink-primary)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--ink-primary)',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.18)' : '0 1px 3px rgba(30, 37, 48, 0.04)'
                          }}
                        >
                          <span>{tl}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Company Input */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                      Your Name *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        padding: '13px 16px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-light)',
                        background: '#FFFFFF',
                        fontSize: '14.5px',
                        color: 'var(--ink-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--ink-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                    />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                      Company Name *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Northwind Logistics"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        padding: '13px 16px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-light)',
                        background: '#FFFFFF',
                        fontSize: '14.5px',
                        color: 'var(--ink-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--ink-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                    />
                  </label>
                </div>

                {/* Email */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                    Work Email *
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="alex@northwind.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      padding: '13px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: '#FFFFFF',
                      fontSize: '14.5px',
                      color: 'var(--ink-primary)',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--ink-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                  />
                </label>

                {/* Brief */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                    How can we help? (The bottleneck & target metric) *
                  </span>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the manual operational bottleneck, workflow delay, or custom software application you need built..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    style={{
                      padding: '13px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: '#FFFFFF',
                      fontSize: '14.5px',
                      lineHeight: 1.5,
                      color: 'var(--ink-primary)',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--ink-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                  />
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    padding: '16px 32px',
                    fontSize: '15px',
                    justifyContent: 'center',
                    marginTop: '8px'
                  }}
                >
                  {isSubmitting ? (
                    <span>Dispatching Brief...</span>
                  ) : (
                    <>
                      <span>Send Project Brief</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-chip-btn {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease !important;
          user-select: none;
        }

        .contact-chip-btn:hover {
          transform: translateY(-2.5px);
        }

        .contact-chip-btn:not(.is-selected):hover {
          border-color: var(--ink-primary) !important;
          box-shadow: 0 6px 16px -2px rgba(30, 37, 48, 0.12) !important;
          color: var(--ink-primary) !important;
          background: #FFFFFF !important;
        }

        .contact-chip-btn.is-selected:hover {
          box-shadow: 0 8px 20px -2px rgba(30, 37, 48, 0.28) !important;
        }

        .contact-chip-btn:active {
          transform: translateY(0) scale(0.97);
        }

        .contact-budget-btn {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease !important;
          user-select: none;
        }

        .contact-budget-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px -2px rgba(30, 37, 48, 0.1) !important;
        }

        .contact-budget-btn:not(.is-selected):hover {
          border-color: var(--ink-primary) !important;
          background: #FFFFFF !important;
        }

        .contact-budget-btn.is-selected:hover {
          box-shadow: 0 8px 20px -2px rgba(30, 37, 48, 0.18) !important;
        }

        .contact-budget-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .contact-timeline-btn {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease !important;
          user-select: none;
        }

        .contact-timeline-btn:hover {
          transform: translateY(-2px);
        }

        .contact-timeline-btn:not(.is-selected):hover {
          border-color: var(--ink-primary) !important;
          box-shadow: 0 6px 16px -2px rgba(30, 37, 48, 0.1) !important;
          background: #FFFFFF !important;
        }

        .contact-timeline-btn.is-selected:hover {
          box-shadow: 0 8px 20px -2px rgba(30, 37, 48, 0.25) !important;
        }

        .contact-timeline-btn:active {
          transform: translateY(0) scale(0.97);
        }

        .contact-copy-btn {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease !important;
          user-select: none;
        }

        .contact-copy-btn:hover {
          transform: translateY(-2px);
          border-color: var(--ink-primary) !important;
          box-shadow: 0 6px 16px -2px rgba(30, 37, 48, 0.12) !important;
        }

        .contact-copy-btn:active {
          transform: translateY(0) scale(0.96);
        }
      `}</style>
    </section>
  );
};
