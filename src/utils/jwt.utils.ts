import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/entities/user.types.js';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const JWT = {
  signAccessToken: (payload: JwtPayload) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
  },

  verifyAccessToken: (token: string) => {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
  },
};
