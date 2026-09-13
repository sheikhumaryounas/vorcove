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
  { label: "Solutions", href: "#services" },
  { label: "Business ROI", href: "#revenue" },
  { label: "How We Work", href: "#approach" },
  { label: "Case Studies", href: "#work" },
  { label: "Live Demos", href: "#demos", badge: "Interactive" },
  { label: "ROI Estimator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
];

export const HERO_HIGHLIGHTS = [
  "Turn operational friction into custom software",
  "First working software build in 14 days",
  "100% custom code & full IP ownership",
  "Fixed-price sprint • Zero budget creep"
];

export const MARQUEE_ITEMS = [
  "Real-Time Workflow Automation",
  "Custom Business Software",
  "Operational Copilots & Portals",
  "Dynamic Quoting & Pricing Engines",
  "Automated Triage & Document Pipelines",
  "ERP, CRM & Database Sync",
  "Internal Operations Tooling",
  "High-Throughput Business APIs",
  "Customer Onboarding Systems",
  "Deterministic Process Automation"
];

export const SERVICES: ServiceItem[] = [
  {
    id: "workflow-automation",
    number: "01",
    tag: "Intelligent Automation",
    title: "Operational Automation & Intelligent Systems",
    headline: "Automate repetitive daily tasks, document bottlenecks, and manual triage.",
    description: "We eliminate time-consuming operational toil. We build intelligent workflow automations that ingest real-time incoming data (emails, PDFs, invoices, tickets), cross-reference internal databases, and execute multi-step business actions autonomously with zero error drift.",
    pills: ["Process Automation", "Document Parsing", "Database Sync", "Auto-Triage", "Human-in-the-Loop"],
    capabilities: [
      {
        title: "Automated Document & Invoice Processing",
        detail: "Extract, classify, and validate complex PDFs, bill-of-lading documents, and invoices into your ERP instantly."
      },
      {
        title: "Multi-System Workflow Orchestration",
        detail: "Connect disjointed CRMs, legacy databases, and communication channels into seamless automated pipelines."
      },
      {
        title: "Deterministic Validation & Guardrails",
        detail: "Automated verification test suites ensuring 100% data integrity and zero hallucination before updating live records."
      }
    ],
    metricHighlight: "98.4%",
    metricLabel: "Automated triage & data accuracy in production"
  },
  {
    id: "custom-software",
    number: "02",
    tag: "Product Engineering",
    title: "Custom Software & Business Applications",
    headline: "Turn complex, messy business workflows into sleek, reliable software products.",
    description: "Stop forcing your business into rigid, overpriced off-the-shelf software or fragile spreadsheets. We engineer custom web applications, client portals, and internal management hubs tailored precisely to your operational workflows.",
    pills: ["Custom Web Apps", "Client Portals", "Internal Ops Tooling", "TypeScript & React", "High-Speed APIs"],
    capabilities: [
      {
        title: "Tailored Management & Ops Portals",
        detail: "Intuitive, role-based web platforms built specifically for your team's day-to-day coordination and workflow."
      },
      {
        title: "Frictionless Client & Vendor Hubs",
        detail: "Self-serve onboarding, automated quoting, and real-time status tracking portals that delight your clients."
      },
      {
        title: "Robust, Scalable Cloud Architecture",
        detail: "Fast, secure backends with automated backups, role-based access control, and bank-grade data encryption."
      }
    ],
    metricHighlight: "14 Days",
    metricLabel: "Average time to first clickable production build"
  },
  {
    id: "realtime-engines",
    number: "03",
    tag: "Decision Engines",
    title: "Real-Time Calculation & Pricing Engines",
    headline: "High-speed algorithms that protect margins and accelerate deal turnaround.",
    description: "Replace slow, error-prone manual calculations and static price sheets. We build high-throughput dynamic pricing, instant quoting, and predictive telemetry engines that recalculate numbers in milliseconds and sync directly with your sales workflows.",
    pills: ["Instant Quoting", "Dynamic Pricing", "Margin Optimization", "Real-Time Telemetry", "Inventory Logic"],
    capabilities: [
      {
        title: "Dynamic Pricing & Quoting Engines",
        detail: "Instant quotation tools that adapt to fluctuating costs, volume discounts, and supplier price changes in milliseconds."
      },
      {
        title: "Early-Warning Operational Alerts",
        detail: "Telemetry systems that track order velocity, account health, and operational delays to alert teams proactively."
      },
      {
        title: "Seamless ERP & Accounting Sync",
        detail: "Real-time bi-directional synchronization with QuickBooks, SAP, Netsuite, Salesforce, or custom databases."
      }
    ],
    metricHighlight: "+7.4%",
    metricLabel: "Average margin lift achieved across deployed calculation engines"
  }
];

