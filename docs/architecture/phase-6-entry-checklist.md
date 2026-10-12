# Phase 6 Entry Checklist & Staging/Production Deployment Plan

**AIC-ADT Baramati Foundation — Atal Incubation Centre**  
**Document Reference**: `AIC-PHASE6-ENTRY-001`  
**Classification**: Infrastructure & Deployment Specification  
**Date**: October 12, 2026

---

## 1. Overview

This document specifies the institutional prerequisites, environment topologies, security gating, and staging acceptance criteria required to transition from **Phase 5 (CMS Core Development)** to **Phase 6 (Secure Staging, Data-Center Provisioning, and Production Deployment)**.

---

## 2. Infrastructure & Operating System Prerequisites

### 2.1 Compute Specifications
- **Operating System**: Ubuntu Server 24.04 LTS (x86_64) or Debian 12 (Bookworm).
- **Staging Cluster / VM**:
  - Minimum 4 vCPU, 8 GB RAM, 50 GB NVMe storage.
- **Production High-Availability Topology**:
  - Web/API Nodes: 2x Application Servers (4 vCPU, 8 GB RAM each).
  - Database Node: Dedicated managed PostgreSQL (AWS RDS / GCP Cloud SQL / Private On-Premise) with 4 vCPU, 16 GB RAM, automated Multi-AZ failover.
- **Node.js Runtime**: Node.js v20.x (LTS) or v22.x (LTS).
- **Package Manager**: pnpm v9.x or v10.x.

---

## 3. Network, DNS & TLS Plan

### 3.1 Domain & DNS Routing
- **Public Domain**: `aic-adt.in` (Apex) and `www.aic-adt.in`.
- **Administrative API**: `api.aic-adt.in` (isolated subdomain).
- **Media Delivery**: `cdn.aic-adt.in` or direct private proxy.
- **Staging Domain**: `staging.aic-adt.in` and `api.staging.aic-adt.in`.
- **DNS Provider**: Enterprise Cloudflare or institutional DNS with DNSSEC enabled.

### 3.2 TLS Certificates & HTTPS Enforcement
- **Certificates**: Automated Let's Encrypt certificates managed via `certbot` or Cloudflare Edge SSL.
- **TLS Configuration**:
  - TLS 1.3 preferred; TLS 1.2 minimum. Deprecate TLS 1.0/1.1.
  - HSTS enabled (`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`).
  - Strict HTTP-to-HTTPS 301 redirection.

---

## 4. Reverse Proxy & Edge Configuration

Nginx or Caddy configured as the ingress controller:

```nginx
# Example Nginx Production Ingress
server {
    listen 443 ssl http2;
    server_name aic-adt.in www.aic-adt.in;

    ssl_certificate /etc/letsencrypt/live/aic-adt.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aic-adt.in/privkey.pem;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip / Brotli compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 5. Environment & Secret Management

- **Storage**: Secrets injected via HashiCorp Vault, AWS Secrets Manager, or Kubernetes Secrets. Never store production `.env` files in git repositories.
- **Required Production Environment Variables**:
  - `DATABASE_URL`: Dedicated database user with restricted permissions (e.g., no `SUPERUSER`).
  - `SESSION_SECRET`: 64-character high-entropy secret.
  - `REVALIDATION_SECRET`: Secure token for Next.js ISR webhooks.
  - `STORAGE_DRIVER`: `s3` or `local`.
  - `S3_BUCKET`, `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`: For private/public object storage.
  - `NODE_ENV`: `production`.

---

## 6. Database Provisioning & Port Restrictions

- **Database Port (`5432`)**: Strictly internal. Bound exclusively to the internal VPC/private subnet (`10.0.0.0/16`) or loopback (`127.0.0.1`). No public internet exposure.
- **Connection Pooling**: PgBouncer or Prisma connection pool sizing configured based on maximum concurrency (`connection_limit = 20` per node).
- **Migrations**: Automated migration step executed via deployment pipeline before switching application traffic (`prisma migrate deploy`).

---

## 7. Logging, Monitoring & Alerting Plan

- **Application Logs**: Winston structured JSON logs streamed to Grafana Loki or AWS CloudWatch.
- **APM & Error Tracking**: Sentry or OpenTelemetry collector for unhandled exceptions.
- **System Metrics**: Prometheus node-exporter tracking CPU, RAM, disk I/O, and PostgreSQL connection saturation.
- **Alert Channels**: Urgent alerts dispatched to institutional DevOps Slack / WhatsApp on 5xx error spikes (>1% for 5 min) or disk usage >80%.

---

## 8. Deployment & Zero-Downtime Rollback Procedure

### 8.1 Deployment Pipeline
1. Run automated quality gate (`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`).
2. Build versioned container images (`aic-web:v1.2.0`, `aic-api:v1.2.0`).
3. Apply database migrations: `prisma migrate deploy`.
4. Rolling restart of API nodes.
5. Rolling restart of Web frontend nodes.
6. Automated post-deployment smoke test suite.

### 8.2 Rollback Runbook
- If post-deployment smoke tests fail:
  1. Revert container image tag to previous stable release (`v1.1.9`).
  2. If migrations were additive, application traffic seamlessly routes to prior version without schema reversion.
  3. Purge edge CDN cache.

---

## 9. Staging Acceptance Criteria

Before declaring production readiness in Phase 6:
- [ ] Staging environment provisioned and running behind HTTPS.
- [ ] Database seeded with sanitized institutional test records.
- [ ] Complete editorial workflow executed by editorial board members on staging.
- [ ] On-demand revalidation tested across desktop and mobile browsers.
- [ ] Automated backup job verified with a test restore into a secondary schema.
- [ ] ClamAV antivirus sidecar validated on file upload dropzone.

---

## 10. Production Go-Live Checklist

- [ ] DNS A/AAAA records point to production ingress.
- [ ] SSL certificates active with auto-renewal verified.
- [ ] Default administrator passwords rotated to institutional password manager.
- [ ] Production database Multi-AZ replication active.
- [ ] Automated nightly backup verified.
- [ ] Rate limits and CORS origin policies active for `https://aic-adt.in`.
- [ ] Monitoring dashboard and alerts verified operational.
- [ ] Institutional sign-off received from AIC-ADT Leadership.
