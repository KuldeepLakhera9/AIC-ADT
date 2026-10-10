# Recorded Dependency Versions & Toolchain Specification
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 2  
**Author:** Senior Full-Stack Engineer  
**Date:** October 10, 2026  
**Status:** **ACTIVE DEPENDENCY INVENTORY**

---

## 1. System Runtime & Toolchain

The following runtime tools were directly inspected and verified in the development environment:

| Runtime / Tool | Version Recorded | Channel | Status |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v26.5.0` | Active Development Runtime | Compatible (Node 20+ LTS supported) |
| **pnpm** | `11.16.0` | Monorepo Package Manager | Active Lockfile Engine |
| **Docker Engine**| `29.6.1` (build `8900f1d`)| Container Runtime | Available for Local Services |
| **Operating System**| macOS (Darwin arm64) | Development Host | Host Environment |

---

## 2. Frontend Application (`@aic/web`) Dependencies

From `apps/web/package.json`:

### Production Dependencies
| Package | Exact Version | Purpose |
| :--- | :--- | :--- |
| **`next`** | `16.4.0` | React framework with App Router, SSR, Turbopack, and image optimization |
| **`react`** | `19.3.0` | UI component runtime with React Server Components (RSC) |
| **`react-dom`** | `19.3.0` | DOM renderer for React |

### Development Dependencies
| Package | Exact Version | Purpose |
| :--- | :--- | :--- |
| **`tailwindcss`** | `^4.0.0` | Utility-first CSS engine consuming Phase 2 design tokens |
| **`@tailwindcss/turbopack`** | `^4.0.0` | High-speed Turbopack integration for Tailwind CSS v4 |
| **`typescript`** | `^5.0.0` | Static type system |
| **`eslint`** | `^9.0.0` | JavaScript / TypeScript static code analysis |
| **`eslint-config-next`** | `16.4.0` | Next.js specific ESLint rules and best practices |
| **`@types/node`** | `^20.0.0` | Node.js type declarations |
| **`@types/react`** | `^19.0.0` | React type declarations |
| **`@types/react-dom`** | `^19.0.0` | React DOM type declarations |

---

## 3. Backend API Engine (`@aic/api`) Dependencies

From `apps/api/package.json`:

### Production Dependencies
| Package | Exact Version | Purpose |
| :--- | :--- | :--- |
| **`@nestjs/common`** | `^12.0.1` | Core NestJS decorators, pipes, filters, and lifecycle hooks |
| **`@nestjs/core`** | `^12.0.1` | NestJS application container and dependency injector |
| **`@nestjs/config`** | `^12.0.1` | Environment variable loader and type-safe configuration provider |
| **`@nestjs/platform-express`** | `^12.0.1` | HTTP web server adapter |
| **`class-validator`** | `^0.14.1` | Declarative request payload validation |
| **`class-transformer`** | `^0.5.1` | Object-to-class transformation and serialization |
| **`reflect-metadata`** | `^0.2.2` | TypeScript decorator reflection polyfill |
| **`rxjs`** | `^7.8.1` | Reactive extensions for asynchronous streams |

### Development Dependencies
| Package | Exact Version | Purpose |
| :--- | :--- | :--- |
| **`@nestjs/cli`** | `^12.0.0` | CLI tooling for building and scaffolding NestJS modules |
| **`@nestjs/schematics`**| `^12.0.0` | Code generation templates |
| **`@nestjs/testing`** | `^12.0.1` | Testing utilities for dependency injection mocking |
| **`vitest`** | `^4.1.2` | High-speed ESM native unit test runner |
| **`oxlint`** | `^1.58.0` | High-speed Rust-based linter |
| **`prettier`** | `^3.4.2` | Code formatting engine |
| **`typescript`** | `^6.0.2` | TypeScript compiler |
| **`supertest`** | `^7.0.0` | HTTP assertion library for integration testing |
| **`@types/express`** | `^5.0.0` | Express type definitions |
| **`@types/node`** | `^24.0.0` | Node.js type definitions |

---

## 4. Root Workspace Dependencies

From root `package.json`:
* **`prettier`:** `^3.4.2` (formats code across the entire monorepo).
* **`unrs-resolver`:** Approved in `.npmrc` for pnpm postinstall scripts.

---

## 5. Dependency Audit & Stability Verification

1. **Vulnerability Audit:** No known high or critical CVE vulnerabilities in installed packages.
2. **Lockfile Integrity:** `pnpm-lock.yaml` is committed at the repository root to ensure 100% reproducible builds across all environments.
3. **Upgrade Policy:** Minor and patch upgrades may be installed via `pnpm update` during weekly sprint maintenance; major version increments require explicit architectural review.
