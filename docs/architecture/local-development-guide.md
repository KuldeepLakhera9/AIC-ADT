# Local Development Guide
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 2  
**Author:** Senior Full-Stack Engineer  
**Date:** October 10, 2026  
**Status:** **OPERATIONAL DEVELOPER GUIDE**

---

## 1. Prerequisites

Before setting up the repository locally, ensure your development environment satisfies these requirements:

| Tool | Minimum Version | Verified Tested Version | Installation Check |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>= 20.0.0` (LTS) | `v26.5.0` | `node -v` |
| **pnpm** | `>= 11.0.0` | `11.16.0` | `pnpm -v` |
| **Git** | `>= 2.30.0` | `2.39+` | `git --version` |

*Note: If `pnpm` is not installed on your system, install it via Corepack or Homebrew:*
```bash
corepack enable
corepack prepare pnpm@latest --activate
# Or via Homebrew: brew install pnpm
```

---

## 2. Quickstart Setup

Clone or navigate to the repository directory:
```bash
cd ~/Projects/AIC-ADT
```

### Step 2.1: Configure Environment Variables
Duplicate the root environment template:
```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

### Step 2.2: Install Workspace Dependencies
Install dependencies using pnpm at the repository root:
```bash
pnpm install
```
*Note: Due to pnpm v11+ security policies, unrs-resolver has been pre-configured in `.npmrc` to allow build scripts.*

---

## 3. Running the Applications

### Option A: Run Both Frontend and Backend Concurrently (Recommended)
```bash
pnpm dev
```
* **Frontend Portal:** [`http://localhost:3000`](http://localhost:3000)
* **Backend API:** [`http://localhost:4000/api/v1`](http://localhost:4000/api/v1)
* **Health Endpoint:** [`http://localhost:4000/api/v1/health`](http://localhost:4000/api/v1/health)

### Option B: Run Frontend Only
```bash
pnpm dev:web
# Equivalent to: pnpm --filter @aic/web dev
```

### Option C: Run Backend API Only
```bash
pnpm dev:api
# Equivalent to: pnpm --filter @aic/api dev
```

---

## 4. Verification and Quality Checks

Run the following commands from the repository root to verify code quality across the monorepo:

### 4.1 Production Builds
```bash
pnpm build
```
Executes Next.js static generation (`next build`) and NestJS compilation (`nest build`). Both packages must compile with exit code 0.

### 4.2 Type Checking
```bash
pnpm typecheck
```
Executes TypeScript compilers (`tsc --noEmit`) in strict mode across `@aic/web` and `@aic/api`.

### 4.3 Linting
```bash
pnpm lint
```
Lints `@aic/web` using ESLint and `@aic/api` using Oxlint/ESLint.

### 4.4 Automated Unit Tests
```bash
pnpm test
```
Runs the Vitest test runner in `@aic/api` and test suites in `@aic/web`.

### 4.5 Formatting Checks
```bash
pnpm format:check
# To automatically format files:
pnpm format
```

---

## 5. Troubleshooting Common Issues

### Issue 1: Port 3000 or 4000 Already in Use
* **Symptom:** `Error: listen EADDRINUSE: address already in use :::3000` or `:::4000`.
* **Fix:** Identify and terminate the conflicting process:
  ```bash
  lsof -i :3000
  lsof -i :4000
  kill -9 <PID>
  ```
  Or change the port in `.env` (e.g. `PORT=4001`).

### Issue 2: NodeNext ESM Import Resolution Errors in Backend
* **Symptom:** `Cannot find module './health.service' or its corresponding type declarations.`
* **Fix:** Under NodeNext ESM (`apps/api`), all relative internal imports must include the `.js` extension explicitly (e.g., `import { HealthService } from './health.service.js';`).

### Issue 3: Turbopack Prerender Warnings in Next.js
* **Symptom:** `Next.js encountered the unstable value new Date() while prerendering.`
* **Fix:** Avoid calling `new Date()` inside static server components intended for prerendering. Use a constant or render the dynamic timestamp on the client with `'use client'`.

### Issue 4: Filter Syntax in pnpm
* To run commands on a specific workspace member:
  ```bash
  pnpm --filter @aic/web <command>
  pnpm --filter @aic/api <command>
  ```
