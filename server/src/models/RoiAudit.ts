import mongoose, { Schema, Document } from 'mongoose';

export interface IRoiAudit extends Document {
  teamSize: number;
  projectType: 'ai-ops' | 'pricing' | 'product' | 'data';
  hourlyRate: number;
  hoursWastedPerWeek: number;
  annualWastedCost: number;
  estimatedAnnualSavings: number;
  estimatedHoursSavedPerMonth: number;
  estimatedInvestment: number;
  paybackMonths: number;
  efficiencyMultiplier: number;
  clientName?: string;
  clientEmail?: string;
  clientCompany?: string;
  status: 'draft' | 'submitted' | 'contacted';
  createdAt: Date;
  updatedAt: Date;
}

const RoiAuditSchema: Schema = new Schema(
  {
    teamSize: {
      type: Number,
      required: true,
      min: 1
    },
    projectType: {
      type: String,
      enum: ['ai-ops', 'pricing', 'product', 'data'],
      required: true
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 1
    },
    hoursWastedPerWeek: {
      type: Number,
      required: true,
      min: 0.5
    },
    annualWastedCost: {
      type: Number,
      required: true
    },
    estimatedAnnualSavings: {
      type: Number,
      required: true
    },
    estimatedHoursSavedPerMonth: {
      type: Number,
      required: true
    },
    estimatedInvestment: {
      type: Number,
      required: true
    },
    paybackMonths: {
      type: Number,
      required: true
    },
    efficiencyMultiplier: {
      type: Number,
      required: true
    },
    clientName: {
      type: String,
      trim: true,
      default: ''
    },
    clientEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    clientCompany: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'contacted'],
      default: 'submitted'
    }
  },
  {
    timestamps: true
  }
);

RoiAuditSchema.index({ createdAt: -1 });

export const RoiAudit = mongoose.model<IRoiAudit>('RoiAudit', RoiAuditSchema);
