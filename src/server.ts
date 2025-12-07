import app from './app.js';
import { connectMongo } from './db/mongoose.js';
import { config } from './config/index.js';
import { logger } from './config/logger.js';

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(config.port, () => {
      logger.info(`🚀 Server running at http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
