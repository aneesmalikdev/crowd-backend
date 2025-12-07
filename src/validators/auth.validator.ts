import { z } from 'zod';

// ------------------------------------
// Common Fields
// ------------------------------------
const emailField = z.string().email('Invalid email format');
const passwordField = z.string().min(6, 'Password must be at least 6 characters long');

// ------------------------------------
// Login Schema
// ------------------------------------
export const loginSchema = z.object({
  body: z.object({
    email: emailField,
    password: passwordField,
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// ------------------------------------
// Register Schema
// ------------------------------------
export const registerSchema = z.object({
  body: z
    .object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: emailField,
      password: passwordField,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// ------------------------------------
// Forgot Password Schema
// ------------------------------------
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: emailField,
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// ------------------------------------
// Reset Password Schema
// ------------------------------------
export const resetPasswordSchema = z.object({
  body: z
    .object({
      token: z.string().min(1, 'Reset token is required'),
      password: passwordField,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});
