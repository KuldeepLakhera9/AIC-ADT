# AIC-ADT Baramati Foundation — Docker Development Environment Guide
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 7  
**Author:** Senior DevOps & Platform Engineering Lead  
**Date:** October 10, 2026  
**Status:** **ACTIVE DEVELOPMENT STANDARD**

---

## 1. Executive Summary & Purpose

This operational guide specifies the reproducible Docker development environment for the **AIC-ADT Baramati Foundation** full-stack digital platform. It defines the container orchestration standards, network isolation policies, PostgreSQL lifecycle management, and exact developer workflows for the pnpm monorepo.

### Canonical Locations & File Hierarchy:
* **Canonical Compose Configuration:** [`infra/docker/compose.yaml`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/infra/docker/compose.yaml)
* **Root Convenience Pointer:** [`docker-compose.yml`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docker-compose.yml) (includes `infra/docker/compose.yaml`)
* **Legacy Subdirectory Pointer:** [`docker/docker-compose.dev.yml`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docker/docker-compose.dev.yml) (includes `infra/docker/compose.yaml`)
* **PostgreSQL Initialization Script:** [`infra/docker/postgres/init-user-db.sh`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/infra/docker/postgres/init-user-db.sh)
* **API Development Dockerfile:** [`infra/docker/Dockerfile.api`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/infra/docker/Dockerfile.api) (mirrored in [`apps/api/Dockerfile.dev`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/Dockerfile.dev))
* **Web Development Dockerfile:** [`infra/docker/Dockerfile.web`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/infra/docker/Dockerfile.web) (mirrored in [`apps/web/Dockerfile.dev`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/Dockerfile.dev))

---

## 2. Supported Development Workflows

To balance speed, developer ergonomics, and environment reproducibility, two official workflows are supported:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              LOCAL DEVELOPMENT WORKFLOWS                               │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│   WORKFLOW A: HYBRID MODE (RECOMMENDED)  │    WORKFLOW B: FULL CONTAINERIZED MODE      │
│   • PostgreSQL runs in Docker container  │    • PostgreSQL, NestJS API, and Next.js    │
│   • Next.js & NestJS run on host via pnpm│      all execute inside Docker Compose      │
│   • Ultra-fast Turbopack HMR & watch mode│    • Full environment parity & zero host    │
│   • Direct IDE debugging & native Vitest │      Node.js dependency requirements        │
│   • Port: 127.0.0.1:5432 (Postgres)      │    • Ports: 127.0.0.1:5432, 4000, 3000      │
└──────────────────────────────────────────┴─────────────────────────────────────────────┘
```

### Recommendation Rationale:
On macOS development workstations (Apple Silicon arm64), bind-mounting entire `node_modules` directories into Linux containers creates noticeable filesystem I/O virtualization overhead. **Workflow A (Hybrid)** provides instantaneous Next.js Turbopack compilation and sub-second NestJS reload while keeping the PostgreSQL database completely isolated with zero host pollution. **Workflow B (Full)** is available whenever a developer requires 100% containerized isolation or for CI testing.

---

## 3. Container Topology & Networking Architecture

### 3.1 Network Isolation & Port Security
* **Dedicated Bridge Network:** All services attach to `aic-adt-dev-network` (`driver: bridge`).
* **Loopback-Only Interface (`127.0.0.1`):** In strict accordance with security baseline requirement **SEC-BAS-03**, all published ports are explicitly bound to `127.0.0.1`. **NO PORTS ARE PUBLISHED TO `0.0.0.0` (ALL INTERFACES)**. This prevents accidental exposure to the local Wi-Fi, LAN, or campus network.
* **Service-to-Service DNS:** Containerized services communicate using internal Compose service hostnames:
  * Backend API connects to `postgres:5432` (NEVER `localhost:5432` inside a container).
  * Frontend Web connects to internal backend at `api:4000`.

### 3.2 Service Topology Matrix

| Service | Container Name | Image / Build Context | Internal Port | Host Port Binding | Healthcheck Endpoint / Probe |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`postgres`** | `aic-adt-postgres` | `postgres:16-alpine` | `5432/tcp` | `127.0.0.1:5432:5432` | `pg_isready -U postgres -d postgres` |
| **`api`** | `aic-adt-api` | `infra/docker/Dockerfile.api` | `4000/tcp` | `127.0.0.1:4000:4000` | `GET http://127.0.0.1:4000/api/v1/health/liveness` |
| **`web`** | `aic-adt-web` | `infra/docker/Dockerfile.web` | `3000/tcp` | `127.0.0.1:3000:3000` | `GET http://127.0.0.1:3000/` |

