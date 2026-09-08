import React, { useState, useEffect } from 'react';
import { Terminal, Bot, Play, CheckCircle2, RefreshCw, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

interface Scenario {
  id: string;
  name: string;
  inputPrompt: string;
  steps: {
    tag: string;
    text: string;
    status: 'done' | 'active' | 'pending';
    color: string;
    timing: string;
  }[];
  outputJson: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'triage',
    name: 'AI Logistics Triage',
    inputPrompt: 'Urgent: Container #48921 held at Rotterdam customs. Escalating to Tier 2.',
    steps: [
      { tag: 'INGEST', text: 'Scrubbing PII & validating OAuth2 auth token...', status: 'done', color: '#60A5FA', timing: '12ms' },
      { tag: 'RETRIEVE', text: 'pgvector query: 4 matching customs manifests (sim: 0.96)', status: 'done', color: '#34D399', timing: '48ms' },
      { tag: 'ROUTER', text: 'LangGraph multi-agent: Dispatched to FreightOps Specialist', status: 'done', color: '#A78BFA', timing: '92ms' },
      { tag: 'EVALS', text: 'Continuous guardrails: Zero hallucination, SLA compliance verified', status: 'done', color: '#FBBF24', timing: '140ms' }
    ],
    outputJson: '{\n  "status": "AUTO_RESOLVED",\n  "confidence": 0.984,\n  "first_response_latency": "11m (was 9h)",\n  "action": "MANIFEST_DISPATCHED",\n  "assigned_agent": "david.r@vorcove.internal"\n}'
  },
  {
    id: 'pricing',
    name: 'Dynamic Pricing ML',
    inputPrompt: 'Quote request: 400MT Cold-Rolled Steel Coils (Customer: MetalsDirect)',
    steps: [
      { tag: 'SCRAPE', text: 'Ingesting LME London spot index & competitor price feed...', status: 'done', color: '#60A5FA', timing: '18ms' },
      { tag: 'ELASTICITY', text: 'LightGBM model: Estimated purchase probability = 88.2%', status: 'done', color: '#34D399', timing: '35ms' },
      { tag: 'OPTIMIZE', text: 'Target margin floor adjusted from 21.2% → 28.6%', status: 'done', color: '#A78BFA', timing: '64ms' },
      { tag: 'SYNC', text: 'ERP webhook updated quote #Q-88192 in 45ms', status: 'done', color: '#FBBF24', timing: '110ms' }
    ],
    outputJson: '{\n  "quote_id": "Q-88192",\n  "gross_margin_lift": "+7.4%",\n  "projected_profit": "$42,800",\n  "quote_generation_latency": "45ms",\n  "win_probability": "88.2%"\n}'
  },
  {
    id: 'churn',
    name: 'Churn Early-Warning',
    inputPrompt: 'Telemetry event stream: Account #ACME-402 weekly export drop -60%',
    steps: [
      { tag: 'STREAM', text: 'Kafka event consumer parsed 48 behavioral event telemetry...', status: 'done', color: '#60A5FA', timing: '15ms' },
      { tag: 'CLASSIFY', text: 'XGBoost ensemble: Churn decay score computed = 78% (High Risk)', status: 'done', color: '#34D399', timing: '42ms' },
      { tag: 'PLAYBOOK', text: 'Automated CS escalation play triggered via HubSpot & Slack bot', status: 'done', color: '#A78BFA', timing: '88ms' },
      { tag: 'TIMELINE', text: 'Early warning triggered 60 days before contract renewal', status: 'done', color: '#FBBF24', timing: '125ms' }
    ],
    outputJson: '{\n  "account": "Acme Corp ($120k ARR)",\n  "risk_score": "78% (High)",\n  "lead_time": "60 Days Early",\n  "action": "CS_SLACK_DISPATCHED",\n  "arr_protected": "$120,000"\n}'
  }
];

