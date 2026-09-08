import { Router } from 'express';
import { getAdminStats } from '../controllers/adminController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Protected admin stats endpoint
router.get('/stats', requireAuth, getAdminStats);

export default router;
