import { TaskRepository } from '../repositories/task.repository.js';

export const TaskService = {
  // ---------------------------------------------
  // CREATE — always use correct platform model
  // ---------------------------------------------
  create: async (data) => {
    return await TaskRepository.create(data);
  },

  // ---------------------------------------------
  // LIST — filters + pagination
  // ---------------------------------------------
  list: async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filters: any = {};

    if (query.platform) filters.platform = query.platform;
    if (query.status) filters.status = query.status;

    return await TaskRepository.list(filters, page, limit);
  },

  // ---------------------------------------------
  // GET BY ID — automatically returns correct model instance
  // ---------------------------------------------
  getById: async (id) => {
    return await TaskRepository.findById(id);
  },

  // ---------------------------------------------
  // UPDATE — automatically uses correct platform model (if platform provided)
  // ---------------------------------------------
  update: async (id, data) => {
    return await TaskRepository.update(id, data);
  },
};
