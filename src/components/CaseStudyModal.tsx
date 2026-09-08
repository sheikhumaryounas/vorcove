import React, { useEffect } from 'react';
import { X, CheckCircle, ArrowRight, Quote, Shield, Clock, Layers, Sparkles } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose, onStartProject }) => {
  useEffect(() => {
    if (!study) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" style={{ padding: '40px' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  background: 'var(--bg-surface)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-light)'
                }}
              >
                {study.tag}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
                • {study.clientType}
              </span>
            </div>

            <h2
              className="heading-editorial"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                marginTop: '12px',
                marginBottom: '8px'
              }}
            >
              {study.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> Timeline: {study.timeline}
              </span>
              <span>•</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>
                ✓ Production Verified
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-surface)',
              color: 'var(--ink-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quantifiable Metric Highlight Grid */}
        <div
          style={{
            marginTop: '28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            padding: '20px',
            background: 'var(--bg-surface)',
            borderRadius: '16px',
            border: '1px solid var(--border-light)'
          }}
        >
          {study.metrics.map((m, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {m.metricName}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-primary)', marginTop: '4px', lineHeight: 1 }}>
                {m.after}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '6px' }}>
                <span>Before: {m.before}</span>
                <span style={{ color: '#10B981', fontWeight: 700, background: '#DCFCE7', padding: '1px 6px', borderRadius: '4px' }}>
                  {m.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Problem & Solution Breakdown */}
        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
              The Operational Problem
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              {study.problem}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: '8px' }}>
              The Vorcove Solution Deployed
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              {study.solution}
            </p>
          </div>
        </div>

        {/* Deliverables Shipped */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: '14px' }}>
            Production Deliverables Shipped
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
            {study.deliverables.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  fontSize: '13.5px',
                  color: 'var(--ink-primary)'
                }}
              >
                <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Used */}
        <div style={{ marginTop: '28px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: '10px' }}>
            Production Tech Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {study.techStack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  background: '#181E26',
                  color: '#F7F5EF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 500
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Client Testimonial Quote */}
        {study.clientQuote && (
          <div
            style={{
              marginTop: '32px',
              padding: '24px',
              borderRadius: '16px',
              background: 'radial-gradient(ellipse at top left, #F0EDE4, #EFEDE5)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              gap: '16px'
            }}
          >
            <Quote size={28} color="var(--ink-muted)" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15.5px', fontWeight: 500, color: 'var(--ink-primary)', lineHeight: 1.6, margin: 0 }}>
                "{study.clientQuote.text}"
              </p>
              <div style={{ marginTop: '12px', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                {study.clientQuote.author}, <span style={{ fontWeight: 400, color: 'var(--ink-secondary)' }}>{study.clientQuote.role}, {study.clientQuote.company}</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom CTAs */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div style={{ fontSize: '13.5px', color: 'var(--ink-muted)' }}>
            Looking for similar architecture or margin lift?
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              <span>Scope a build like this</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
