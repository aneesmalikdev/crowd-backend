import { Router } from 'express'
import { StatsController } from '../controllers/stats.controller.js'
import { auth } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/platform-summary', auth(), StatsController.platformSummary)

export default router