export const REVENUE_METRICS: RevenueMetric[] = [
  {
    id: "operational-velocity",
    tag: "Operational Velocity",
    title: "Eliminate manual bottlenecks and cycle delays",
    description: "Automate repetitive data entry, order verification, and multi-system paperwork. Turn tasks that previously took hours or days into instant, error-free automated software flows.",
    kpi: "-62%",
    kpiLabel: "Manual operational hours eliminated",
    iconType: "shield-check"
  },
  {
    id: "revenue-acceleration",
    tag: "Revenue Acceleration",
    title: "Quote deals instantly and convert customers faster",
    description: "Accelerate deal velocity through automated quotation generation, instant self-serve client onboarding, and seamless communication that wins contracts before competitors reply.",
    kpi: "+34%",
    kpiLabel: "Average pipeline conversion boost",
    iconType: "chart-up"
  },
  {
    id: "margin-protection",
    tag: "Margin Protection",
    title: "Prevent costly pricing errors and account churn",
    description: "Automated calculations ensure quotes reflect live supplier costs, while proactive telemetry alerts your team to customer friction weeks before it results in lost business.",
    kpi: "82%",
    kpiLabel: "At-risk accounts & price gaps flagged early",
    iconType: "trending-up"
  }
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    title: "Diagnose & Scope",
    timing: "Days 1 to 5",
    description: "One deep-dive discovery session to pinpoint the exact manual bottleneck, one clear software architecture blueprint, and a guaranteed fixed-price commitment. No open-ended consulting retainers.",
    deliverable: "Solution blueprint, workflow mapping, API specs, and fixed milestone budget."
  },
  {
    number: "02",
    title: "Working Software Demo",
    timing: "Days 6 to 14",
    description: "A clickable, fully functional vertical slice running against your actual workflows or staging data. You test real working software with your team, not abstract slide decks.",
    deliverable: "Functional custom software build running on private preview staging."
  },
  {
    number: "03",
    title: "Ship & Integrate Weekly",
    timing: "Weeks 3 to 8",
    description: "Iterative deployments every Friday directly connected to your live operational tools. Direct communication channel with the senior software engineers writing your code.",
    deliverable: "Weekly live releases, integration test results, and operational performance reports."
  },
  {
    number: "04",
    title: "100% Clean Handover & IP",
    timing: "Post-Launch",
    description: "Full IP transfer, clean codebase, step-by-step documentation, and zero vendor lock-in. Your team owns every line of code with complete independence.",
    deliverable: "Git repositories transferred, system runbooks, and staff onboarding walk-through."
  }
];

