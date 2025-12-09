import { z } from 'zod'

// ------------------------------------
// Login Schema
// ------------------------------------
export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
})

// ------------------------------------
// Register Schema
// ------------------------------------
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
})
