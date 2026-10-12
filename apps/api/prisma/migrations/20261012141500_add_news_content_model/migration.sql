-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "NewsCategory" AS ENUM ('OFFICIAL_ANNOUNCEMENT', 'FUNDING_MILESTONE', 'INFRASTRUCTURE', 'ECOSYSTEM_PARTNERSHIP');

-- CreateTable
CREATE TABLE "news_articles" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "category" "NewsCategory" NOT NULL DEFAULT 'OFFICIAL_ANNOUNCEMENT',
    "publish_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source_attribution" VARCHAR(200) NOT NULL,
    "external_press_link" VARCHAR(255),
    "thumbnail_asset_id" UUID,
    "current_version" INTEGER NOT NULL DEFAULT 1,
    "author_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "news_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_translations" (
    "id" UUID NOT NULL,
    "article_id" UUID NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "headline" VARCHAR(255) NOT NULL,
    "summary" VARCHAR(500) NOT NULL,
    "content" JSONB NOT NULL,
    "tags" JSONB NOT NULL DEFAULT '[]',
    "key_facts" JSONB,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "published_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "news_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_articles_slug_key" ON "news_articles"("slug");

-- CreateIndex
CREATE INDEX "idx_news_articles_category" ON "news_articles"("category");

-- CreateIndex
CREATE INDEX "idx_news_articles_publish_date" ON "news_articles"("publish_date");

-- CreateIndex
CREATE INDEX "idx_news_articles_author_id" ON "news_articles"("author_id");

-- CreateIndex
CREATE INDEX "idx_news_translations_locale_status" ON "news_translations"("locale", "status");

-- CreateIndex
CREATE UNIQUE INDEX "uq_news_translations_locale" ON "news_translations"("article_id", "locale");

-- AddForeignKey
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_translations" ADD CONSTRAINT "news_translations_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "news_articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
