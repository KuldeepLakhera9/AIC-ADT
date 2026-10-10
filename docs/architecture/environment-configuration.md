# AIC-ADT Baramati Foundation — Environment Configuration Architecture

## 1. Executive Summary & Principles

This document defines the official environment configuration and secret management architecture for the AIC-ADT Baramati Foundation web platform across the Next.js frontend (`apps/web`), NestJS backend API (`apps/api`), PostgreSQL database, and Docker Compose orchestration.

### Core Security Principles

1. **Strict Environment Separation:** Application code must behave consistently across all deployment targets without hardcoded environment conditionals (`if (host === 'localhost')`). Environment behavior is controlled exclusively through declarative configuration variables.
2. **Zero Secrets in Source Control:** No real credentials, private keys, database passwords, or operational tokens may ever be committed to Git. All environment files (`.env`, `.env.*`) are ignored by `.gitignore`.
3. **Least Privilege & Role Separation:** Database credentials use dedicated application roles (`aic_app`), not administrative superusers (`postgres`).
4. **Client-Side Secret Isolation:** Variables exposed to the browser must strictly use the `NEXT_PUBLIC_` prefix and contain only public URLs or localized feature flags. Database connection strings, API secrets, and encryption keys must never be prefixed with `NEXT_PUBLIC_`.
5. **Fail-Fast Configuration Validation:** Missing or malformed environment variables are caught immediately at application startup through schema validation pipes, preventing partially configured services from starting.

---

## 2. Canonical Environment Modes

The platform supports four standardized runtime environments (`NODE_ENV`):

| Environment | Purpose | Database Target | API Origin | Error Details |
| :--- | :--- | :--- | :--- | :--- |
| **`development`** | Local engineer workstation | Local PostgreSQL container or Homebrew (`127.0.0.1:5432`) | `http://localhost:4000/api/v1` | Verbose errors, Prisma query logs enabled |
| **`test`** | Automated CI / unit / e2e test execution | Mocked in memory or ephemeral test database | Ephemeral / Supertest | Sanitized errors, no stdout spam |
| **`staging`** | Pre-production testing in Baramati DMZ | Isolated staging PostgreSQL instance | `https://staging-api.aic-adt.org/api/v1` | Redacted errors, strict CORS |
| **`production`** | Live institutional platform | Hardened on-premise PostgreSQL cluster | `https://api.aic-adt.org/api/v1` | Redacted errors, strict Helmet CSP, strict CORS |

---

## 3. Configuration Variable Classification

Every environment variable utilized across the monorepo is strictly categorized as **Public (Client-Safe)** or **Server Secret (Private)**:

### 3.1 Frontend Variables (`apps/web`)

| Variable Name | Classification | Default (Local Dev) | Production Target | Description |
| :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | **Public** | `development` | `production` | Node.js execution environment. |
| `NEXT_PUBLIC_APP_URL` | **Public** | `http://localhost:3000` | `https://aic-adt.org` | Canonical origin for the frontend website. |
| `NEXT_PUBLIC_API_URL` | **Public** | `http://localhost:4000/api/v1` | `https://api.aic-adt.org/api/v1` | Fully qualified base URL for backend API requests. |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | **Public** | `en` | `en` | Default UI localization code (`en` or `mr`). |

> [!CAUTION]
> **FRONTEND SECURITY RULE:** Any attempt to define a variable like `NEXT_PUBLIC_DATABASE_URL` or `NEXT_PUBLIC_SECRET` will trigger a build-time exception via `apps/web/src/config/env.ts`.

### 3.2 Backend Variables (`apps/api`)

| Variable Name | Classification | Default (Local Dev) | Production Target | Description |
| :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | **Public** | `development` | `production` | Execution environment mode. |
| `PORT` | **Public** | `4000` | `4000` | Internal listening port for Express/NestJS HTTP server. |
| `API_PREFIX` | **Public** | `api/v1` | `api/v1` | Global routing prefix for all REST endpoints. |
| `CORS_ORIGIN` | **Server Config** | `http://localhost:3000` | `https://aic-adt.org` | Comma-separated list of allowlisted browser origins. |
| `DATABASE_URL` | **SERVER SECRET** | `postgresql://aic_app:...` | Host-injected secure credential | Full PostgreSQL connection string for Prisma ORM. |
| `SHADOW_DATABASE_URL` | **Dev Secret** | `postgresql://aic_app:...` | *Unused in production* | Dedicated shadow database URL for dev migration analysis. |
| `LOG_LEVEL` | **Server Config** | `log` | `log` | Minimum log verbosity level (`debug`, `log`, `warn`, `error`). |
| `BODY_LIMIT` | **Server Config** | `1mb` | `1mb` | Maximum HTTP request payload size limit. |
| `THROTTLE_TTL` | **Server Config** | `60` | `60` | Rate limiting sliding window duration in seconds. |
| `THROTTLE_LIMIT` | **Server Config** | `100` | `100` | Maximum allowed requests per IP within the sliding window. |

### 3.3 Container Orchestration Variables (`docker-compose.yml`)

