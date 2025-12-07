import mongoose from 'mongoose';
import { logger } from '../config/logger.js';
import { config } from '../config/index.js';

export const connectMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('✅ Connected to MongoDB');
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// graceful shutdown
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});
