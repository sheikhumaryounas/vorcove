import { Router } from 'express';
import { subscribeNewsletter, getSubscribers } from '../controllers/newsletterController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public subscription endpoint
router.post('/subscribe', subscribeNewsletter);

// Protected admin retrieval endpoint
router.get('/', requireAuth, getSubscribers);

export default router;
