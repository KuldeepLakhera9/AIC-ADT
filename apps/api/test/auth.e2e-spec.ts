import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import helmet from 'helmet';
import { AppModule } from './../src/app.module.js';
import { GlobalExceptionFilter } from '../src/common/filters/global-exception.filter.js';
import { TransformResponseInterceptor } from '../src/common/interceptors/transform-response.interceptor.js';
import { CorrelationIdMiddleware } from '../src/common/middleware/correlation-id.middleware.js';
import { SESSION_COOKIE_NAME } from '../src/auth/auth.constants.js';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.use(helmet());
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
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

  it('rejects unauthenticated requests to /api/v1/auth/me with 401', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .expect(401);

    expect(res.body.success).toBe(false);
    expect(res.body.statusCode).toBe(401);
    expect(res.body.message).toContain('Authentication required');
  });

  it('rejects invalid login payload with validation error (400)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'not-an-email', password: 'short' })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.statusCode).toBe(400);
    expect(Array.isArray(res.body.message)).toBe(true);
  });

  it('rejects unverified user credentials with 401', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'nonexistent@aic-adt.org', password: 'WrongPassword123' })
      .expect(401);

    expect(res.body.success).toBe(false);
    expect(res.body.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid email address or password.');
  });

  it('authenticates development seed admin and sets session cookies', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: 'admin.dev@aic-adt.org',
        password: 'aic_admin_dev_password_2026',
      })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('admin.dev@aic-adt.org');
    expect(res.body.data.user.role).toBe('ADMIN');
    expect(res.body.data.user.permissions).toContain('dashboard.read');

    // Verify Set-Cookie header contains aic_session
    const rawCookies = res.headers['set-cookie'];
    expect(rawCookies).toBeDefined();
    const cookieList: string[] = Array.isArray(rawCookies)
      ? rawCookies
      : [rawCookies as string];
    const hasSessionCookie = cookieList.some((c: string) =>
      c.startsWith(`${SESSION_COOKIE_NAME}=`),
    );
    expect(hasSessionCookie).toBe(true);
  });
});
