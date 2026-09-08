import { Router } from 'express';
import { calculateRoi, saveRoiAudit, getRoiAudits } from '../controllers/roiController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public calculation & saving
router.post('/calculate', calculateRoi);
router.post('/save', saveRoiAudit);

// Admin retrieval
router.get('/', requireAuth, getRoiAudits);

export default router;
