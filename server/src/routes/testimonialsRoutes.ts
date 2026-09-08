import { Router } from 'express';
import { getTestimonials, createTestimonial } from '../controllers/testimonialsController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public
router.get('/', getTestimonials);

// Admin
router.post('/', requireAuth, createTestimonial);

export default router;
