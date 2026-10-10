# AIC-ADT Baramati Foundation — Dependency Maintenance & Supply-Chain Security

## 1. Supply-Chain Security Architecture

To protect the AIC-ADT platform from software supply-chain vulnerabilities, malicious package injections, and unreviewed dependency drift, the monorepo adheres to a strict package management and audit discipline using **pnpm v11+**.

### Key Architectural Tenets

1. **Deterministic Lockfile:** All workspace dependencies are locked in a version-controlled `pnpm-lock.yaml` file. Deployments strictly utilize `pnpm install --frozen-lockfile` to prevent runtime resolution drift.
2. **Build Script Governance:** Following pnpm security policies, arbitrary lifecycle install scripts (`postinstall`, `preinstall`) are blocked by default. Only explicitly approved packages are permitted via `onlyBuiltDependencies` and `allowBuilds` in `pnpm-workspace.yaml`:
   * `@prisma/client`
   * `@prisma/engines`
   * `prisma`
   * `esbuild`
   * `unrs-resolver`
3. **Strict Separation of Concerns:** Build tooling, testing frameworks (`vitest`, `supertest`), and schema compilers (`prisma`) are maintained in `devDependencies`, keeping the production container bundle lean and minimizing the attack surface.

---

## 2. Dependency Audit & Vulnerability Assessment

A full security audit was conducted using `pnpm audit` across both production and development dependency graphs. Findings are reported transparently below:

### 2.1 Production Dependencies Audit (`pnpm audit --prod`)

* **Total Production Vulnerabilities Found:** 1 (High)

| Advisory ID | Package | Vulnerable Versions | Patched Version | Severity | Dependency Chain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GHSA-ggr8-5vv4-36mx** | `deepmerge-ts` | `<8.0.0` | `>=8.0.0` | **High** | `apps/api > @prisma/client > prisma > @prisma/config > deepmerge-ts` |

#### Technical Risk & Exploitability Analysis:
* **Vulnerability Description:** `deepmerge-ts` suffers from stack exhaustion when recursively merging cyclical object graphs.
* **Context & Exposure:** This package is consumed exclusively internally by `@prisma/config` during application startup to load static Prisma schema configuration options. It is **never invoked on untrusted user-supplied network input or API request payloads**.
* **Real-World Exploitability:** **Extremely Low**. An attacker cannot trigger this vulnerability remotely because end-user requests do not interact with Prisma's configuration parser.
* **Remediation Action:** Do not apply forced lockfile overrides that may break Prisma ORM 6.4 internals. Monitor Prisma releases for a patch release bundling `@prisma/config` with `deepmerge-ts >= 8.0.0`.

---

### 2.2 Development Dependencies Audit (`pnpm audit`)

* **Total Development Vulnerabilities Found:** 20 (transitive to dev tooling)

| Package | Severity Summary | Advisory Reference | Dependency Path | Exposure Assessment |
| :--- | :--- | :--- | :--- | :--- |
| `undici` | 5 Low, 7 Moderate, 8 High | GHSA-cxrh-j4jr-qwg3, GHSA-g8m3-5g58-fq7m, GHSA-35p6-xmwp-9g52 | `apps/api > @nestjs/mau > undici` | **Zero Production Impact.** `@nestjs/mau` is a NestJS modular scaffolding CLI utility used only by developers during local code generation. It is excluded from production builds (`dist/`). |

---

## 3. Maintenance Cadence & Operating Procedures

### 3.1 Prohibited Actions
> [!CAUTION]
> **RULE 1: NEVER RUN `pnpm update --latest` ACROSS THE MONOREPO.**
> Bulk unconstrained updates frequently introduce breaking API changes, deprecate type contracts, and invalidate integration tests.
>
> **RULE 2: NEVER USE `--force` OR BYPASS LOCKFILE INTEGRITY CHECKS IN CI/CD.**

### 3.2 Scheduled Maintenance Protocol

1. **Weekly Automated Security Scan:**
   Run automated dependency audits during CI pipeline execution:
   ```bash
   pnpm audit --prod --audit-level=high
   ```
2. **Monthly Patch & Minor Updates:**
   Evaluate and apply backward-compatible patch releases for production dependencies:
   ```bash
   # Check outdated dependencies without modifying package.json
   pnpm outdated

   # Update a specific package within its semantic version constraint
   pnpm --filter @aic/api update @nestjs/core @nestjs/common
   ```
3. **Quarterly Framework Upgrades:**
   Major framework upgrades (e.g. Next.js major releases, NestJS major releases, Prisma major versions) must be planned as dedicated engineering tasks accompanied by staging regression testing, database backup snapshots, and changelog verification.

### 3.3 Verification Checklist After Dependency Changes
Whenever any dependency is added, updated, or removed:
1. Run `pnpm install` and verify `pnpm-lock.yaml` is updated cleanly.
2. Run `pnpm --filter @aic/api typecheck && pnpm --filter @aic/web typecheck`.
3. Run `pnpm --filter @aic/api lint && pnpm --filter @aic/web lint`.
4. Run `pnpm --filter @aic/api test && pnpm --filter @aic/api test:e2e`.
5. Run `pnpm --filter @aic/web test`.
6. Run `pnpm --filter @aic/api build && pnpm --filter @aic/web build`.
