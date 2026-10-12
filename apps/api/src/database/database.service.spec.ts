import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service.js';
import { PrismaService } from './prisma.service.js';

describe('DatabaseService', () => {
  let databaseService: DatabaseService;
  let mockConfigService: Partial<ConfigService>;
  let mockPrismaService: Partial<PrismaService>;

  beforeEach(() => {
    mockConfigService = {
      get: vi.fn().mockImplementation((key: string) => {
        if (key === 'DATABASE_URL') {
          return 'postgresql://aic_app:secret@127.0.0.1:5432/aic_adt_db';
        }
        return undefined;
      }),
    };

    mockPrismaService = {
      $queryRaw: vi.fn().mockResolvedValue([{ ping: 1 }]),
      connected: true,
    };

    databaseService = new DatabaseService(
      mockConfigService as ConfigService,
      mockPrismaService as PrismaService,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Lifecycle Handling', () => {
    it('should initialize successfully when DATABASE_URL is present', async () => {
      await expect(databaseService.onModuleInit()).resolves.toBeUndefined();
    });

    it('should warn and handle missing DATABASE_URL gracefully during init', async () => {
      (mockConfigService.get as ReturnType<typeof vi.fn>).mockReturnValue(
        undefined,
      );
      await expect(databaseService.onModuleInit()).resolves.toBeUndefined();
    });

    it('should cleanly execute onModuleDestroy shutdown hook', async () => {
      await expect(databaseService.onModuleDestroy()).resolves.toBeUndefined();
    });
  });

  describe('Health Ping & Connection Safety', () => {
    it('should return up status and latency when database query succeeds', async () => {
      const result = await databaseService.ping();
      expect(result.status).toBe('up');
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
      expect(result.message).toContain('active');
      expect(mockPrismaService.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it('should handle database ping failure safely and sanitize credentials', async () => {
      (
        mockPrismaService.$queryRaw as ReturnType<typeof vi.fn>
      ).mockRejectedValue(
        new Error(
          'Connection terminated: postgresql://aic_app:supersecretpass@127.0.0.1:5432/aic_adt_db failed',
        ),
      );

      const result = await databaseService.ping();
      expect(result.status).toBe('down');
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
      expect(result.message).toBeDefined();
      // Ensure sensitive credentials are NOT leaked in output message
      expect(result.message).not.toContain('supersecretpass');
      expect(result.message).toContain('***');
    });

    it('should return bypassed status if DATABASE_URL is not set', async () => {
      (mockConfigService.get as ReturnType<typeof vi.fn>).mockReturnValue(
        undefined,
      );

      const result = await databaseService.ping();
      expect(result.status).toBe('up');
      expect(result.latencyMs).toBe(0);
      expect(result.message).toContain('bypassed');
      expect(mockPrismaService.$queryRaw).not.toHaveBeenCalled();
    });

    it('should expose connected property reflecting Prisma status', () => {
      expect(databaseService.connected).toBe(true);
    });
  });
});
