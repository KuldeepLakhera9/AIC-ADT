import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CORRELATION_ID_HEADER } from '../constants/headers.constants.js';
import {
  AppLoggerService,
  redactSensitiveData,
} from '../logger/app-logger.service.js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new AppLoggerService('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const correlationId =
      (req.headers[CORRELATION_ID_HEADER] as string) || undefined;
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || 'unknown';
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          const { statusCode } = res;

          this.logger.log(
            `${method} ${originalUrl} ${statusCode} - ${duration}ms`,
            'HTTP',
            correlationId,
            {
              method,
              path: originalUrl,
              statusCode,
              durationMs: duration,
              clientIp: ip,
              userAgent,
              query: redactSensitiveData(req.query),
            },
          );
        },
        error: (err: unknown) => {
          const duration = Date.now() - startTime;
          const statusCode =
            err && typeof err === 'object' && 'status' in err
              ? (err as { status: number }).status
              : 500;

          this.logger.warn(
            `${method} ${originalUrl} ${statusCode} - ${duration}ms (Failed)`,
            'HTTP',
            correlationId,
            {
              method,
              path: originalUrl,
              statusCode,
              durationMs: duration,
              clientIp: ip,
              userAgent,
            },
          );
        },
      }),
    );
  }
}
