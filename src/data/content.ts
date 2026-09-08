import {
  NavItem,
  ServiceItem,
  RevenueMetric,
  ApproachStep,
  StudioStat,
  CaseStudy,
  Testimonial,
  FaqItem,
  TechItem
} from '../types';

export const NAV_LINKS: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Why It Pays", href: "#revenue" },
  { label: "Approach", href: "#approach" },
  { label: "Selected Work", href: "#work" },
  { label: "Live Demos", href: "#demos", badge: "Interactive" },
  { label: "ROI Estimator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
];

export const HERO_HIGHLIGHTS = [
  "Senior engineering squad only",
  "First working demo in 14 days",
  "US & EU operational coverage",
  "100% IP & repo ownership"
];

export const MARQUEE_ITEMS = [
  "Agents & Copilots",
  "Retrieval Pipelines (RAG)",
  "Dynamic Pricing Engines",
  "Internal Tooling & Ops",
  "Evals & Drift Guardrails",
  "Churn Forecasting Suites",
  "Enterprise Cloud Architecture",
  "LLM Fine-Tuning & Quantization",
  "Real-Time Stream Processing",
  "High-Throughput APIs"
];

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-automation",
    number: "01",
    tag: "AI & Automation",
    title: "AI & Autonomous Systems",
    headline: "Agents, copilots and autonomous pipelines wired directly into your operations.",
    description: "We don't build toys or surface-level chatbots. We engineer context-aware agents, multi-step workflow copilots, and deterministic RAG systems with built-in continuous evals to ensure zero hallucination drift.",
    pills: ["Autonomous Agents", "Hybrid RAG", "Continuous Evals", "Tool Calling", "Vector DBs"],
    capabilities: [
      {
        title: "Deterministic Knowledge Retrieval",
        detail: "Hybrid semantic & keyword retrieval pipelines with reranking, cross-encoder scoring, and source citations."
      },
      {
        title: "Multi-Agent Workflows",
        detail: "Stateful agents with human-in-the-loop approvals, structured JSON tool execution, and sandbox environments."
      },
      {
        title: "Automated Evaluation Suites",
        detail: "Custom test suites benchmarked against golden datasets to flag semantic drift before deployment."
      }
    ],
    metricHighlight: "98.4%",
    metricLabel: "Benchmark triage accuracy in production"
  },
  {
    id: "product-engineering",
    number: "02",
    tag: "Product Engineering",
    title: "Full-Stack Product Engineering",
    headline: "End-to-end applications designed for velocity, resilience, and scale.",
    description: "From pixel-perfect React/Next.js interfaces to rock-solid Go/Node/Python backends and cloud infrastructure. Built by staff-level engineers who ship weekly releases directly to your GitHub repository.",
    pills: ["React & Next.js", "TypeScript", "FastAPI & Go", "PostgreSQL", "Cloud Native"],
    capabilities: [
      {
        title: "Modern UI & Micro-interactions",
        detail: "Accessible, responsive web apps designed with buttery 60fps animations, keyboard shortcuts, and instant feedback."
      },
      {
        title: "High-Throughput Backends",
        detail: "Event-driven microservices, Redis caching layers, connection pooling, and optimized DB schemas."
      },
      {
        title: "CI/CD & Infrastructure as Code",
        detail: "Terraform, Dockerized containers, AWS/GCP pipelines, and zero-downtime blue/green rollouts."
      }
    ],
    metricHighlight: "14 Days",
    metricLabel: "Average time to first clickable production build"
  },
  {
    id: "data-ml",
    number: "03",
    tag: "Data & ML",
    title: "Data Intelligence & ML",
    headline: "Transform passive data into high-conviction revenue and margin decisions.",
    description: "Machine learning pipelines, predictive scoring models, and executive analytics dashboards that uncover hidden churn indicators, forecast demand curves, and optimize dynamic pricing in real time.",
    pills: ["Predictive Scoring", "Time-Series ML", "Stream Processing", "Executive Dashboards", "Feature Stores"],
    capabilities: [
      {
        title: "Dynamic Pricing & Yield Optimization",
        detail: "Algorithmic pricing engines that adapt to inventory elasticity, competitor signals, and historical demand."
      },
      {
        title: "Proactive Retention Intelligence",
        detail: "Early-warning churn predictors identifying account health decay 30-60 days before contract renewal."
      },
      {
        title: "Modern Data Stack Integration",
        detail: "Seamless sync with Snowflake, BigQuery, dbt, Kafka, and custom reverse-ETL pipelines."
      }
    ],
    metricHighlight: "+7.4%",
    metricLabel: "Average margin lift achieved across deployed models"
  }
];

