import mongoose, { Schema, Document } from 'mongoose';

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  company?: string;
  brief: string;
  selectedServices: string[];
  selectedBudget: string;
  selectedTimeline: string;
  status: 'new' | 'reviewing' | 'scheduled' | 'converted' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  internalNotes: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    brief: {
      type: String,
      required: [true, 'Project brief or description is required'],
      trim: true,
      maxlength: [3000, 'Brief cannot exceed 3000 characters']
    },
    selectedServices: {
      type: [String],
      default: []
    },
    selectedBudget: {
      type: String,
      default: '$25k to $50k (Phase 1 Build)'
    },
    selectedTimeline: {
      type: String,
      default: 'ASAP (within 2 weeks)'
    },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'scheduled', 'converted', 'archived'],
      default: 'new'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    internalNotes: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    },
    userAgent: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

ContactInquirySchema.index({ email: 1, createdAt: -1 });
ContactInquirySchema.index({ status: 1 });

export const ContactInquiry = mongoose.model<IContactInquiry>('ContactInquiry', ContactInquirySchema);
