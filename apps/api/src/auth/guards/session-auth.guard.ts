import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator.js';
import { SessionService } from '../session.service.js';
import { SESSION_COOKIE_NAME } from '../auth.constants.js';
import { AuthenticatedUser } from '../auth.types.js';

export function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((res, c) => {
    const [k, v] = c.trim().split('=');
    if (k && v) res[k] = decodeURIComponent(v);
    return res;
  }, {} as Record<string, string>);
}

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request & {
      user?: AuthenticatedUser;
      sessionToken?: string;
    }>();

    // 1. Check HTTP-only cookie
    const cookies = parseCookies(request.headers.cookie);
    let token = cookies[SESSION_COOKIE_NAME];

    // 2. Allow Authorization Bearer token header fallback for programmatic API testing
    if (!token && request.headers.authorization) {
      const parts = request.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      throw new UnauthorizedException(
        'Authentication required. No active session found.',
      );
    }

    const user = await this.sessionService.validateSession(token);
    request.user = user;
    request.sessionToken = token;

    return true;
  }
}
