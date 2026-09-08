import { Router } from 'express';
import { loginAdmin, getMe } from '../controllers/authController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', requireAuth, getMe);

export default router;
