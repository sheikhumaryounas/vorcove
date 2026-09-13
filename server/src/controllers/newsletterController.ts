import { Request, Response } from 'express';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email, source = 'website_footer' } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (isMongoReady()) {
      const existing = await NewsletterSubscriber.findOne({ email: cleanEmail });
      if (existing) {
        if (!existing.active) {
          existing.active = true;
          existing.updatedAt = new Date();
          await existing.save();
        }
        return res.json({
          success: true,
          message: 'You are already subscribed to Vorcove Engineering Insights.',
          data: existing
        });
      }

      const subscriber = await NewsletterSubscriber.create({
        email: cleanEmail,
        source,
        active: true
      });

      return res.status(201).json({
        success: true,
        message: 'Successfully subscribed to Vorcove Technical Briefings.',
        data: subscriber
      });
    } else {
      const existing = memoryStore.subscribers.find(s => s.email === cleanEmail);
      if (existing) {
        existing.active = true;
        existing.updatedAt = new Date();
        return res.json({
          success: true,
          message: 'You are already subscribed to Vorcove Engineering Insights.',
          data: existing
        });
      }

      const mockId = 'sub_' + Date.now();
      const subscriber = {
        _id: mockId,
        id: mockId,
        email: cleanEmail,
        source,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryStore.subscribers.unshift(subscriber);

      return res.status(201).json({
        success: true,
        message: 'Successfully subscribed to Vorcove Technical Briefings.',
        data: subscriber
      });
    }
  } catch (error: any) {
    console.error('Newsletter subscribe error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to subscribe to newsletter'
    });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    if (isMongoReady()) {
      const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: subscribers });
    } else {
      return res.json({ success: true, data: memoryStore.subscribers });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch subscribers'
    });
  }
};
