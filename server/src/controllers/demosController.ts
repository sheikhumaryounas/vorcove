import { Request, Response } from 'express';
import { DemoExecution } from '../models/DemoExecution';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';

export const runCopilotTriage = async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { ticketId, subject, body } = req.body;

    if (!ticketId && !subject && !body) {
      return res.status(400).json({
        success: false,
        error: 'Please provide ticket information to run triage.'
      });
    }

    const text = `${subject || ''} ${body || ''}`.toLowerCase();

    // Algorithmic extraction and classification
    let category = 'General Enterprise Operations';
    let priority = 'P3 - Standard Request';
    let confidence = 94.5;
    let entities: Record<string, string> = {};
    let suggestedAction = 'Route to tier-1 agent queue with automated standard response';
    let draftResponse = 'Hello, thank you for reaching out. We have logged your request and our team is reviewing it.';

    if (text.includes('carrier') || text.includes('shipment') || text.includes('container') || text.includes('customs')) {
      category = 'Urgent Logistics & Supply Chain Delay';
      priority = 'P1 - High Escalation';
      confidence = 98.4;
      const containerMatch = text.match(/#\d+/);
      entities = {
        Container: containerMatch ? containerMatch[0] : '#48921',
        Port: text.includes('rotterdam') ? 'Rotterdam' : 'Main Hub',
        Impact: 'Production Halt Risk'
      };
      suggestedAction = 'Auto-fetch AS400 customs manifest & dispatch tier-2 port agent ticket';
      draftResponse = 'Hello Marcus, we have flagged your logistics container as P1 Critical. We pulled your customs clearance manifest from our port broker API and assigned specialist David R. to expedite gate clearance. Expected update in 25 minutes.';
    } else if (text.includes('invoice') || text.includes('seats') || text.includes('billing') || text.includes('charge')) {
      category = 'Billing & Invoice Discrepancy Audit';
      priority = 'P2 - Commercial Support';
      confidence = 96.8;
      const invMatch = text.match(/#inv-?\d+/i);
      entities = {
        Invoice: invMatch ? invMatch[0].toUpperCase() : '#INV-8832',
        Discrepancy: 'Seat mismatch detected ($1,500)'
      };
      suggestedAction = 'Query Stripe billing log, cross-reference SSO active users, propose credit note';
      draftResponse = 'Hi Elena, our automated billing audit confirmed unassigned seats were provisioned in error during SSO sync. A credit note for $1,500.00 has been issued to Invoice #INV-8832. Your updated balance is $3,200.00.';
    } else if (text.includes('webhook') || text.includes('hmac') || text.includes('api') || text.includes('secret')) {
      category = 'Developer Platform / API Authentication';
      priority = 'P2 - Technical Integration';
      confidence = 99.1;
      entities = {
        Event: 'evt_998124',
        Algorithm: 'HMAC SHA-256',
        Endpoint: '/v2/webhooks'
      };
      suggestedAction = 'Verify tenant public key version & test mock webhook payload';
      draftResponse = 'Hi Julian, we validated payload evt_998124 against your active secret. It appears timestamp headers exceeded the 300s replay window. Please ensure your server NTP clock is synced to pool.ntp.org.';
    }

    const latencyMs = Date.now() - startTime;

    const resultPayload = {
      ticketId: ticketId || 't-custom',
      category,
      priority,
      confidence,
      entities,
      suggestedAction,
      draftResponse,
      latencyMs,
      triagedAt: new Date()
    };

    // Log telemetry
    if (isMongoReady()) {
      await DemoExecution.create({
        demoType: 'copilot',
        inputs: { ticketId, subject, body },
        results: resultPayload,
        latencyMs,
        status: 'success'
      });
    } else {
      memoryStore.demoLogs.unshift({
        demoType: 'copilot',
        inputs: { ticketId, subject, body },
        results: resultPayload,
        latencyMs,
        status: 'success',
        createdAt: new Date()
      });
    }

    return res.json({
      success: true,
      data: resultPayload
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Copilot triage simulation failed'
    });
  }
};

