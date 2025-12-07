import { TaskPlatform, TaskStatus } from "../entities/task.types.js";

export interface CreateTaskDTO {
  content: string;
  platform: TaskPlatform;

  price?: number;
  assignedTo?: string | null;

  // platform-specific
  threadUrl?: string;
  videoUrl?: string;
  businessUrl?: string;
  reviewTitle?: string;
}

export interface UpdateTaskDTO {
  status?: TaskStatus;
  assignedTo?: string | null;
  price?: number;

  // optional platform-specific updates
  threadUrl?: string;
  videoUrl?: string;
  businessUrl?: string;
  reviewTitle?: string;
}

export interface ListTaskQueryDTO {
  platform?: TaskPlatform;
  status?: TaskStatus;
  page?: number;
  limit?: number;
}
