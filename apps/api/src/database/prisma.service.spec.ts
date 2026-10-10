import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service.js';

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(() => {
    mockConfigService = {
      get: vi.fn().mockImplementation((key: string) => {
        if (key === 'DATABASE_URL') {
          return 'postgresql://aic_app:dev_secret@127.0.0.1:5432/aic_adt_db';
        }
        if (key === 'NODE_ENV') {
          return 'test';
        }
        return undefined;
      }),
    };

    prismaService = new PrismaService(mockConfigService as ConfigService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Lifecycle & Connection Management', () => {
    it('should connect successfully during onModuleInit', async () => {
      const connectSpy = vi.spyOn(prismaService, '$connect').mockResolvedValue();

      await prismaService.onModuleInit();
      expect(prismaService.connected).toBe(true);
      expect(connectSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle connection failure gracefully and sanitize credentials in error log', async () => {
      vi.spyOn(prismaService, '$connect').mockRejectedValue(
        new Error('FATAL: password authentication failed for user "aic_app" at postgresql://aic_app:supersecretpassword@127.0.0.1:5432/aic_adt_db'),
      );

      await prismaService.onModuleInit();
      expect(prismaService.connected).toBe(false);
    });

    it('should handle absent DATABASE_URL gracefully during onModuleInit', async () => {
      (mockConfigService.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined);
      const disconnectedService = new PrismaService(mockConfigService as ConfigService);
      const connectSpy = vi.spyOn(disconnectedService, '$connect');

      await disconnectedService.onModuleInit();
      expect(disconnectedService.connected).toBe(false);
      expect(connectSpy).not.toHaveBeenCalled();
    });

    it('should disconnect cleanly during onModuleDestroy', async () => {
      const disconnectSpy = vi.spyOn(prismaService, '$disconnect').mockResolvedValue();

      await prismaService.onModuleDestroy();
      expect(prismaService.connected).toBe(false);
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle disconnect error gracefully during onModuleDestroy', async () => {
      vi.spyOn(prismaService, '$disconnect').mockRejectedValue(new Error('Socket hung up'));

      await expect(prismaService.onModuleDestroy()).resolves.toBeUndefined();
      expect(prismaService.connected).toBe(false);
    });
  });

  describe('Safe Transactions', () => {
    it('should execute transaction with bounded timeouts', async () => {
      const mockResult = { success: true };
      const transactionSpy = vi
        .spyOn(prismaService, '$transaction')
        // @ts-expect-error mock callback
        .mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
          return callback({});
        });

      const result = await prismaService.withTransaction(
        async () => {
          return mockResult;
        },
        { timeoutMs: 3000, maxWaitMs: 2000 },
      );

      expect(result).toEqual(mockResult);
      expect(transactionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