---

## 4. PostgreSQL Configuration & Least-Privilege Provisioning

### 4.1 Role Separation & Shadow Database
The container initialization script ([`infra/docker/postgres/init-user-db.sh`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/infra/docker/postgres/init-user-db.sh)) executes on the first container launch:
1. **Bootstrap Superuser (`postgres`):** Solely utilized during initial database creation and permission granting.
2. **Application Non-Superuser Role (`aic_app`):** Created with `NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT`. All application queries execute strictly under this role.
3. **Application Database (`aic_adt_db`):** UTF-8 encoded, default schema owned by `aic_app`.
4. **Shadow Database (`aic_adt_shadow_db`):** Pre-provisioned shadow database granting `aic_app` full DDL rights. This allows `prisma migrate dev` to execute without requiring dangerous superuser `CREATEDB` privileges.

### 4.2 Persistent Storage Volume
PostgreSQL data files are written to the named volume `aic-adt-postgres-data` (`/var/lib/postgresql/data`). This ensures database records, accounts, and migrations persist across container restarts and host reboots.

---

## 5. Developer Command Reference

### 5.1 Workflow A: Hybrid Development (Recommended)

#### Step 1: Start PostgreSQL in Background
```bash
# Using pnpm workspace helper
pnpm docker:db:up

# Or directly with Docker Compose
docker compose -f infra/docker/compose.yaml up -d postgres
```

#### Step 2: Verify PostgreSQL Health
```bash
docker compose -f infra/docker/compose.yaml ps
```
*Expected status:* `aic-adt-postgres ... Up (healthy)`

#### Step 3: Run Database Migrations & Seeding from Host
```bash
# Execute Prisma migrations
pnpm --filter @aic/api prisma:migrate:dev

# Seed sample institutional records (idempotent)
pnpm --filter @aic/api prisma:seed
```

#### Step 4: Start Frontend and Backend Development Servers on Host
```bash
# In a new terminal window: start both applications in parallel
pnpm dev

# Or start individually:
pnpm dev:api    # NestJS API running on http://localhost:4000
pnpm dev:web    # Next.js Web running on http://localhost:3000
```

---

### 5.2 Workflow B: Full Containerized Stack

#### Step 1: Start All Services via Compose Profile
```bash
# Using pnpm workspace helper
pnpm docker:full:up

# Or directly with Docker Compose (activating profile: full)
docker compose -f infra/docker/compose.yaml --profile full up -d
```

#### Step 2: Verify Full Stack Health
```bash
docker compose -f infra/docker/compose.yaml --profile full ps
```
*Expected status:*
```
NAME               IMAGE                   COMMAND                  SERVICE    STATUS
aic-adt-postgres   postgres:16-alpine      "docker-entrypoint.s…"   postgres   Up (healthy)
aic-adt-api        aic-adt-api             "docker-entrypoint.s…"   api        Up (healthy)
aic-adt-web        aic-adt-web             "docker-entrypoint.s…"   web        Up (healthy)
```

---

### 5.3 Health Probes & Service Verification

#### Verify PostgreSQL Connectivity
```bash
docker exec aic-adt-postgres pg_isready -U aic_app -d aic_adt_db
```

#### Verify Backend API Health (NestJS Probes)
```bash
# Liveness Probe (process responsiveness)
curl -s http://127.0.0.1:4000/api/v1/health/liveness | jq .

# Readiness Probe (active PostgreSQL SELECT 1 query verification)
curl -s http://127.0.0.1:4000/api/v1/health/readiness | jq .
```
*Expected Readiness Response:*
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

#### Verify Frontend Accessibility
```bash
curl -s -I http://127.0.0.1:3000/ | head -n 5
curl -s -I http://127.0.0.1:3000/design-system | head -n 5
```

---

### 5.4 Viewing Service Logs

#### View Combined Logs from All Services
```bash
docker compose -f infra/docker/compose.yaml --profile full logs -f
```

