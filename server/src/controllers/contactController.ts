import { Request, Response } from 'express';
import { ContactInquiry } from '../models/ContactInquiry';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, company, brief, selectedServices, selectedBudget, selectedTimeline } = req.body;

    if (!name || !email || !brief) {
      return res.status(400).json({
        success: false,
        error: 'Please provide required fields: name, email, and project brief.'
      });
    }

    const inquiryData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      brief: brief.trim(),
      selectedServices: Array.isArray(selectedServices) ? selectedServices : [],
      selectedBudget: selectedBudget || '$25k — $50k (Phase 1 Build)',
      selectedTimeline: selectedTimeline || 'ASAP (within 2 weeks)',
      status: 'new',
      priority: 'medium',
      internalNotes: '',
      ipAddress: req.ip || req.socket.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let savedRecord;

    if (isMongoReady()) {
      savedRecord = await ContactInquiry.create(inquiryData);
    } else {
      const mockId = 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      savedRecord = { _id: mockId, id: mockId, ...inquiryData };
      memoryStore.inquiries.unshift(savedRecord);
    }

    return res.status(201).json({
      success: true,
      message: 'Consultation request received successfully. Our engineering partner will respond within 24 hours.',
      data: savedRecord
    });
  } catch (error: any) {
    console.error('Error creating contact inquiry:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit inquiry'
    });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;

    if (isMongoReady()) {
      const query: any = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { brief: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);
      const total = await ContactInquiry.countDocuments(query);
      const inquiries = await ContactInquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      return res.json({
        success: true,
        data: inquiries,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit))
        }
      });
    } else {
      let filtered = [...memoryStore.inquiries];
      if (status && status !== 'all') {
        filtered = filtered.filter(i => i.status === status);
      }
      if (search) {
        const s = String(search).toLowerCase();
        filtered = filtered.filter(
          i =>
            i.name?.toLowerCase().includes(s) ||
            i.email?.toLowerCase().includes(s) ||
            i.company?.toLowerCase().includes(s) ||
            i.brief?.toLowerCase().includes(s)
        );
      }
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return res.json({
        success: true,
        data: filtered,
        pagination: {
          total: filtered.length,
          page: 1,
          pages: 1
        }
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch inquiries'
    });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, internalNotes, priority } = req.body;

    if (isMongoReady()) {
      const inquiry = await ContactInquiry.findById(id);
      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry not found' });
      }

      if (status) inquiry.status = status;
      if (internalNotes !== undefined) inquiry.internalNotes = internalNotes;
      if (priority) inquiry.priority = priority;
      inquiry.updatedAt = new Date();

      await inquiry.save();
      return res.json({ success: true, data: inquiry });
    } else {
      const idx = memoryStore.inquiries.findIndex(i => i._id === id || i.id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Inquiry not found in memory store' });
      }

      if (status) memoryStore.inquiries[idx].status = status;
      if (internalNotes !== undefined) memoryStore.inquiries[idx].internalNotes = internalNotes;
      if (priority) memoryStore.inquiries[idx].priority = priority;
      memoryStore.inquiries[idx].updatedAt = new Date();

      return res.json({ success: true, data: memoryStore.inquiries[idx] });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to update inquiry'
    });
  }
};

export const deleteInquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isMongoReady()) {
      const deleted = await ContactInquiry.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Inquiry not found' });
      }
      return res.json({ success: true, message: 'Inquiry deleted successfully' });
    } else {
      const idx = memoryStore.inquiries.findIndex(i => i._id === id || i.id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Inquiry not found' });
      }
      memoryStore.inquiries.splice(idx, 1);
      return res.json({ success: true, message: 'Inquiry deleted from memory store' });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete inquiry'
    });
  }
};
