import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model.js';
import { JWT } from '../utils/jwt.utils.js';
import { AuthResponse } from '../types/responses/auth.response.js';
import { LoginDTO, RegisterDTO } from '../types/entities/user.types.js';

export const AuthService = {
  register: async (data: RegisterDTO): Promise<AuthResponse> => {
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw new Error('Email already exists');

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });

    const accessToken = JWT.signAccessToken({
      email: user.email,
      role: user.role,
      userId: user._id.toString(),
    });

    return {
      success: true,
      user: { ...user.toObject(), _id: user._id.toString() },
      tokens: {
        accessToken,
        expiresIn: 15 * 60,
      },
    };
  },

  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = JWT.signAccessToken({
      email: user.email,
      role: user.role,
      userId: user._id.toString(),
    });

    return {
      success: true,
      user: { ...user.toObject(), _id: user._id.toString() },
      tokens: {
        accessToken,
        expiresIn: 15 * 60,
      },
    };
  },
};
