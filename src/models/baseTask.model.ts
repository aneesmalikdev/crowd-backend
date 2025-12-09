import { Schema, UpdateQuery, model } from 'mongoose'
import { Task } from '../types/entities/task.types.js'

export const TaskStatus = ['draft', 'assigned', 'submitted', 'published', 'cancelled'] as const
export const TaskPlatform = ['reddit', 'youtube', 'trustpilot'] as const

const baseTaskSchema = new Schema(
  {
    content: { type: String, required: true },
    platform: {
      type: String,
      enum: TaskPlatform,
      required: true,
    },
    status: {
      type: String,
      enum: TaskStatus,
      default: 'draft',
    },
    assignedTo: { type: String, default: null },
    price: { type: Number, default: 2.5, min: 0 },
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    discriminatorKey: 'platform',
    collection: 'tasks',
  }
)
baseTaskSchema.pre('findOneAndUpdate', function () {
  const update: UpdateQuery<Task> | null = this.getUpdate()

  if (!update) return

  const statusCheck = update.status
  if (statusCheck === 'published') {
    if (!update.$set) {
      update.$set = { publishedAt: new Date() }
    } else {
      update.$set.publishedAt = new Date()
    }
  }
})
export const BaseTask = model('Task', baseTaskSchema)
