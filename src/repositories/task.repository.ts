import { BaseTask } from '../models/baseTask.model.js'
import { getTaskModel } from '../models/getTaskModel.js'

export const TaskRepository = {
  // ------------------------------
  // CREATE (platform-specific)
  // ------------------------------
  create: async (data) => {
    const Model = getTaskModel(data.platform)
    return await Model.create(data)
  },

  // ------------------------------
  // UPDATE (platform-specific)
  // ------------------------------
  update: async (id, data) => {
    let Model = BaseTask

    // If platform is known, use the correct discriminator model
    if (data.platform) {
      Model = getTaskModel(data.platform)
    }

    return await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  },

  // ------------------------------
  // FIND BY ID (works on all)
  // ------------------------------
  findById: async (id) => {
    return await BaseTask.findById(id)
  },

  // ------------------------------
  // LIST WITH FILTERS (base model)
  // ------------------------------
  list: async (filters, page, limit) => {
    const query = BaseTask.find(filters)
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await BaseTask.countDocuments(filters)
    const items = await query

    return { total, items, page, limit, totalPages: Math.ceil(total / limit) }
  },
}
