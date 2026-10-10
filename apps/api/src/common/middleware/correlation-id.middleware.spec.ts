import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { CorrelationIdMiddleware } from './correlation-id.middleware.js';
import { CORRELATION_ID_HEADER } from '../constants/headers.constants.js';

describe('CorrelationIdMiddleware', () => {
  const middleware = new CorrelationIdMiddleware();

  it('should generate a correlation ID if none is provided', () => {
    const req = {
      headers: {},
    } as unknown as Request;

    let responseHeaderVal = '';
    const res = {
      setHeader: vi.fn().mockImplementation((_name: string, val: string) => {
        responseHeaderVal = val;
      }),
    } as unknown as Response;

    const next: NextFunction = vi.fn();

    middleware.use(req, res, next);

    expect(req.headers[CORRELATION_ID_HEADER]).toBeDefined();
    expect(responseHeaderVal).toBe(req.headers[CORRELATION_ID_HEADER]);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should preserve an existing correlation ID from incoming request', () => {
    const req = {
      headers: {
        [CORRELATION_ID_HEADER]: 'client-assigned-correlation-id-999',
      },
    } as unknown as Request;

    let responseHeaderVal = '';
    const res = {
      setHeader: vi.fn().mockImplementation((_name: string, val: string) => {
        responseHeaderVal = val;
      }),
    } as unknown as Response;

    const next: NextFunction = vi.fn();

    middleware.use(req, res, next);

    expect(req.headers[CORRELATION_ID_HEADER]).toBe(
      'client-assigned-correlation-id-999',
    );
    expect(responseHeaderVal).toBe('client-assigned-correlation-id-999');
    expect(next).toHaveBeenCalledTimes(1);
  });
});
