# AIC-ADT Baramati Foundation — NestJS Backend Foundation Architecture

## Document Metadata
- **Document Title:** NestJS Backend Foundation Architecture & API Standards
- **Phase:** Phase 3 — Production Architecture & Implementation (Task 4)
- **Status:** Approved & Implemented
- **Target Application:** `apps/api` (NestJS 12, Node.js v26 / NodeNext ESM, TypeScript 6)
- **Date:** October 2026
- **Author:** Senior Backend Engineer & System Architect

---

## 1. Executive Summary

This document specifies the production backend foundation implemented in `apps/api`. In accordance with the approved architectural decisions (ADR-004 NestJS Modular Monolith, ADR-005 PostgreSQL & Prisma, ADR-009 Non-root Container Deployment), the backend provides a secure, structured, maintainable, and observable application engine for the AIC-ADT Baramati Foundation digital platform.

### Core Architectural Principles
1. **Modular Monolith:** Clean domain boundaries without prematurely creating empty business modules.
2. **Versioned REST API (`/api/v1`):** Predictable URL routing, strict request validation, and uniform response envelopes.
3. **Fail-Fast Configuration:** Typed configuration schema with startup validation preventing application boot when mandatory settings are invalid.
4. **End-to-End Request Correlation (`x-correlation-id`):** Automated generation, header propagation, and log correlation across all requests.
5. **Zero-Leak Error Handling:** Public error responses never leak internal stack traces, database schema details, or connection secrets.
6. **Structured Observability:** Native JSON logs with automatic redaction of sensitive credentials, tokens, and authorization headers.
7. **Container-Grade Health Probes:** Distinct `/health/liveness` and `/health/readiness` endpoints designed for Docker and Kubernetes health checking.

---

## 2. Directory Structure & Modular Layout

```
apps/api/
├── src/
│   ├── main.ts                              # Application bootstrap, Helmet, CORS, Body limits, Global pipes/filters
│   ├── app.module.ts                        # Root module orchestrating config, throttler, database, and health
│   ├── app.controller.ts                    # Root API info controller
│   ├── app.controller.spec.ts               # Root controller unit tests
│   ├── app.service.ts                       # Root API service
│   │
│   ├── config/                              # Configuration & Environment
│   │   ├── env.validation.ts                # Class-validator environment schema & fail-fast validator
│   │   ├── env.validation.spec.ts           # Configuration validation unit tests
│   │   └── configuration.ts                 # Typed configuration factory
│   │
│   ├── common/                              # Cross-Cutting Shared Primitives
│   │   ├── constants/                       # Standard header constants (X-Correlation-ID, X-Request-ID)
│   │   ├── decorators/                      # @Public(), @CorrelationId(), @Roles()
│   │   ├── dto/                             # PaginationQueryDto, PaginatedResponseDto
│   │   ├── filters/                         # GlobalExceptionFilter (safe production error masking)
│   │   │   ├── global-exception.filter.ts
│   │   │   └── global-exception.filter.spec.ts
│   │   ├── interceptors/                    # Response transformation & structured logging
│   │   │   ├── transform-response.interceptor.ts
│   │   │   ├── transform-response.interceptor.spec.ts
│   │   │   └── logging.interceptor.ts
│   │   ├── logger/                          # Structured JSON logger & sensitive value redaction
│   │   │   ├── app-logger.service.ts
│   │   │   └── app-logger.service.spec.ts
│   │   ├── middleware/                      # Correlation ID generation and header propagation
│   │   │   ├── correlation-id.middleware.ts
│   │   │   └── correlation-id.middleware.spec.ts
│   │   └── pipes/                           # Validation pipe tests & custom transformers
│   │       └── validation.pipe.spec.ts
│   │
│   ├── health/                              # Health Checks & Probes
│   │   ├── health.controller.ts             # Endpoints: /health, /health/liveness, /health/readiness
│   │   ├── health.controller.spec.ts        # Health controller unit tests
│   │   ├── health.service.ts                # Process uptime, memory, and database ping checks
│   │   └── health.module.ts                 # Health module definition
│   │
│   └── database/                            # Database Integration Foundation
│       ├── database.module.ts               # Global database provider module
│       └── database.service.ts              # Database lifecycle management & connectivity probe
│
├── test/
│   └── app.e2e-spec.ts                      # End-to-end integration test suite
├── .env.example                             # Environment variable template
├── tsconfig.json                            # TypeScript configuration with NodeNext ESM
└── vitest.config.ts                         # Vitest configuration for unit tests
```

---

## 3. API Conventions & Standards

### 3.1 Versioned Prefix
All REST endpoints are rooted at `/api/v1` via `app.setGlobalPrefix('api/v1')`.

