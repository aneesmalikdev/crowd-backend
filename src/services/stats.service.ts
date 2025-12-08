import { BaseTask } from '../models/baseTask.model.js'

export const StatsService = {
  platformSummary: async () => {
    return await BaseTask.aggregate([
      {
        $group: {
          _id: '$platform',
          totalTasks: { $sum: 1 },

          publishedTasks: {
            $sum: {
              $cond: [{ $eq: ['$status', 'published'] }, 1, 0],
            },
          },

          totalPrice: {
            $sum: {
              $cond: [{ $eq: ['$status', 'published'] }, '$price', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          platform: '$_id',
          totalTasks: 1,
          publishedTasks: 1,
          totalPrice: 1,
        },
      },
    ])
  },
}
