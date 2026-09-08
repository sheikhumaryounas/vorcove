import { Request, Response } from 'express';
import { AssistantConversation } from '../models/AssistantConversation';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';

// Vorcove Knowledge Base for smart heuristic matching and deterministic responses
const KNOWLEDGE_RESPONSES = [
  {
    keywords: ['14', 'days', 'sprint', 'deliver', 'mvp', 'timeline', 'fast', 'quick', 'prototype'],
    title: '14-Day Rapid MVP Sprint',
    badge: 'Core SLA',
    text: 'Vorcove delivers a working, functional vertical slice deployed to your staging environment within exactly 14 calendar days. Zero pitch decks or wireframe mockups—only real, working code hooked to live test endpoints and real database schemas.',
    bulletPoints: [
      'Day 1-3: Architecture blueprint, API contracts, database schema lock',
      'Day 4-10: Core logic, deterministic pipeline, UI integration',
      'Day 11-14: Evals, latency benchmarking, staging deployment, walkthrough'
    ],
    ctaLabel: 'Book 14-Day Scoping Call',
    ctaTargetId: 'contact'
  },
  {
    keywords: ['cost', 'pricing', 'price', 'rates', 'retainer', 'budget', 'how much', 'fee'],
    title: 'Commercial Models & Fixed Pricing',
    badge: 'Transparent',
    text: 'We work on transparent, fixed-scope sprint cycles and dedicated senior squad retainers. A typical Phase 1 MVP sprint ranges from $25,000 to $50,000 with a 100% money-back guarantee if the agreed vertical slice is not delivered on time.',
    bulletPoints: [
      'Phase 1 Sprint (14 Days): $25k — $50k fixed scope',
      'Dedicated Senior Squad (Monthly): $35k/mo (2 staff engineers + architect)',
      'Enterprise Custom Build: Custom milestone-based SLA'
    ],
    ctaLabel: 'Calculate Your ROI',
    ctaTargetId: 'calculator'
  },
  {
    keywords: ['rag', 'retrieval', 'hallucination', 'drift', 'accuracy', 'eval', 'vector', 'embedding'],
    title: 'Deterministic Knowledge Retrieval & Hybrid RAG',
    badge: 'Enterprise AI',
    text: 'We build enterprise hybrid RAG pipelines combining sparse keyword retrieval (BM25) with dense vector embeddings, cross-encoder reranking, and deterministic citation guardrails. We achieve >98.4% benchmark triage accuracy in production.',
    bulletPoints: [
      'Hybrid dense-sparse retrieval with reciprocal rank fusion (RRF)',
      'Continuous automated evals benchmarked against golden datasets',
      'Zero hallucination drift with strict context attribution citations'
    ],
    ctaLabel: 'Explore Live Demos',
    ctaTargetId: 'demos'
  },
  {
    keywords: ['agent', 'copilot', 'autonomous', 'tool', 'function calling', 'workflow'],
    title: 'Enterprise Autonomous Agents & Copilots',
    badge: 'Automation',
    text: 'Our agents are context-aware, stateful, and equipped with human-in-the-loop validation checkpoints. They execute structured tool calls against ERPs, CRMs, Stripe, and internal databases with sub-800ms latency.',
    bulletPoints: [
      'Stateful workflow orchestration with rollback triggers',
      'Sandboxed tool execution and audit logging',
      'Multi-modal processing (documents, tickets, telemetry)'
    ],
    ctaLabel: 'Test Ticket Copilot Demo',
    ctaTargetId: 'demos'
  },
  {
    keywords: ['team', 'who', 'engineers', 'staff', 'senior', 'founder', 'squad'],
    title: 'Senior Staff Engineering Squads',
    badge: 'US & EU Coverage',
    text: 'Every Vorcove engagement is staffed exclusively by senior and staff-level engineers with 8+ years of production experience across AI, distributed systems, and modern web architectures. No junior handoffs.',
    bulletPoints: [
      '100% senior engineering talent (ex-scaleups & enterprise leaders)',
      'Direct Slack/Discord channel access to the engineers building your code',
      'Full IP and GitHub repository ownership transferred upon completion'
    ],
    ctaLabel: 'Start a Conversation',
    ctaTargetId: 'contact'
  }
];