### 3.2 Uniform Success Response Envelope
All successful API responses are automatically enveloped by `TransformResponseInterceptor` into a standard format:

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": 1,
    "title": "Precision AgriTech Incubation"
  },
  "correlationId": "8f9ea9cf-d4e5-40e1-a7bb-03f4097e3b8e",
  "timestamp": "2026-10-10T14:45:00.000Z"
}
```

For paginated listing endpoints, the envelope exposes `data` as the item array and attaches `meta`:

```json
{
  "success": true,
  "statusCode": 200,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 42,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "correlationId": "8f9ea9cf-d4e5-40e1-a7bb-03f4097e3b8e",
  "timestamp": "2026-10-10T14:45:00.000Z"
}
```

### 3.3 Consistent Error Response Envelope
Handled by `GlobalExceptionFilter`:

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": [
    "name should not be empty",
    "age must not be less than 1"
  ],
  "correlationId": "8f9ea9cf-d4e5-40e1-a7bb-03f4097e3b8e",
  "timestamp": "2026-10-10T14:45:00.000Z",
  "path": "/api/v1/applications"
}
```

#### Safe Production Error Masking
In production (`NODE_ENV=production`), any unhandled exception (500 Internal Server Error) is automatically sanitized to:
- **Error:** `"Internal Server Error"`
- **Message:** `"An unexpected internal error occurred. Please try again later."`
Internal stack traces, SQL queries, database hostnames, or driver errors are **never** returned to the caller. The full stack trace is securely written to stderr in structured JSON logs alongside the correlation ID for triage.

### 3.4 Request Correlation ID
- Handled by `CorrelationIdMiddleware`.
- Inspects incoming `X-Correlation-ID` or `X-Request-ID` headers.
- If missing, generates a standard cryptographically random UUIDv4 via `node:crypto`.
- Injects the ID into request headers and sets `res.setHeader('X-Correlation-ID', id)`.
- Attached to all log entries, success envelopes, and error envelopes.

### 3.5 Pagination Conventions
The shared `PaginationQueryDto` (`apps/api/src/common/dto/pagination.dto.ts`) standardizes all future collection queries:
- `page`: Integer $\ge 1$ (default: `1`).
- `limit`: Integer between `1` and `100` (default: `10`).
- `sortBy`: Optional string representing model field.
- `sortOrder`: Enum `'asc' | 'desc'` (default: `'desc'`).
- `skip`: Computed property `(page - 1) * limit`.

---

## 4. Request Validation Policy

