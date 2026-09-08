import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { AdminUser } from './models/AdminUser';
import { CaseStudy } from './models/CaseStudy';
import { Testimonial } from './models/Testimonial';
import { ContactInquiry } from './models/ContactInquiry';
import { RoiAudit } from './models/RoiAudit';
import { memoryStore, initializeMemoryStore } from './config/memoryStore';
import { isMongoReady } from './config/db';

export const INITIAL_CASE_STUDIES = [
  {
    slug: 'support-copilot',
    tag: 'AI Operations & Triage',
    category: 'ai',
    title: 'Autonomous Support Triage Copilot',
    clientType: 'Global Logistics & Freight Enterprise',
    summary: 'Built a multilingual AI triage and automated resolution copilot processing 24,000+ monthly customer support inquiries across US and European markets.',
    metricHeadline: '9h → 11m',
    metricSub: 'First response time reduction',
    timeline: '6 weeks from kickoff to global production',
    problem: 'Customer support agents spent 65% of their day manually reading bill-of-lading documents, classifying issue types, and copy-pasting data into ERP systems, causing average response delays of 9.2 hours and high churn risk on premium accounts.',
    solution: 'Designed and deployed a hybrid RAG classification engine integrating with Zendesk and legacy AS400 ERPs. System extracts invoice metadata, categorizes urgency with confidence scoring, routes high-priority claims, and drafts automated resolutions with 98.4% human acceptance rate.',
    deliverables: [
      'Custom multi-agent routing pipeline with OCR document parser',
      'Confidence-weighted automated reply generator',
      'Real-time supervisor eval dashboard with one-click audit logs',
      'Zero-retention PII scrubbing layer compliant with GDPR & SOC 2'
    ],
    techStack: ['OpenAI GPT-4o', 'LangGraph', 'FastAPI', 'PostgreSQL (pgvector)', 'TypeScript', 'TailwindCSS'],
    clientQuote: {
      text: 'Vorcove delivered a fully working prototype in 10 days that outperformed our 6-month internal attempt. It paid for itself within the first quarter.',
      author: 'Marcus Vance',
      role: 'VP of Operations',
      company: 'TransAtlantic Freightways'
    },
    metrics: [
      { metricName: 'First-Response Time', before: '9.2 Hours', after: '11 Minutes', delta: '-98%' },
      { metricName: 'Auto-Resolved Inquiries', before: '0%', after: '44.6%', delta: '+44.6%' },
      { metricName: 'Annual Ops Savings', before: '$0', after: '$380,000', delta: '+$380k' }
    ],
    order: 1,
    published: true
  },
  {
    slug: 'dynamic-pricing',
    tag: 'Revenue Intelligence',
    category: 'revenue',
    title: 'Dynamic Algorithmic Pricing Engine',
    clientType: 'B2B Industrial Supply Marketplace',
    summary: 'Created a real-time predictive pricing and margin optimization engine recalculating 180,000+ SKU prices based on raw material fluctuations and purchase intent.',
    metricHeadline: '+7.4%',
    metricSub: 'Gross margin expansion in Q1',
    timeline: '8 weeks to full deployment',
    problem: 'Sales representatives were using static monthly PDF price sheets while supply chain steel/aluminum costs shifted daily. High-volume quotes were consistently underpriced by 6-9%, eroding margins by over $1.2M annually.',
    solution: 'Engineered a high-throughput microservice that ingests supplier spot prices, customer purchase velocity, and regional competitor scrape data to recommend optimal dynamic price floors and discount thresholds in real-time.',
    deliverables: [
      'Sub-50ms pricing calculation API supporting 5,000 req/sec',
      'Sales rep instant quoting web app with margin simulator',
      'Automated elasticity feedback loop retraining weekly',
      'ERP synchronization pipeline with rollback guards'
    ],
    techStack: ['Python', 'LightGBM', 'Redis', 'Go', 'Next.js', 'AWS ECS', 'Snowflake'],
    clientQuote: {
      text: 'The margin lift showed up in our monthly financial audit immediately. We saw a 7.4% gross margin increase across the exact same catalog volume.',
      author: 'Elena Rostova',
      role: 'Chief Commercial Officer',
      company: 'MetalsDirect Group'
    },
    metrics: [
      { metricName: 'Catalog Gross Margin', before: '21.2%', after: '28.6%', delta: '+7.4%' },
      { metricName: 'Quote Generation Time', before: '3.5 Hours', after: '45 Seconds', delta: '-99%' },
      { metricName: 'Quarterly Margin Impact', before: 'Baseline', after: '+$640,000', delta: '+$640k' }
    ],
    order: 2,
    published: true
  },
  {
    slug: 'onboarding-platform',
    tag: 'Product Engineering',
    category: 'product',
    title: 'Self-Serve B2B Customer Onboarding Suite',
    clientType: 'Fintech API Infrastructure Provider',
    summary: 'Re-engineered complex developer onboarding flow into an intuitive guided sandbox experience, doubling trial-to-paid conversion rates.',
    metricHeadline: '2.1x',
    metricSub: 'Activation rate increase',
    timeline: '5 weeks to production',
    problem: 'Enterprise prospects took an average of 18 days and required 4 engineering touchpoints to configure webhook callbacks, sandbox keys, and compliance verification.',
    solution: 'Built a modern interactive developer hub with interactive API mocks, automated schema validation, instant KYC verification widgets, and collaborative team invites.',
    deliverables: [
      'Interactive multi-step onboarding portal in React & TypeScript',
      'Automated webhook inspector and sandbox simulator',
      'Team permissions and RBAC management dashboard',
      'Segment-integrated telemetry tracking funnel drop-offs'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Prisma', 'Docker'],
    clientQuote: {
      text: 'Our engineers got 30 hours back every week from customer integration calls. Developers now get live credentials and send their first production webhook in under 8 minutes.',
      author: 'Julian Thorne',
      role: 'Head of Product',
      company: 'LedgerPulse Tech'
    },
    metrics: [
      { metricName: 'Time to First API Call', before: '18 Days', after: '8 Minutes', delta: '-99.9%' },
      { metricName: 'Trial-to-Paid Conversion', before: '14.2%', after: '29.8%', delta: '+110%' },
      { metricName: 'Eng Hours Saved/Week', before: '0 hrs', after: '32 hrs', delta: '+32 hrs' }
    ],
    order: 3,
    published: true
  },
  {
    slug: 'churn-forecasting',
    tag: 'Data & ML Suite',
    category: 'data',
    title: 'Predictive Churn & Expansion Suite',
    clientType: 'Enterprise SaaS Platform ($40M ARR)',
    summary: 'Implemented an early-warning telemetry scoring pipeline flagging contract churn risks and automated upsell opportunities 60 days in advance.',
    metricHeadline: '82%',
    metricSub: 'At-risk accounts flagged early',
    timeline: '7 weeks to enterprise rollout',
    problem: 'Customer Success teams only discovered account dissatisfaction during quarterly business reviews or when cancellation notices were submitted, losing $3.8M in preventable ARR annually.',
    solution: 'Trained an ensemble ML classification model tracking 48 behavioral event metrics (login frequency drops, export rates, feature abandonment) and integrated predictive health alerts directly into HubSpot and Slack.',
    deliverables: [
      'Real-time event streaming pipeline processing 10M+ daily events',
      'Account health score dashboard with feature attribution breakdown',
      'Automated Slack alert bots for CS account managers',
      'Executive churn risk and renewal forecast dashboard'
    ],
    techStack: ['Python', 'XGBoost', 'Apache Kafka', 'ClickHouse', 'FastAPI', 'React', 'AWS Lambda'],
    clientQuote: {
      text: "Vorcove's model predicted 9 out of 10 potential churns before our account managers even noticed a dip. It has protected over $2.1M in ARR within 6 months.",
      author: 'Sarah Lindqvist',
      role: 'VP Customer Success',
      company: 'AcuityMetrics'
    },
    metrics: [
      { metricName: 'Early Churn Detection Rate', before: '24%', after: '82%', delta: '+58%' },
      { metricName: 'Net Revenue Retention (NRR)', before: '101%', after: '114%', delta: '+13%' },
      { metricName: 'ARR Saved (6 Mo)', before: '$0', after: '$2,100,000', delta: '+$2.1M' }
    ],
    order: 4,
    published: true
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    name: 'Marcus Vance',
    role: 'VP of Operations',
    company: 'TransAtlantic Freightways',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: "Vorcove is the only technical partner we've worked with that talks about EBITDA and gross margin before they talk about tech stacks. They built an AI triage copilot that cut our response time from 9 hours to 11 minutes.",
    highlightMetric: '-98% Response Time',
    projectType: 'Autonomous AI Operations',
    order: 1,
    published: true
  },
  {
    name: 'Elena Rostova',
    role: 'Chief Commercial Officer',
    company: 'MetalsDirect Group',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'Most consultants hand you a 40-page PowerPoint deck. Vorcove handed us a working pricing engine connected to our ERP in week two. That engine generated a 7.4% gross margin lift in quarter one.',
    highlightMetric: '+7.4% Margin Lift',
    projectType: 'Dynamic Pricing ML',
    order: 2,
    published: true
  },
  {
    name: 'Julian Thorne',
    role: 'Head of Product',
    company: 'LedgerPulse Tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Two senior engineers from Vorcove moved faster than our entire 8-person team. They refactored our customer onboarding, doubled our activation rate, and handed over impeccably documented code.',
    highlightMetric: '2.1x Activation Rate',
    projectType: 'Full-Stack Product',
    order: 3,
    published: true
  }
];

export const SAMPLE_INQUIRIES = [
  {
    name: 'Alexander Wright',
    email: 'a.wright@hyperionlogistics.io',
    company: 'Hyperion Logistics Group',
    brief: 'We want to replace our tier-1 manual routing desk with an autonomous multi-modal agent that connects to CargoWise and our customs brokers.',
    selectedServices: ['AI Agent / Copilot', 'High-Throughput Backend'],
    selectedBudget: '$50k — $100k (Full Squad)',
    selectedTimeline: 'ASAP (within 2 weeks)',
    status: 'new',
    priority: 'high',
    internalNotes: 'Flagship enterprise prospect. Logistics AI fit is 100%.',
    createdAt: new Date(Date.now() - 3600000 * 4),
    updatedAt: new Date(Date.now() - 3600000 * 4)
  },
  {
    name: 'Dr. Clara Zimmerman',
    email: 'czimmerman@mediquant.de',
    company: 'MediQuant Diagnostics',
    brief: 'Seeking a deterministic RAG system for internal clinical trial literature and compliance evals with zero data leakage.',
    selectedServices: ['Deterministic RAG / Search', 'Continuous Evals & Guardrails'],
    selectedBudget: '$25k — $50k (Phase 1 Build)',
    selectedTimeline: 'Next 30 Days',
    status: 'reviewing',
    priority: 'high',
    internalNotes: 'NDA and HIPAA / GDPR requirements discussed.',
    createdAt: new Date(Date.now() - 3600000 * 28),
    updatedAt: new Date(Date.now() - 3600000 * 12)
  }
];

export const SAMPLE_ROI_AUDITS = [
  {
    teamSize: 35,
    projectType: 'ai-ops',
    hourlyRate: 65,
    hoursWastedPerWeek: 16,
    annualWastedCost: 466960,
    estimatedAnnualSavings: 336211,
    estimatedHoursSavedPerMonth: 1746,
    estimatedInvestment: 35000,
    paybackMonths: 1.2,
    efficiencyMultiplier: 0.72,
    clientName: 'Sarah Jenkins',
    clientEmail: 'sjenkins@apexsupply.com',
    clientCompany: 'Apex Supply Chain',
    status: 'submitted',
    createdAt: new Date(Date.now() - 3600000 * 8),
    updatedAt: new Date(Date.now() - 3600000 * 8)
  }
];

export const seedDatabase = async () => {
  const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@vorcove.com').toLowerCase();
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'vorcove2026';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPassword, salt);

  const adminUserData = {
    email: adminEmail,
    passwordHash,
    name: 'Vorcove Managing Partner',
    role: 'superadmin'
  };

  // Seed memory store always for zero-downtime reliability
  initializeMemoryStore({
    caseStudies: INITIAL_CASE_STUDIES,
    testimonials: INITIAL_TESTIMONIALS,
    adminUsers: [adminUserData],
    inquiries: SAMPLE_INQUIRIES,
    roiAudits: SAMPLE_ROI_AUDITS
  });

  if (isMongoReady()) {
    console.log('[Seed] Seeding connected MongoDB...');

    // Admin User
    const existingAdmin = await AdminUser.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await AdminUser.create(adminUserData);
      console.log(`[Seed] Admin user created: ${adminEmail}`);
    }

    // Case Studies
    for (const study of INITIAL_CASE_STUDIES) {
      await CaseStudy.findOneAndUpdate({ slug: study.slug }, study, { upsert: true, new: true });
    }
    console.log(`[Seed] ${INITIAL_CASE_STUDIES.length} Case Studies synchronized in MongoDB.`);

    // Testimonials
    for (const test of INITIAL_TESTIMONIALS) {
      await Testimonial.findOneAndUpdate({ name: test.name, company: test.company }, test, {
        upsert: true,
        new: true
      });
    }
    console.log(`[Seed] ${INITIAL_TESTIMONIALS.length} Testimonials synchronized in MongoDB.`);

    // Sample inquiries if none exist
    const countInquiries = await ContactInquiry.countDocuments();
    if (countInquiries === 0) {
      await ContactInquiry.insertMany(SAMPLE_INQUIRIES);
      console.log(`[Seed] Sample inquiries populated.`);
    }

    // Sample audits if none exist
    const countAudits = await RoiAudit.countDocuments();
    if (countAudits === 0) {
      await RoiAudit.insertMany(SAMPLE_ROI_AUDITS);
      console.log(`[Seed] Sample ROI audits populated.`);
    }
  } else {
    console.log('[Seed] In-memory store pre-populated with Case Studies, Testimonials, Inquiries, and Admin.');
  }
};

// Standalone seed runner execution
if (process.argv[1] && process.argv[1].includes('seed')) {
  const runStandalone = async () => {
    const mongoUri = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vorcove').replace('localhost', '127.0.0.1');
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000, connectTimeoutMS: 2000, family: 4 });
      console.log('[Seed CLI] Connected to MongoDB at ' + mongoUri);
      await seedDatabase();
      console.log('[Seed CLI] Seeding completed successfully in MongoDB!');
      await mongoose.disconnect();
      process.exit(0);
    } catch (err: any) {
      console.warn(`[Seed CLI Warning] MongoDB offline (${err.message}). Pre-populating memory store.`);
      await seedDatabase();
      console.log('[Seed CLI] In-memory store initialized with default data.');
      process.exit(0);
    }
  };
  runStandalone();
}

