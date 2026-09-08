import { Router } from 'express';
import {
  getCaseStudies,
  getCaseStudyBySlug,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy
} from '../controllers/caseStudiesController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public
router.get('/', getCaseStudies);
router.get('/:slug', getCaseStudyBySlug);

// Admin
router.post('/', requireAuth, createCaseStudy);
router.put('/:id', requireAuth, updateCaseStudy);
router.delete('/:id', requireAuth, deleteCaseStudy);

export default router;
