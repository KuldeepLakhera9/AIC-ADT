import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service.js';
import type { HealthCheckResponse } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): HealthCheckResponse {
    return this.healthService.check();
  }
}
