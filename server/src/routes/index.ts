import { Router } from 'express';
import contactRoutes from './contactRoutes';
import roiRoutes from './roiRoutes';
import assistantRoutes from './assistantRoutes';
import demosRoutes from './demosRoutes';
import caseStudiesRoutes from './caseStudiesRoutes';
import testimonialsRoutes from './testimonialsRoutes';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import healthRoutes from './healthRoutes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);
router.use('/roi', roiRoutes);
router.use('/assistant', assistantRoutes);
router.use('/demos', demosRoutes);
router.use('/case-studies', caseStudiesRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
