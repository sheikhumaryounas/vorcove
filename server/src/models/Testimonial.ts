import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  highlightMetric: string;
  projectType: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: ''
    },
    quote: {
      type: String,
      required: true
    },
    highlightMetric: {
      type: String,
      required: true
    },
    projectType: {
      type: String,
      required: true
    },
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

TestimonialSchema.index({ order: 1, published: 1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
