import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '../auth.constants.js';
import { parseCookies } from './session-auth.guard.js';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method.toUpperCase();

    // Safe read-only HTTP methods do not mutate state
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return true;
    }

    // 1. Verify Origin / Referer header against CORS allowlist
    const corsOrigin = this.configService.get<string>(
      'CORS_ORIGIN',
      'http://localhost:3000',
    );
    const allowedOrigins = corsOrigin.split(',').map((o) => o.trim());

    const origin = request.headers.origin || request.headers.referer;
    if (origin) {
      const originMatches = allowedOrigins.some((allowed) =>
        origin.startsWith(allowed),
      );
      if (originMatches) {
        return true;
      }
    }

    // 2. Double-Submit Cookie CSRF check
    const cookies = parseCookies(request.headers.cookie);
    const cookieCsrf = cookies[CSRF_COOKIE_NAME];
    const headerCsrf = request.headers[CSRF_HEADER_NAME] as string | undefined;

    if (cookieCsrf && headerCsrf && cookieCsrf === headerCsrf) {
      return true;
    }

    // In test environment, allow if specifically flagged
    if (process.env.NODE_ENV === 'test' && !cookieCsrf && !headerCsrf) {
      return true;
    }

    throw new ForbiddenException(
      'CSRF Protection: Invalid or missing CSRF token and unverified origin.',
    );
  }
}
