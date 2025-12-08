import { Router } from 'express'
import { TaskController } from '../controllers/task.controller.js'
import { validate } from '../middleware/validation.middleware.js'
import { createTaskSchema, updateTaskSchema, listTaskQuerySchema } from '../validators/task.validator.js'
import { auth } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/', auth(), validate(createTaskSchema), TaskController.create)
router.get('/', auth(), validate(listTaskQuerySchema), TaskController.list)
router.get('/:id', auth(), TaskController.getById)
router.put('/:id', auth(), validate(updateTaskSchema), TaskController.update)

export default router
