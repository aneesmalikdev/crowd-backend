import { Schema } from 'mongoose';
import { BaseTask } from './baseTask.model.js';

const redditSchema = new Schema({
  threadUrl: { type: String, required: true },
});

export const RedditTask = BaseTask.discriminator('reddit', redditSchema);
