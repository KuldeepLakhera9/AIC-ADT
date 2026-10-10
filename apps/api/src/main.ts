import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import express from 'express';
import { AppModule } from './app.module.js';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor.js';
import { AppLoggerService } from './common/logger/app-logger.service.js';
import {
  CORRELATION_ID_HEADER,
  REQUEST_ID_HEADER,
} from './common/constants/headers.constants.js';

async function bootstrap() {
  const logger = new AppLoggerService('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Use custom structured logger
  app.useLogger(logger);

  // Enable graceful shutdown lifecycle hooks (SIGTERM, SIGINT)
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  const corsOrigin = configService.get<string>(
    'CORS_ORIGIN',
    'http://localhost:3000',
  );
  const bodyLimit = configService.get<string>('BODY_LIMIT', '1mb');
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  // Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction,
    }),
  );

  // Body parser size limits
  app.use(express.json({ limit: bodyLimit }));
  app.use(express.urlencoded({ extended: true, limit: bodyLimit }));

  // Versioned API Prefix
  app.setGlobalPrefix(apiPrefix);

  // Global Request Validation Infrastructure
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false, // Deliberate type conversion only
      },
    }),
  );

  // Global Interceptors: Structured JSON Logging & Uniform Response Enveloping
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformResponseInterceptor(),
  );

  // Global Consistent Error Handling Filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Cross-Origin Resource Sharing (CORS) Allowlist
  const allowedOrigins = corsOrigin.split(',').map((o) => o.trim());
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        (!isProduction && origin.startsWith('http://localhost:'))
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      CORRELATION_ID_HEADER,
      REQUEST_ID_HEADER,
    ],
  });

  await app.listen(port);
  logger.log(
    `AIC-ADT API Engine running on http://localhost:${port}/${apiPrefix}`,
    'Bootstrap',
  );
  logger.log(
    `Health endpoints available at http://localhost:${port}/${apiPrefix}/health`,
    'Bootstrap',
  );
}

await bootstrap();
