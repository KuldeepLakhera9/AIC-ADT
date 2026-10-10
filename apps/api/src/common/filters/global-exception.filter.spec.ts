import { describe, it, expect, vi } from 'vitest';
import { HttpException, HttpStatus, ArgumentsHost } from '@nestjs/common';
import { GlobalExceptionFilter } from './global-exception.filter.js';
import { CORRELATION_ID_HEADER } from '../constants/headers.constants.js';

describe('GlobalExceptionFilter', () => {
  const filter = new GlobalExceptionFilter();

  const createMockArgumentsHost = (
    headers: Record<string, string> = {},
    url = '/api/v1/test',
  ) => {
    let capturedStatus = 200;
    let capturedJson: unknown = null;

    const mockResponse = {
      status: vi.fn().mockImplementation((code: number) => {
        capturedStatus = code;
        return mockResponse;
      }),
      json: vi.fn().mockImplementation((body: unknown) => {
        capturedJson = body;
        return mockResponse;
      }),
    };

    const mockRequest = {
      url,
      method: 'POST',
      headers,
      ip: '127.0.0.1',
    };

    const host = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;

    return {
      host,
      getStatus: () => capturedStatus,
      getJson: () => capturedJson as Record<string, unknown>,
    };
  };

  it('should format HttpException into standardized error envelope', () => {
    const { host, getStatus, getJson } = createMockArgumentsHost({
      [CORRELATION_ID_HEADER]: 'test-correlation-123',
    });

    const exception = new HttpException(
      { message: 'Invalid payload provided', error: 'Bad Request' },
      HttpStatus.BAD_REQUEST,
    );

    filter.catch(exception, host);

    expect(getStatus()).toBe(HttpStatus.BAD_REQUEST);
    const body = getJson();
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.error).toBe('Bad Request');
    expect(body.message).toBe('Invalid payload provided');
    expect(body.correlationId).toBe('test-correlation-123');
    expect(body.path).toBe('/api/v1/test');
    expect(typeof body.timestamp).toBe('string');
  });

  it('should mask 500 internal server errors in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    try {
      const { host, getStatus, getJson } = createMockArgumentsHost();
      const internalError = new Error(
        'Database connection failed with credentials postgres:password',
      );

      filter.catch(internalError, host);

      expect(getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      const body = getJson();
      expect(body.success).toBe(false);
      expect(body.statusCode).toBe(500);
      expect(body.error).toBe('Internal Server Error');
      expect(body.message).toBe(
        'An unexpected internal error occurred. Please try again later.',
      );
    } finally {
      process.env.NODE_ENV = originalEnv;
    }
  });
});
