import { RedditTask } from './redditTask.model.js'
import { YouTubeTask } from './youtubeTask.model.js'
import { TrustpilotTask } from './trustpilotTask.model.js'
import { BaseTask } from './baseTask.model.js'
import { TaskPlatform } from '../types/entities/task.types.js'

export const getTaskModel = (platform: TaskPlatform) => {
  switch (platform) {
    case 'reddit':
      return RedditTask

    case 'youtube':
      return YouTubeTask

    case 'trustpilot':
      return TrustpilotTask

    default:
      return BaseTask
  }
}
