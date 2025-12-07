import { BaseTask } from '../models/baseTask.model.js';

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
    ]);
  },
};
