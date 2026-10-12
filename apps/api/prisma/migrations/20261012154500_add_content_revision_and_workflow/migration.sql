-- AlterEnum
ALTER TYPE "ContentStatus" ADD VALUE 'CHANGES_REQUESTED';

-- CreateEnum
CREATE TYPE "ContentEntityType" AS ENUM ('NEWS', 'EVENT', 'STARTUP', 'PROGRAM', 'INSTITUTIONAL_PAGE');

-- CreateTable
CREATE TABLE "content_revisions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entity_type" "ContentEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "version_number" INTEGER NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "data_snapshot" JSONB NOT NULL,
    "author_id" UUID,
    "reviewer_id" UUID,
    "review_notes" TEXT,
    "changelog" VARCHAR(500),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_revisions_entity_version_locale" ON "content_revisions"("entity_type", "entity_id", "version_number", "locale");

-- CreateIndex
CREATE INDEX "idx_revisions_entity" ON "content_revisions"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "idx_revisions_status" ON "content_revisions"("status");

-- CreateIndex
CREATE INDEX "idx_revisions_author" ON "content_revisions"("author_id");

-- CreateIndex
CREATE INDEX "idx_revisions_reviewer" ON "content_revisions"("reviewer_id");

-- CreateIndex
CREATE INDEX "idx_revisions_created_at" ON "content_revisions"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "content_revisions" ADD CONSTRAINT "content_revisions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_revisions" ADD CONSTRAINT "content_revisions_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