export const REVENUE_METRICS: RevenueMetric[] = [
  {
    id: "top-line",
    tag: "Top Line Expansion",
    title: "Win more pipeline without adding headcount",
    description: "Accelerate deal velocity through automated qualification, instant quote generation, and frictionless onboarding workflows that convert high-intent prospects before they look at competitors.",
    kpi: "+34%",
    kpiLabel: "Average pipeline conversion boost",
    iconType: "chart-up"
  },
  {
    id: "margin-lift",
    tag: "Margin Recovery",
    title: "Serve existing customers at substantially lower cost",
    description: "Automate repetitive triage, manual reconciliation, and multi-system data entry. Redirect human talent from mundane operational toil to high-leverage strategic growth initiatives.",
    kpi: "-62%",
    kpiLabel: "Manual operational hours eliminated",
    iconType: "shield-check"
  },
  {
    id: "retention-guard",
    tag: "Retention Protection",
    title: "Defend recurring revenue with proactive signals",
    description: "Stop relying on lagging metrics. Machine learning signals identify declining product usage patterns weeks ahead, giving account executives time to intervene and secure renewals.",
    kpi: "82%",
    kpiLabel: "At-risk accounts flagged early",
    iconType: "trending-up"
  }
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    title: "Scope in a Week",
    timing: "Days 1 to 5",
    description: "One deep-dive discovery session, one clear architecture document, and a fixed-price commitment for Phase 1. No vague discovery retainers.",
    deliverable: "Target architecture blueprint, API contract specs, and fixed milestone budget."
  },
  {
    number: "02",
    title: "Demo in Two",
    timing: "Days 6 to 14",
    description: "A clickable, fully functional vertical slice running against your actual sandbox or synthetic data. You test real code, not Figma mockups.",
    deliverable: "Working production deploy running on private preview staging."
  },
  {
    number: "03",
    title: "Ship Weekly",
    timing: "Weeks 3 to 8",
    description: "Continuous delivery to staging and production every Friday. Direct Slack/Discord channel with the engineers writing the code.",
    deliverable: "Live changelogs, test suite results, and business metric impact reports."
  },
  {
    number: "04",
    title: "Hand Over Clean",
    timing: "Post-Launch",
    description: "Full IP transfer, clean TypeScript/Python codebases, thorough documentation, and zero vendor lock-in. Retainers are strictly optional.",
    deliverable: "GitHub repos transferred, CI/CD runbooks, and staff onboarding walk-through."
  }
];

