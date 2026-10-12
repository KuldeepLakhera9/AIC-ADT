import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller.js';
import { PasswordService } from './password.service.js';
import { SessionService } from './session.service.js';
import { PrismaService } from '../database/prisma.service.js';

describe('AuthController', () => {
  let authController: AuthController;
  let mockPrisma: any;
  let mockPasswordService: any;
  let mockSessionService: any;
  let mockConfigService: any;

  beforeEach(() => {
    mockPrisma = {
      connected: false,
      user: {
        findUnique: vi.fn(),
      },
      auditLog: {
        create: vi.fn().mockResolvedValue({}),
      },
    };

    mockPasswordService = {
      verifyPassword: vi.fn(),
      hashPassword: vi.fn(),
    };

    mockSessionService = {
      createSession: vi.fn().mockResolvedValue({
        rawToken: 'mock-token-hex-64',
        csrfToken: 'mock-csrf-hex-32',
        expiresAt: new Date(Date.now() + 28800000),
        sessionId: 'session-uuid',
      }),
      invalidateSession: vi.fn().mockResolvedValue(undefined),
    };

    mockConfigService = {
      get: vi.fn().mockReturnValue('development'),
    };

    authController = new AuthController(
      mockPrisma as unknown as PrismaService,
      mockPasswordService as unknown as PasswordService,
      mockSessionService as unknown as SessionService,
      mockConfigService as unknown as ConfigService,
    );
  });

  it('should authenticate valid user and set cookies', async () => {
    mockPasswordService.verifyPassword.mockResolvedValue(true);

    const mockReq = { ip: '127.0.0.1', headers: { 'user-agent': 'Vitest' } } as any;
    const mockRes = { cookie: vi.fn(), clearCookie: vi.fn() } as any;

    const result = await authController.login(
      { email: 'admin.dev@aic-adt.org', password: 'ValidPassword123' },
      mockReq,
      mockRes,
    );

    expect(result.user.email).toBe('admin.dev@aic-adt.org');
    expect(result.user.role).toBe('ADMIN');
    expect(result.user.permissions).toBeDefined();
    expect(mockRes.cookie).toHaveBeenCalledTimes(2); // session + csrf
  });

  it('should reject invalid credentials with generic message', async () => {
    mockPasswordService.verifyPassword.mockResolvedValue(false);

    const mockReq = { ip: '127.0.0.1', headers: {} } as any;
    const mockRes = { cookie: vi.fn() } as any;

    await expect(
      authController.login(
        { email: 'unknown@aic-adt.org', password: 'WrongPassword123' },
        mockReq,
        mockRes,
      ),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should clear cookies on logout', async () => {
    const mockReq = { headers: { cookie: 'aic_session=active-token' } } as any;
    const mockRes = { clearCookie: vi.fn() } as any;

    const result = await authController.logout(mockReq, mockRes);

    expect(result.loggedOut).toBe(true);
    expect(mockSessionService.invalidateSession).toHaveBeenCalledWith('active-token');
    expect(mockRes.clearCookie).toHaveBeenCalledTimes(2);
  });
});
