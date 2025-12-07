import { Router } from 'express';
import taskRoutes from './tasks.routes.js';
import statsRoutes from './stats.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/stats', statsRoutes);
router.use('/auth', authRoutes);

export default router;
