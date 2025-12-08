import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/entities/user.types.js'
import { config } from '../config/index.js'

export const JWT = {
  signAccessToken: (payload: JwtPayload) => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' })
  },

  verifyAccessToken: (token: string) => {
    return jwt.verify(token, config.jwtSecret) as JwtPayload
  },
}
