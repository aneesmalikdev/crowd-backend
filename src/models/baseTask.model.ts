import { Schema, model } from 'mongoose';

export const TaskStatus = ['draft', 'assigned', 'submitted', 'published', 'cancelled'] as const;
export const TaskPlatform = ['reddit', 'youtube', 'trustpilot'] as const;

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
);
baseTaskSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate(); // 'this' is the Query object

  // Mongoose generally wraps updates in $set during findOneAndUpdate
  const statusCheck = update.$set?.status || update.status;

  if (statusCheck === 'published') {
    // Ensure the $set object exists before adding publishedAt
    if (!update.$set) {
      this.$set({ publishedAt: new Date() }); // Use $set if not present
    } else {
      update.$set.publishedAt = new Date();
    }
  }
  next();
});
export const BaseTask = model('Task', baseTaskSchema);