#### View Tail Logs from a Specific Service
```bash
# PostgreSQL logs
pnpm docker:db:logs
# or
docker compose -f infra/docker/compose.yaml logs -f postgres

# Backend API logs (single-line JSON logs with correlation IDs)
docker compose -f infra/docker/compose.yaml --profile full logs -f api

# Frontend Web logs
docker compose -f infra/docker/compose.yaml --profile full logs -f web
```

---

### 5.5 Stopping Services

#### Stop PostgreSQL Container
```bash
pnpm docker:db:down
# or
docker compose -f infra/docker/compose.yaml down
```

#### Stop Full Containerized Stack
```bash
pnpm docker:full:down
# or
docker compose -f infra/docker/compose.yaml --profile full down
```
*(Note: `down` stops and removes containers and internal networks while strictly preserving the persistent volume `aic-adt-postgres-data`.)*

---

### 5.6 Rebuilding Container Images

When package dependencies in `package.json` or `pnpm-lock.yaml` change, force a clean rebuild:

```bash
# Rebuild all images without cache
pnpm docker:full:build
# or
docker compose -f infra/docker/compose.yaml --profile full build --no-cache

# Rebuild only the API container
docker compose -f infra/docker/compose.yaml --profile full build --no-cache api

# Rebuild only the Web container
docker compose -f infra/docker/compose.yaml --profile full build --no-cache web
```

---

### 5.7 Resetting Development Database Data

> [!CAUTION]
> **DESTRUCTIVE OPERATION WARNING:**  
> The following command completely destroys the `aic-adt-postgres-data` persistent volume. All existing database records, user accounts, and test data will be permanently deleted. Only execute this command when resetting the development database to a clean baseline.

```bash
# 1. Stop all running containers and wipe the persistent storage volume
docker compose -f infra/docker/compose.yaml --profile full down -v

# 2. Restart the PostgreSQL container (init-user-db.sh will re-execute cleanly)
pnpm docker:db:up

# 3. Wait 5 seconds for health status: healthy, then re-apply Prisma migrations
pnpm --filter @aic/api prisma:migrate:dev

# 4. Re-populate initial development seed records
pnpm --filter @aic/api prisma:seed
```

---

## 6. Troubleshooting & Gotchas

### 6.1 Docker Daemon Not Running on macOS
**Symptom:**
```
failed to connect to the docker API at unix:///Users/.../.docker/run/docker.sock: connect: no such file or directory
```
**Resolution:**
The Docker Desktop engine is stopped on the workstation.
1. Open Docker Desktop application via macOS Spotlight (`Cmd + Space` -> `Docker`).
2. Wait for the whale icon in the macOS menu bar to turn steady.
3. Test daemon connectivity:
   ```bash
   docker ps
   ```

### 6.2 Port 5432 Already in Use on Host
**Symptom:**
```
Error response from daemon: driver failed programming external connectivity on endpoint aic-adt-postgres: Bind for 127.0.0.1:5432 failed: port is already allocated
```
**Resolution:**
A local PostgreSQL instance (e.g., Homebrew PostgreSQL) is already listening on port 5432.
1. Identify the blocking process:
   ```bash
   lsof -i :5432
   ```
2. Stop the local Homebrew service:
   ```bash
   brew services stop postgresql@16
   # or
   kill -9 <PID>
   ```
3. Restart the Docker container:
   ```bash
   pnpm docker:db:up
   ```

### 6.3 Prisma Schema Engine / Alpine Compatibility
**Symptom:**
```
Error: Prisma Client could not locate the Query Engine for runtime "linux-musl-arm64".
```
**Resolution:**
Alpine Linux uses musl libc instead of glibc. The Dockerfiles ([`infra/docker/Dockerfile.api`](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/infra/docker/Dockerfile.api)) explicitly install `libc6-compat` and `openssl`. If rebuilding locally, ensure `openssl` is present in the Alpine build layer:
```dockerfile
RUN apk add --no-cache libc6-compat openssl curl wget
```

---

## 7. Deployment Boundaries & Non-Production Notice

> [!IMPORTANT]
> **LOCAL DEVELOPMENT SCOPE ONLY:**  
> The Docker Compose configuration detailed in this document is engineered strictly for developer workstations. It MUST NOT be deployed directly to the Baramati campus data-center virtual machines without the Nginx TLS 1.3 reverse proxy ingress, automated encrypted NAS backup daemons, and DMZ VLAN network isolation specified in **Phase 3, Task 10**.
