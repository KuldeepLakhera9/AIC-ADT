import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { CORRELATION_ID_HEADER } from '../constants/headers.constants.js';

export const CorrelationId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request.headers[CORRELATION_ID_HEADER] as string) || undefined;
  },
);
