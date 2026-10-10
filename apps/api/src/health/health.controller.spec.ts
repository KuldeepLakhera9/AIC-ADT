import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { describe, it, expect, beforeEach } from 'vitest';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

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
      providers: [HealthService],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  describe('check', () => {
    it('should return a healthy status payload with service identification', () => {
      const response = healthController.check();
      expect(response).toBeDefined();
      expect(response.status).toBe('ok');
      expect(response.service).toBe('aic-adt-api');
      expect(response.version).toBe('1.0.0');
      expect(typeof response.timestamp).toBe('string');
      expect(typeof response.uptime).toBe('number');
      expect(typeof response.environment).toBe('string');
    });
  });
});
