import { TaskService } from '../services/task.service.js';
import { Request, Response, NextFunction } from 'express';

export const TaskController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await TaskService.create(req.body);
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await TaskService.list(req.query);
      res.json({ success: true, ...data });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await TaskService.getById(req.params.id);
      res.json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await TaskService.update(req.params.id, req.body);
      res.json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  },
};
