-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PUBLIC_APPLICANT', 'REVIEWER', 'PROGRAM_MANAGER', 'CONTENT_EDITOR', 'APPROVER', 'IMPACT_MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "full_name" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PUBLIC_APPLICANT',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "action" VARCHAR(100) NOT NULL,
    "resource" VARCHAR(100) NOT NULL,
    "resource_id" VARCHAR(255),
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "key" VARCHAR(100) NOT NULL,
    "value" JSONB NOT NULL,
    "description" VARCHAR(255),
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_role" ON "users"("role");

-- CreateIndex
CREATE INDEX "idx_users_status" ON "users"("status");

-- CreateIndex
CREATE INDEX "idx_audit_logs_user_id" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "idx_audit_logs_action" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "idx_audit_logs_resource" ON "audit_logs"("resource", "resource_id");

-- CreateIndex
CREATE INDEX "idx_audit_logs_created_at" ON "audit_logs"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
