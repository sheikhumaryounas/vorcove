import { Router } from 'express';
import {
  runCopilotTriage,
  simulatePricing,
  analyzeChurn,
  getDemoTelemetry
} from '../controllers/demosController';

const router = Router();

// Public interactive demo endpoints
router.post('/copilot/run', runCopilotTriage);
router.post('/pricing/simulate', simulatePricing);
router.post('/churn/analyze', analyzeChurn);
router.get('/telemetry', getDemoTelemetry);

export default router;
