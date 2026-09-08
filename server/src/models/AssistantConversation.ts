import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  topicId?: string;
  badge?: string;
  bulletPoints?: string[];
  ctaLabel?: string;
  ctaTargetId?: string;
  timestamp: Date;
}

export interface IAssistantConversation extends Document {
  sessionId: string;
  userEmail?: string;
  userName?: string;
  userCompany?: string;
  categoriesVisited: string[];
  topicsExplored: string[];
  messages: IChatMessage[];
  capturedLead: {
    name?: string;
    email?: string;
    company?: string;
    interest?: string;
    capturedAt?: Date;
  };
  status: 'active' | 'lead_captured' | 'completed' | 'abandoned';
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema(
  {
    id: { type: String, required: true },
    sender: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    text: { type: String, required: true },
    topicId: { type: String },
    badge: { type: String },
    bulletPoints: [{ type: String }],
    ctaLabel: { type: String },
    ctaTargetId: { type: String },
    timestamp: { type: Date, default: Date.now }
  },
  { _id: false }
);

const AssistantConversationSchema: Schema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    userEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    userName: {
      type: String,
      trim: true,
      default: ''
    },
    userCompany: {
      type: String,
      trim: true,
      default: ''
    },
    categoriesVisited: [{ type: String }],
    topicsExplored: [{ type: String }],
    messages: [ChatMessageSchema],
    capturedLead: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      company: { type: String, default: '' },
      interest: { type: String, default: '' },
      capturedAt: { type: Date }
    },
    status: {
      type: String,
      enum: ['active', 'lead_captured', 'completed', 'abandoned'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

AssistantConversationSchema.index({ 'capturedLead.email': 1 });

export const AssistantConversation = mongoose.model<IAssistantConversation>(
  'AssistantConversation',
  AssistantConversationSchema
);
