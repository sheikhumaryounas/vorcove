import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Zap, Check } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

import { saveRoiAudit } from '../services/api';
import { playTactileClick } from '../utils/audio';

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
            <span>ROI & Efficiency Calculator</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              marginTop: '14px',
              marginBottom: '16px'
            }}
          >
            Compute your operational payback timeline.
          </h2>
          <p
            style={{
              fontSize: '16.5px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6
            }}
          >
            Estimate your team's manual hours recovered, operational cost savings, and investment payback period through custom automated software.
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
              boxShadow: 'var(--shadow-md)',
              borderRadius: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
              <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', margin: 0 }}>
                Your Team & Operational Scope
              </h3>
            </div>

            {/* Scope Type Selector */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)', marginBottom: '12px' }}>
                Primary Automation Objective
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                {[
                  { id: 'ai-ops', label: 'Workflow Automation & Triage' },
                  { id: 'pricing', label: 'Dynamic Quoting Engine' },
                  { id: 'product', label: 'Custom Software / Portal' },
                  { id: 'data', label: 'Operational Telemetry' }
                ].map((item) => {
                  const isSelected = projectType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playTactileClick();
                        setProjectType(item.id as any);
                      }}
                      className={`roi-objective-btn ${isSelected ? 'is-selected' : ''}`}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                        background: isSelected ? 'var(--ink-primary)' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : 'var(--ink-primary)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        boxShadow: isSelected ? '0 4px 14px rgba(30, 37, 48, 0.18)' : '0 1px 3px rgba(30, 37, 48, 0.04)'
                      }}
                    >
                      <span>{item.label}</span>
                      {isSelected ? (
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--border-light)', flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Team Size */}
              <div className="roi-slider-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    Impacted Team Size
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 700,
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      color: 'var(--ink-primary)'
                    }}
                  >
                    {teamSize} people
                  </span>
                </div>
                {(() => {
                  const teamSizePercent = Math.round(((teamSize - 5) / (150 - 5)) * 100);
                  return (
                    <input
                      type="range"
                      min={5}
                      max={150}
                      step={5}
                      value={teamSize}
                      className="custom-roi-slider"
                      style={{
                        background: `linear-gradient(to right, var(--ink-primary) 0%, var(--ink-primary) ${teamSizePercent}%, #E5E2D8 ${teamSizePercent}%, #E5E2D8 100%)`
                      }}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                    />
                  );
                })()}
              </div>

              {/* Hours Wasted */}
              <div className="roi-slider-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    Manual Toil per Person / Week
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 700,
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      color: 'var(--ink-primary)'
                    }}
                  >
                    {hoursWastedPerWeek} hrs/wk
                  </span>
                </div>
                {(() => {
                  const hoursWastedPercent = Math.round(((hoursWastedPerWeek - 4) / (30 - 4)) * 100);
                  return (
                    <input
                      type="range"
                      min={4}
                      max={30}
                      step={1}
                      value={hoursWastedPerWeek}
                      className="custom-roi-slider"
                      style={{
                        background: `linear-gradient(to right, var(--ink-primary) 0%, var(--ink-primary) ${hoursWastedPercent}%, #E5E2D8 ${hoursWastedPercent}%, #E5E2D8 100%)`
                      }}
                      onChange={(e) => setHoursWastedPerWeek(Number(e.target.value))}
                    />
                  );
                })()}
              </div>

              {/* Hourly Rate */}
              <div className="roi-slider-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    Average Loaded Hourly Cost
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 700,
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      color: 'var(--ink-primary)'
                    }}
                  >
                    ${hourlyRate}/hr
                  </span>
                </div>
                {(() => {
                  const hourlyRatePercent = Math.round(((hourlyRate - 30) / (150 - 30)) * 100);
                  return (
                    <input
                      type="range"
                      min={30}
                      max={150}
                      step={5}
                      value={hourlyRate}
                      className="custom-roi-slider"
                      style={{
                        background: `linear-gradient(to right, var(--ink-primary) 0%, var(--ink-primary) ${hourlyRatePercent}%, #E5E2D8 ${hourlyRatePercent}%, #E5E2D8 100%)`
                      }}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                    />
                  );
                })()}
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

      <style>{`
        .roi-objective-btn {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease !important;
          user-select: none;
        }

        .roi-objective-btn:hover {
          transform: translateY(-2px);
        }

        .roi-objective-btn:not(.is-selected):hover {
          border-color: var(--ink-primary) !important;
          box-shadow: 0 6px 16px -2px rgba(30, 37, 48, 0.12) !important;
          background: #FFFFFF !important;
        }

        .roi-objective-btn.is-selected:hover {
          box-shadow: 0 8px 20px -2px rgba(30, 37, 48, 0.3) !important;
        }

        .roi-objective-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .roi-slider-group {
          padding: 8px 0;
        }

        .custom-roi-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }

        .custom-roi-slider::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          background: transparent;
          border-radius: 999px;
        }

        .custom-roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--ink-primary);
          border: 2.5px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(30, 37, 48, 0.28);
          cursor: grab;
          margin-top: -7px; /* (6px track - 20px thumb) / 2 = -7px for perfect vertical centering */
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease, background-color 0.18s ease;
        }

        .custom-roi-slider::-webkit-slider-thumb:hover {
          transform: scale(1.25);
          box-shadow: 0 4px 12px rgba(30, 37, 48, 0.4);
          background: #111827;
        }

        .custom-roi-slider::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
        }

        .custom-roi-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--ink-primary);
          border: 2.5px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(30, 37, 48, 0.28);
          cursor: grab;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease;
        }

        .custom-roi-slider::-moz-range-thumb:hover {
          transform: scale(1.25);
          box-shadow: 0 4px 12px rgba(30, 37, 48, 0.4);
        }
      `}</style>
    </section>
  );
};
