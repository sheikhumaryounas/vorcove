import React, { useState } from 'react';
import { Database, ShieldCheck, Zap, Bot, ArrowRight, Check, Code, GitFork, Cpu, Layers } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { playTactileClick } from '../utils/audio';

interface PipelineNode {
  id: string;
  stepNumber: string;
  name: string;
  tag: string;
  icon: any;
  latency: string;
  summary: string;
  codeSnippet: string;
  kpis: { label: string; value: string }[];
}

const NODES: PipelineNode[] = [
  {
    id: 'ingestion',
    stepNumber: '01',
    name: 'Context Ingestion & PII Filter',
    tag: 'Gateway',
    icon: Zap,
    latency: '14ms',
    summary: 'Streams raw multi-modal input (emails, PDFs, ERP events, webhooks), verifies JWT tokens, and strips all sensitive PII before model processing.',
    codeSnippet: `async def sanitize_payload(event: WebhookEvent):\n    session = verify_tenant_auth(event.headers)\n    clean_text = pii_scrubber.redact(event.body)\n    return ContextFrame(user=session.tenant_id, text=clean_text)`,
    kpis: [
      { label: 'PII Scrubbing SLA', value: '< 15ms' },
      { label: 'Compliance', value: 'GDPR / SOC 2' }
    ]
  },
  {
    id: 'rag',
    stepNumber: '02',
    name: 'Hybrid RAG & Cross-Encoder',
    tag: 'Retrieval',
    icon: Database,
    latency: '38ms',
    summary: 'Performs dual semantic embedding search (pgvector) + BM25 keyword search, followed by a cross-encoder reranker for high context precision.',
    codeSnippet: `results = hybrid_search(\n    query=embedding,\n    top_k=20,\n    alpha=0.75  # 75% vector, 25% lexical\n)\nranked_clauses = bge_reranker.rank(query, results)[:4]`,
    kpis: [
      { label: 'Recall Accuracy', value: '99.4%' },
      { label: 'Vector Index', value: 'pgvector HNSW' }
    ]
  },
  {
    id: 'agent',
    stepNumber: '03',
    name: 'Multi-Agent State Orchestration',
    tag: 'LangGraph',
    icon: Bot,
    latency: '110ms',
    summary: 'Coordinates autonomous specialized sub-agents with strict tool-calling schemas and human-in-the-loop escalation rules.',
    codeSnippet: `workflow = StateGraph(AgentState)\nworkflow.add_node("classifier", classify_intent)\nworkflow.add_node("erp_executor", query_as400_manifest)\nworkflow.add_conditional_edges("classifier", route_by_confidence)`,
    kpis: [
      { label: 'Tool Calling Success', value: '99.8%' },
      { label: 'Orchestration Engine', value: 'LangGraph / Go' }
    ]
  },
  {
    id: 'evals',
    stepNumber: '04',
    name: 'Continuous Guardrails & Evals',
    tag: 'Deterministic',
    icon: ShieldCheck,
    latency: '22ms',
    summary: 'Pre-flight evaluation against golden benchmark test suites to guarantee 0.00% semantic drift and enforce strict JSON schema output.',
    codeSnippet: `assert eval_suite.hallucination_score(output, ground_truth) == 0.0\nassert json_schema.validate(output.json())\nreturn dispatch_resolution(output)`,
    kpis: [
      { label: 'Semantic Drift', value: '0.00%' },
      { label: 'Schema Enforcement', value: '100% Strict' }
    ]
  }
];

export const ArchitectureFlow: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('agent');
  const { elementRef, isRevealed } = useIntersectionReveal(0.1);

  const activeNode = NODES.find(n => n.id === activeNodeId) || NODES[0];

  const handleSelectNode = (id: string) => {
    playTactileClick();
    setActiveNodeId(id);
  };

  return (
    <section
      id="architecture"
      ref={elementRef}
      style={{
        padding: '120px 0',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          <div className="kicker" style={{ justifyContent: 'center' }}>
            <span className="kicker-dot" />
            <span>Under The Hood</span>
          </div>
          <h2
            className="heading-editorial"
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              marginTop: '14px',
              marginBottom: '16px'
            }}
          >
            Deterministic, Zero-Drift Pipeline Architecture
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            Click through our 4-stage autonomous pipeline to inspect latency benchmarks, vector search algorithms, and continuous eval guardrails.
          </p>
        </div>

        {/* Pipeline Node Selector Grid */}
        <div
          style={{
            marginTop: '52px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px'
          }}
          className={`reveal-item ${isRevealed ? 'revealed' : ''}`}
        >
          {NODES.map((node) => {
            const isSelected = activeNodeId === node.id;
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                onClick={() => handleSelectNode(node.id)}
                style={{
                  background: isSelected ? 'var(--bg-dark)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--ink-primary)',
                  borderRadius: '16px',
                  padding: '24px 20px',
                  border: isSelected ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: isSelected ? 'var(--shadow-dark)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: isSelected ? '#6EE7B7' : 'var(--ink-muted)'
                    }}
                  >
                    {node.stepNumber}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      background: isSelected ? 'rgba(255,255,255,0.1)' : 'var(--bg-surface)',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      color: isSelected ? '#34D399' : 'var(--ink-secondary)'
                    }}
                  >
                    {node.latency}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={18} color={isSelected ? '#34D399' : '#181E26'} />
                  <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>
                    {node.name}
                  </h3>
                </div>

                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: isSelected ? '#9DA7B5' : 'var(--ink-muted)'
                  }}
                >
                  Stage: {node.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div
          style={{
            marginTop: '28px',
            background: 'var(--bg-dark)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid var(--border-dark)',
            boxShadow: 'var(--shadow-dark)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center'
          }}
        >
          {/* Details & Explanation */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#34D399' }}>
                Stage {activeNode.stepNumber} Deep Dive
              </span>
              <span style={{ color: '#64748B' }}>•</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#9DA7B5' }}>
                Target SLA: {activeNode.latency}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                marginTop: '10px',
                marginBottom: '14px',
                color: '#FFFFFF'
              }}
            >
              {activeNode.name}
            </h3>

            <p style={{ fontSize: '15.5px', color: '#B0B7C3', lineHeight: 1.6, margin: 0 }}>
              {activeNode.summary}
            </p>

            {/* Stage KPIs */}
            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {activeNode.kpis.map((kpi, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '11px', color: '#9DA7B5', textTransform: 'uppercase' }}>
                    {kpi.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: '#34D399', marginTop: '2px' }}>
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Code Snippet */}
          <div
            style={{
              background: '#0B0F15',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={14} color="#6EE7B7" />
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#8F99A8' }}>
                  pipeline_stage_{activeNode.id}.py
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                Production Spec
              </span>
            </div>
            <pre
              style={{
                padding: '18px',
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '12.5px',
                color: '#38BDF8',
                lineHeight: 1.5,
                overflowX: 'auto'
              }}
            >
              {activeNode.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
