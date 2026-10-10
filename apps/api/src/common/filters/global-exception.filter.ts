import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { CORRELATION_ID_HEADER } from '../constants/headers.constants.js';
import {
  AppLoggerService,
  redactSensitiveData,
} from '../logger/app-logger.service.js';

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string | string[];
  correlationId?: string;
  timestamp: string;
  path: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new AppLoggerService('GlobalExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const correlationId =
      (request.headers[CORRELATION_ID_HEADER] as string) || undefined;
    const isProduction = process.env.NODE_ENV === 'production';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message: string | string[] = 'Internal server error';
    let error = 'Internal Server Error';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const responseObj = exceptionResponse as {
        message: string | string[];
        error?: string;
      };
      message = responseObj.message;
      if (responseObj.error) {
        error = responseObj.error;
      }
    } else if (exception instanceof Error && !isProduction) {
      message = exception.message;
      error = exception.name;
    }

    // In production, mask unhandled 500 internal errors
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      if (isProduction) {
        message =
          'An unexpected internal error occurred. Please try again later.';
        error = 'Internal Server Error';
      }
    }

    const sanitizedMessage = redactSensitiveData(message);
    const sanitizedError = redactSensitiveData(error);

    // Securely log the error with full context and correlation ID
    const logMeta = {
      method: request.method,
      path: request.url,
      statusCode: status,
      clientIp: request.ip,
      userAgent: request.headers['user-agent'],
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      const stack = exception instanceof Error ? exception.stack : undefined;
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}: ${exception instanceof Error ? exception.message : 'Unknown error'}`,
        stack,
        'GlobalExceptionFilter',
        correlationId,
        logMeta,
      );
    } else {
      this.logger.warn(
        `HTTP ${status} on ${request.method} ${request.url}: ${JSON.stringify(sanitizedMessage)}`,
        'GlobalExceptionFilter',
        correlationId,
        logMeta,
      );
    }

    const payload: ApiErrorResponse = {
      success: false,
      statusCode: status,
      error: sanitizedError,
      message: sanitizedMessage,
      correlationId,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(payload);
  }
}
