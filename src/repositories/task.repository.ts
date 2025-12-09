import { BaseTask } from '../models/baseTask.model.js'
import { getTaskModel } from '../models/getTaskModel.js'
import { CreateTaskDTO, ListTaskQueryDTO, UpdateTaskDTO } from '../types/dtos/task.dto.js'

export const TaskRepository = {
  // ------------------------------
  // CREATE (platform-specific)
  // ------------------------------
  create: async (data: CreateTaskDTO) => {
    const Model = getTaskModel(data.platform)
    return await Model.create(data)
  },

  // ------------------------------
  // UPDATE (platform-specific)
  // ------------------------------
  update: async (id: string, data: UpdateTaskDTO) => {
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
  findById: async (id: string) => {
    return await BaseTask.findById(id)
  },

  // ------------------------------
  // LIST WITH FILTERS (base model)
  // ------------------------------
  list: async (filters: ListTaskQueryDTO, page: number, limit: number) => {
    const query = BaseTask.find(filters)
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await BaseTask.countDocuments(filters)
    const items = await query

    return { total, items, page, limit, totalPages: Math.ceil(total / limit) }
  },
}
