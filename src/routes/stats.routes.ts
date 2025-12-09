import { Router } from 'express'
import { StatsController } from '../controllers/stats.controller.js'
import { auth } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validation.middleware.js'
import { listTaskQuerySchema } from '../validators/task.validator.js'

const router = Router()

router.get('/platform-summary', auth(), validate(listTaskQuerySchema), StatsController.platformSummary)

export default router
