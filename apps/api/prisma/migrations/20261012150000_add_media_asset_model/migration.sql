-- CreateEnum
CREATE TYPE "MediaVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'DOCUMENT', 'VIDEO', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('ANNUAL_REPORT', 'FINANCIAL_AUDIT', 'POLICY_REGULATION', 'PITCH_DECK', 'EVENT_BROCHURE', 'OTHER');

-- CreateTable
CREATE TABLE "media_assets" (
    "id" UUID NOT NULL,
    "original_name" VARCHAR(255) NOT NULL,
    "storage_key" VARCHAR(500) NOT NULL,
    "storage_path" VARCHAR(500) NOT NULL,
    "public_url" VARCHAR(500),
    "mime_type" VARCHAR(100) NOT NULL,
    "file_size_bytes" INTEGER NOT NULL,
    "file_extension" VARCHAR(20) NOT NULL,
    "checksum_sha256" VARCHAR(64) NOT NULL,
    "media_type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "width" INTEGER,
    "height" INTEGER,
    "alt_text_en" VARCHAR(255),
    "alt_text_mr" VARCHAR(255),
    "caption" VARCHAR(500),
    "attribution" VARCHAR(255),
    "document_type" "DocumentType",
    "reporting_period" VARCHAR(50),
    "is_statutory" BOOLEAN NOT NULL DEFAULT false,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "uploader_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_assets_storage_key_key" ON "media_assets"("storage_key");

-- CreateIndex
CREATE INDEX "idx_media_assets_type" ON "media_assets"("media_type");

-- CreateIndex
CREATE INDEX "idx_media_assets_visibility" ON "media_assets"("visibility");

-- CreateIndex
CREATE INDEX "idx_media_assets_doc_type" ON "media_assets"("document_type");

-- CreateIndex
CREATE INDEX "idx_media_assets_uploader_id" ON "media_assets"("uploader_id");

-- CreateIndex
CREATE INDEX "idx_media_assets_created_at" ON "media_assets"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_uploader_id_fkey" FOREIGN KEY ("uploader_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
