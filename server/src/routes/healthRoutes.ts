import { Router, Request, Response } from 'express';
import { getDbStatus } from '../config/db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const dbStatus = getDbStatus();

  return res.json({
    status: 'online',
    service: 'Vorcove API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: dbStatus
  });
});

export default router;
