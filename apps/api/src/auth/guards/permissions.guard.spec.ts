import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard.js';
import { Permission } from '../auth.types.js';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let mockReflector: Reflector;

  beforeEach(() => {
    mockReflector = {
      getAllAndOverride: vi.fn(),
    } as unknown as Reflector;

    guard = new PermissionsGuard(mockReflector);
  });

  it('should allow access when no permissions are specified', () => {
    vi.spyOn(mockReflector, 'getAllAndOverride').mockReturnValue(undefined);

    const mockContext = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({ user: { permissions: [] } }),
      }),
    } as any;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should allow access when user possesses all required permissions', () => {
    vi.spyOn(mockReflector, 'getAllAndOverride').mockReturnValue([
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
    ]);

    const mockContext = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({
          user: {
            permissions: [
              Permission.CONTENT_READ,
              Permission.CONTENT_CREATE,
              Permission.DASHBOARD_READ,
            ],
          },
        }),
      }),
    } as any;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should reject access when user lacks a required permission', () => {
    vi.spyOn(mockReflector, 'getAllAndOverride').mockReturnValue([
      Permission.CONTENT_APPROVE,
    ]);

    const mockContext = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({
          user: {
            permissions: [Permission.CONTENT_READ, Permission.CONTENT_CREATE],
          },
        }),
      }),
    } as any;

    expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
  });
});
