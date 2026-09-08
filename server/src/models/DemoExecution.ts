import mongoose, { Schema, Document } from 'mongoose';

export interface IDemoExecution extends Document {
  demoType: 'copilot' | 'pricing' | 'churn';
  inputs: Record<string, any>;
  results: Record<string, any>;
  latencyMs: number;
  ipAddress?: string;
  status: 'success' | 'warning' | 'failed';
  createdAt: Date;
}

const DemoExecutionSchema: Schema = new Schema(
  {
    demoType: {
      type: String,
      enum: ['copilot', 'pricing', 'churn'],
      required: true
    },
    inputs: {
      type: Schema.Types.Mixed,
      default: {}
    },
    results: {
      type: Schema.Types.Mixed,
      default: {}
    },
    latencyMs: {
      type: Number,
      default: 0
    },
    ipAddress: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['success', 'warning', 'failed'],
      default: 'success'
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

DemoExecutionSchema.index({ demoType: 1, createdAt: -1 });

export const DemoExecution = mongoose.model<IDemoExecution>('DemoExecution', DemoExecutionSchema);
