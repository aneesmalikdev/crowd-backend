import { z } from 'zod'

// ---------- Enums ----------
export const PlatformEnum = z.enum(['reddit', 'youtube', 'trustpilot'])
export const StatusEnum = z.enum(['draft', 'assigned', 'submitted', 'published', 'cancelled'])

const baseTaskBody = z.object({
  content: z.string().min(5, 'content must be at least 5 characters'),

  platform: PlatformEnum,
  price: z.number().positive('price must be a positive number').optional(),
  assignedTo: z.string().min(1).optional(),
})

// Extend the base, ensuring each variant has a LITERAL value for 'platform'
const RedditTaskSchema = baseTaskBody.extend({
  platform: z.literal('reddit'), // Must be this exact string
  threadUrl: z.url('threadUrl must be a valid URL'),
})

const YoutubeTaskSchema = baseTaskBody.extend({
  platform: z.literal('youtube'), // Must be this exact string
  videoUrl: z.url('videoUrl must be a valid URL'),
})

const TrustpilotTaskSchema = baseTaskBody.extend({
  platform: z.literal('trustpilot'), // Must be this exact string
  businessUrl: z.url('businessUrl must be a valid URL'),
  reviewTitle: z.string().min(3, 'reviewTitle must be at least 3 characters'),
})

// Use the discriminated union builder:
export const createTaskSchema = z.object({
  body: z.discriminatedUnion('platform', [RedditTaskSchema, YoutubeTaskSchema, TrustpilotTaskSchema]),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
})
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
})

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
})