export const processChatMessage = async (req: Request, res: Response) => {
  try {
    const { message, sessionId = 'sess_' + Date.now(), topicId, categoryId } = req.body;

    if (!message && !topicId) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message or topic identifier.'
      });
    }

    const query = (message || '').toLowerCase();
    let matchedKnowledge = null;

    // 1. Keyword search against knowledge base
    if (query) {
      for (const item of KNOWLEDGE_RESPONSES) {
        if (item.keywords.some(kw => query.includes(kw))) {
          matchedKnowledge = item;
          break;
        }
      }
    }

    // Default intelligent AI response if no exact keyword match
    const responsePayload = matchedKnowledge
      ? {
          sender: 'assistant' as const,
          id: 'msg_' + Date.now(),
          text: matchedKnowledge.text,
          badge: matchedKnowledge.badge,
          bulletPoints: matchedKnowledge.bulletPoints,
          ctaLabel: matchedKnowledge.ctaLabel,
          ctaTargetId: matchedKnowledge.ctaTargetId,
          timestamp: new Date()
        }
      : {
          sender: 'assistant' as const,
          id: 'msg_' + Date.now(),
          text: `Thanks for asking about "${message}". At Vorcove, we architect senior-staff AI systems, autonomous copilots, dynamic pricing engines, and full-stack web platforms with a strict 14-day delivery velocity. Would you like to review our commercial terms, test our live algorithmic demos, or schedule a technical scoping call?`,
          bulletPoints: [
            '14-Day working production vertical slice SLA',
            '100% full IP and GitHub repository ownership',
            'Senior engineers only—zero junior outsourcing'
          ],
          ctaLabel: 'Schedule Technical Scoping',
          ctaTargetId: 'contact',
          timestamp: new Date()
        };

    // Save conversation state asynchronously
    const userMessageObj = {
      id: 'msg_u_' + Date.now(),
      sender: 'user' as const,
      text: message || topicId || 'Topic Selection',
      topicId,
      timestamp: new Date()
    };

    if (isMongoReady()) {
      await AssistantConversation.findOneAndUpdate(
        { sessionId },
        {
          $setOnInsert: { sessionId, createdAt: new Date() },
          $push: {
            messages: { $each: [userMessageObj, responsePayload] },
            ...(categoryId ? { categoriesVisited: categoryId } : {}),
            ...(topicId ? { topicsExplored: topicId } : {})
          },
          $set: { updatedAt: new Date(), status: 'active' }
        },
        { upsert: true, new: true }
      );
    } else {
      let conv = memoryStore.chatSessions.find(s => s.sessionId === sessionId);
      if (!conv) {
        conv = {
          sessionId,
          messages: [],
          categoriesVisited: [],
          topicsExplored: [],
          capturedLead: {},
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        memoryStore.chatSessions.push(conv);
      }
      conv.messages.push(userMessageObj, responsePayload);
      if (categoryId && !conv.categoriesVisited.includes(categoryId)) {
        conv.categoriesVisited.push(categoryId);
      }
      if (topicId && !conv.topicsExplored.includes(topicId)) {
        conv.topicsExplored.push(topicId);
      }
      conv.updatedAt = new Date();
    }

    return res.json({
      success: true,
      data: responsePayload,
      sessionId
    });
  } catch (error: any) {
    console.error('Error processing assistant message:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate assistant response'
    });
  }
};

export const captureAssistantLead = async (req: Request, res: Response) => {
  try {
    const { sessionId, name, email, company, interest } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required to capture lead.'
      });
    }

    const leadInfo = {
      name: (name || '').trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      interest: interest || 'AI Studio Assistant Consultation',
      capturedAt: new Date()
    };

    if (isMongoReady()) {
      await AssistantConversation.findOneAndUpdate(
        { sessionId },
        {
          $set: {
            capturedLead: leadInfo,
            status: 'lead_captured',
            userEmail: leadInfo.email,
            userName: leadInfo.name,
            userCompany: leadInfo.company,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );
    } else {
      const conv = memoryStore.chatSessions.find(s => s.sessionId === sessionId);
      if (conv) {
        conv.capturedLead = leadInfo;
        conv.status = 'lead_captured';
        conv.userEmail = leadInfo.email;
        conv.userName = leadInfo.name;
        conv.userCompany = leadInfo.company;
        conv.updatedAt = new Date();
      }
    }

    return res.json({
      success: true,
      message: 'Thank you! Your information has been received. A senior partner will follow up shortly.',
      data: leadInfo
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to capture lead'
    });
  }
};

export const getAssistantConversations = async (req: Request, res: Response) => {
  try {
    if (isMongoReady()) {
      const sessions = await AssistantConversation.find().sort({ updatedAt: -1 }).limit(100);
      return res.json({ success: true, data: sessions });
    } else {
      return res.json({ success: true, data: memoryStore.chatSessions });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch assistant conversations'
    });
  }
};
