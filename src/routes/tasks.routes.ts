import { Router } from 'express';
import { TaskController } from '../controllers/task.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { createTaskSchema, updateTaskSchema, listTaskQuerySchema } from '../validators/task.validator.js';

const router = Router();

router.post('/', validate(createTaskSchema), TaskController.create);
router.get('/', validate(listTaskQuerySchema), TaskController.list);
router.get('/:id', TaskController.getById);
router.put('/:id', validate(updateTaskSchema), TaskController.update);

export default router;
