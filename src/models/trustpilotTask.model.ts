import { Schema } from 'mongoose';
import { BaseTask } from './baseTask.model.js';

const trustpilotSchema = new Schema({
  businessUrl: { type: String, required: true },
  reviewTitle: { type: String, required: true },
});

export const TrustpilotTask = BaseTask.discriminator('trustpilot', trustpilotSchema);
