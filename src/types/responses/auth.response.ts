import { User } from '../entities/user.types.js'

export interface AuthTokens {
  accessToken: string
  expiresIn: number // seconds until token expiry
}
export interface AuthResponse {
  success: boolean
  user: User
  tokens: AuthTokens
}
