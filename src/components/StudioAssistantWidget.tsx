import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  ChevronRight,
  ArrowLeft,
  Search,
  Zap,
  DollarSign,
  Cpu,
  ShieldCheck,
  BarChart3,
  Sliders,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Layers,
  FileCode,
  HelpCircle,
  Clock,
  Sparkle
} from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/audio';
import { sendAssistantMessage } from '../services/api';

export interface AssistantMenuTopic {
  id: string;
  question: string;
  badge?: string;
  summary: string;
  answer: string;
  bulletPoints?: string[];
  ctaLabel?: string;
  ctaTargetId?: string;
  relatedTopicIds?: string[];
}

export interface AssistantCategory {
  id: string;
  title: string;
  icon: any;
  badge?: string;
  shortDesc: string;
  topics: AssistantMenuTopic[];
}

export const ASSISTANT_MENU_CATEGORIES: AssistantCategory[] = [
  {
    id: 'sprint-14',
    title: '14-Day Rapid MVP Sprint',
    icon: Zap,
    badge: 'Flagship',
    shortDesc: 'Working vertical slice deployed to your staging in 2 weeks.',
    topics: [
      {
        id: '14-deliverables',
        question: 'What is actually delivered in 14 days?',
        badge: 'Core SLA',
        summary: 'A fully functional vertical slice running on live staging with real endpoints.',
        answer: 'In 14 business days, we build, test, and deploy a working, clickable vertical slice running directly on your staging environment against real or synthetic data. You test real production-grade code, interactive UI, and backend pipelines rather than static Figma slides.',
        bulletPoints: [
          'End-to-end working UI connected to real backend APIs',
          'Production database schema & vector index (pgvector/Pinecone)',
          'Automated CI/CD pipeline committed to your GitHub/GitLab',
          'Deterministic test suite benchmarking baseline accuracy'
        ],
        ctaLabel: 'Book 14-Day Sprint →',
        ctaTargetId: 'contact',
        relatedTopicIds: ['sprint-timeline', 'fixed-price-model', 'code-ownership']
      },
      {
        id: 'sprint-timeline',
        question: 'How does the 14-day sprint schedule work?',
        summary: 'Week 1 architecture & API lock; Week 2 staging deployment & SLA verification.',
        answer: 'Our velocity loop is disciplined and tightly orchestrated to eliminate discovery theatre and endless meetings.',
        bulletPoints: [
          'Days 1–3: Scope lock, schema definition, and API contract freeze',
          'Days 4–8: Core engine development & multi-agent pipeline wiring',
          'Days 9–11: Staging deployment & live data ingest testing',
          'Days 12–14: Continuous eval benchmark runs and executive signoff'
        ],
        ctaLabel: 'View 4-Step Velocity Loop →',
        ctaTargetId: 'approach',
        relatedTopicIds: ['14-deliverables', 'team-structure']
      },
      {
        id: 'existing-stack',
        question: 'Can you work with our existing stack and codebase?',
        summary: 'Yes — seamless integration with Python, Next.js, Postgres, AWS/GCP, and Kafka.',
        answer: 'We integrate directly into your existing infrastructure without forcing costly migrations. Our senior engineers hook into your PostgreSQL, Snowflake, Kafka streams, or legacy REST/GraphQL APIs on Day 1.',
        bulletPoints: [
          'Frontend: React, Next.js, TypeScript, Tailwind/Vanilla CSS',
          'Backend & AI: Python (FastAPI), LangGraph, PyTorch, Node.js',
          'Data & DB: PostgreSQL, pgvector, Redis, Snowflake, ClickHouse',
          'Cloud: AWS, Google Cloud, Azure, Cloudflare Workers'
        ],
        ctaLabel: 'Explore Tech Stack →',
        ctaTargetId: 'architecture',
        relatedTopicIds: ['ai-rag-evals', 'code-ownership']
      }
    ]
  },
  {
    id: 'pricing-roi',
    title: 'Fixed-Price Phase 1 & Pricing',
    icon: DollarSign,
    badge: 'Transparent',
    shortDesc: 'Fixed-scope pricing, ROI projections, and zero hourly surprises.',
    topics: [
      {
        id: 'fixed-price-model',
        question: 'How do fixed-price Phase 1 sprints work?',
        badge: 'No Budget Creep',
        summary: 'A single fixed investment locked in week one tied strictly to delivered software.',
        answer: 'Phase 1 is always fixed-price and fixed-scope. We scope the deliverables in week one, establish clear SLA metrics, and commit to a single number so there is zero budget creep or hourly billing surprises.',
        bulletPoints: [
          'Single transparent investment figure agreed in advance',
          'Clear milestone criteria and guaranteed delivery dates',
          'Zero junior staffing markups or hourly overrun risk',
          'No vendor lock-in — follow-on sprints are completely optional'
        ],
        ctaLabel: 'Calculate Your ROI →',
        ctaTargetId: 'calculator',
        relatedTopicIds: ['pricing-retainers', 'roi-timeline', 'traditional-vs-vorcove']
      },
      {
        id: 'pricing-retainers',
        question: 'How do you price retainers and follow-on squads?',
        summary: 'Dedicated senior engineering pods on 4-week iterative sprint cycles.',
        answer: 'For scaling products into high-throughput production, we deploy dedicated pods (typically 1 Senior Systems Architect + 1 AI/ML Engineer + 1 Full-Stack Engineer) on flexible monthly sprint retainers with dedicated Slack channels and daily async commits.',
        bulletPoints: [
          'Dedicated senior engineers embedded with your product team',
          'Continuous sprint backlog management and weekly releases',
          'Cancel or pause anytime with 14 days notice'
        ],
        ctaLabel: 'Estimate Scope & Squad →',
        ctaTargetId: 'calculator',
        relatedTopicIds: ['fixed-price-model', 'team-structure']
      },
      {
        id: 'traditional-vs-vorcove',
        question: 'How does Vorcove compare to traditional big consulting?',
        summary: '4x faster delivery, 1/3 the cost, and zero junior staffing pyramids.',
        answer: 'Traditional consulting firms charge millions for 6-month discovery roadmaps staffed by junior analysts. Vorcove pairs you directly with veteran engineers who write production code from Day 1.',
        bulletPoints: [
          'Traditional: 6 months discovery vs Vorcove: First demo in 14 days',
          'Traditional: Junior analysts vs Vorcove: Senior staff engineers only',
          'Traditional: Static PDF slides vs Vorcove: Live production code',
          'Traditional: Vendor lock-in vs Vorcove: 100% Client IP ownership'
        ],
        ctaLabel: 'Compare the Difference →',
        ctaTargetId: 'revenue',
        relatedTopicIds: ['fixed-price-model', 'code-ownership']
      }
    ]
  },
  {
    id: 'ai-stack',
    title: 'AI Architecture & Agentic Stack',
    icon: Cpu,
    badge: 'Production-Grade',
    shortDesc: 'Autonomous agents, LangGraph orchestration, pgvector RAG, and evals.',
    topics: [
      {
        id: 'ai-agents',
        question: 'How do your autonomous multi-agent copilots work?',
        badge: 'LangGraph',
        summary: 'Stateful agents with human-in-the-loop approvals and deterministic tool calling.',
        answer: 'We engineer deterministic, stateful multi-agent systems using LangGraph and custom orchestration state machines. Agents execute structured JSON tool calls, query private databases, and include human-in-the-loop fallback safeguards.',
        bulletPoints: [
          'Structured JSON tool calling into your internal APIs',
          'Dynamic state checkpointing with automatic rollback capability',
          'Sandboxed execution environments for zero security risks',
          'Human-in-the-loop escalation triggers for edge cases'
        ],
        ctaLabel: 'Test Live Agent Demos →',
        ctaTargetId: 'demos',
        relatedTopicIds: ['ai-rag-evals', 'pricing-engines']
      },
      {
        id: 'ai-rag-evals',
        question: 'How do you prevent hallucinations and data drift?',
        summary: 'Hybrid dense+sparse vector search, rerankers, and automated eval benchmarks.',
        answer: 'We build production RAG systems with hybrid keyword and semantic retrieval (BM25 + pgvector embeddings) paired with cross-encoder rerankers. Every deployment is continuously checked against a golden test suite of real questions to benchmark precision.',
        bulletPoints: [
          'Hybrid semantic + lexical retrieval with reciprocal rank fusion',
          'Strict source grounding with verifiable inline citations',
          'Automated CI/CD eval benchmarks testing accuracy on every PR',
          'Real-time latency budgets under 150ms per retrieval query'
        ],
        ctaLabel: 'View Architecture Flow →',
        ctaTargetId: 'architecture',
        relatedTopicIds: ['ai-agents', 'existing-stack']
      },
      {
        id: 'pricing-engines',
        question: 'Can you build custom algorithmic & dynamic pricing engines?',
        summary: 'Real-time margin optimization engines processing thousands of SKUs in <50ms.',
        answer: 'Yes! For MetalsDirect, our algorithmic pricing engine recalculated 180,000+ SKUs against raw material indexes in 45ms, generating a +7.4% gross margin expansion in Q1. We can hook directly into your ERP or PostgreSQL database.',
        bulletPoints: [
          'Elasticity curves tuned to historical transaction data',
          'Sub-50ms quote generation with raw market index feeds',
          'Direct ERP webhook synchronization with zero downtime'
        ],
        ctaLabel: 'Explore Pricing ML Demo →',
        ctaTargetId: 'demos',
        relatedTopicIds: ['case-metals', 'ai-agents']
      }
    ]
  },
  {
    id: 'ip-security',
    title: 'Code Ownership & Enterprise Security',
    icon: ShieldCheck,
    badge: '100% Client Owned',
    shortDesc: '100% IP ownership, direct GitHub commits, and SOC2 compliant patterns.',
    topics: [
      {
        id: 'code-ownership',
        question: 'Who owns the code and intellectual property?',
        badge: '100% Yours',
        summary: 'You own 100% of all code, models, pipelines, and documentation with zero lock-in.',
        answer: 'You own 100% of all code, models, pipelines, and documentation. All code is committed directly to your organization\'s GitHub/GitLab repository with complete runbooks and zero vendor lock-in.',
        bulletPoints: [
          'All commits pushed directly to your organization\'s repository',
          'Complete architecture blueprints, OpenAPI specs & test suites',
          'Zero proprietary runtime dependencies or per-seat license fees',
          'Comprehensive recorded Loom handover and team pairing sessions'
        ],
        ctaLabel: 'Read FAQs →',
        ctaTargetId: 'faq',
        relatedTopicIds: ['security-privacy', '14-deliverables']
      },
      {
        id: 'security-privacy',
        question: 'How do you handle PII and sensitive enterprise data?',
        summary: 'Zero data retention, PII scrubbers, and private VPC deployment.',
        answer: 'We adhere to enterprise security standards. All LLM calls pass through PII masking layers, and models are hosted in your private VPC (AWS Bedrock, Azure OpenAI, GCP Vertex, or self-hosted vLLM on Ollama/RunPod) with zero third-party data logging.',
        bulletPoints: [
          'Automated regex & NER PII scrubbers before model ingestion',
          'Private VPC isolation with SOC 2 compliant architecture',
          'Zero training on your proprietary enterprise data'
        ],
        ctaLabel: 'Book Scoping Call →',
        ctaTargetId: 'contact',
        relatedTopicIds: ['code-ownership', 'existing-stack']
      }
    ]
  },
  {
    id: 'case-studies',
    title: 'Client Case Studies & Metrics',
    icon: BarChart3,
    badge: 'Production Results',
    shortDesc: 'Real production deployments measured in revenue, margin, and triage speed.',
    topics: [
      {
        id: 'case-metals',
        question: 'MetalsDirect: Dynamic Pricing ML (+7.4% Margin)',
        badge: '+7.4% Margin',
        summary: 'Algorithmic pricing across 180,000 SKUs updated in 45ms against raw commodity indexes.',
        answer: 'MetalsDirect had 180,000 industrial metals SKUs with margins eroding due to volatile raw material costs. We engineered an algorithmic pricing engine hooked to ERP webhooks and LME commodity feeds, recalculating price elasticity in 45ms and delivering +7.4% gross margin expansion.',
        bulletPoints: [
          'Latency: 45ms per quote calculation across 180k catalog SKUs',
          'Impact: +$42,800 profit lift per high-volume sales cycle',
          'Time to Staging: 14 business days'
        ],
        ctaLabel: 'View Case Study Details →',
        ctaTargetId: 'work',
        relatedTopicIds: ['case-freight', 'pricing-engines']
      },
      {
        id: 'case-freight',
        question: 'ApexFreight: Autonomous Triage (9h → 11m)',
        badge: '98.4% Accuracy',
        summary: 'Multi-agent customs manifest triage slashing first-response latency by 98%.',
        answer: 'ApexFreight was handling 4,200+ weekly international freight manifests manually. We built a LangGraph multi-agent triage system that classifies customs holds, queries pgvector manifests, and generates automated resolution drafts.',
        bulletPoints: [
          'Response time slashed from 9 hours to 11 minutes',
          '98.4% triage accuracy benchmarked against historical human decisions',
          'Zero customer escalation backlogs in peak shipping quarter'
        ],
        ctaLabel: 'View Live Triage Demo →',
        ctaTargetId: 'demos',
        relatedTopicIds: ['case-metals', 'ai-agents']
      }
    ]
  }
];

