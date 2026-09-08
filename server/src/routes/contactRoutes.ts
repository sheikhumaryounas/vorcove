import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/contactController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public endpoint for submitting a contact / scoping inquiry
router.post('/', createInquiry);

// Admin endpoints (protected by JWT auth)
router.get('/', requireAuth, getInquiries);
router.patch('/:id', requireAuth, updateInquiryStatus);
router.delete('/:id', requireAuth, deleteInquiry);

export default router;
