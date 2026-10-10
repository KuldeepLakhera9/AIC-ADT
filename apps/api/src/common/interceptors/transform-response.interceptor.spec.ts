import { describe, it, expect } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import {
  TransformResponseInterceptor,
  type ApiResponseEnvelope,
} from './transform-response.interceptor.js';
import { CORRELATION_ID_HEADER } from '../constants/headers.constants.js';

describe('TransformResponseInterceptor', () => {
  const interceptor = new TransformResponseInterceptor();

  const createMockContext = (
    correlationId = 'corr-abc-123',
    statusCode = 200,
  ) => {
    const mockRequest = {
      headers: {
        [CORRELATION_ID_HEADER]: correlationId,
      },
    };

    const mockResponse = {
      statusCode,
    };

    return {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as unknown as ExecutionContext;
  };

  it('should wrap standard payload in uniform success envelope', async () => {
    const context = createMockContext('test-corr-456', 200);
    const callHandler: CallHandler = {
      handle: () => of({ message: 'Success' }),
    };

    const result$ = interceptor.intercept(context, callHandler);
    const envelope = (await firstValueFrom(result$)) as ApiResponseEnvelope<{
      message: string;
    }>;

    expect(envelope.success).toBe(true);
    expect(envelope.statusCode).toBe(200);
    expect(envelope.data).toEqual({ message: 'Success' });
    expect(envelope.correlationId).toBe('test-corr-456');
    expect(typeof envelope.timestamp).toBe('string');
  });

  it('should correctly format paginated responses with items and meta', async () => {
    const context = createMockContext('paginated-corr', 200);
    const paginatedPayload = {
      items: [{ id: 1, name: 'Startup A' }],
      meta: {
        page: 1,
        limit: 10,
        totalItems: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };

    const callHandler: CallHandler = {
      handle: () => of(paginatedPayload),
    };

    const result$ = interceptor.intercept(context, callHandler);
    const envelope = (await firstValueFrom(result$)) as ApiResponseEnvelope<
      Array<{ id: number; name: string }>
    >;

    expect(envelope.success).toBe(true);
    expect(envelope.data).toEqual([{ id: 1, name: 'Startup A' }]);
    expect(envelope.meta).toEqual(paginatedPayload.meta);
  });
});
