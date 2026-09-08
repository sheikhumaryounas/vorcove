import React, { useState } from 'react';
import { Bot, Sliders, Activity, Sparkles, Check, ArrowRight, ShieldCheck, Clock, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

export const LiveDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'copilot' | 'pricing' | 'churn'>('copilot');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

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

  const currentTicket = sampleTickets[selectedTicketIdx];

  const handleSelectTicket = (idx: number) => {
    setIsSimulating(true);
    setAcceptedAction(false);
    setSelectedTicketIdx(idx);
    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  return (
    <section
      id="demos"
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
          style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div className="kicker" style={{ justifyContent: 'center' }}>
            <span className="kicker-dot" />
            <span>Interactive Simulator</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              marginTop: '14px',
              marginBottom: '18px'
            }}
          >
            Experience what we build before you commit.
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6
            }}
          >
            Test interactive prototypes of our deployed enterprise AI and machine learning systems. Click scenarios or tweak parameters to see real-time performance.
          </p>

          {/* Tab Switchers */}
          <div
            style={{
              marginTop: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              padding: '6px',
              borderRadius: '999px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <button
              onClick={() => setActiveTab('copilot')}
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
                transition: 'all 0.25s ease'
              }}
            >
              <Bot size={16} />
              <span>AI Triage Copilot</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
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
                transition: 'all 0.25s ease'
              }}
            >
              <Sliders size={16} />
              <span>Dynamic Pricing Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('churn')}
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
                transition: 'all 0.25s ease'
              }}
            >
              <Activity size={16} />
              <span>Churn Early-Warning</span>
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sampleTickets.map((ticket, idx) => {
                    const isSelected = selectedTicketIdx === idx;
                    return (
                      <div
                        key={ticket.id}
                        onClick={() => handleSelectTicket(idx)}
                        style={{
                          padding: '16px 18px',
                          borderRadius: '14px',
                          border: isSelected ? '2px solid var(--ink-primary)' : '1px solid var(--border-light)',
                          background: isSelected ? 'var(--bg-surface)' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-muted)' }}>
                            {ticket.id}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: isSelected ? '#181E26' : '#ECE8DC', color: isSelected ? '#FFFFFF' : '#4A5464' }}>
                            {ticket.category}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--ink-primary)', lineHeight: 1.35 }}>
                          {ticket.subject}
                        </h4>
                        <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', marginTop: '6px', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#DC2626', marginTop: '2px' }}>
                        9.2 Hours avg
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                        Vorcove AI Copilot
                      </div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#10B981', marginTop: '2px' }}>
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
                      <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Confidence</div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#10B981', fontWeight: 600, marginTop: '2px' }}>
                          {currentTicket.confidence}%
                        </div>
                      </div>
                      <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Classification</div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-primary)', marginTop: '4px' }}>
                          {currentTicket.priority}
                        </div>
                      </div>
                      <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Evals Drift</div>
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
                        {Object.entries(currentTicket.entities).map(([key, val]) => (
                          <span
                            key={key}
                            style={{
                              fontSize: '12px',
                              fontFamily: 'var(--font-mono)',
                              background: '#FFFFFF',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-light)',
                              color: 'var(--ink-primary)'
                            }}
                          >
                            <strong>{key}:</strong> {val}
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
                        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
                          ✓ Ready for Auto-Dispatch
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
                          lineHeight: 1.55
                        }}
                      >
                        {currentTicket.draftResponse}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => setAcceptedAction(true)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          borderRadius: '999px',
                          background: acceptedAction ? '#10B981' : 'var(--ink-primary)',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '13.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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
                    <input
                      type="range"
                      min={200000}
                      max={5000000}
                      step={100000}
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    />
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
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={1}
                      value={baseMargin}
                      onChange={(e) => setBaseMargin(Number(e.target.value))}
                    />
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
                    <input
                      type="range"
                      min={3}
                      max={12}
                      step={0.2}
                      value={elasticityScore}
                      onChange={(e) => setElasticityScore(Number(e.target.value))}
                    />
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
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={telemetryState.loginDrop}
                      onChange={(e) => setTelemetryState(prev => ({ ...prev, loginDrop: Number(e.target.value) }))}
                    />
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
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={telemetryState.exportDrop}
                      onChange={(e) => setTelemetryState(prev => ({ ...prev, exportDrop: Number(e.target.value) }))}
                    />
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
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={telemetryState.supportFriction}
                      onChange={(e) => setTelemetryState(prev => ({ ...prev, supportFriction: Number(e.target.value) }))}
                    />
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
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3.6rem',
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
    </section>
  );
};
