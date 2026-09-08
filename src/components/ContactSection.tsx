import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Mail, Clock, Globe, Shield } from 'lucide-react';
import { CONTACT_PRESETS } from '../data/content';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

import { submitContactInquiry } from '../services/api';

export const ContactSection: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['AI Agent / Copilot']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$25k — $50k (Phase 1 Build)');
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
        borderBottom: '1px solid var(--border-light)'
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '56px',
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
                maxWidth: '16ch'
              }}
            >
              Tell us what's stuck. We'll tell you what we'd build.
            </h2>

            <p
              style={{
                fontSize: '16.5px',
                color: 'var(--ink-secondary)',
                lineHeight: 1.6,
                maxWidth: '42ch'
              }}
            >
              One scoping conversation, zero pitch decks. If we aren't the best team in the world to build your system, we'll tell you immediately and point you in the right direction.
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
                onClick={handleCopyEmail}
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
                  gap: '6px',
                  transition: 'all 0.2s ease'
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
                  Brief Received — Thank You.
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
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                    What are you looking to build?
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {CONTACT_PRESETS.services.map((svc) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => toggleService(svc)}
                          style={{
                            padding: '7px 14px',
                            borderRadius: '999px',
                            border: isSelected ? '1px solid var(--ink-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'var(--ink-primary)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--ink-secondary)',
                            fontSize: '12.5px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Budget Range */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                    Estimated Project Budget
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {CONTACT_PRESETS.budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: selectedBudget === b ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                          background: selectedBudget === b ? 'var(--bg-surface)' : '#FFFFFF',
                          color: 'var(--ink-primary)',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Timeline */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                    Target Start Timeline
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {CONTACT_PRESETS.timelines.map((tl) => (
                      <button
                        type="button"
                        key={tl}
                        onClick={() => setSelectedTimeline(tl)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: selectedTimeline === tl ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                          background: selectedTimeline === tl ? 'var(--bg-surface)' : '#FFFFFF',
                          color: 'var(--ink-primary)',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {tl}
                      </button>
                    ))}
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
                    placeholder="Tell us what you're trying to build or automate, your current stack, and the target revenue or margin metric you need to move."
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
    </section>
  );
};
