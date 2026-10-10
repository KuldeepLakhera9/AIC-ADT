import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  HealthService,
  type AggregateHealthResponse,
  type LivenessResponse,
  type ReadinessResponse,
} from './health.service.js';
import { Public } from '../common/decorators/public.decorator.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Public()
  async check(): Promise<AggregateHealthResponse> {
    return this.healthService.check();
  }

  @Get('liveness')
  @Public()
  @HttpCode(HttpStatus.OK)
  getLiveness(): LivenessResponse {
    return this.healthService.getLiveness();
  }

  @Get('readiness')
  @Public()
  async getReadiness(): Promise<ReadinessResponse> {
    return this.healthService.getReadiness();
  }
}
