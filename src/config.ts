import dotenv from "dotenv";

dotenv.config();

export default {
  server: {
    port: process.env.PORT || 4000,
  },
  db: {
    mongoURL: process.env.MONGO_URL as string,
  },
  secret: {
    jwt: process.env.JWT_SECRET_KEY,
  },
  logger: {
    level: process.env.LOGGER_LEVEL,
  },
  redis: {
    url: process.env.REDIS_URL as string,
    maxPoolSize: process.env.REDIS_MAX_POOL_SIZE as string,
  },
};
