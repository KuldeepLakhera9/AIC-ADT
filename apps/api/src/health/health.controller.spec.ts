import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { describe, it, expect, beforeEach } from 'vitest';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';
import { DatabaseService } from '../database/database.service.js';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
        }),
      ],
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: DatabaseService,
          useValue: {
            ping: async () => ({
              status: 'up',
              latencyMs: 1,
              message: 'Database connection active',
            }),
          },
        },
      ],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  describe('check (aggregate health)', () => {
    it('should return an aggregate health status payload', async () => {
      const response = await healthController.check();
      expect(response).toBeDefined();
      expect(response.status).toBe('ok');
      expect(response.service).toBe('aic-adt-api');
      expect(response.version).toBe('1.0.0');
      expect(typeof response.timestamp).toBe('string');
      expect(typeof response.uptime).toBe('number');
      expect(typeof response.environment).toBe('string');
      expect(response.checks.process).toBe('ok');
      expect(response.checks.database.status).toBe('up');
    });
  });

  describe('liveness probe', () => {
    it('should return liveness metrics including process uptime and memory', () => {
      const response = healthController.getLiveness();
      expect(response).toBeDefined();
      expect(response.status).toBe('ok');
      expect(response.service).toBe('aic-adt-api');
      expect(typeof response.uptime).toBe('number');
      expect(typeof response.timestamp).toBe('string');
      expect(response.memory.heapUsedMb).toBeGreaterThan(0);
      expect(response.memory.rssMb).toBeGreaterThan(0);
    });
  });

  describe('readiness probe', () => {
    it('should return readiness status with dependency checks', async () => {
      const response = await healthController.getReadiness();
      expect(response).toBeDefined();
      expect(response.status).toBe('ok');
      expect(response.service).toBe('aic-adt-api');
      expect(response.checks.database.status).toBe('up');
      expect(typeof response.checks.database.latencyMs).toBe('number');
    });
  });
});
