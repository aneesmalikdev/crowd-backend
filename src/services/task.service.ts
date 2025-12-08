import { TaskRepository } from '../repositories/task.repository.js'
import { CreateTaskDTO, ListTaskQueryDTO, UpdateTaskDTO } from '../types/dtos/task.dto.js'

export const TaskService = {
  // ---------------------------------------------
  // CREATE — always use correct platform model
  // ---------------------------------------------
  create: async (data: CreateTaskDTO) => {
    return await TaskRepository.create(data)
  },

  // ---------------------------------------------
  // LIST — filters + pagination
  // ---------------------------------------------
  list: async (query: ListTaskQueryDTO) => {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10

    const filters: any = {}

    if (query.platform) filters.platform = query.platform
    if (query.status) filters.status = query.status

    return await TaskRepository.list(filters, page, limit)
  },

  // ---------------------------------------------
  // GET BY ID — automatically returns correct model instance
  // ---------------------------------------------
  getById: async (id: string) => {
    return await TaskRepository.findById(id)
  },

  // ---------------------------------------------
  // UPDATE — automatically uses correct platform model (if platform provided)
  // ---------------------------------------------
  update: async (id: string, data: UpdateTaskDTO) => {
    return await TaskRepository.update(id, data)
  },
}