export const STUDIO_STATS: StudioStat[] = [
  {
    value: 14,
    suffix: " Days",
    label: "To First Working Demo",
    sublabel: "Tested against real customer data"
  },
  {
    value: 100,
    suffix: "%",
    label: "Direct Senior Engineering",
    sublabel: "No account managers or junior tiers"
  },
  {
    value: 0,
    suffix: "",
    label: "Vendor Lock-In or Hidden IP",
    sublabel: "100% clean code in your repositories"
  },
  {
    value: 9,
    suffix: ".2%",
    label: "Median Margin Lift",
    sublabel: "Measured across past 24-month builds"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "support-copilot",
    tag: "AI Operations & Triage",
    category: "ai",
    title: "Autonomous Support Triage Copilot",
    clientType: "Global Logistics & Freight Enterprise",
    summary: "Built a multilingual AI triage and automated resolution copilot processing 24,000+ monthly customer support inquiries across US and European markets.",
    metricHeadline: "9h → 11m",
    metricSub: "First response time reduction",
    timeline: "6 weeks from kickoff to global production",
    problem: "Customer support agents spent 65% of their day manually reading bill-of-lading documents, classifying issue types, and copy-pasting data into ERP systems, causing average response delays of 9.2 hours and high churn risk on premium accounts.",
    solution: "Designed and deployed a hybrid RAG classification engine integrating with Zendesk and legacy AS400 ERPs. System extracts invoice metadata, categorizes urgency with confidence scoring, routes high-priority claims, and drafts automated resolutions with 98.4% human acceptance rate.",
    deliverables: [
      "Custom multi-agent routing pipeline with OCR document parser",
      "Confidence-weighted automated reply generator",
      "Real-time supervisor eval dashboard with one-click audit logs",
      "Zero-retention PII scrubbing layer compliant with GDPR & SOC 2"
    ],
    techStack: ["OpenAI GPT-4o", "LangGraph", "FastAPI", "PostgreSQL (pgvector)", "TypeScript", "TailwindCSS"],
    clientQuote: {
      text: "Vorcove delivered a fully working prototype in 10 days that outperformed our 6-month internal attempt. It paid for itself within the first quarter.",
      author: "Marcus Vance",
      role: "VP of Operations",
      company: "TransAtlantic Freightways"
    },
    metrics: [
      { metricName: "First-Response Time", before: "9.2 Hours", after: "11 Minutes", delta: "-98%" },
      { metricName: "Auto-Resolved Inquiries", before: "0%", after: "44.6%", delta: "+44.6%" },
      { metricName: "Annual Ops Savings", before: "$0", after: "$380,000", delta: "+$380k" }
    ]
  },
  {
    id: "dynamic-pricing",
    tag: "Revenue Intelligence",
    category: "revenue",
    title: "Dynamic Algorithmic Pricing Engine",
    clientType: "B2B Industrial Supply Marketplace",
    summary: "Created a real-time predictive pricing and margin optimization engine recalculating 180,000+ SKU prices based on raw material fluctuations and purchase intent.",
    metricHeadline: "+7.4%",
    metricSub: "Gross margin expansion in Q1",
    timeline: "8 weeks to full deployment",
    problem: "Sales representatives were using static monthly PDF price sheets while supply chain steel/aluminum costs shifted daily. High-volume quotes were consistently underpriced by 6-9%, eroding margins by over $1.2M annually.",
    solution: "Engineered a high-throughput microservice that ingests supplier spot prices, customer purchase velocity, and regional competitor scrape data to recommend optimal dynamic price floors and discount thresholds in real-time.",
    deliverables: [
      "Sub-50ms pricing calculation API supporting 5,000 req/sec",
      "Sales rep instant quoting web app with margin simulator",
      "Automated elasticity feedback loop retraining weekly",
      "ERP synchronization pipeline with rollback guards"
    ],
    techStack: ["Python", "LightGBM", "Redis", "Go", "Next.js", "AWS ECS", "Snowflake"],
    clientQuote: {
      text: "The margin lift showed up in our monthly financial audit immediately. We saw a 7.4% gross margin increase across the exact same catalog volume.",
      author: "Elena Rostova",
      role: "Chief Commercial Officer",
      company: "MetalsDirect Group"
    },
    metrics: [
      { metricName: "Catalog Gross Margin", before: "21.2%", after: "28.6%", delta: "+7.4%" },
      { metricName: "Quote Generation Time", before: "3.5 Hours", after: "45 Seconds", delta: "-99%" },
      { metricName: "Quarterly Margin Impact", before: "Baseline", after: "+$640,000", delta: "+$640k" }
    ]
  },
  {
    id: "onboarding-platform",
    tag: "Product Engineering",
    category: "product",
    title: "Self-Serve B2B Customer Onboarding Suite",
    clientType: "Fintech API Infrastructure Provider",
    summary: "Re-engineered complex developer onboarding flow into an intuitive guided sandbox experience, doubling trial-to-paid conversion rates.",
    metricHeadline: "2.1x",
    metricSub: "Activation rate increase",
    timeline: "5 weeks to production",
    problem: "Enterprise prospects took an average of 18 days and required 4 engineering touchpoints to configure webhook callbacks, sandbox keys, and compliance verification.",
    solution: "Built a modern interactive developer hub with interactive API mocks, automated schema validation, instant KYC verification widgets, and collaborative team invites.",
    deliverables: [
      "Interactive multi-step onboarding portal in React & TypeScript",
      "Automated webhook inspector and sandbox simulator",
      "Team permissions and RBAC management dashboard",
      "Segment-integrated telemetry tracking funnel drop-offs"
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "Prisma", "Docker"],
    clientQuote: {
      text: "Our engineers got 30 hours back every week from customer integration calls. Developers now get live credentials and send their first production webhook in under 8 minutes.",
      author: "Julian Thorne",
      role: "Head of Product",
      company: "LedgerPulse Tech"
    },
    metrics: [
      { metricName: "Time to First API Call", before: "18 Days", after: "8 Minutes", delta: "-99.9%" },
      { metricName: "Trial-to-Paid Conversion", before: "14.2%", after: "29.8%", delta: "+110%" },
      { metricName: "Eng Hours Saved/Week", before: "0 hrs", after: "32 hrs", delta: "+32 hrs" }
    ]
  },
  {
    id: "churn-forecasting",
    tag: "Data & ML Suite",
    category: "data",
    title: "Predictive Churn & Expansion Suite",
    clientType: "Enterprise SaaS Platform ($40M ARR)",
    summary: "Implemented an early-warning telemetry scoring pipeline flagging contract churn risks and automated upsell opportunities 60 days in advance.",
    metricHeadline: "82%",
    metricSub: "At-risk accounts flagged early",
    timeline: "7 weeks to enterprise rollout",
    problem: "Customer Success teams only discovered account dissatisfaction during quarterly business reviews or when cancellation notices were submitted, losing $3.8M in preventable ARR annually.",
    solution: "Trained an ensemble ML classification model tracking 48 behavioral event metrics (login frequency drops, export rates, feature abandonment) and integrated predictive health alerts directly into HubSpot and Slack.",
    deliverables: [
      "Real-time event streaming pipeline processing 10M+ daily events",
      "Account health score dashboard with feature attribution breakdown",
      "Automated Slack alert bots for CS account managers",
      "Executive churn risk and renewal forecast dashboard"
    ],
    techStack: ["Python", "XGBoost", "Apache Kafka", "ClickHouse", "FastAPI", "React", "AWS Lambda"],
    clientQuote: {
      text: "Vorcove's model predicted 9 out of 10 potential churns before our account managers even noticed a dip. It has protected over $2.1M in ARR within 6 months.",
      author: "Sarah Lindqvist",
      role: "VP Customer Success",
      company: "AcuityMetrics"
    },
    metrics: [
      { metricName: "Early Churn Detection Rate", before: "24%", after: "82%", delta: "+58%" },
      { metricName: "Net Revenue Retention (NRR)", before: "101%", after: "114%", delta: "+13%" },
      { metricName: "ARR Saved (6 Mo)", before: "$0", after: "$2,100,000", delta: "+$2.1M" }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Marcus Vance",
    role: "VP of Operations",
    company: "TransAtlantic Freightways",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "Vorcove is the only technical partner we've worked with that talks about EBITDA and gross margin before they talk about tech stacks. They built an AI triage copilot that cut our response time from 9 hours to 11 minutes.",
    highlightMetric: "-98% Response Time",
    projectType: "Autonomous AI Operations"
  },
  {
    id: "test-2",
    name: "Elena Rostova",
    role: "Chief Commercial Officer",
    company: "MetalsDirect Group",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    quote: "Most consultants hand you a 40-page PowerPoint deck. Vorcove handed us a working pricing engine connected to our ERP in week two. That engine generated a 7.4% gross margin lift in quarter one.",
    highlightMetric: "+7.4% Margin Lift",
    projectType: "Dynamic Pricing ML"
  },
  {
    id: "test-3",
    name: "Julian Thorne",
    role: "Head of Product",
    company: "LedgerPulse Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "Two senior engineers from Vorcove moved faster than our entire 8-person team. They refactored our customer onboarding, doubled our activation rate, and handed over impeccably documented code.",
    highlightMetric: "2.1x Activation Rate",
    projectType: "Full-Stack Product"
  }
];

export const TECH_STACK: TechItem[] = [
  { name: "OpenAI GPT-4o / O1", category: "AI / LLM", icon: "Brain", description: "State-of-the-art reasoning and multi-modal processing" },
  { name: "Anthropic Claude 3.5 Sonnet", category: "AI / LLM", icon: "Cpu", description: "Complex code generation & structured extraction" },
  { name: "LangGraph & LlamaIndex", category: "AI / LLM", icon: "GitFork", description: "Stateful multi-agent orchestration and index routing" },
  { name: "PostgreSQL & pgvector", category: "Backend & Cloud", icon: "Database", description: "Relational data with high-speed vector embeddings" },
  { name: "React & Next.js 14/15", category: "Frontend", icon: "Layout", description: "Server components, instant hydration & tactile UI" },
  { name: "TypeScript", category: "Frontend", icon: "Code", description: "End-to-end type safety across client and server" },
  { name: "FastAPI & Python 3.12", category: "Backend & Cloud", icon: "Terminal", description: "Asynchronous high-performance microservices" },
  { name: "Go (Golang)", category: "Backend & Cloud", icon: "Zap", description: "Ultra-low latency streaming and event ingestion" },
  { name: "Redis & ClickHouse", category: "Data & ML", icon: "Server", description: "Sub-millisecond caching and real-time columnar analytics" },
  { name: "AWS & GCP Cloud Native", category: "Backend & Cloud", icon: "Cloud", description: "Terraform IaC, Docker containers & automated rollouts" },
  { name: "PyTorch & LightGBM", category: "Data & ML", icon: "Activity", description: "Custom forecasting, ranking & classification models" },
  { name: "Continuous Eval Frameworks", category: "AI / LLM", icon: "ShieldCheck", description: "Automated regression testing for LLM pipelines" },
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "engagements",
    question: "How fast do we see working software?",
    answer: "You will click and test a working vertical slice within 14 days of kickoff. We don't spend months in theoretical discovery sessions. We scope the highest-leverage slice first, hook it into real data, and deploy to a private staging URL for weekly iterative releases."
  },
  {
    id: "faq-2",
    category: "engineering",
    question: "Who actually builds the product? Do you outsource or use junior devs?",
    answer: "Zero outsourcing, zero junior teams, zero middle-management layers. Every project is led and built by senior/staff-level software engineers who have built and scaled systems at top tech companies. You have direct Slack/Discord access to the people writing your code."
  },
  {
    id: "faq-3",
    category: "engagements",
    question: "Who owns the code, models, and intellectual property?",
    answer: "You own 100% of the code, repositories, models, data pipelines, and documentation from day one. All code is committed directly to your organization's GitHub/GitLab repositories and deployed into your cloud accounts (AWS, GCP, Azure, Vercel)."
  },
  {
    id: "faq-4",
    category: "pricing",
    question: "How does pricing and scoping work?",
    answer: "Phase 1 is always a fixed-price, fixed-scope sprint so you have complete cost predictability with zero budget creep. Following the initial launch, clients typically engage us on monthly engineering sprints or transition to their internal teams using our complete handover runbooks."
  },
  {
    id: "faq-5",
    category: "engineering",
    question: "How do you ensure AI agents and LLM features don't hallucinate?",
    answer: "We build deterministic RAG architectures with hybrid semantic/lexical search, strict JSON schema validation, source attribution tags, and automated continuous evaluation test suites (evals) that benchmark accuracy against golden datasets before any model update goes to production."
  },
  {
    id: "faq-6",
    category: "engagements",
    question: "What happens after the product is launched?",
    answer: "We conduct complete handoff sessions with your engineering and product teams, deliver comprehensive architectural runbooks, and provide a 30-day post-launch warranty period. Retainer support is available if you prefer our team to continue iterating and scaling features."
  }
];

export const CONTACT_PRESETS = {
  services: [
    "AI Agent / Copilot",
    "Dynamic Pricing Engine",
    "Full-Stack Web App",
    "Data & ML Pipeline",
    "Evaluation & RAG Audit"
  ],
  budgets: [
    "$15k to $25k (Sprint)",
    "$25k to $50k (Phase 1 Build)",
    "$50k to $100k+ (Enterprise Product)",
    "Not sure yet / Exploratory"
  ],
  timelines: [
    "ASAP (within 2 weeks)",
    "Next month",
    "Q4 / Q1 2026",
    "Flexible"
  ]
};