export const simulatePricing = async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { monthlyRevenue = 1200000, baseMargin = 22, elasticityScore = 7.4 } = req.body;

    const rev = Number(monthlyRevenue);
    const margin = Number(baseMargin);
    const elasticity = Number(elasticityScore);

    const currentGrossProfit = (rev * margin) / 100;
    const optimizedMargin = margin + elasticity;
    const optimizedGrossProfit = (rev * optimizedMargin) / 100;
    const monthlyProfitLift = optimizedGrossProfit - currentGrossProfit;
    const annualProfitLift = monthlyProfitLift * 12;

    const latencyMs = Date.now() - startTime;

    const results = {
      monthlyRevenue: rev,
      baseMargin: margin,
      elasticityScore: elasticity,
      currentGrossProfit,
      optimizedMargin,
      optimizedGrossProfit,
      monthlyProfitLift,
      annualProfitLift,
      latencyMs,
      calculatedAt: new Date()
    };

    if (isMongoReady()) {
      await DemoExecution.create({
        demoType: 'pricing',
        inputs: { monthlyRevenue: rev, baseMargin: margin, elasticityScore: elasticity },
        results,
        latencyMs,
        status: 'success'
      });
    } else {
      memoryStore.demoLogs.unshift({
        demoType: 'pricing',
        inputs: { monthlyRevenue: rev, baseMargin: margin, elasticityScore: elasticity },
        results,
        latencyMs,
        status: 'success',
        createdAt: new Date()
      });
    }

    return res.json({
      success: true,
      data: results
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Pricing simulation failed'
    });
  }
};

export const analyzeChurn = async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const {
      accountName = 'Acme Global Corp',
      usageDropPercent = 42,
      openTickets = 8,
      contractValue = 180000
    } = req.body;

    const drop = Number(usageDropPercent);
    const tickets = Number(openTickets);
    const acv = Number(contractValue);

    // Churn scoring algorithm
    let riskScore = Math.min(100, Math.round(drop * 1.3 + tickets * 4.2 + (acv > 100000 ? 8 : 0)));
    let riskLevel = riskScore > 75 ? 'Critical Risk' : riskScore > 45 ? 'Moderate Risk' : 'Low Risk';

    const triggers = [];
    if (drop > 30) triggers.push(`Daily active queries dropped by ${drop}% in the last 14 days`);
    if (tickets > 4) triggers.push(`${tickets} open escalations exceeding standard SLA response window`);
    if (acv > 100000) triggers.push(`High enterprise tier revenue exposure ($${acv.toLocaleString()}/yr)`);

    const interventions = [
      'Trigger automated executive review alert to VP of Customer Success',
      'Deploy engineering diagnostic squad to inspect latency anomalies',
      'Schedule proactive roadmap alignment call with account sponsor'
    ];

    const latencyMs = Date.now() - startTime;

    const results = {
      accountName,
      riskScore,
      riskLevel,
      triggers,
      interventions,
      potentialRevenueAtRisk: acv,
      latencyMs,
      analyzedAt: new Date()
    };

    if (isMongoReady()) {
      await DemoExecution.create({
        demoType: 'churn',
        inputs: { accountName, usageDropPercent: drop, openTickets: tickets, contractValue: acv },
        results,
        latencyMs,
        status: 'success'
      });
    } else {
      memoryStore.demoLogs.unshift({
        demoType: 'churn',
        inputs: { accountName, usageDropPercent: drop, openTickets: tickets, contractValue: acv },
        results,
        latencyMs,
        status: 'success',
        createdAt: new Date()
      });
    }

    return res.json({
      success: true,
      data: results
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Churn analysis failed'
    });
  }
};

export const getDemoTelemetry = async (req: Request, res: Response) => {
  try {
    if (isMongoReady()) {
      const logs = await DemoExecution.find().sort({ createdAt: -1 }).limit(50);
      return res.json({ success: true, data: logs });
    } else {
      return res.json({ success: true, data: memoryStore.demoLogs });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch demo telemetry'
    });
  }
};
