import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, Prisma } from '@prisma/client';
import { AppLoggerService } from '../common/logger/app-logger.service.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new AppLoggerService('PrismaService');
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {
    const dbUrl = configService.get<string>('DATABASE_URL');
    super({
      datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
      log:
        configService.get<string>('NODE_ENV') === 'development'
          ? [
              { emit: 'stdout', level: 'error' },
              { emit: 'stdout', level: 'warn' },
            ]
          : [{ emit: 'stdout', level: 'error' }],
    });
  }

  async onModuleInit(): Promise<void> {
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    if (!dbUrl) {
      this.logger.warn(
        'DATABASE_URL is not configured. Running in disconnected database mode.',
        'PrismaService',
      );
      this.isConnected = false;
      return;
    }

    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log(
        'Prisma client connected to PostgreSQL cluster.',
        'PrismaService',
      );
    } catch (err: unknown) {
      this.isConnected = false;
      const message =
        err instanceof Error ? err.message : 'Unknown database error';
      // Sanitize credentials from error message to prevent accidental leakage in logs
      const sanitized = message.replace(/(:\/\/[^:]+:)[^@]+(@)/, '$1***$2');
      this.logger.error(
        `Failed to connect to PostgreSQL database: ${sanitized}`,
        undefined,
        'PrismaService',
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.isConnected = false;
      this.logger.log(
        'Prisma client disconnected successfully.',
        'PrismaService',
      );
    } catch (err: unknown) {
      this.logger.error(
        `Error disconnecting Prisma client: ${err instanceof Error ? err.message : 'Unknown error'}`,
        undefined,
        'PrismaService',
      );
    }
  }

  get connected(): boolean {
    return this.isConnected;
  }

  /**
   * Safe interactive transaction wrapper enforcing explicit timeouts and isolation.
   */
  async withTransaction<T>(
    fn: (tx: Prisma.TransactionClient) => Promise<T>,
    options?: {
      maxWaitMs?: number;
      timeoutMs?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): Promise<T> {
    return this.$transaction(
      async (tx) => {
        return fn(tx);
      },
      {
        maxWait: options?.maxWaitMs ?? 5000,
        timeout: options?.timeoutMs ?? 10000,
        isolationLevel: options?.isolationLevel,
      },
    );
  }
}
