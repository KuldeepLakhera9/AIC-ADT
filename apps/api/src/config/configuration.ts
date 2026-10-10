import { registerAs } from '@nestjs/config';
import { Environment, LogLevel } from './env.validation.js';

export interface AppConfig {
  nodeEnv: Environment;
  port: number;
  apiPrefix: string;
  corsOrigin: string;
  databaseUrl?: string;
  logLevel: LogLevel;
  bodyLimit: string;
  throttle: {
    ttl: number;
    limit: number;
  };
}

export const appConfig = registerAs('app', (): AppConfig => ({
  nodeEnv: (process.env.NODE_ENV as Environment) || Environment.Development,
  port: parseInt(process.env.PORT || '4000', 10),
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL,
  logLevel: (process.env.LOG_LEVEL as LogLevel) || LogLevel.Log,
  bodyLimit: process.env.BODY_LIMIT || '1mb',
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
  },
}));