interface StudioAssistantWidgetProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const StudioAssistantWidget: React.FC<StudioAssistantWidgetProps> = ({
  isOpenExternal,
  onCloseExternal
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [mode, setMode] = useState<'menu' | 'chat' | 'wizard'>('menu');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Scope Wizard State
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardProject, setWizardProject] = useState<string>('agent');
  const [wizardDataState, setWizardDataState] = useState<string>('postgres');
  const [wizardGoal, setWizardGoal] = useState<string>('margin');

  // Chat conversation state
  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string; time: string; cta?: { label: string; targetId: string } }[]>([
    {
      sender: 'ai',
      text: 'Hello! I am the Vorcove Studio AI Architect. Explore our interactive topic menus above, or type any specific question about our 14-day sprints, pricing engines, or stack.',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sync external open state if provided
  useEffect(() => {
    if (typeof isOpenExternal === 'boolean') {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  const handleClose = () => {
    playTactileClick();
    setIsOpen(false);
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleOpen = () => {
    playTactileClick();
    setIsOpen(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (mode === 'chat') {
      scrollToBottom();
    }
  }, [chatMessages, mode]);

  // Navigate to section
  const handleCtaClick = (targetId: string) => {
    playTactileClick();
    handleClose();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find active category and topic
  const activeCategory = ASSISTANT_MENU_CATEGORIES.find(c => c.id === activeCategoryId);
  const allTopics: AssistantMenuTopic[] = ASSISTANT_MENU_CATEGORIES.flatMap(c => c.topics);
  const selectedTopic = allTopics.find(t => t.id === selectedTopicId);

  // Filtered topics based on search
  const filteredTopics = searchQuery.trim()
    ? allTopics.filter(t =>
        t.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle Freeform Query
  const handleSendQuery = async (text: string) => {
    if (!text.trim()) return;
    playTactileClick();

    const userText = text.trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: nowTime }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const sessionId = 'sess_' + (localStorage.getItem('vorcove_session_id') || Date.now());
      localStorage.setItem('vorcove_session_id', sessionId);

      const res = await sendAssistantMessage(userText, sessionId, selectedTopicId || undefined, activeCategoryId || undefined);
      
      if (res.success && res.data) {
        const payload = res.data;
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: payload.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            cta: payload.ctaLabel ? { label: payload.ctaLabel, targetId: payload.ctaTargetId || 'contact' } : undefined
          }
        ]);
      } else {
        throw new Error(res.error || 'Server error');
      }
    } catch {
      // Fallback
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Vorcove specializes in AI agents, dynamic pricing engines, and enterprise web engineering. For "${userText}", we scope a 14-day working vertical slice committed directly to your repository with zero vendor lock-in.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cta: { label: 'Book 14-Day Sprint →', targetId: 'contact' }
        }
      ]);
    } finally {
      setIsTyping(false);
      playSuccessChime();
    }
  };

  // Scope Estimator Generator
  const generateScopeBlueprint = () => {
    let squad = '1 Senior Systems Architect + 1 AI/ML Systems Engineer';
    let timeline = '14 business days to live staging V1';
    let deliverables = [
      'Production API endpoints with pgvector indexing',
      'Interactive Next.js/React frontend with real-time feedback',
      'Automated continuous evaluation harness benchmarked against golden test sets',
      'Zero vendor lock-in with 100% client repository ownership'
    ];
    let investment = '$18,000 – $28,000 (Fixed-Scope Phase 1)';

    if (wizardProject === 'pricing') {
      squad = '1 Lead Algorithmic Engineer + 1 Full-Stack Systems Engineer';
      deliverables = [
        'Sub-50ms algorithmic pricing engine connected to ERP/DB',
        'Elasticity curves calibrated on historical sales data',
        'Live margin tracking dashboard with automated fallback guardrails'
      ];
      investment = '$22,000 – $32,000 (Fixed-Scope Phase 1)';
    } else if (wizardProject === 'fullstack') {
      squad = '1 Lead Full-Stack Architect + 1 Backend Systems Engineer';
      deliverables = [
        'Complete web application with PostgreSQL auth & billing',
        'Real-time data synchronization & high-throughput API endpoints',
        'Automated CI/CD pipeline deployed to AWS/GCP'
      ];
      investment = '$20,000 – $30,000 (Fixed-Scope Phase 1)';
    }

    return { squad, timeline, deliverables, investment };
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 990,
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Floating Menu Launcher Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 20px',
            borderRadius: '999px',
            background: 'var(--ink-primary)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 16px 36px rgba(30, 37, 48, 0.35)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
          aria-label="Open Vorcove AI Menu Navigator"
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}
          >
            <Sparkle size={15} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Ask AI Menu
          </span>
          <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
        </button>
      )}

      {/* Menu-Based AI Assistant Window */}
      {isOpen && (
        <div
          style={{
            width: 'min(94vw, 440px)',
            height: 'min(86vh, 640px)',
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--border-light)',
            boxShadow: '0 28px 80px -15px rgba(30, 37, 48, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'modalSlideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            position: 'relative'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '14px 18px',
              background: 'var(--bg-dark)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-dark)',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0
                }}
              >
                <Bot size={17} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Vorcove AI Architect</span>
                  <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#6EE7B7', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    Menu Navigator
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#9DA7B5', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
                  <span>Online • Instant Scope & Engineering Answers</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
              aria-label="Close AI Navigator"
            >
              <X size={16} />
            </button>
          </div>

          {/* Mode Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              padding: '6px 12px',
              background: '#F7F5EF',
              borderBottom: '1px solid var(--border-light)',
              gap: '6px',
              flexShrink: 0
            }}
          >
            <button
              onClick={() => {
                playTactileClick();
                setMode('menu');
                setSelectedTopicId(null);
              }}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                border: 'none',
                background: mode === 'menu' ? '#FFFFFF' : 'transparent',
                color: mode === 'menu' ? 'var(--ink-primary)' : 'var(--ink-muted)',
                fontWeight: mode === 'menu' ? 600 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: mode === 'menu' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Layers size={13} />
              <span>Topic Menus</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                setMode('wizard');
              }}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                border: 'none',
                background: mode === 'wizard' ? '#FFFFFF' : 'transparent',
                color: mode === 'wizard' ? 'var(--ink-primary)' : 'var(--ink-muted)',
                fontWeight: mode === 'wizard' ? 600 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: mode === 'wizard' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Sliders size={13} />
              <span>Scope Estimator</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                setMode('chat');
              }}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                border: 'none',
                background: mode === 'chat' ? '#FFFFFF' : 'transparent',
                color: mode === 'chat' ? 'var(--ink-primary)' : 'var(--ink-muted)',
                fontWeight: mode === 'chat' ? 600 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: mode === 'chat' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <HelpCircle size={13} />
              <span>Ask Custom</span>
            </button>
          </div>

          {/* Main Body Content */}
          <div
            className="assistant-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              background: '#FAF9F5',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {/* 1. TOPIC MENU MODE */}
            {mode === 'menu' && (
              <>
                {/* Search Bar for Menus */}
                {!selectedTopicId && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                    }}
                  >
                    <Search size={15} color="var(--ink-muted)" />
                    <input
                      type="text"
                      placeholder="Search menus (e.g. 14 days, pricing, IP, RAG)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '13px',
                        fontFamily: 'inherit',
                        background: 'transparent',
                        color: 'var(--ink-primary)'
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', padding: '2px' }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                )}

                {/* SEARCH RESULTS VIEW */}
                {searchQuery.trim() && !selectedTopicId && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                      Matching Topics ({filteredTopics.length})
                    </div>
                    {filteredTopics.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--ink-muted)', fontSize: '13px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                        No direct match found for "{searchQuery}". Try switching to the "Ask Custom" tab to prompt the AI directly!
                      </div>
                    ) : (
                      filteredTopics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => {
                            playTactileClick();
                            setSelectedTopicId(topic.id);
                          }}
                          style={{
                            textAlign: 'left',
                            padding: '12px 14px',
                            background: '#FFFFFF',
                            border: '1px solid var(--border-light)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--ink-primary)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.transform = 'none';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                              {topic.question}
                            </span>
                            <ChevronRight size={14} color="var(--ink-muted)" />
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
                            {topic.summary}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}

                {/* MAIN CATEGORIES LIST (When not inside topic or searching) */}
                {!searchQuery && !activeCategoryId && !selectedTopicId && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                        Select Architecture Menu
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                        {ASSISTANT_MENU_CATEGORIES.length} Categories
                      </span>
                    </div>

                    {ASSISTANT_MENU_CATEGORIES.map((cat) => {
                      const IconComponent = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            playTactileClick();
                            setActiveCategoryId(cat.id);
                          }}
                          style={{
                            textAlign: 'left',
                            padding: '14px 16px',
                            background: '#FFFFFF',
                            border: '1px solid var(--border-light)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--ink-primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px -4px rgba(30,37,48,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                          }}
                        >
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '12px',
                              background: '#F7F5EF',
                              border: '1px solid var(--border-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--ink-primary)',
                              flexShrink: 0
                            }}
                          >
                            <IconComponent size={18} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                                {cat.title}
                              </span>
                              {cat.badge && (
                                <span style={{ fontSize: '10px', fontWeight: 600, background: '#EFEDE5', color: 'var(--ink-secondary)', padding: '1px 6px', borderRadius: '999px' }}>
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {cat.shortDesc}
                            </div>
                          </div>
                          <ChevronRight size={16} color="var(--ink-muted)" />
                        </button>
                      );
                    })}

                    {/* Quick Scope Estimator Teaser Card */}
                    <div
                      onClick={() => {
                        playTactileClick();
                        setMode('wizard');
                      }}
                      style={{
                        marginTop: '4px',
                        padding: '14px 16px',
                        background: 'linear-gradient(135deg, #1E2530 0%, #2A3442 100%)',
                        color: '#FFFFFF',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        boxShadow: '0 4px 14px rgba(30, 37, 48, 0.25)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                          <Sliders size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>
                            Interactive Scope Estimator
                          </div>
                          <div style={{ fontSize: '11px', color: '#9DA7B5' }}>
                            3-step recommendation & timeline generator
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#6EE7B7' }}>
                        Start →
                      </span>
                    </div>
                  </div>
                )}

                {/* CATEGORY SUB-TOPICS LIST */}
                {!searchQuery && activeCategoryId && !selectedTopicId && activeCategory && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => {
                          playTactileClick();
                          setActiveCategoryId(null);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'none',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--ink-secondary)',
                          cursor: 'pointer',
                          padding: '4px 0'
                        }}
                      >
                        <ArrowLeft size={14} />
                        <span>All Menus</span>
                      </button>
                      <span style={{ color: 'var(--ink-muted)', fontSize: '12px' }}>/</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        {activeCategory.title}
                      </span>
                    </div>

                    <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '4px' }}>
                        {activeCategory.title}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--ink-secondary)' }}>
                        {activeCategory.shortDesc}
                      </div>
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginTop: '4px' }}>
                      Choose a Question
                    </div>

                    {activeCategory.topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          playTactileClick();
                          setSelectedTopicId(topic.id);
                        }}
                        style={{
                          textAlign: 'left',
                          padding: '14px 16px',
                          background: '#FFFFFF',
                          border: '1px solid var(--border-light)',
                          borderRadius: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--ink-primary)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-light)';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                            {topic.question}
                          </span>
                          {topic.badge && (
                            <span style={{ fontSize: '10px', fontWeight: 600, background: '#EFEDE5', color: 'var(--ink-primary)', padding: '2px 7px', borderRadius: '999px', flexShrink: 0 }}>
                              {topic.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                          {topic.summary}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* SELECTED TOPIC DETAIL ANSWER VIEW */}
                {selectedTopic && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Back Button */}
                    <button
                      onClick={() => {
                        playTactileClick();
                        setSelectedTopicId(null);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--ink-secondary)',
                        cursor: 'pointer',
                        padding: '4px 0',
                        alignSelf: 'flex-start'
                      }}
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Questions</span>
                    </button>

                    {/* Answer Card */}
                    <div
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        borderRadius: '18px',
                        padding: '18px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#10B981' }}>
                          Verified Engineering Answer
                        </span>
                      </div>

                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink-primary)', margin: 0, lineHeight: 1.35 }}>
                        {selectedTopic.question}
                      </h4>

                      <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', lineHeight: 1.55, margin: 0 }}>
                        {selectedTopic.answer}
                      </p>

                      {/* Bullet Points */}
                      {selectedTopic.bulletPoints && selectedTopic.bulletPoints.length > 0 && (
                        <div
                          style={{
                            marginTop: '4px',
                            padding: '12px 14px',
                            background: '#F7F5EF',
                            borderRadius: '12px',
                            border: '1px solid var(--border-light)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          {selectedTopic.bulletPoints.map((pt, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--ink-primary)', lineHeight: 1.45 }}>
                              <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action CTA Button */}
                      {selectedTopic.ctaLabel && (
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleCtaClick(selectedTopic.ctaTargetId || 'contact')}
                            className="btn-primary"
                            style={{
                              padding: '10px 18px',
                              fontSize: '13px',
                              borderRadius: '999px',
                              cursor: 'pointer'
                            }}
                          >
                            <span>{selectedTopic.ctaLabel}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Related Topics Suggestions */}
                    {selectedTopic.relatedTopicIds && selectedTopic.relatedTopicIds.length > 0 && (
                      <div style={{ marginTop: '4px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '6px' }}>
                          Related Architecture Questions
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {selectedTopic.relatedTopicIds.map((relId) => {
                            const relTopic = allTopics.find(t => t.id === relId);
                            if (!relTopic) return null;
                            return (
                              <button
                                key={relId}
                                onClick={() => {
                                  playTactileClick();
                                  setSelectedTopicId(relId);
                                }}
                                style={{
                                  textAlign: 'left',
                                  padding: '8px 12px',
                                  borderRadius: '10px',
                                  background: '#FFFFFF',
                                  border: '1px solid var(--border-light)',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  color: 'var(--ink-primary)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <span>{relTopic.question}</span>
                                <ChevronRight size={13} color="var(--ink-muted)" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* 2. INTERACTIVE SCOPE ESTIMATOR WIZARD MODE */}
            {mode === 'wizard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                      Interactive Scope Estimator
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 600, background: '#EFEDE5', padding: '2px 8px', borderRadius: '999px' }}>
                      Step {wizardStep} of 3
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>
                    Answer 3 quick architectural questions to generate a customized sprint blueprint & squad recommendation.
                  </div>
                </div>

                {/* Wizard Step 1: Project Type */}
                {wizardStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                      1. What type of system are you building?
                    </div>

                    {[
                      { id: 'agent', label: 'Autonomous AI Agent / Copilot', desc: 'LangGraph multi-agent triage, tool calling, and RAG knowledge pipeline' },
                      { id: 'pricing', label: 'Dynamic Pricing / ML Engine', desc: 'Real-time margin elasticity curves, catalog re-pricing & ERP webhooks' },
                      { id: 'fullstack', label: 'Full-Stack Web App / SaaS', desc: 'High-throughput Next.js, Postgres backend, and scalable cloud infrastructure' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          playTactileClick();
                          setWizardProject(opt.id);
                        }}
                        style={{
                          textAlign: 'left',
                          padding: '12px 14px',
                          background: wizardProject === opt.id ? '#F7F5EF' : '#FFFFFF',
                          border: `1.5px solid ${wizardProject === opt.id ? 'var(--ink-primary)' : 'var(--border-light)'}`,
                          borderRadius: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--ink-secondary)', marginTop: '2px' }}>
                          {opt.desc}
                        </div>
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        playTactileClick();
                        setWizardStep(2);
                      }}
                      className="btn-primary"
                      style={{ marginTop: '8px', padding: '10px', justifyContent: 'center', fontSize: '13px' }}
                    >
                      Next: Data Readiness →
                    </button>
                  </div>
                )}

                {/* Wizard Step 2: Data State */}
                {wizardStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                      2. What is your current data & backend state?
                    </div>

                    {[
                      { id: 'postgres', label: 'Clean PostgreSQL / REST APIs ready', desc: 'Existing database with schema and API documentation' },
                      { id: 'files', label: 'Documents, PDFs & Spreadsheets', desc: 'Unstructured operational documents requiring vectorization & OCR' },
                      { id: 'erp', label: 'Legacy ERP / Enterprise Warehouse', desc: 'SAP, NetSuite, Salesforce or custom warehouse needing integration' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          playTactileClick();
                          setWizardDataState(opt.id);
                        }}
                        style={{
                          textAlign: 'left',
                          padding: '12px 14px',
                          background: wizardDataState === opt.id ? '#F7F5EF' : '#FFFFFF',
                          border: `1.5px solid ${wizardDataState === opt.id ? 'var(--ink-primary)' : 'var(--border-light)'}`,
                          borderRadius: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--ink-secondary)', marginTop: '2px' }}>
                          {opt.desc}
                        </div>
                      </button>
                    ))}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={() => {
                          playTactileClick();
                          setWizardStep(1);
                        }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '999px',
                          background: '#FFFFFF',
                          border: '1px solid var(--border-light)',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => {
                          playTactileClick();
                          setWizardStep(3);
                        }}
                        className="btn-primary"
                        style={{ flex: 1, padding: '10px', justifyContent: 'center', fontSize: '13px' }}
                      >
                        Next: Primary Outcome →
                      </button>
                    </div>
                  </div>
                )}

                {/* Wizard Step 3: Target Outcome & Results Blueprint */}
                {wizardStep === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                      3. Select your primary target metric:
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {[
                        { id: 'margin', label: 'Expand Gross Margins (+5–10%)' },
                        { id: 'velocity', label: '14-Day Working MVP' },
                        { id: 'automation', label: 'Slash Manual Triage >80%' },
                        { id: 'replace-vendor', label: 'Replace Slow Agency' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            playTactileClick();
                            setWizardGoal(opt.id);
                          }}
                          style={{
                            padding: '10px 12px',
                            background: wizardGoal === opt.id ? '#F7F5EF' : '#FFFFFF',
                            border: `1.5px solid ${wizardGoal === opt.id ? 'var(--ink-primary)' : 'var(--border-light)'}`,
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--ink-primary)',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {/* Generated Blueprint Card */}
                    {(() => {
                      const bp = generateScopeBlueprint();
                      return (
                        <div
                          style={{
                            marginTop: '8px',
                            padding: '16px',
                            background: '#FFFFFF',
                            border: '1px solid var(--ink-primary)',
                            borderRadius: '16px',
                            boxShadow: '0 4px 16px rgba(30,37,48,0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-primary)' }}>
                              Generated Studio Scope Blueprint
                            </span>
                          </div>

                          <div style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
                            <strong>Recommended Squad:</strong> {bp.squad}
                          </div>

                          <div style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
                            <strong>Velocity SLA:</strong> {bp.timeline}
                          </div>

                          <div style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
                            <strong>Estimated Range:</strong> {bp.investment}
                          </div>

                          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)', marginTop: '4px' }}>
                            Key Phase 1 Deliverables
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {bp.deliverables.map((d, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: 'var(--ink-primary)' }}>
                                <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => handleCtaClick('contact')}
                            className="btn-primary"
                            style={{
                              marginTop: '8px',
                              padding: '12px',
                              justifyContent: 'center',
                              fontSize: '13.5px'
                            }}
                          >
                            <span>Book Scoping Session with this Brief →</span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* 3. DIRECT CHAT MODE */}
            {mode === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '100%' }}>
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      gap: '4px'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '88%',
                        padding: '12px 14px',
                        borderRadius: m.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: m.sender === 'user' ? 'var(--ink-primary)' : '#FFFFFF',
                        color: m.sender === 'user' ? '#FFFFFF' : 'var(--ink-primary)',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        border: m.sender === 'ai' ? '1px solid var(--border-light)' : 'none',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                      }}
                    >
                      {m.text}

                      {m.cta && (
                        <div style={{ marginTop: '10px' }}>
                          <button
                            onClick={() => handleCtaClick(m.cta!.targetId)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              borderRadius: '999px',
                              background: 'var(--bg-dark)',
                              color: '#FFFFFF',
                              border: 'none',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            <span>{m.cta.label}</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--ink-muted)', padding: '0 4px' }}>
                      {m.time}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#FFFFFF', borderRadius: '12px', width: 'fit-content', border: '1px solid var(--border-light)' }}>
                    <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
                    <span style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>Architect thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Quick Menu Topic Pills in Chat Mode */}
          {mode === 'chat' && (
            <div
              style={{
                padding: '8px 12px',
                background: '#FFFFFF',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {['14-day deliverables', 'Fixed price terms', 'Dynamic pricing ROI', '100% Code ownership'].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendQuery(q)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: '#F7F5EF',
                    border: '1px solid var(--border-light)',
                    color: 'var(--ink-primary)',
                    fontSize: '11px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer in Chat Mode */}
          {mode === 'chat' && (
            <div
              style={{
                padding: '10px 14px',
                background: '#FFFFFF',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0
              }}
            >
              <input
                type="text"
                placeholder="Ask about stack, sprints, or pricing..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendQuery(chatInput);
                }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-light)',
                  fontSize: '13px',
                  outline: 'none',
                  background: '#FAF9F5',
                  fontFamily: 'inherit'
                }}
              />
              <button
                onClick={() => handleSendQuery(chatInput)}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'var(--ink-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudioAssistantWidget;
