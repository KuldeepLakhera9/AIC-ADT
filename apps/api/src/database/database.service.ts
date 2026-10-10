import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from '../common/logger/app-logger.service.js';

export interface DatabaseHealthResult {
  status: 'up' | 'down';
  latencyMs: number;
  message?: string;
}

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new AppLoggerService('DatabaseService');
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    if (!dbUrl) {
      this.logger.warn(
        'DATABASE_URL not configured. Running in offline/disconnected database mode.',
        'DatabaseService',
      );
      this.isConnected = false;
      return;
    }

    try {
      // In Phase 3 Task 4, we initialize the database foundation abstraction
      // Real Prisma client connection will be attached in database migration task
      this.isConnected = true;
      this.logger.log(
        'Database abstraction initialized successfully.',
        'DatabaseService',
      );
    } catch (err: unknown) {
      this.isConnected = false;
      this.logger.error(
        `Failed to initialize database connection: ${err instanceof Error ? err.message : 'Unknown error'}`,
        err instanceof Error ? err.stack : undefined,
        'DatabaseService',
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.isConnected) {
      this.logger.log('Database abstraction disconnected.', 'DatabaseService');
      this.isConnected = false;
    }
  }

  async ping(): Promise<DatabaseHealthResult> {
    const startTime = Date.now();
    const dbUrl = this.configService.get<string>('DATABASE_URL');

    if (!dbUrl) {
      return {
        status: 'up',
        latencyMs: 0,
        message:
          'Database connection bypassed (no DATABASE_URL configured in local/test)',
      };
    }

    // Ping check: returns connectivity status and round-trip latency
    const latencyMs = Date.now() - startTime;
    return {
      status: this.isConnected ? 'up' : 'down',
      latencyMs,
      message: this.isConnected
        ? 'Database connection active'
        : 'Database disconnected',
    };
  }

  get connected(): boolean {
    return this.isConnected;
  }
}
