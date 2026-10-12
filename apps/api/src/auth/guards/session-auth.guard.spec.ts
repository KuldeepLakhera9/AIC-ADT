import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionAuthGuard } from './session-auth.guard.js';
import { SessionService } from '../session.service.js';

describe('SessionAuthGuard', () => {
  let guard: SessionAuthGuard;
  let mockReflector: Reflector;
  let mockSessionService: any;

  beforeEach(() => {
    mockReflector = {
      getAllAndOverride: vi.fn().mockReturnValue(false),
    } as unknown as Reflector;

    mockSessionService = {
      validateSession: vi.fn(),
    };

    guard = new SessionAuthGuard(mockReflector, mockSessionService as unknown as SessionService);
  });

  it('should allow access to public routes', async () => {
    vi.spyOn(mockReflector, 'getAllAndOverride').mockReturnValue(true);

    const mockContext = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn(),
    } as any;

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
  });

  it('should reject requests without a session cookie or auth header', async () => {
    const mockContext = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({ headers: {} }),
      }),
    } as any;

    await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
  });

  it('should allow authenticated requests with valid session cookie', async () => {
    const mockUser = {
      id: 'usr-1',
      email: 'admin@aic-adt.org',
      role: 'ADMIN',
      status: 'ACTIVE',
      permissions: ['dashboard.read'],
    };
    mockSessionService.validateSession.mockResolvedValue(mockUser);

    const mockReq = {
      headers: { cookie: 'aic_session=valid-session-token' },
    };

    const mockContext = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockReq),
      }),
    } as any;

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect((mockReq as any).user).toEqual(mockUser);
  });
});
