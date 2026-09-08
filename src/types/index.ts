export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  pills: string[];
  capabilities: {
    title: string;
    detail: string;
  }[];
  metricHighlight: string;
  metricLabel: string;
}

export interface RevenueMetric {
  id: string;
  tag: string;
  title: string;
  description: string;
  kpi: string;
  kpiLabel: string;
  iconType: 'chart-up' | 'shield-check' | 'trending-up';
}

export interface ApproachStep {
  number: string;
  title: string;
  timing: string;
  description: string;
  deliverable: string;
}

export interface StudioStat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface CaseStudy {
  id: string;
  tag: string;
  category: 'ai' | 'revenue' | 'product' | 'data';
  title: string;
  clientType: string;
  summary: string;
  metricHeadline: string;
  metricSub: string;
  timeline: string;
  problem: string;
  solution: string;
  deliverables: string[];
  techStack: string[];
  clientQuote?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
  metrics: {
    before: string;
    after: string;
    delta: string;
    metricName: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  highlightMetric: string;
  projectType: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'engagements' | 'engineering' | 'pricing';
}

export interface TechItem {
  name: string;
  category: 'AI / LLM' | 'Backend & Cloud' | 'Data & ML' | 'Frontend';
  icon: string;
  description: string;
}
