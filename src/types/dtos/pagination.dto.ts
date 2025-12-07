import { TaskPlatform } from "../entities/task.types.js";

export interface PlatformStats {
    platform: TaskPlatform;
  totalTasks: number;
  publishedTasks: number;
  totalPrice: number;
}