export const HeroAgentTerminal: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [activeStepCount, setActiveStepCount] = useState<number>(4);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const scenario = SCENARIOS[activeScenarioIdx];

  const handleSelectScenario = (idx: number) => {
    playTactileClick();
    setActiveScenarioIdx(idx);
    setIsExecuting(true);
    setActiveStepCount(0);

    // Animate steps sequentially
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStepCount(step);
      if (step >= 4) {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 220);
  };

  const handleRerun = () => {
    handleSelectScenario(activeScenarioIdx);
  };

  return (
    <div
      style={{
        borderRadius: '18px',
        background: 'linear-gradient(180deg, #1E2530 0%, #161B24 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 16px 40px -10px rgba(30, 37, 48, 0.35)',
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily: 'var(--font-sans)',
        position: 'relative'
      }}
    >
      {/* Top Terminal Bar */}
      <div
        className="hero-terminal-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          flexWrap: 'wrap',
          gap: '8px',
          minWidth: 0,
          maxWidth: '100%'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flexShrink: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <span
            className="terminal-header-title"
            style={{
              fontSize: '11.5px',
              fontFamily: 'var(--font-mono)',
              color: '#A3AAB5',
              marginLeft: '4px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            vorcove-agent-v4.2:live_stream
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Toggle Pill (MANUAL / AI) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#FFFFFF',
              color: 'var(--ink-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: '999px',
              padding: '2px 7px',
              fontSize: '9.5px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              gap: '3px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ color: '#8A8F99' }}>MANUAL /</span>
            <span style={{ color: 'var(--ink-primary)' }}>AI COPILOT</span>
          </div>

          <button
            onClick={handleRerun}
            disabled={isExecuting}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              color: '#FFFFFF',
              cursor: isExecuting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '3px 7px',
              fontSize: '10.5px',
              fontFamily: 'var(--font-mono)',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
            title="Rerun agent execution"
          >
            <RefreshCw size={11} className={isExecuting ? 'floating-v-mark' : ''} />
            <span>RERUN</span>
          </button>
        </div>
      </div>

      {/* Scenario Switcher Tabs */}
      <div
        className="terminal-tabs-row"
        style={{
          display: 'flex',
          gap: '6px',
          padding: '8px 12px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maxWidth: '100%',
          minWidth: 0
        }}
      >
        {SCENARIOS.map((s, idx) => {
          const isSelected = activeScenarioIdx === idx;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(idx)}
              style={{
                padding: '5px 10px',
                borderRadius: '7px',
                border: isSelected ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
                background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: isSelected ? '#FFFFFF' : '#8F99A8',
                fontSize: '11.5px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Terminal Content Body */}
      <div style={{ padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        {/* Input Prompt */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '9px',
            padding: '9px 12px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#10B981', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>
            &gt;
          </span>
          <span style={{ fontSize: '12px', color: '#E2E8F0', lineHeight: 1.45, wordBreak: 'break-word', overflowWrap: 'break-word', minWidth: 0, flex: 1 }}>
            {scenario.inputPrompt}
          </span>
        </div>

        {/* Real-Time Reasoning Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', maxWidth: '100%', minWidth: 0 }}>
          {scenario.steps.map((step, sIdx) => {
            const isVisible = sIdx < activeStepCount;
            if (!isVisible) return null;

            return (
              <div
                key={sIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11.5px',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '6px 10px',
                  borderRadius: '7px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  animation: 'modalFadeIn 0.2s ease-out',
                  gap: '8px',
                  maxWidth: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', overflow: 'hidden', minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: step.color,
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '2px 5px',
                      borderRadius: '4px',
                      flexShrink: 0
                    }}
                  >
                    {step.tag}
                  </span>
                  <span style={{ color: '#CBD5E1', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', minWidth: 0, flex: 1, fontSize: '11px' }}>
                    {step.text}
                  </span>
                </div>

                <span style={{ color: '#64748B', fontSize: '10.5px', flexShrink: 0, marginLeft: 'auto' }}>
                  {step.timing}
                </span>
              </div>
            );
          })}
        </div>

        {/* JSON Structured Output Result */}
        {activeStepCount >= 4 && (
          <div
            style={{
              background: '#0B0F15',
              borderRadius: '10px',
              padding: '10px 12px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              position: 'relative',
              maxWidth: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: '#10B981', fontWeight: 600 }}>
                ✓ Deterministic Output (JSON Schema Validated)
              </span>
              <span style={{ fontSize: '10px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                evals: 0.00% drift
              </span>
            </div>
            <pre
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#38BDF8',
                lineHeight: 1.45,
                margin: 0,
                overflowX: 'auto',
                maxWidth: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
              }}
            >
              {scenario.outputJson}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
