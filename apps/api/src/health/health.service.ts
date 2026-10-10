import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  service: string;
  version: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  constructor(private readonly configService: ConfigService) {}

  check(): HealthCheckResponse {
    return {
      status: 'ok',
      service: 'aic-adt-api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: Math.round((Date.now() - this.startTime) / 1000),
      environment: this.configService.get<string>('NODE_ENV', 'development'),
    };
  }
}
