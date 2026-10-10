import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service.js';

export interface LivenessResponse {
  status: 'ok';
  service: string;
  uptime: number;
  timestamp: string;
  memory: {
    heapUsedMb: number;
    rssMb: number;
  };
}

export interface ReadinessResponse {
  status: 'ok' | 'error';
  service: string;
  timestamp: string;
  checks: {
    database: {
      status: 'up' | 'down';
      latencyMs: number;
    };
  };
}

export interface AggregateHealthResponse {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  version: string;
  environment: string;
  uptime: number;
  timestamp: string;
  checks: {
    process: 'ok';
    database: {
      status: 'up' | 'down';
      latencyMs: number;
    };
  };
}

@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  getLiveness(): LivenessResponse {
    const memory = process.memoryUsage();
    return {
      status: 'ok',
      service: 'aic-adt-api',
      uptime: Math.round((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      memory: {
        heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
        rssMb: Math.round(memory.rss / 1024 / 1024),
      },
    };
  }

  async getReadiness(): Promise<ReadinessResponse> {
    const dbPing = await this.databaseService.ping();
    const isReady = dbPing.status === 'up';

    const response: ReadinessResponse = {
      status: isReady ? 'ok' : 'error',
      service: 'aic-adt-api',
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: dbPing.status,
          latencyMs: dbPing.latencyMs,
        },
      },
    };

    if (!isReady) {
      throw new ServiceUnavailableException(response);
    }

    return response;
  }

  async check(): Promise<AggregateHealthResponse> {
    const dbPing = await this.databaseService.ping();
    const isDbUp = dbPing.status === 'up';

    return {
      status: isDbUp ? 'ok' : 'degraded',
      service: 'aic-adt-api',
      version: '1.0.0',
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      uptime: Math.round((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      checks: {
        process: 'ok',
        database: {
          status: dbPing.status,
          latencyMs: dbPing.latencyMs,
        },
      },
    };
  }
}
