import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const logger = new Logger('AIC-ADT-Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  const corsOrigin = configService.get<string>(
    'CORS_ORIGIN',
    'http://localhost:3000',
  );

  // Versioned API Prefix
  app.setGlobalPrefix(apiPrefix);

  // Global Request Validation Infrastructure
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global Consistent Error Handling Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  await app.listen(port);
  logger.log(
    `AIC-ADT API Engine running on http://localhost:${port}/${apiPrefix}`,
  );
  logger.log(
    `Health endpoint available at http://localhost:${port}/${apiPrefix}/health`,
  );
}

await bootstrap();