export const STUDIO_STATS: StudioStat[] = [
  {
    value: 14,
    suffix: " Days",
    label: "To First Working Software",
    sublabel: "Tested against real business workflows"
  },
  {
    value: 100,
    suffix: "%",
    label: "Full Code & IP Ownership",
    sublabel: "Committed directly to your repositories"
  },
  {
    value: 0,
    suffix: "",
    label: "Vendor Lock-In or Hidden Fees",
    sublabel: "100% transparent fixed-price sprints"
  },
  {
    value: 70,
    suffix: "%+",
    label: "Operational Toil Automated",
    sublabel: "Measured across delivered client systems"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "freight-triage",
    tag: "Operational Automation",
    category: "ai",
    title: "Real-Time Freight & Customs Triage System",
    clientType: "Commercial Logistics & Supply Enterprise",
    summary: "Engineered an automated document extraction and issue-routing system processing 24,000+ monthly shipments, invoices, and customs manifests.",
    metricHeadline: "9h → 11m",
    metricSub: "First resolution time reduction",
    timeline: "6 weeks from kickoff to full production",
    problem: "Operations coordinators spent 65% of their day manually reading bill-of-lading PDFs, verifying customs manifests, and copy-pasting data into legacy ERP systems. This caused 9-hour processing backlogs and costly port storage penalties.",
    solution: "Designed and deployed an intelligent document parsing and auto-resolution platform that extracts manifest data, verifies compliance against customs rules, auto-updates the ERP, and resolves standard clearances automatically.",
    deliverables: [
      "Custom OCR document parsing and metadata extraction pipeline",
      "Automated resolution engine with confidence scoring and escalation rules",
      "Supervisor audit dashboard with real-time discrepancy alerts",
      "Zero-retention data privacy layer compliant with enterprise security standards"
    ],
    techStack: ["FastAPI", "Python", "PostgreSQL", "LangGraph", "React", "TailwindCSS"],
    clientQuote: {
      text: "Vorcove delivered a working prototype in 10 days that solved a problem our team had struggled with for two years. The software paid for itself within the first quarter.",
      author: "Marcus Vance",
      role: "VP of Operations",
      company: "TransAtlantic Freightways"
    },
    metrics: [
      { metricName: "Processing Latency", before: "9.2 Hours", after: "11 Minutes", delta: "-98%" },
      { metricName: "Auto-Processed Volume", before: "0%", after: "44.6%", delta: "+44.6%" },
      { metricName: "Annual Operational Savings", before: "$0", after: "$380,000", delta: "+$380k" }
    ]
  },
  {
    id: "dynamic-pricing",
    tag: "Revenue Intelligence",
    category: "revenue",
    title: "Real-Time Dynamic Quoting & Pricing Engine",
    clientType: "Industrial Wholesale & Supply Marketplace",
    summary: "Built a high-speed pricing engine recalculating 180,000+ catalog SKU prices in milliseconds based on fluctuating material costs and purchase volume.",
    metricHeadline: "+7.4%",
    metricSub: "Gross margin expansion in Q1",
    timeline: "8 weeks to full deployment",
    problem: "Sales representatives relied on outdated static monthly price sheets while raw material costs fluctuated daily. Quotes took hours to generate and frequently underpriced high-volume orders, leaking hundreds of thousands in margin.",
    solution: "Engineered an ultra-fast custom quoting engine that pulls live supplier index costs, calculates optimal volume-based margins, and delivers instant, accurate quotes to reps and clients in 45 milliseconds.",
    deliverables: [
      "Sub-50ms pricing calculation API supporting thousands of queries per second",
      "Sales rep instant quoting web app with live margin simulator",
      "Automated cost-sync pipeline that updates price floors as supplier rates shift",
      "Direct ERP synchronization preventing manual quote re-entry"
    ],
    techStack: ["Python", "Go", "Redis", "Next.js", "PostgreSQL", "AWS ECS"],
    clientQuote: {
      text: "The margin lift was undeniable. Our sales reps can generate an accurate, margin-protected quote in under a minute instead of waiting half a day.",
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
    id: "client-onboarding",
    tag: "Custom Product Engineering",
    category: "product",
    title: "Self-Serve B2B Customer Onboarding Platform",
    clientType: "Commercial Services & Infrastructure Firm",
    summary: "Replaced an 18-day manual email-and-paperwork setup with an automated self-serve client portal, doubling customer activation speed.",
    metricHeadline: "2.1x",
    metricSub: "Customer activation boost",
    timeline: "5 weeks to production",
    problem: "Onboarding a new client required 4 manual team touchpoints, manual document collection, and lengthy email verification chains, taking nearly 3 weeks and causing prospective clients to drop off.",
    solution: "Built a custom, branded client onboarding web portal with guided setup steps, automated document verification, team permission controls, and instant account provisioning.",
    deliverables: [
      "Interactive multi-step client portal with instant verification",
      "Automated document collection and validation workflow",
      "Team permissions, billing setup, and role-based access dashboard",
      "Real-time onboarding analytics tracking completion drop-offs"
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "TailwindCSS"],
    clientQuote: {
      text: "Our team got 30 hours back every week from customer setup calls. New clients now complete onboarding in under 10 minutes without waiting for our staff.",
      author: "Julian Thorne",
      role: "Head of Operations & Product",
      company: "LedgerPulse Tech"
    },
    metrics: [
      { metricName: "Time to Complete Onboarding", before: "18 Days", after: "8 Minutes", delta: "-99.9%" },
      { metricName: "Prospect-to-Active Rate", before: "14.2%", after: "29.8%", delta: "+110%" },
      { metricName: "Weekly Team Hours Saved", before: "0 hrs", after: "32 hrs", delta: "+32 hrs" }
    ]
  },
  {
    id: "account-retention",
    tag: "Operational Telemetry",
    category: "data",
    title: "Early-Warning Operational Retention Radar",
    clientType: "B2B Subscription & Account Services",
    summary: "Created a proactive operational monitoring system tracking 48 client activity signals to catch service friction and prevent cancellations 60 days early.",
    metricHeadline: "82%",
    metricSub: "At-risk accounts flagged early",
    timeline: "7 weeks to enterprise rollout",
    problem: "Account managers only discovered client dissatisfaction when accounts submitted cancellation notices or stopped ordering, losing millions in preventable revenue every year.",
    solution: "Developed an automated telemetry and activity monitoring engine that analyzes order patterns, login frequency, and support ticket spikes to alert account managers in real time before issues escalate.",
    deliverables: [
      "Real-time event streaming pipeline processing daily account interactions",
      "Account health score dashboard with actionable retention playbooks",
      "Automated Slack & CRM notifications alerting reps to friction in real time",
      "Executive renewal forecasting and revenue protection reports"
    ],
    techStack: ["Python", "Kafka", "ClickHouse", "FastAPI", "React", "AWS Lambda"],
    clientQuote: {
      text: "Vorcove's software flags account dissatisfaction weeks before our managers would otherwise notice. It has protected over $2.1M in revenue within 6 months.",
      author: "Sarah Lindqvist",
      role: "VP Customer Operations",
      company: "AcuityMetrics"
    },
    metrics: [
      { metricName: "Early Friction Detection Rate", before: "24%", after: "82%", delta: "+58%" },
      { metricName: "Net Revenue Retention", before: "101%", after: "114%", delta: "+13%" },
      { metricName: "Revenue Protected (6 Mo)", before: "$0", after: "$2,100,000", delta: "+$2.1M" }
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
    quote: "Vorcove is the only technical partner we've worked with that understood our real-world operational problems immediately. They built a custom automated triage system that cut our document backlog from 9 hours to 11 minutes.",
    highlightMetric: "-98% Response Time",
    projectType: "Operational Workflow Automation"
  },
  {
    id: "test-2",
    name: "Elena Rostova",
    role: "Chief Commercial Officer",
    company: "MetalsDirect Group",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    quote: "Most consultants hand you an expensive presentation deck. Vorcove handed us a working dynamic pricing engine connected to our ERP in week two. That software generated a 7.4% gross margin lift in quarter one.",
    highlightMetric: "+7.4% Margin Lift",
    projectType: "Dynamic Pricing Engine"
  },
  {
    id: "test-3",
    name: "Julian Thorne",
    role: "Head of Operations & Product",
    company: "LedgerPulse Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "The Vorcove engineering team moved faster than our entire department thought possible. They replaced our painful manual onboarding with a sleek custom portal, doubled our customer conversion, and handed over impeccably documented code.",
    highlightMetric: "2.1x Conversion Rate",
    projectType: "Custom Software Engineering"
  }
];

export const TECH_STACK: TechItem[] = [
  { name: "Python 3.12 & FastAPI", category: "Backend & Cloud", icon: "Terminal", description: "High-speed asynchronous APIs & automation microservices" },
  { name: "React & Next.js 14/15", category: "Frontend", icon: "Layout", description: "Responsive, intuitive web applications and executive portals" },
  { name: "TypeScript", category: "Frontend", icon: "Code", description: "End-to-end type safety and maintainable codebase standards" },
  { name: "PostgreSQL & pgvector", category: "Backend & Cloud", icon: "Database", description: "Rock-solid relational data with high-speed indexing" },
  { name: "OpenAI GPT-4o & Claude", category: "AI / LLM", icon: "Brain", description: "Intelligent document parsing, extraction & categorization" },
  { name: "LangGraph & Orchestration", category: "AI / LLM", icon: "GitFork", description: "Multi-step automated workflows with human-in-the-loop review" },
  { name: "Go (Golang)", category: "Backend & Cloud", icon: "Zap", description: "Ultra-low latency calculation engines and high-volume data streams" },
  { name: "Redis & ClickHouse", category: "Data & ML", icon: "Server", description: "Sub-millisecond caching and real-time operational analytics" },
  { name: "AWS & Google Cloud", category: "Backend & Cloud", icon: "Cloud", description: "Secure cloud infrastructure, Docker containers & automated backups" },
  { name: "Deterministic Evals", category: "AI / LLM", icon: "ShieldCheck", description: "Automated regression testing ensuring 100% data accuracy" }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "engagements",
    question: "Do we need an internal tech team to work with Vorcove?",
    answer: "Not at all. We serve as your complete technical engineering partner. We take care of the entire lifecycle, from understanding your business workflow and designing the architecture, to writing the code, integrating with your existing tools, and providing full support and documentation."
  },
  {
    id: "faq-2",
    category: "engagements",
    question: "How fast do we see working software?",
    answer: "You will click and test a working vertical slice within 14 days of kickoff. We don't spend months writing theoretical slide decks. We scope the highest-impact operational bottleneck first, hook it into real workflows, and deploy to a private staging URL for weekly iterative testing."
  },
  {
    id: "faq-3",
    category: "engineering",
    question: "Who owns the code and custom software?",
    answer: "You own 100% of the code, repositories, data pipelines, and intellectual property from day one. All code is committed directly to your organization's GitHub/GitLab repositories and deployed into your cloud accounts with zero vendor lock-in."
  },
  {
    id: "faq-4",
    category: "pricing",
    question: "How does fixed-price Phase 1 scoping work?",
    answer: "Phase 1 is always a fixed-price, fixed-scope sprint so you have complete cost predictability with zero budget creep or surprise hourly billing. Following the initial launch, you can continue on monthly feature sprints or take complete internal ownership."
  },
  {
    id: "faq-5",
    category: "engineering",
    question: "How do you ensure automated systems don't make mistakes?",
    answer: "We engineer deterministic validation pipelines with strict data schema enforcement, multi-layer verification checks, source document cross-referencing, and automated fallback rules with human-in-the-loop escalation for edge cases."
  },
  {
    id: "faq-6",
    category: "engagements",
    question: "What happens after the software is launched?",
    answer: "We conduct complete handoff sessions with your team, deliver thorough documentation and video walkthroughs, and provide a 30-day post-launch warranty period. Retainer support is available if you prefer our team to continue adding features and scaling."
  }
];

export const CONTACT_PRESETS = {
  services: [
    "Workflow Automation System",
    "Custom Web Application / Portal",
    "Dynamic Pricing & Quoting Engine",
    "Intelligent Operations Copilot",
    "Data Integration & Analytics"
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
    "Q4 / Q1",
    "Flexible"
  ]
};
