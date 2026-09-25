import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Mail, Clock, Globe, Shield } from 'lucide-react';
import { CONTACT_PRESETS } from '../data/content';
import { playTactileClick } from '../utils/audio';
import { submitContactInquiry } from '../services/api';
import { HaikeiWaveMesh } from './HaikeiBackgrounds';

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
      style={{
        padding: '80px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Haikei Generative Vector Wave */}
      <HaikeiWaveMesh opacity={0.05} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="glass-card reveal-scale"
          style={{
            padding: '38px 32px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '36px',
            alignItems: 'start'
          }}
        >
          {/* Left Column Studio Info */}
          <div className="reveal-left stagger-1">
            <div className="kicker">
              <span className="kicker-dot" />
              <span>Start a Project</span>
            </div>

            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(1.55rem, 2.7vw, 2.2rem)',
                marginTop: '12px',
                marginBottom: '14px',
                maxWidth: '22ch'
              }}
            >
              Tell us what's stuck in your operations. We'll show you what we'd build.
            </h2>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--ink-secondary)',
                lineHeight: 1.55,
                maxWidth: '46ch'
              }}
            >
              One direct conversation to pinpoint your manual bottleneck or software requirement. Within one business day, our senior engineering squad will reply with a preliminary technical architecture and fixed-price scope.
            </p>

            {/* Studio Commitments */}
            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--ink-primary)' }}>
                <Clock size={16} color="#10B981" />
                <span>Replies within <strong>one business day</strong> with technical feasibility notes</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--ink-primary)' }}>
                <Globe size={16} color="#10B981" />
                <span>Operating across <strong>US (ET/PT) and EU (CET/GMT)</strong> business hours</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--ink-primary)' }}>
                <Shield size={16} color="#10B981" />
                <span>Standard NDA signed automatically prior to code review</span>
              </div>
            </div>

            {/* Email Copy Card */}
            <div
              style={{
                marginTop: '28px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--ink-secondary)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
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
                  padding: '6px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-light)',
                  background: copiedEmail ? '#10B981' : '#FFFFFF',
                  color: copiedEmail ? '#FFFFFF' : 'var(--ink-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="reveal-right stagger-2">
            {isSubmitted ? (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '36px 28px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981'
                  }}
                >
                  <Check size={26} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: 'var(--ink-primary)',
                    margin: 0
                  }}
                >
                  Brief Received. Thank You.
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', maxWidth: '42ch', lineHeight: 1.55, margin: 0 }}>
                  A senior engineering partner will review your system requirements and reply within one business day with a preliminary technical take and fixed sprint scope.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary"
                  style={{ marginTop: '8px', padding: '8px 18px', fontSize: '13px' }}
                >
                  Submit another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {submissionError && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#DC2626',
                      fontSize: '13px'
                    }}
                  >
                    {submissionError}
                  </div>
                )}
                {/* Services Tags */}
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                    What are you looking to build?
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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
                            padding: '6px 13px',
                            borderRadius: '999px',
                            border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'var(--ink-primary)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--ink-primary)',
                            fontSize: '12px',
                            fontWeight: isSelected ? 600 : 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.18)' : '0 1px 3px rgba(30, 37, 48, 0.04)'
                          }}
                        >
                          <span>{svc}</span>
                          {isSelected && (
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Budget Range */}
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                    Estimated Project Budget
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
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
                            padding: '8px 12px',
                            borderRadius: '10px',
                            border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'var(--bg-surface)' : '#FFFFFF',
                            color: 'var(--ink-primary)',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '6px',
                            boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.12)' : '0 1px 3px rgba(30, 37, 48, 0.04)'
                          }}
                        >
                          <span>{b}</span>
                          <div
                            style={{
                              width: '5px',
                              height: '5px',
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
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                    Target Start Timeline
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'var(--ink-primary)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--ink-primary)',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                      Your Name *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        padding: '10px 13px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        background: '#FFFFFF',
                        fontSize: '13.5px',
                        color: 'var(--ink-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--ink-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                    />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                      Company Name *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Northwind Logistics"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        padding: '10px 13px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        background: '#FFFFFF',
                        fontSize: '13.5px',
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
                <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                    Work Email *
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="alex@northwind.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      padding: '10px 13px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-light)',
                      background: '#FFFFFF',
                      fontSize: '13.5px',
                      color: 'var(--ink-primary)',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--ink-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                  />
                </label>

                {/* Brief */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                    How can we help? (The bottleneck & target metric) *
                  </span>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the manual operational bottleneck, workflow delay, or custom software application you need built..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    style={{
                      padding: '10px 13px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-light)',
                      background: '#FFFFFF',
                      fontSize: '13.5px',
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
                    padding: '13px 26px',
                    fontSize: '14px',
                    justifyContent: 'center',
                    marginTop: '4px'
                  }}
                >
                  {isSubmitting ? (
                    <span>Dispatching Brief...</span>
                  ) : (
                    <>
                      <span>Send Project Brief</span>
                      <ArrowRight size={16} />
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
