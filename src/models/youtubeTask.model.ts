import { Schema } from 'mongoose';
import { BaseTask } from './baseTask.model.js';

const youtubeSchema = new Schema({
  videoUrl: { type: String, required: true },
});

export const YouTubeTask = BaseTask.discriminator('youtube', youtubeSchema);
