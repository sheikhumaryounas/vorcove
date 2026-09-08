import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudyMetric {
  before: string;
  after: string;
  delta: string;
  metricName: string;
}

export interface ICaseStudy extends Document {
  slug: string;
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
  metrics: ICaseStudyMetric[];
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MetricItemSchema = new Schema(
  {
    before: { type: String, required: true },
    after: { type: String, required: true },
    delta: { type: String, required: true },
    metricName: { type: String, required: true }
  },
  { _id: false }
);

const CaseStudySchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    tag: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['ai', 'revenue', 'product', 'data'],
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    clientType: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    metricHeadline: {
      type: String,
      required: true
    },
    metricSub: {
      type: String,
      required: true
    },
    timeline: {
      type: String,
      required: true
    },
    problem: {
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    },
    deliverables: [{ type: String }],
    techStack: [{ type: String }],
    clientQuote: {
      text: { type: String },
      author: { type: String },
      role: { type: String },
      company: { type: String }
    },
    metrics: [MetricItemSchema],
    order: {
      type: Number,
      default: 0
    },
    published: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

CaseStudySchema.index({ order: 1, published: 1 });

export const CaseStudy = mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
