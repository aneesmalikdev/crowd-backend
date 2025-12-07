import { ObjectId } from 'mongoose';

export type UserRole = 'user' | 'admin';
export interface User {
  _id: string | ObjectId;
  name?: string;
  email: string;
  role: UserRole;

  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface LoginDTO {
  email: string;
  password: string;
}
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ForgotPasswordDTO {
  email: string;
}
export interface ResetPasswordDTO {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
