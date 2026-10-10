import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CORRELATION_ID_HEADER } from '../constants/headers.constants.js';

export interface ApiResponseEnvelope<T> {
  success: true;
  statusCode: number;
  data: T;
  meta?: Record<string, unknown>;
  correlationId?: string;
  timestamp: string;
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponseEnvelope<T> | T
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseEnvelope<T> | T> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const correlationId =
      (req.headers[CORRELATION_ID_HEADER] as string) || undefined;

    return next.handle().pipe(
      map((responseBody) => {
        // Skip wrapping if response is null, undefined, or already wrapped
        if (
          responseBody &&
          typeof responseBody === 'object' &&
          'success' in responseBody &&
          typeof (responseBody as { success: unknown }).success === 'boolean'
        ) {
          return responseBody;
        }

        // If response is a paginated structure with data and meta
        if (
          responseBody &&
          typeof responseBody === 'object' &&
          'items' in responseBody &&
          'meta' in responseBody
        ) {
          const { items, meta } = responseBody as {
            items: unknown;
            meta: Record<string, unknown>;
          };
          return {
            success: true,
            statusCode: res.statusCode,
            data: items as T,
            meta,
            correlationId,
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: true,
          statusCode: res.statusCode,
          data: responseBody as T,
          correlationId,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
