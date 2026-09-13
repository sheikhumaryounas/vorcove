import React, { useState } from 'react';
import { Bot, Sliders, Activity, Sparkles, Check, ArrowRight, ShieldCheck, Clock, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { playTactileClick } from '../utils/audio';

import { executeCopilotTriage, executePricingSimulation, executeChurnAnalysis } from '../services/api';

export const LiveDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'copilot' | 'pricing' | 'churn'>('copilot');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);
  const [backendLatency, setBackendLatency] = useState<number | null>(null);

  // Copilot Demo State
  const sampleTickets = [
    {
      id: 't-1',
      subject: 'Critical: Urgent shipment delay on Rotterdam carrier #48921',
      body: 'Our delivery for container #48921 is 3 days late in Rotterdam customs. Our production line will halt if we do not receive the customs clearance manifest within 4 hours. Please escalate to tier 2.',
      category: 'Urgent Logistics Delay',
      confidence: 98.4,
      priority: 'P1 - High Escalation',
      entities: { Container: '#48921', Port: 'Rotterdam', Impact: 'Production Halt' },
      suggestedAction: 'Auto-fetch AS400 customs manifest & dispatch tier-2 port agent ticket',
      draftResponse: 'Hello Marcus, we have flagged container #48921 as P1 Critical. We pulled your customs clearance manifest (#NL-99412) from our port broker API and assigned specialist David R. to expedite gate clearance. Expected update in 25 minutes.'
    },
    {
      id: 't-2',
      subject: 'Invoice discrepancy for Q3 subscription seats (Invoice #INV-8832)',
      body: 'We noticed an unexpected charge for 15 additional developer seats on our August invoice. We only added 5 seats during our July sprint. Please adjust billing.',
      category: 'Billing & Invoice Audit',
      confidence: 96.8,
      priority: 'P2 - Commercial Support',
      entities: { Invoice: '#INV-8832', Discrepancy: '10 seats ($1,500)' },
      suggestedAction: 'Query Stripe billing log, cross-reference SSO active users, propose credit note',
      draftResponse: 'Hi Elena, our automated billing audit confirmed the 10 unassigned seats were provisioned in error during SSO sync. A credit note for $1,500.00 has been issued to Invoice #INV-8832. Your updated balance is $3,200.00.'
    },
    {
      id: 't-3',
      subject: 'Webhook callback signature failure on v2 API endpoint',
      body: 'Our engineering team is receiving HMAC SHA-256 verification errors when parsing webhook event payload evt_998124. Is the signing secret rotated?',
      category: 'Developer Platform / API',
      confidence: 99.1,
      priority: 'P2 - Technical Integration',
      entities: { Event: 'evt_998124', Algorithm: 'HMAC SHA-256', Endpoint: '/v2/webhooks' },
      suggestedAction: 'Verify tenant public key version & test mock webhook payload',
      draftResponse: 'Hi Julian, we validated payload evt_998124 against your active secret. It appears timestamp headers exceeded the 300s replay window. Please ensure your server NTP clock is synced to pool.ntp.org.'
    }
  ];

  const [selectedTicketIdx, setSelectedTicketIdx] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [acceptedAction, setAcceptedAction] = useState<boolean>(false);
  const [currentTicketData, setCurrentTicketData] = useState<any>(sampleTickets[0]);

  // Pricing Demo State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1200000); // $1.2M / mo
  const [baseMargin, setBaseMargin] = useState<number>(22); // 22%
  const [elasticityScore, setElasticityScore] = useState<number>(7.4); // 7.4% margin lift

  const currentGrossProfit = (monthlyRevenue * baseMargin) / 100;
  const optimizedGrossProfit = (monthlyRevenue * (baseMargin + elasticityScore)) / 100;
  const monthlyProfitLift = optimizedGrossProfit - currentGrossProfit;
  const annualProfitLift = monthlyProfitLift * 12;

  // Churn Demo State
  const [telemetryState, setTelemetryState] = useState({
    loginDrop: 45,
    exportDrop: 60,
    supportFriction: 3,
    accountTier: 'Enterprise ($120k ARR)'
  });

  const calculateRiskScore = () => {
    return Math.min(99, Math.round((telemetryState.loginDrop * 0.4) + (telemetryState.exportDrop * 0.4) + (telemetryState.supportFriction * 5)));
  };

  const currentTicket = currentTicketData || sampleTickets[selectedTicketIdx];

  const handleSelectTicket = async (idx: number) => {
    setIsSimulating(true);
    setAcceptedAction(false);
    setSelectedTicketIdx(idx);
    const selected = sampleTickets[idx];
    
    try {
      const start = Date.now();
      const res = await executeCopilotTriage({
        ticketId: selected.id,
        subject: selected.subject,
        body: selected.body
      });
      const latency = Date.now() - start;
      setBackendLatency(latency);

      if (res.success && res.data) {
        setCurrentTicketData({
          ...selected,
          ...res.data
        });
      } else {
        setCurrentTicketData(selected);
      }
    } catch {
      setCurrentTicketData(selected);
    } finally {
      setIsSimulating(false);
    }
  };

  // Sync Pricing simulation to backend telemetry
  React.useEffect(() => {
    if (activeTab === 'pricing') {
      const timer = setTimeout(async () => {
        try {
          const start = Date.now();
          const res = await executePricingSimulation({
            monthlyRevenue,
            baseMargin,
            elasticityScore
          });
          if (res.success) {
            setBackendLatency(Date.now() - start);
          }
        } catch {
          // fallback gracefully
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab, monthlyRevenue, baseMargin, elasticityScore]);

  // Sync Churn simulation to backend telemetry
  React.useEffect(() => {
    if (activeTab === 'churn') {
      const timer = setTimeout(async () => {
        try {
          const start = Date.now();
          const res = await executeChurnAnalysis({
            accountName: telemetryState.accountTier,
            usageDropPercent: telemetryState.loginDrop,
            openTickets: telemetryState.supportFriction,
            contractValue: 120000
          });
          if (res.success) {
            setBackendLatency(Date.now() - start);
          }
        } catch {
          // fallback gracefully
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab, telemetryState]);

  return (
    <section
      id="demos"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div className="kicker" style={{ justifyContent: 'center' }}>
            <span className="kicker-dot" />
            <span>Interactive Simulators</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              marginTop: '14px',
              marginBottom: '18px'
            }}
          >
            Experience our automated solutions before you commit.
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6
            }}
          >
            Test interactive simulations of our custom automation systems, dynamic quoting engines, and operational monitoring tools. Select scenarios or tweak business parameters to see real-time performance.
          </p>

          {/* Tab Switchers */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              padding: '6px',
              borderRadius: '999px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              maxWidth: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <button
              onClick={() => {
                playTactileClick();
                setActiveTab('copilot');
              }}
              className={`demo-nav-tab ${activeTab === 'copilot' ? 'is-active' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                background: activeTab === 'copilot' ? 'var(--ink-primary)' : 'transparent',
                color: activeTab === 'copilot' ? '#FFFFFF' : 'var(--ink-secondary)',
                fontFamily: 'var(--font-display)',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === 'copilot' ? '0 4px 14px rgba(30, 37, 48, 0.22)' : 'none'
              }}
            >
              <Bot size={16} />
              <span>Automated Ops Triage</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                setActiveTab('pricing');
              }}
              className={`demo-nav-tab ${activeTab === 'pricing' ? 'is-active' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                background: activeTab === 'pricing' ? 'var(--ink-primary)' : 'transparent',
                color: activeTab === 'pricing' ? '#FFFFFF' : 'var(--ink-secondary)',
                fontFamily: 'var(--font-display)',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === 'pricing' ? '0 4px 14px rgba(30, 37, 48, 0.22)' : 'none'
              }}
            >
              <Sliders size={16} />
              <span>Dynamic Quoting Engine</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                setActiveTab('churn');
              }}
              className={`demo-nav-tab ${activeTab === 'churn' ? 'is-active' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                background: activeTab === 'churn' ? 'var(--ink-primary)' : 'transparent',
                color: activeTab === 'churn' ? '#FFFFFF' : 'var(--ink-secondary)',
                fontFamily: 'var(--font-display)',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === 'churn' ? '0 4px 14px rgba(30, 37, 48, 0.22)' : 'none'
              }}
            >
              <Activity size={16} />
              <span>Operational Retention Radar</span>
            </button>
          </div>
        </div>

        {/* Demo Content Canvas */}
        <div style={{ marginTop: '48px' }}>
          {/* TAB 1: COPILOT SIMULATOR */}
          {activeTab === 'copilot' && (
            <div
              className="glass-card"
              style={{
                padding: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '36px',
                background: '#FFFFFF',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {/* Left Column: Sample Incoming Inquiries */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
                    Incoming Customer Inquiries (Live Stream)
                  </span>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                    Streaming
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {sampleTickets.map((ticket, idx) => {
                    const isSelected = selectedTicketIdx === idx;
                    return (
                      <div
                        key={ticket.id}
                        onClick={() => {
                          playTactileClick();
                          handleSelectTicket(idx);
                        }}
                        className={`demo-ticket-card ${isSelected ? 'is-selected' : ''}`}
                        style={{
                          padding: '18px 20px',
                          borderRadius: '16px',
                          border: isSelected ? '1.5px solid var(--ink-primary)' : '1px solid var(--border-light)',
                          background: isSelected ? 'linear-gradient(135deg, #FFFFFF 0%, #F5F3EC 100%)' : '#FFFFFF',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 8px 20px -2px rgba(30, 37, 48, 0.15)' : '0 1px 3px rgba(30, 37, 48, 0.04)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 600, color: isSelected ? 'var(--ink-primary)' : 'var(--ink-muted)' }}>
                            {ticket.id}
                          </span>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '3px 10px',
                              borderRadius: '999px',
                              background: isSelected ? 'var(--ink-primary)' : '#EFECE3',
                              color: isSelected ? '#FFFFFF' : '#4A5464',
                              border: isSelected ? '1px solid var(--ink-primary)' : '1px solid var(--border-light)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                          >
                            <span>{ticket.category}</span>
                            {isSelected && (
                              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399' }} />
                            )}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-primary)', lineHeight: 1.35 }}>
                          {ticket.subject}
                        </h4>
                        <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', marginTop: '6px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {ticket.body}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                        Legacy Human Triage
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>
                        9.2 Hours avg
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                        Vorcove AI Copilot
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '2px' }}>
                        11 Minutes
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Model Output & Resolution Draft */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '18px',
                  padding: '24px',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px'
                }}
              >
                {/* Status Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bot size={18} color="#4F46E5" />
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                      Vorcove Triage Agent v4.2
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-secondary)' }}>
                    <Zap size={14} color="#10B981" />
                    <span>Latency: 320ms</span>
                  </div>
                </div>

                {isSimulating ? (
                  <div style={{ padding: '40px 0', textAlign: 'center' }}>
                    <RefreshCw size={28} className="floating-v-mark" color="var(--ink-muted)" style={{ margin: '0 auto 12px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink-secondary)' }}>
                      Extracting entities & matching ERP knowledge base...
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Metrics Radar */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      <div className="demo-metric-pill" style={{ background: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Confidence</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#10B981', fontWeight: 800, marginTop: '2px' }}>
                          {currentTicket.confidence}%
                        </div>
                      </div>
                      <div className="demo-metric-pill" style={{ background: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Classification</div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-primary)', marginTop: '4px' }}>
                          {currentTicket.priority}
                        </div>
                      </div>
                      <div className="demo-metric-pill" style={{ background: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Evals Drift</div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#10B981', marginTop: '4px' }}>
                          0.00% Zero Drift
                        </div>
                      </div>
                    </div>

                    {/* Extracted Entities */}
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                        Extracted Metadata & Knowledge Retrieval
                      </span>
                      <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {Object.entries(currentTicket.entities || {}).map(([key, val]) => (
                          <span
                            key={key}
                            className="demo-entity-chip"
                            style={{
                              fontSize: '12px',
                              fontFamily: 'var(--font-mono)',
                              background: '#FFFFFF',
                              padding: '5px 12px',
                              borderRadius: '8px',
                              border: '1px solid var(--border-light)',
                              color: 'var(--ink-primary)',
                              boxShadow: '0 1px 3px rgba(30, 37, 48, 0.04)'
                            }}
                          >
                            <strong style={{ color: 'var(--ink-muted)' }}>{key}:</strong> {String(val)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Drafted Response */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                          Autonomous Resolution Draft
                        </span>
                        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={12} />
                          <span>Ready for Auto-Dispatch</span>
                        </span>
                      </div>
                      <div
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid var(--border-light)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          fontSize: '13.5px',
                          color: 'var(--ink-primary)',
                          lineHeight: 1.55,
                          boxShadow: '0 1px 4px rgba(30, 37, 48, 0.03)'
                        }}
                      >
                        {currentTicket.draftResponse}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => {
                          playTactileClick();
                          setAcceptedAction(true);
                        }}
                        className="btn-dispatch-action"
                        style={{
                          flex: 1,
                          padding: '13px 20px',
                          borderRadius: '999px',
                          background: acceptedAction ? '#10B981' : 'var(--ink-primary)',
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          fontSize: '13.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: acceptedAction ? '0 6px 18px rgba(16, 185, 129, 0.35)' : '0 4px 14px rgba(30, 37, 48, 0.28)'
                        }}
                      >
                        {acceptedAction ? (
                          <>
                            <Check size={16} />
                            <span>Action Dispatched to Zendesk & ERP</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            <span>Dispatch Auto-Resolution</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PRICING SIMULATOR */}
          {activeTab === 'pricing' && (
            <div
              className="glass-card"
              style={{
                padding: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '40px',
                background: '#FFFFFF',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {/* Controls */}
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
                  Catalog Volume & Margin Parameters
                </span>

                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Monthly Revenue Slider */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        Monthly Catalog GMV
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                        ${(monthlyRevenue / 1000).toLocaleString()}k / month
                      </span>
                    </div>
                    {(() => {
                      const monthlyRevPercent = Math.round(((monthlyRevenue - 200000) / (5000000 - 200000)) * 100);
                      return (
                        <input
                          type="range"
                          min={200000}
                          max={5000000}
                          step={100000}
                          value={monthlyRevenue}
                          style={{
                            background: `linear-gradient(to right, var(--ink-primary) 0%, var(--ink-primary) ${monthlyRevPercent}%, #E2DFD5 ${monthlyRevPercent}%, #E2DFD5 100%)`
                          }}
                          onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                        />
                      );
                    })()}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                      <span>$200k/mo</span>
                      <span>$5,000,000/mo</span>
                    </div>
                  </div>

                  {/* Baseline Gross Margin */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        Current Static Gross Margin
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                        {baseMargin}%
                      </span>
                    </div>
                    {(() => {
                      const baseMarginPercent = Math.round(((baseMargin - 10) / (50 - 10)) * 100);
                      return (
                        <input
                          type="range"
                          min={10}
                          max={50}
                          step={1}
                          value={baseMargin}
                          style={{
                            background: `linear-gradient(to right, var(--ink-primary) 0%, var(--ink-primary) ${baseMarginPercent}%, #E2DFD5 ${baseMarginPercent}%, #E2DFD5 100%)`
                          }}
                          onChange={(e) => setBaseMargin(Number(e.target.value))}
                        />
                      );
                    })()}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                      <span>10% Margin</span>
                      <span>50% Margin</span>
                    </div>
                  </div>

                  {/* Algorithmic Lift Target */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        Vorcove Dynamic Elasticity Lift
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: '#10B981' }}>
                        +{elasticityScore.toFixed(1)}%
                      </span>
                    </div>
                    {(() => {
                      const elasticityPercent = Math.round(((elasticityScore - 3) / (12 - 3)) * 100);
                      return (
                        <input
                          type="range"
                          min={3}
                          max={12}
                          step={0.2}
                          value={elasticityScore}
                          style={{
                            background: `linear-gradient(to right, #10B981 0%, #10B981 ${elasticityPercent}%, #E2DFD5 ${elasticityPercent}%, #E2DFD5 100%)`
                          }}
                          onChange={(e) => setElasticityScore(Number(e.target.value))}
                        />
                      );
                    })()}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                      <span>+3.0% (Conservative)</span>
                      <span>+12.0% (Aggressive)</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '30px', padding: '16px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                    💡 <strong>Real Production Result:</strong> For MetalsDirect Group, our dynamic pricing engine achieved a <strong>+7.4% gross margin expansion</strong> on the exact same traffic catalog.
                  </div>
                </div>
              </div>

              {/* Financial Return Visualizer */}
              <div
                style={{
                  background: 'var(--bg-dark)',
                  color: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '24px'
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9DA7B5' }}>
                    Projected Financial Impact
                  </span>
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#9DA7B5' }}>
                      Net Additional Annual EBITDA
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#34D399',
                        lineHeight: 1.1,
                        marginTop: '4px'
                      }}
                    >
                      +${Math.round(annualProfitLift).toLocaleString()}
                      <span style={{ fontSize: '18px', color: '#9DA7B5', marginLeft: '6px' }}>/ year</span>
                    </div>
                  </div>
                </div>

                {/* Comparison Breakdown Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#9DA7B5', marginBottom: '6px' }}>
                      <span>Baseline Annual Profit</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>${Math.round(currentGrossProfit * 12).toLocaleString()}</span>
                    </div>
                    <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(baseMargin / (baseMargin + elasticityScore)) * 100}%`, background: '#64748B', borderRadius: '999px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#FFFFFF', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600, color: '#34D399' }}>With Vorcove Pricing Engine</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34D399' }}>${Math.round(optimizedGrossProfit * 12).toLocaleString()}</span>
                    </div>
                    <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: '999px' }} />
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '13px', color: '#CBD5E1' }}>
                    Quote Calculation Latency: <strong>45ms</strong>
                  </div>
                  <a
                    href="#contact"
                    style={{
                      padding: '10px 18px',
                      borderRadius: '999px',
                      background: '#FFFFFF',
                      color: '#181E26',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Scope this engine</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHURN SIMULATOR */}
          {activeTab === 'churn' && (
            <div
              className="glass-card"
              style={{
                padding: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '36px',
                background: '#FFFFFF',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {/* Telemetry Adjusters */}
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
                  Customer Telemetry Risk Factors
                </span>

                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        Weekly Login Velocity Decay
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: '#DC2626' }}>
                        -{telemetryState.loginDrop}%
                      </span>
                    </div>
                    {(() => {
                      const dropPercent = telemetryState.loginDrop;
                      return (
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={telemetryState.loginDrop}
                          style={{
                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${dropPercent}%, #E2DFD5 ${dropPercent}%, #E2DFD5 100%)`
                          }}
                          onChange={(e) => setTelemetryState(prev => ({ ...prev, loginDrop: Number(e.target.value) }))}
                        />
                      );
                    })()}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        Core Feature Export Activity Drop
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: '#DC2626' }}>
                        -{telemetryState.exportDrop}%
                      </span>
                    </div>
                    {(() => {
                      const exportPercent = telemetryState.exportDrop;
                      return (
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={telemetryState.exportDrop}
                          style={{
                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${exportPercent}%, #E2DFD5 ${exportPercent}%, #E2DFD5 100%)`
                          }}
                          onChange={(e) => setTelemetryState(prev => ({ ...prev, exportDrop: Number(e.target.value) }))}
                        />
                      );
                    })()}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        Open Support Friction Tickets
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                        {telemetryState.supportFriction} tickets
                      </span>
                    </div>
                    {(() => {
                      const frictionPercent = Math.round((telemetryState.supportFriction / 10) * 100);
                      return (
                        <input
                          type="range"
                          min={0}
                          max={10}
                          value={telemetryState.supportFriction}
                          style={{
                            background: `linear-gradient(to right, var(--ink-primary) 0%, var(--ink-primary) ${frictionPercent}%, #E2DFD5 ${frictionPercent}%, #E2DFD5 100%)`
                          }}
                          onChange={(e) => setTelemetryState(prev => ({ ...prev, supportFriction: Number(e.target.value) }))}
                        />
                      );
                    })()}
                  </div>
                </div>

                <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>
                    🎯 <strong>Model Prediction Lead Time:</strong> Identifies at-risk ARR <strong>60 days before contract renewal</strong>, allowing Customer Success teams to trigger proactive retention plays.
                  </div>
                </div>
              </div>

              {/* Real-Time Risk Score Indicator */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '18px',
                  padding: '28px',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
                      Predictive Health Score
                    </span>
                    <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                      Account: Acme Corp
                    </span>
                  </div>

                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3.6rem',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        color: calculateRiskScore() > 60 ? '#DC2626' : calculateRiskScore() > 30 ? '#F59E0B' : '#10B981'
                      }}
                    >
                      {calculateRiskScore()}%
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        {calculateRiskScore() > 60 ? 'High Churn Risk' : calculateRiskScore() > 30 ? 'Moderate Risk Detected' : 'Healthy Engagement'}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                        Trigger automated CS escalation sequence
                      </div>
                    </div>
                  </div>
                </div>

                {/* Automated Action Recommendations */}
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Automated Playbook Trigger
                  </div>
                  <div style={{ fontSize: '13.5px', color: 'var(--ink-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} color="#DC2626" />
                    <span>Alert dispatched to CS Account Executive via Slack & HubSpot</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="btn-primary"
                  style={{ justifyContent: 'center' }}
                >
                  <span>Build Churn Early-Warning Suite</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .demo-nav-tab {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease !important;
          user-select: none;
        }

        .demo-nav-tab:hover {
          transform: translateY(-2px);
        }

        .demo-nav-tab:not(.is-active):hover {
          background: rgba(30, 37, 48, 0.06) !important;
          color: var(--ink-primary) !important;
        }

        .demo-nav-tab.is-active:hover {
          box-shadow: 0 6px 18px rgba(30, 37, 48, 0.3) !important;
        }

        .demo-nav-tab:active {
          transform: translateY(0) scale(0.97);
        }

        .demo-ticket-card {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease, background-color 0.22s ease !important;
          user-select: none;
        }

        .demo-ticket-card:hover {
          transform: translateY(-3px) scale(1.008);
        }

        .demo-ticket-card:not(.is-selected):hover {
          border-color: var(--ink-primary) !important;
          box-shadow: 0 8px 22px -4px rgba(30, 37, 48, 0.14), 0 2px 6px rgba(30, 37, 48, 0.04) !important;
          background: #FFFFFF !important;
        }

        .demo-ticket-card.is-selected:hover {
          box-shadow: 0 12px 28px -4px rgba(30, 37, 48, 0.22) !important;
        }

        .demo-ticket-card:active {
          transform: translateY(-1px) scale(0.99);
        }

        .btn-dispatch-action {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, background-color 0.2s ease, border-color 0.2s ease !important;
          user-select: none;
        }

        .btn-dispatch-action:hover {
          transform: translateY(-2.5px);
          background: #11161D !important;
          box-shadow: 0 12px 28px -4px rgba(30, 37, 48, 0.45) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        .btn-dispatch-action:active {
          transform: translateY(0) scale(0.98);
        }

        .demo-entity-chip {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease !important;
          user-select: none;
        }

        .demo-entity-chip:hover {
          transform: translateY(-2px);
          border-color: var(--ink-primary) !important;
          box-shadow: 0 4px 12px rgba(30, 37, 48, 0.1) !important;
          background: #FFFFFF !important;
        }

        .demo-metric-pill {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important;
        }

        .demo-metric-pill:hover {
          transform: translateY(-2px);
          border-color: #CBD5E1 !important;
          box-shadow: 0 6px 16px rgba(30, 37, 48, 0.08) !important;
        }
      `}</style>
    </section>
  );
};
