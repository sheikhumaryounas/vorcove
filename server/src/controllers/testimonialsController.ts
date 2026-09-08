import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    if (isMongoReady()) {
      const testimonials = await Testimonial.find({ published: true }).sort({ order: 1 });
      return res.json({ success: true, data: testimonials });
    } else {
      const active = memoryStore.testimonials.filter(t => t.published !== false);
      return res.json({ success: true, data: active });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch testimonials'
    });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.name || !data.quote) {
      return res.status(400).json({
        success: false,
        error: 'Name and quote are required.'
      });
    }

    if (isMongoReady()) {
      const testimonial = await Testimonial.create(data);
      return res.status(201).json({ success: true, data: testimonial });
    } else {
      const mockId = 'test_' + Date.now();
      const testimonial = { _id: mockId, id: mockId, ...data, createdAt: new Date() };
      memoryStore.testimonials.push(testimonial);
      return res.status(201).json({ success: true, data: testimonial });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create testimonial'
    });
  }
};
