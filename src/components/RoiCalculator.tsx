import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Zap, Check } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

import { saveRoiAudit } from '../services/api';

export const RoiCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [projectType, setProjectType] = useState<'ai-ops' | 'pricing' | 'product' | 'data'>('ai-ops');
  const [hourlyRate, setHourlyRate] = useState<number>(55);
  const [hoursWastedPerWeek, setHoursWastedPerWeek] = useState<number>(14);

  // Email & saving state
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  // Calculations
  const weeklyWastedCost = teamSize * hoursWastedPerWeek * hourlyRate;
  const annualWastedCost = weeklyWastedCost * 52;
  
  // Vorcove estimated automation efficiency
  const efficiencyMultiplier = projectType === 'ai-ops' ? 0.72 : projectType === 'pricing' ? 0.85 : projectType === 'data' ? 0.65 : 0.60;
  const estimatedAnnualSavings = annualWastedCost * efficiencyMultiplier;
  const estimatedHoursSavedPerMonth = Math.round((teamSize * hoursWastedPerWeek * 4.33) * efficiencyMultiplier);

  // Estimated implementation investment
  const estimatedInvestment = projectType === 'ai-ops' ? 35000 : projectType === 'pricing' ? 45000 : projectType === 'data' ? 40000 : 38000;
  const paybackMonths = ((estimatedInvestment / estimatedAnnualSavings) * 12).toFixed(1);

  const handleSaveAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;
    setIsSaving(true);
    try {
      const res = await saveRoiAudit({
        teamSize,
        projectType,
        hourlyRate,
        hoursWastedPerWeek,
        clientEmail,
        clientName
      });
      if (res.success) {
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Failed to save ROI audit:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      id="calculator"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div className="kicker" style={{ justifyContent: 'center' }}>
            <span className="kicker-dot" />
            <span>ROI & Scope Calculator</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              marginTop: '14px',
              marginBottom: '16px'
            }}
          >
            Compute your engineering payback timeline.
          </h2>
          <p
            style={{
              fontSize: '16.5px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6
            }}
          >
            Estimate your operational cost recovery, annual EBITDA savings, and payback period before booking a scoping call.
          </p>
        </div>

        {/* Interactive Grid */}
        <div
          style={{
            marginTop: '52px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '36px'
          }}
        >
          {/* Controls Input Card */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '24px' }}>
              Your Team & Operational Scope
            </h3>

            {/* Scope Type Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)', marginBottom: '10px' }}>
                Primary Build Objective
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'ai-ops', label: 'AI Triage & Copilot' },
                  { id: 'pricing', label: 'Dynamic Pricing Engine' },
                  { id: 'product', label: 'Full-Stack Web App' },
                  { id: 'data', label: 'Churn & ML Pipeline' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id as any)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: projectType === item.id ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                      background: projectType === item.id ? 'var(--bg-surface)' : '#FFFFFF',
                      color: 'var(--ink-primary)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Team Size */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    Impacted Team Size
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700 }}>
                    {teamSize} people
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                />
              </div>

              {/* Hours Wasted */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    Manual Toil per Person / Week
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700 }}>
                    {hoursWastedPerWeek} hrs/wk
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={30}
                  step={1}
                  value={hoursWastedPerWeek}
                  onChange={(e) => setHoursWastedPerWeek(Number(e.target.value))}
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    Average Loaded Hourly Cost
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700 }}>
                    ${hourlyRate}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={150}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Results Output Band */}
          <div
            style={{
              background: 'var(--bg-dark)',
              color: '#FFFFFF',
              borderRadius: '22px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-dark)',
              gap: '24px'
            }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9DA7B5' }}>
                Estimated Economic Return
              </span>

              <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '13px', color: '#9DA7B5' }}>
                  Projected Annual Cost Recovery
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.8rem, 4.5vw, 3.8rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#34D399',
                    lineHeight: 1,
                    marginTop: '4px'
                  }}
                >
                  ${Math.round(estimatedAnnualSavings).toLocaleString()}
                  <span style={{ fontSize: '18px', color: '#9DA7B5', marginLeft: '6px' }}>/ year</span>
                </div>
              </div>
            </div>

            {/* Sub-Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '11.5px', color: '#9DA7B5', textTransform: 'uppercase' }}>
                  Payback Period
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  {paybackMonths} Months
                </div>
                <div style={{ fontSize: '11.5px', color: '#6EE7B7', marginTop: '2px' }}>
                  Fast capital recovery
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '11.5px', color: '#9DA7B5', textTransform: 'uppercase' }}>
                  Hours Returned
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  {estimatedHoursSavedPerMonth.toLocaleString()} hrs
                </div>
                <div style={{ fontSize: '11.5px', color: '#9DA7B5', marginTop: '2px' }}>
                  per month to team
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="#contact"
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  color: '#1E2530',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                }}
              >
                <span>Lock in this scope for Phase 1</span>
                <ArrowRight size={16} />
              </a>

              {isSaved ? (
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(52, 211, 153, 0.15)',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                    color: '#6EE7B7',
                    fontSize: '12.5px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={15} />
                  <span>ROI Scope Audit Saved to Vorcove Backend!</span>
                </div>
              ) : showSaveModal ? (
                <form
                  onSubmit={handleSaveAudit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '12px',
                    borderRadius: '12px'
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'rgba(0,0,0,0.3)',
                      color: '#FFF',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="submit"
                      disabled={isSaving}
                      style={{
                        flex: 1,
                        padding: '8px',
                        background: '#34D399',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#064E3B',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {isSaving ? 'Saving Audit...' : 'Confirm & Save Audit'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSaveModal(false)}
                      style={{
                        padding: '8px 12px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        color: '#9CA3AF',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSaveModal(true)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    color: '#E6E8EC',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Calculator size={15} />
                  <span>Save Audit & Send Detailed Scope Proposal</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