Global validation is configured in `main.ts` via NestJS's `ValidationPipe`:
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,              // Strips non-whitelisted properties
    forbidNonWhitelisted: true,  // Rejects requests containing unknown fields with HTTP 400
    transform: true,              // Automatically transforms payloads to DTO instances
    transformOptions: {
      enableImplicitConversion: false, // Disallows dangerous implicit conversions
    },
  }),
);
```

### Body Size Limits
To prevent Denial of Service (DoS) attacks via oversized payloads:
```typescript
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
```

---

## 5. Logging & Sensitive Data Redaction

### 5.1 Structured JSON Logging
The `AppLoggerService` (`apps/api/src/common/logger/app-logger.service.ts`) emits single-line JSON logs formatted for container log collectors (Datadog, Promtail/Loki, CloudWatch):

```json
{
  "timestamp": "2026-10-10T14:45:00.123Z",
  "level": "LOG",
  "context": "HTTP",
  "correlationId": "8f9ea9cf-d4e5-40e1-a7bb-03f4097e3b8e",
  "message": "GET /api/v1/health 200 - 12ms",
  "metadata": {
    "method": "GET",
    "path": "/api/v1/health",
    "statusCode": 200,
    "durationMs": 12,
    "clientIp": "127.0.0.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### 5.2 Mandatory Redaction Rules
The redaction utility automatically replaces sensitive values with `"[REDACTED]"`.
1. **Redacted Object Keys:** `password`, `passwd`, `secret`, `token`, `accessToken`, `refreshToken`, `authorization`, `cookie`, `set-cookie`, `databaseUrl`, `database_url`, `db_password`, `apiKey`, `creditCard`, `cvv`, `ssn`.
2. **Redacted String Patterns:**
   - Bearer tokens: `Bearer eyJ...` $\rightarrow$ `Bearer [REDACTED]`
   - Connection strings: `postgresql://user:secret@host:5432/db` $\rightarrow$ `postgresql://user:[REDACTED]@host:5432/db`

---

## 6. Health Endpoints & Container Probes

### 6.1 Endpoints Matrix

| Endpoint | Method | Public / Restricted | Purpose | Response Characteristics |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/health/liveness` | `GET` | **Public** | Process liveness probe | Returns HTTP 200 `{ status: 'ok', uptime, memory }`. Used by container orchestrator to restart dead processes. |
| `/api/v1/health/readiness`| `GET` | **Public** (Sanitized) | Dependency readiness probe | Verifies database ping. Returns HTTP 200 if connected, HTTP 503 if disconnected. Used by load balancer before routing traffic. |
| `/api/v1/health` | `GET` | **Public** (Sanitized) | Aggregate health probe | Combines process and database checks, service version, environment. |

### 6.2 Container Health Check Specification
In Docker Compose or Kubernetes, the liveness and readiness probes should be configured as follows:

```yaml
# Docker Compose Health Check
healthcheck:
  test: ["CMD", "wget", "-qO-", "http://localhost:4000/api/v1/health/liveness"]
  interval: 15s
  timeout: 5s
  retries: 3
  start_period: 10s
```

```yaml
# Kubernetes Pod Spec
livenessProbe:
  httpGet:
    path: /api/v1/health/liveness
    port: 4000
  initialDelaySeconds: 10
  periodSeconds: 15
readinessProbe:
  httpGet:
    path: /api/v1/health/readiness
    port: 4000
  initialDelaySeconds: 10
  periodSeconds: 10
```

---

## 7. Typed Configuration & Environment Matrix

Configuration is defined via `EnvironmentVariables` in `apps/api/src/config/env.validation.ts`. If any variable fails validation during startup, the application immediately throws a descriptive fatal error and terminates.

| Environment Variable | Type | Allowed Values / Range | Default | Required in Production |
| :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | Enum | `development`, `staging`, `production`, `test` | `development` | Yes |
| `PORT` | Integer | `1024` – `65535` | `4000` | No |
| `API_PREFIX` | String | e.g. `api/v1` | `api/v1` | No |
| `CORS_ORIGIN` | String | Comma-separated URLs | `http://localhost:3000` | Yes |
| `DATABASE_URL` | String | `postgresql://...` | `undefined` | **Yes (Mandatory)** |
| `LOG_LEVEL` | Enum | `debug`, `log`, `warn`, `error` | `log` | No |
| `BODY_LIMIT` | String | e.g. `1mb`, `2mb` | `1mb` | No |
| `THROTTLE_TTL` | Integer | $\ge 1$ (seconds) | `60` | No |
| `THROTTLE_LIMIT` | Integer | $\ge 1$ (requests per TTL) | `100` | No |

---

## 8. Security Baseline & Future Auth Hooks

### 8.1 Security Headers (Helmet)
Configured in `main.ts` using `helmet()`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security: max-age=15552000; includeSubDomains`
- Content Security Policy enabled in production.

### 8.2 CORS Allowlisting
- Restricts cross-origin requests to explicit origins configured in `CORS_ORIGIN`.
- Supports credentials (`credentials: true`).
- Restricts methods to `GET, POST, PUT, PATCH, DELETE, OPTIONS`.
- Whitelists headers: `Content-Type, Authorization, X-Correlation-ID, X-Request-ID`.

### 8.3 Rate Limiting (Throttler)
- Global `ThrottlerGuard` active on all routes.
- Default limit: 100 requests per 60 seconds per client IP.

### 8.4 Future Auth & RBAC Preparation
- `@Public()` decorator implemented to exempt public endpoints from upcoming authentication guards.
- `@Roles(...roles: string[])` metadata decorator implemented for future RBAC authorization.

---

## 9. Verification & Testing

### 9.1 Test Suite Breakdown
All tests run with Vitest in `apps/api`:

1. `src/config/env.validation.spec.ts`: Verifies parsing, rejects out-of-range ports, validates `NODE_ENV`, and enforces mandatory `DATABASE_URL` in production (5 tests).
2. `src/common/logger/app-logger.service.spec.ts`: Verifies redaction of passwords, bearer tokens, connection strings, and nested credential objects (4 tests).
3. `src/common/filters/global-exception.filter.spec.ts`: Verifies error envelope format, correlation ID propagation, and production 500 error masking (2 tests).
4. `src/common/interceptors/transform-response.interceptor.spec.ts`: Verifies success response enveloping and paginated response mapping (2 tests).
5. `src/common/middleware/correlation-id.middleware.spec.ts`: Verifies UUID generation and client header preservation (2 tests).
6. `src/common/pipes/validation.pipe.spec.ts`: Verifies payload transformation and rejection of unknown/unwhitelisted fields (4 tests).
7. `src/health/health.controller.spec.ts`: Verifies aggregate check, liveness probe, and readiness probe (3 tests).
8. `src/app.controller.spec.ts`: Verifies root controller instantiation (1 test).
9. `test/app.e2e-spec.ts`: Integration test verifying full HTTP lifecycle, health probes, response enveloping, and client correlation ID tracking (5 tests).

**Total Tests:** 28 passing tests (23 unit tests + 5 e2e tests).

### 9.2 Verification Commands

```bash
# Build NestJS production bundle
pnpm --filter @aic/api build

# Run TypeScript type check
pnpm --filter @aic/api typecheck

# Run linter
pnpm --filter @aic/api lint

# Run unit tests
pnpm --filter @aic/api test

# Run end-to-end integration tests
pnpm --filter @aic/api run test:e2e
```
