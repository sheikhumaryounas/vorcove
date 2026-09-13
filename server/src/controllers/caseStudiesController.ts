import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { CaseStudy } from '../models/CaseStudy';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';

export const getCaseStudies = async (req: Request, res: Response) => {
  try {
    const { category, published = 'true' } = req.query;

    if (isMongoReady()) {
      const query: any = {};
      if (published === 'true') query.published = true;
      if (category && category !== 'all') query.category = category;

      const studies = await CaseStudy.find(query).sort({ order: 1, createdAt: -1 });
      return res.json({ success: true, data: studies });
    } else {
      let results = [...memoryStore.caseStudies];
      if (published === 'true') {
        results = results.filter(s => s.published !== false);
      }
      if (category && category !== 'all') {
        results = results.filter(s => s.category === category);
      }
      return res.json({ success: true, data: results });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch case studies'
    });
  }
};

export const getCaseStudyBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (isMongoReady()) {
      const study = await CaseStudy.findOne({ slug: String(slug) });
      if (!study) {
        return res.status(404).json({ success: false, error: 'Case study not found' });
      }
      return res.json({ success: true, data: study });
    } else {
      const study = memoryStore.caseStudies.find(s => s.slug === slug || s.id === slug);
      if (!study) {
        return res.status(404).json({ success: false, error: 'Case study not found' });
      }
      return res.json({ success: true, data: study });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch case study'
    });
  }
};

export const createCaseStudy = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.slug || !data.title || !data.category) {
      return res.status(400).json({
        success: false,
        error: 'Slug, title, and category are required.'
      });
    }

    if (isMongoReady()) {
      const newStudy = await CaseStudy.create(data);
      return res.status(201).json({ success: true, data: newStudy });
    } else {
      const mockId = 'cs_' + Date.now();
      const study = { _id: mockId, id: mockId, ...data, createdAt: new Date(), updatedAt: new Date() };
      memoryStore.caseStudies.push(study);
      return res.status(201).json({ success: true, data: study });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create case study'
    });
  }
};

export const updateCaseStudy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paramId = String(id);
    const updateData = req.body;

    if (isMongoReady()) {
      const query = mongoose.Types.ObjectId.isValid(paramId) ? { _id: paramId } : { slug: paramId };
      const updated = await CaseStudy.findOneAndUpdate(query, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Case study not found' });
      }
      return res.json({ success: true, data: updated });
    } else {
      const idx = memoryStore.caseStudies.findIndex(s => s._id === paramId || s.id === paramId || s.slug === paramId);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Case study not found' });
      }
      memoryStore.caseStudies[idx] = { ...memoryStore.caseStudies[idx], ...updateData, updatedAt: new Date() };
      return res.json({ success: true, data: memoryStore.caseStudies[idx] });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to update case study'
    });
  }
};

export const deleteCaseStudy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paramId = String(id);

    if (isMongoReady()) {
      const query = mongoose.Types.ObjectId.isValid(paramId) ? { _id: paramId } : { slug: paramId };
      const deleted = await CaseStudy.findOneAndDelete(query);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Case study not found' });
      }
      return res.json({ success: true, message: 'Case study deleted' });
    } else {
      const idx = memoryStore.caseStudies.findIndex(s => s._id === paramId || s.id === paramId || s.slug === paramId);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Case study not found' });
      }
      memoryStore.caseStudies.splice(idx, 1);
      return res.json({ success: true, message: 'Case study deleted from memory store' });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete case study'
    });
  }
};
