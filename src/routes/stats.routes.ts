import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller.js';

const router = Router();

router.get('/platform-summary', StatsController.platformSummary);

export default router;