| Variable Name | Classification | Default (Local Dev) | Description |
| :--- | :--- | :--- | :--- |
| `POSTGRES_ADMIN_USER` | **Server Secret** | `postgres` | Superuser account used solely during initial container bootstrap. |
| `POSTGRES_ADMIN_PASSWORD` | **SERVER SECRET** | `postgres_local_dev_password` | Superuser bootstrap password. Never exposed to web app. |
| `POSTGRES_ADMIN_DB` | **Server Config** | `postgres` | Default administrative database for cluster bootstrap. |
| `APP_DB_NAME` | **Server Config** | `aic_adt_db` | Dedicated application database name. |
| `APP_DB_USER` | **Server Config** | `aic_app` | Dedicated non-superuser role used by the application runtime. |
| `APP_DB_PASSWORD` | **SERVER SECRET** | `aic_app_dev_password` | Password for the dedicated application database role. |
| `POSTGRES_PORT` | **Server Config** | `5432` | Host port mapped strictly to `127.0.0.1`. |

---

## 4. Non-Secret Configuration Templates

The repository maintains synchronized, non-secret `.env.example` templates demonstrating valid configuration formats without containing real credentials.

### 4.1 Master Workspace Template (`.env.example`)
```bash
# AIC-ADT Baramati Foundation — Master Environment Configuration Template
# Duplicate this file to .env for local development. Never commit real credentials.

# --- NODE ENVIRONMENT ---
NODE_ENV=development

# --- FRONTEND (Next.js) ---
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_DEFAULT_LOCALE=en

# --- BACKEND (NestJS) ---
PORT=4000
API_PREFIX=api/v1
CORS_ORIGIN=http://localhost:3000

# --- DATABASE (PostgreSQL 16+) ---
# Runtime connection string (uses dedicated non-superuser role 'aic_app')
DATABASE_URL=postgresql://aic_app:CHANGE_ME_DEV_PASSWORD@127.0.0.1:5432/aic_adt_db?schema=public
SHADOW_DATABASE_URL=postgresql://aic_app:CHANGE_ME_DEV_PASSWORD@127.0.0.1:5432/aic_adt_shadow_db?schema=public

# Docker Compose container bootstrap admin (used solely for container creation)
POSTGRES_ADMIN_USER=postgres
POSTGRES_ADMIN_PASSWORD=CHANGE_ME_ADMIN_PASSWORD
POSTGRES_ADMIN_DB=postgres

# Dedicated application database and non-superuser role
APP_DB_NAME=aic_adt_db
APP_DB_USER=aic_app
APP_DB_PASSWORD=CHANGE_ME_DEV_PASSWORD
POSTGRES_PORT=5432

# --- STORAGE ---
STORAGE_PUBLIC_PATH=./storage/public
STORAGE_PRIVATE_PATH=./storage/private
```

---

## 5. Secret Handling & Incident Response Runbook

### 5.1 Prevention Mechanisms
* **`.gitignore` Rules:** Excludes all `.env`, `.env.*`, `*.key`, `*.pem`, `*.crt`, and database dump files (`*.dump`, `*.sql.gz`).
* **Log Redaction:** `AppLoggerService` automatically intercepts and redacts password strings, authentication bearer tokens, session cookies, and database connection URIs (`postgresql://user:***@host...`) before writing JSON log lines.
* **Error Sanitization:** `GlobalExceptionFilter` intercepts all HTTP exceptions and database errors, stripping internal connection parameters and stack traces before returning a uniform error envelope to clients.

### 5.2 Secret Exposure Incident & Rotation Runbook

If any database password, API key, or cryptographic token is inadvertently exposed (e.g. committed to Git, pasted into an issue tracker, or logged to disk), follow this mandatory 5-step incident response procedure immediately:

#### Step 1: Revoke the Compromised Credential
Do not merely delete the file from Git. Once committed, credentials must be considered compromised.
```bash
# For PostgreSQL role compromise:
psql -h 127.0.0.1 -U postgres -d aic_adt_db -c \
  "ALTER ROLE aic_app WITH PASSWORD '<NEW_STRONG_GENERATED_PASSWORD>';"
```

#### Step 2: Terminate Active Sessions
Terminate all active connections utilizing the old credentials:
```bash
psql -h 127.0.0.1 -U postgres -d postgres -c \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE usename = 'aic_app' AND pid <> pg_backend_pid();"
```

#### Step 3: Update Host Environment Configuration
Update the production secrets stored in the host environment or Docker secrets store (`/etc/environment` or secure vault). Never edit files in tracked Git directories.

#### Step 4: Restart Application Containers
Perform a zero-downtime rolling restart of the backend API services:
```bash
docker compose restart api
```

#### Step 5: Verify Health & Audit Git History
1. Verify system readiness probe returns `200 OK`:
   ```bash
   curl -i http://localhost:4000/api/v1/health/readiness
   ```
2. Scan the Git repository history to confirm the credential has been removed from all branches:
   ```bash
   git log -S "<COMPROMISED_STRING>" --all
   ```
