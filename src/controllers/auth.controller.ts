import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  register: async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);
    res.json(result);
  },

  login: async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    res.json(result);
  },
};
