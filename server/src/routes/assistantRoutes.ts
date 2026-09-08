import { Router } from 'express';
import {
  processChatMessage,
  captureAssistantLead,
  getAssistantConversations
} from '../controllers/assistantController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public chat interaction & lead capture
router.post('/chat', processChatMessage);
router.post('/lead', captureAssistantLead);

// Admin retrieval
router.get('/conversations', requireAuth, getAssistantConversations);

export default router;
