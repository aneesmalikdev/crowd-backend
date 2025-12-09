import { logger } from '../config/logger.js'
import { StatsService } from '../services/stats.service.js'
import { Request, Response, NextFunction } from 'express'

export const StatsController = {
  platformSummary: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await StatsService.platformSummary()
      res.json({ success: true, stats })
    } catch (err) {
      logger.error('Error in StatsController.platformSummary:', err)
      next(err)
    }
  },
}
