import { RedditTask } from './redditTask.model.js';
import { YouTubeTask } from './youtubeTask.model.js';
import { TrustpilotTask } from './trustpilotTask.model.js';
import { BaseTask } from './baseTask.model.js';

export const getTaskModel = (platform) => {
  switch (platform) {
    case 'reddit':
      return RedditTask;

    case 'youtube':
      return YouTubeTask;

    case 'trustpilot':
      return TrustpilotTask;

    default:
      return BaseTask;
  }
};
