-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('INTAKE_DEADLINE', 'TECHNICAL_WORKSHOP', 'FIELD_SHOWCASE', 'ECOSYSTEM_CONCLAVE', 'TRAINING_BOOTCAMP');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'REGISTRATION_CLOSED', 'CONCLUDED', 'CANCELLED', 'POSTPONED');

-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('IN_PERSON', 'ONLINE', 'HYBRID');

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "category" "EventCategory" NOT NULL DEFAULT 'TECHNICAL_WORKSHOP',
    "event_status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "end_date" TIMESTAMPTZ(6) NOT NULL,
    "time_range" VARCHAR(100) NOT NULL,
    "venue_type" "VenueType" NOT NULL DEFAULT 'IN_PERSON',
    "organizer" VARCHAR(150) NOT NULL,
    "registration_url" VARCHAR(255),
    "registration_deadline" TIMESTAMPTZ(6),
    "is_external" BOOLEAN NOT NULL DEFAULT false,
    "banner_asset_id" UUID,
    "current_version" INTEGER NOT NULL DEFAULT 1,
    "author_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_translations" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "short_description" VARCHAR(500) NOT NULL,
    "full_description" JSONB NOT NULL,
    "venue_name" VARCHAR(200) NOT NULL,
    "venue_address" VARCHAR(300) NOT NULL,
    "target_audience" JSONB NOT NULL DEFAULT '[]',
    "agenda_highlights" JSONB DEFAULT '[]',
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "reviewer_notes" TEXT,
    "published_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "event_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE INDEX "idx_events_category" ON "events"("category");

-- CreateIndex
CREATE INDEX "idx_events_status" ON "events"("event_status");

-- CreateIndex
CREATE INDEX "idx_events_start_date" ON "events"("start_date");

-- CreateIndex
CREATE INDEX "idx_events_author_id" ON "events"("author_id");

-- CreateIndex
CREATE INDEX "idx_event_translations_locale_status" ON "event_translations"("locale", "status");

-- CreateIndex
CREATE UNIQUE INDEX "uq_event_translations_locale" ON "event_translations"("event_id", "locale");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_translations" ADD CONSTRAINT "event_translations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
