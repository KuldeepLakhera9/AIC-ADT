import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { AppLoggerService } from '../common/logger/app-logger.service.js';
import { PrismaService } from './prisma.service.js';

export interface DatabaseHealthResult {
  status: 'up' | 'down';
  latencyMs: number;
  message?: string;
}

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new AppLoggerService('DatabaseService');

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async onModuleInit(): Promise<void> {
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    if (!dbUrl) {
      this.logger.warn(
        'DATABASE_URL not configured. Running in offline/disconnected database mode.',
        'DatabaseService',
      );
      return;
    }

    this.logger.log('DatabaseService initialized with Prisma.', 'DatabaseService');
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('DatabaseService shutdown complete.', 'DatabaseService');
  }

  /**
   * Health ping executing an active SELECT 1 round-trip against PostgreSQL.
   */
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

    try {
      await this.prismaService.$queryRaw(Prisma.sql`SELECT 1 AS ping;`);
      const latencyMs = Date.now() - startTime;
      return {
        status: 'up',
        latencyMs,
        message: 'PostgreSQL connection active',
      };
    } catch (err: unknown) {
      const latencyMs = Date.now() - startTime;
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown database ping error';
      // Sanitize potential connection string / credential leakage in error message
      const sanitized = errorMessage.replace(/(:\/\/[^:]+:)[^@]+(@)/, '$1***$2');
      this.logger.warn(
        `Database health ping failed (${latencyMs}ms): ${sanitized}`,
        'DatabaseService',
      );
      return {
        status: 'down',
        latencyMs,
        message: `Database ping failed: ${sanitized}`,
      };
    }
  }

  get connected(): boolean {
    return this.prismaService.connected;
  }

  get prisma(): PrismaService {
    return this.prismaService;
  }
}
