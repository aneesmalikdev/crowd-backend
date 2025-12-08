export type TaskPlatform = 'reddit' | 'youtube' | 'trustpilot'

export type TaskStatus = 'draft' | 'assigned' | 'submitted' | 'published' | 'cancelled'

export interface BaseTask {
  _id: string
  content: string
  platform: TaskPlatform
  status: TaskStatus
  assignedTo?: string | null
  price: number
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

export interface RedditTask extends BaseTask {
  platform: 'reddit'
  threadUrl: string
}

export interface YouTubeTask extends BaseTask {
  platform: 'youtube'
  videoUrl: string
}

export interface TrustpilotTask extends BaseTask {
  platform: 'trustpilot'
  businessUrl: string
  reviewTitle: string
}

export type Task = RedditTask | YouTubeTask | TrustpilotTask

export interface CreateTaskDTO {
  content: string
  platform: TaskPlatform
  status: TaskStatus
  price: number

  // Optional platform-specific fields
  threadUrl?: string
  videoUrl?: string
  businessUrl?: string
  reviewTitle?: string
}
