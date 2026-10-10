import { describe, it, expect } from 'vitest';
import {
  Environment,
  LogLevel,
  validateEnvironment,
} from './env.validation.js';

describe('Configuration & Environment Validation', () => {
  it('should validate and parse a valid configuration', () => {
    const rawConfig = {
      NODE_ENV: 'development',
      PORT: '4000',
      API_PREFIX: 'api/v1',
      CORS_ORIGIN: 'http://localhost:3000',
      LOG_LEVEL: 'log',
      BODY_LIMIT: '1mb',
      THROTTLE_TTL: '60',
      THROTTLE_LIMIT: '100',
    };

    const validated = validateEnvironment(rawConfig);
    expect(validated.NODE_ENV).toBe(Environment.Development);
    expect(validated.PORT).toBe(4000);
    expect(validated.API_PREFIX).toBe('api/v1');
    expect(validated.LOG_LEVEL).toBe(LogLevel.Log);
    expect(validated.THROTTLE_LIMIT).toBe(100);
  });

  it('should reject invalid PORT (< 1024 or > 65535)', () => {
    expect(() =>
      validateEnvironment({
        PORT: '80', // Below 1024
      }),
    ).toThrow(/PORT/);

    expect(() =>
      validateEnvironment({
        PORT: '70000', // Above 65535
      }),
    ).toThrow(/PORT/);
  });

  it('should reject invalid NODE_ENV', () => {
    expect(() =>
      validateEnvironment({
        NODE_ENV: 'invalid_env',
      }),
    ).toThrow(/NODE_ENV/);
  });

  it('should reject production environment if DATABASE_URL is missing', () => {
    expect(() =>
      validateEnvironment({
        NODE_ENV: 'production',
        // DATABASE_URL omitted
      }),
    ).toThrow(/DATABASE_URL must be provided when running in production/);
  });

  it('should allow production environment when DATABASE_URL is present', () => {
    const validated = validateEnvironment({
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://aic:sec@db:5432/aic_prod',
    });
    expect(validated.NODE_ENV).toBe(Environment.Production);
    expect(validated.DATABASE_URL).toBe(
      'postgresql://aic:sec@db:5432/aic_prod',
    );
  });
});
