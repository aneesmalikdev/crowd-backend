import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config/index.js'

export const auth =
  (roles: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]

      if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
      }

      const decoded = jwt.verify(token, config.jwtSecret)

      // attach user to request
      ;(req as any).user = decoded

      // role-based check
      if (roles.length && !roles.includes((decoded as any).role)) {
        return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' })
      }

      next()
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' })
    }
  }
