import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AppModule } from './../src/app.module.js';
import { GlobalExceptionFilter } from '../src/common/filters/global-exception.filter.js';
import { TransformResponseInterceptor } from '../src/common/interceptors/transform-response.interceptor.js';
import { CorrelationIdMiddleware } from '../src/common/middleware/correlation-id.middleware.js';
import { CORRELATION_ID_HEADER } from '../src/common/constants/headers.constants.js';

describe('AppController & Health (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.use((req: any, res: any, next: any) =>
      new CorrelationIdMiddleware().use(req, res, next),
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new TransformResponseInterceptor());

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/v1 (GET) - Root API Info & Response Enveloping', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1').expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.data).toBe('Hello World!');
    expect(typeof res.body.timestamp).toBe('string');
    expect(res.headers[CORRELATION_ID_HEADER]).toBeDefined();
  });

  it('/api/v1/health (GET) - Aggregate Health Probe', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
    expect(res.body.data.service).toBe('aic-adt-api');
    expect(res.body.data.version).toBe('1.0.0');
    expect(res.body.data.checks.process).toBe('ok');
    expect(res.body.data.checks.database.status).toBe('up');
  });

  it('/api/v1/health/liveness (GET) - Process Liveness Probe', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/health/liveness')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
    expect(typeof res.body.data.uptime).toBe('number');
    expect(typeof res.body.data.memory.heapUsedMb).toBe('number');
  });

  it('/api/v1/health/readiness (GET) - Dependency Readiness Probe', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/health/readiness')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
    expect(res.body.data.checks.database.status).toBe('up');
  });

  it('preserves client correlation ID throughout request/response lifecycle', async () => {
    const customCorrelationId = 'client-session-trace-888';
    const res = await request(app.getHttpServer())
      .get('/api/v1/health/liveness')
      .set(CORRELATION_ID_HEADER, customCorrelationId)
      .expect(200);

    expect(res.headers[CORRELATION_ID_HEADER]).toBe(customCorrelationId);
    expect(res.body.correlationId).toBe(customCorrelationId);
  });
});
