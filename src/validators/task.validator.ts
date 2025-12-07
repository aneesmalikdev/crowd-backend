import { z } from 'zod';

// ---------- Enums ----------
export const PlatformEnum = z.enum(['reddit', 'youtube', 'trustpilot']);
export const StatusEnum = z.enum(['draft', 'assigned', 'submitted', 'published', 'cancelled']);

// ---------- Platform Specific Schemas ----------
const redditFields = z.object({
  threadUrl: z.string().url('threadUrl must be a valid URL'),
});

const youtubeFields = z.object({
  videoUrl: z.string().url('videoUrl must be a valid URL'),
});

const trustpilotFields = z.object({
  businessUrl: z.string().url('businessUrl must be a valid URL'),
  reviewTitle: z.string().min(3, 'reviewTitle must be at least 3 characters'),
});

// ---------- Base Task Body ----------
const baseTaskBody = z.object({
  content: z.string().min(5, 'content must be at least 5 characters'),

  platform: PlatformEnum,

  price: z.number().positive('price must be a positive number').optional(),

  assignedTo: z.string().min(1).optional(),
});

// ---------- Create Task Schema ----------
// Conditional validation based on "platform"
export const createTaskSchema = z.object({
  body: baseTaskBody.superRefine((data, ctx) => {
    if (data.platform === 'reddit') {
      const parsed = redditFields.safeParse(data);
      if (!parsed.success) {
        parsed.error.issues.forEach((issue) => ctx.addIssue({ ...issue }));
      }
    }

    if (data.platform === 'youtube') {
      const parsed = youtubeFields.safeParse(data);
      if (!parsed.success) {
        parsed.error.issues.forEach((issue) => ctx.addIssue({ ...issue }));
      }
    }

    if (data.platform === 'trustpilot') {
      const parsed = trustpilotFields.safeParse(data);
      if (!parsed.success) {
        parsed.error.issues.forEach((issue) => ctx.addIssue({ ...issue }));
      }
    }
  }),

  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// ---------- Update Task Schema ----------
export const updateTaskSchema = z.object({
  body: z.object({
    status: StatusEnum.optional(),
    assignedTo: z.string().optional(),
    price: z.number().positive().optional(),

    // Optional platform-specific fields
    threadUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    businessUrl: z.string().url().optional(),
    reviewTitle: z.string().optional(),
  }),

  params: z.object({
    id: z.string().min(1, 'Task ID is required'),
  }),

  query: z.object({}).optional(),
});

// ---------- List / Query Schema ----------
export const listTaskQuerySchema = z.object({
  query: z.object({
    platform: PlatformEnum.optional(),
    status: StatusEnum.optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    limit: z.coerce.number().min(1).max(100).default(10).optional(),
  }),

  body: z.object({}).optional(),
  params: z.object({}).optional(),
});
