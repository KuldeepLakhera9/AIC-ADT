import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';
import { SessionService } from './session.service.js';
import { PrismaService } from '../database/prisma.service.js';

describe('SessionService', () => {
  let sessionService: SessionService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      connected: false, // tests in-memory fallback
      session: {
        create: vi.fn(),
        findUnique: vi.fn(),
        delete: vi.fn(),
        deleteMany: vi.fn(),
      },
      user: {
        findUnique: vi.fn(),
      },
    };
    sessionService = new SessionService(mockPrisma as unknown as PrismaService);
  });

  it('should generate high-entropy session and csrf tokens', async () => {
    const session = await sessionService.createSession('user-uuid-123', '127.0.0.1', 'Mozilla/5.0');

    expect(session.rawToken).toHaveLength(64); // 32 bytes hex
    expect(session.csrfToken).toHaveLength(32); // 16 bytes hex
    expect(session.expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it('should validate an active session token', async () => {
    const session = await sessionService.createSession('user-uuid-123', '127.0.0.1', 'Mozilla/5.0');
    const user = await sessionService.validateSession(session.rawToken);

    expect(user.id).toBe('user-uuid-123');
    expect(user.status).toBe('ACTIVE');
    expect(user.permissions).toBeDefined();
    expect(user.permissions.length).toBeGreaterThan(0);
  });

  it('should reject a missing or invalid session token', async () => {
    await expect(sessionService.validateSession('')).rejects.toThrow(UnauthorizedException);
    await expect(sessionService.validateSession('non-existent-token')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should invalidate an active session on logout', async () => {
    const session = await sessionService.createSession('user-uuid-123');
    await sessionService.invalidateSession(session.rawToken);

    await expect(sessionService.validateSession(session.rawToken)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
