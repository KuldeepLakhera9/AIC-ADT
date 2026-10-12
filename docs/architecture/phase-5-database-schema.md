# Phase 5 Database Schema Specification & Prisma Architecture

**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 2)  
**Roles:** Lead Database Administrator, Principal Software Architect  
**Date:** October 12, 2026  
**Status:** **TECHNICAL SPECIFICATION — READY FOR MIGRATION SCRIPTING**  

---

## 1. Executive Summary

This document specifies the PostgreSQL 16+ database schema and Prisma ORM definition for the AIC-ADT Content Management System.

The schema extends the existing foundation (`users`, `audit_logs`, `system_settings`) established in Phase 3 without dropping or truncating existing records. It introduces relational models for authentication sessions, media management, content translations, review governance, and the six core operational content domains (Startups, Events, News, Publications, Programs, Facilities).

---

## 2. Proposed Prisma Schema (`schema.prisma`)

```prisma
// ==============================================================================
// AIC-ADT Baramati Foundation — Prisma Schema
// Phase 5 Evolution: Complete Headless CMS & Dynamic Publishing Engine
// Database: PostgreSQL 16+ Relational Engine with Devanagari UTF-8 Support
// ==============================================================================

datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ------------------------------------------------------------------------------
// ENUMS
// ------------------------------------------------------------------------------

enum Role {
  PUBLIC_APPLICANT
  REVIEWER
  PROGRAM_MANAGER
  CONTENT_AUTHOR
  CONTENT_EDITOR
  APPROVER
  IMPACT_MANAGER
  ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

enum ContentStatus {
  DRAFT
  IN_REVIEW
  CHANGES_REQUESTED
  APPROVED
  PUBLISHED
  ARCHIVED
}

enum Sector {
  AGRI_TECH
  SMART_FARMING
  BIOTECHNOLOGY
  FOOD_PROCESSING
  CLIMATE_TECH
  AGRIBUSINESS
}

enum EventCategory {
  INTAKE_DEADLINE
  TECHNICAL_WORKSHOP
  FIELD_SHOWCASE
  ECOSYSTEM_CONCLAVE
  TRAINING_BOOTCAMP
}

enum EventStatus {
  UPCOMING
  REGISTRATION_CLOSED
  CONCLUDED
  POSTPONED
}

enum VenueType {
  IN_PERSON
  ONLINE
  HYBRID
}

enum NewsCategory {
  OFFICIAL_ANNOUNCEMENT
  FUNDING_MILESTONE
  INFRASTRUCTURE
  ECOSYSTEM_PARTNERSHIP
}

enum PublicationCategory {
  ANNUAL_REPORT
  RESEARCH_WHITEPAPER
  PROGRAM_GUIDELINE
  POLICY_COMPLIANCE
  BRAND_ASSET
}

enum ProgramType {
  CORE_PROGRAM
  FUNDING_SCHEME
}

enum ProgramStatus {
  ACTIVE_INTAKE
  ROLLING_REVIEW
  UPCOMING_CALL
}

enum ReviewDecision {
  APPROVED
  CHANGES_REQUESTED
  REJECTED
}

// ------------------------------------------------------------------------------
// IDENTITY & AUTHENTICATION MODELS
// ------------------------------------------------------------------------------

model User {
  id           String     @id @default(uuid()) @db.Uuid
  email        String     @unique @db.VarChar(255)
  phone        String?    @db.VarChar(20)
  fullName     String     @map("full_name") @db.VarChar(150)
  passwordHash String     @map("password_hash") @db.VarChar(255)
  role         Role       @default(PUBLIC_APPLICANT)
  status       UserStatus @default(ACTIVE)
  createdAt    DateTime   @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt    DateTime   @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  sessions         Session[]
  auditLogs        AuditLog[]
  mediaAssets      MediaAsset[]      @relation("UploadedMedia")
  contentRevisions ContentRevision[] @relation("AuthoredRevisions")
  reviewRecords    ReviewRecord[]    @relation("ReviewerDecisions")

  @@index([role], name: "idx_users_role")
  @@index([status], name: "idx_users_status")
  @@map("users")
}

model Session {
  id         String   @id @default(uuid()) @db.Uuid
  userId     String   @map("user_id") @db.Uuid
  tokenHash  String   @unique @map("token_hash") @db.VarChar(255)
  expiresAt  DateTime @map("expires_at") @db.Timestamptz(6)
  ipAddress  String?  @map("ip_address") @db.VarChar(45)
  userAgent  String?  @map("user_agent") @db.Text
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  // Relationships
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId], name: "idx_sessions_user_id")
  @@index([expiresAt], name: "idx_sessions_expires_at")
  @@map("sessions")
}

// ------------------------------------------------------------------------------
// DIGITAL ASSET STORE
// ------------------------------------------------------------------------------

model MediaAsset {
  id             String    @id @default(uuid()) @db.Uuid
  filename       String    @unique @db.VarChar(255)
  originalName   String    @map("original_name") @db.VarChar(255)
  mimeType       String    @map("mime_type") @db.VarChar(100)
  fileSizeBytes  BigInt    @map("file_size_bytes")
  storagePath    String    @map("storage_path") @db.VarChar(500)
  isPrivate      Boolean   @default(false) @map("is_private")
  altText        String    @map("alt_text") @db.VarChar(255)
  caption        String?   @db.VarChar(255)
  checksumSha256 String    @map("checksum_sha256") @db.VarChar(64)
  uploadedById   String?   @map("uploaded_by_id") @db.Uuid
  createdAt      DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)

  // Relationships
  uploadedBy     User?     @relation("UploadedMedia", fields: [uploadedById], references: [id], onDelete: SetNull)
  startupLogos   Startup[] @relation("StartupLogo")
  eventBanners   Event[]   @relation("EventBanner")
  newsThumbnails NewsArticle[] @relation("NewsThumbnail")
  publicationPdfs Publication[] @relation("PublicationPdf")
  facilityImages Facility[] @relation("FacilityHero")

  @@index([mimeType], name: "idx_media_assets_mime_type")
  @@index([isPrivate], name: "idx_media_assets_is_private")
  @@map("media_assets")
}

// ------------------------------------------------------------------------------
// CONTENT DOMAIN MODELS (PARENT & TRANSLATIONS)
// ------------------------------------------------------------------------------

// 1. STARTUP DIRECTORY
model Startup {
  id                 String               @id @default(uuid()) @db.Uuid
  slug               String               @unique @db.VarChar(100)
  sector             Sector
  cohort             String               @db.VarChar(100)
  fundingScheme      String               @map("funding_scheme") @db.VarChar(100)
  founders           String               @db.VarChar(255)
  location           String               @db.VarChar(150)
  reachMetric        String               @map("reach_metric") @db.VarChar(100)
  labsUsed           String               @map("labs_used") @db.VarChar(255)
  trlLevel           String               @map("trl_level") @db.VarChar(20)
  websiteUrl         String?              @map("website_url") @db.VarChar(255)
  logoAssetId        String?              @map("logo_asset_id") @db.Uuid
  verified           Boolean              @default(true)
  featuredInHomepage Boolean              @default(false) @map("featured_in_homepage")
  currentVersion     Int                  @default(1) @map("current_version")
  createdAt          DateTime             @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt          DateTime             @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  logo               MediaAsset?          @relation("StartupLogo", fields: [logoAssetId], references: [id], onDelete: SetNull)
  translations       StartupTranslation[]

  @@index([sector], name: "idx_startups_sector")
  @@index([cohort], name: "idx_startups_cohort")
  @@index([verified], name: "idx_startups_verified")
  @@index([featuredInHomepage], name: "idx_startups_featured")
  @@map("startups")
}

model StartupTranslation {
  id                 String        @id @default(uuid()) @db.Uuid
  startupId          String        @map("startup_id") @db.Uuid
  locale             String        @db.VarChar(5) // 'en' or 'mr'
  name               String        @db.VarChar(150)
  tagline            String        @db.VarChar(255)
  overview           String        @db.Text
  problemStatement   String        @map("problem_statement") @db.Text
  solutionInnovation String        @map("solution_innovation") @db.Text
  milestones         Json          @db.JsonB
  status             ContentStatus @default(DRAFT)
  publishedAt        DateTime?     @map("published_at") @db.Timestamptz(6)
  archivedAt         DateTime?     @map("archived_at") @db.Timestamptz(6)
  createdAt          DateTime      @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt          DateTime      @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  startup            Startup       @relation(fields: [startupId], references: [id], onDelete: Cascade)

  @@unique([startupId, locale], name: "uq_startup_translations_locale")
  @@index([locale, status], name: "idx_startup_translations_locale_status")
  @@map("startup_translations")
}

// 2. EVENTS & WORKSHOPS
model Event {
  id                   String             @id @default(uuid()) @db.Uuid
  slug                 String             @unique @db.VarChar(100)
  category             EventCategory
  eventStatus          EventStatus        @default(UPCOMING) @map("event_status")
  startDate            DateTime           @map("start_date") @db.Timestamptz(6)
  endDate              DateTime           @map("end_date") @db.Timestamptz(6)
  timeRange            String             @map("time_range") @db.VarChar(100)
  venueType            VenueType          @default(IN_PERSON) @map("venue_type")
  organizer            String             @db.VarChar(150)
  registrationUrl      String?            @map("registration_url") @db.VarChar(255)
  registrationDeadline DateTime?          @map("registration_deadline") @db.Timestamptz(6)
  isExternal           Boolean            @default(false) @map("is_external")
  bannerAssetId        String?            @map("banner_asset_id") @db.Uuid
  currentVersion       Int                @default(1) @map("current_version")
  createdAt            DateTime           @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt            DateTime           @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  banner               MediaAsset?        @relation("EventBanner", fields: [bannerAssetId], references: [id], onDelete: SetNull)
  translations         EventTranslation[]

  @@index([category], name: "idx_events_category")
  @@index([eventStatus], name: "idx_events_status")
  @@index([startDate], name: "idx_events_start_date")
  @@map("events")
}

model EventTranslation {
  id               String        @id @default(uuid()) @db.Uuid
  eventId          String        @map("event_id") @db.Uuid
  locale           String        @db.VarChar(5)
  title            String        @db.VarChar(255)
  shortDescription String        @map("short_description") @db.VarChar(500)
  fullDescription  Json          @map("full_description") @db.JsonB // Array of string paragraphs
  venueName        String        @map("venue_name") @db.VarChar(200)
  venueAddress     String        @map("venue_address") @db.VarChar(300)
  targetAudience   Json          @map("target_audience") @db.JsonB
  status           ContentStatus @default(DRAFT)
  publishedAt      DateTime?     @map("published_at") @db.Timestamptz(6)
  archivedAt       DateTime?     @map("archived_at") @db.Timestamptz(6)
  createdAt        DateTime      @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt        DateTime      @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  event            Event         @relation(fields: [eventId], references: [id], onDelete: Cascade)

  @@unique([eventId, locale], name: "uq_event_translations_locale")
  @@index([locale, status], name: "idx_event_translations_locale_status")
  @@map("event_translations")
}

// 3. NEWS & PRESS ANNOUNCEMENTS
model NewsArticle {
  id                String            @id @default(uuid()) @db.Uuid
  slug              String            @unique @db.VarChar(100)
  category          NewsCategory
  publishDate       DateTime          @map("publish_date") @db.Timestamptz(6)
  sourceAttribution String            @map("source_attribution") @db.VarChar(200)
  externalPressLink String?           @map("external_press_link") @db.VarChar(255)
  thumbnailAssetId  String?           @map("thumbnail_asset_id") @db.Uuid
  currentVersion    Int               @default(1) @map("current_version")
  createdAt         DateTime          @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt         DateTime          @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  thumbnail         MediaAsset?       @relation("NewsThumbnail", fields: [thumbnailAssetId], references: [id], onDelete: SetNull)
  translations      NewsTranslation[]

  @@index([category], name: "idx_news_articles_category")
  @@index([publishDate], name: "idx_news_articles_publish_date")
  @@map("news_articles")
}

model NewsTranslation {
  id          String        @id @default(uuid()) @db.Uuid
  articleId   String        @map("article_id") @db.Uuid
  locale      String        @db.VarChar(5)
  headline    String        @db.VarChar(255)
  summary     String        @db.VarChar(500)
  content     Json          @db.JsonB // Array of string paragraphs
  tags        Json          @db.JsonB // Array of strings
  keyFacts    Json          @map("key_facts") @db.JsonB // Array of { label, value }
  status      ContentStatus @default(DRAFT)
  publishedAt DateTime?     @map("published_at") @db.Timestamptz(6)
  archivedAt  DateTime?     @map("archived_at") @db.Timestamptz(6)
  createdAt   DateTime      @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt   DateTime      @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  article     NewsArticle   @relation(fields: [articleId], references: [id], onDelete: Cascade)

  @@unique([articleId, locale], name: "uq_news_translations_locale")
  @@index([locale, status], name: "idx_news_translations_locale_status")
  @@map("news_translations")
}

// 4. PUBLICATIONS & POLICY REPORTS
model Publication {
  id              String                   @id @default(uuid()) @db.Uuid
  slug            String                   @unique @db.VarChar(100)
  category        PublicationCategory
  reportingPeriod String?                  @map("reporting_period") @db.VarChar(50)
  publicationDate DateTime                 @map("publication_date") @db.Timestamptz(6)
  documentAssetId String                   @map("document_asset_id") @db.Uuid
  fileSizeBytes   BigInt                   @map("file_size_bytes")
  pageCount       Int                      @map("page_count")
  isStatutory     Boolean                  @default(false) @map("is_statutory")
  currentVersion  Int                      @default(1) @map("current_version")
  createdAt       DateTime                 @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt       DateTime                 @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  documentPdf     MediaAsset               @relation("PublicationPdf", fields: [documentAssetId], references: [id], onDelete: Restrict)
  translations    PublicationTranslation[]

  @@index([category], name: "idx_publications_category")
  @@index([publicationDate], name: "idx_publications_date")
  @@index([isStatutory], name: "idx_publications_statutory")
  @@map("publications")
}

model PublicationTranslation {
  id                String        @id @default(uuid()) @db.Uuid
  publicationId     String        @map("publication_id") @db.Uuid
  locale            String        @db.VarChar(5)
  title             String        @db.VarChar(255)
  summary           String        @db.Text
  keyHighlights     Json          @map("key_highlights") @db.JsonB
  issuingAuthority  String        @map("issuing_authority") @db.VarChar(200)
  verificationBadge String        @map("verification_badge") @db.VarChar(100)
  status            ContentStatus @default(DRAFT)
  publishedAt       DateTime?     @map("published_at") @db.Timestamptz(6)
  archivedAt        DateTime?     @map("archived_at") @db.Timestamptz(6)
  createdAt         DateTime      @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt         DateTime      @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  publication       Publication   @relation(fields: [publicationId], references: [id], onDelete: Cascade)

  @@unique([publicationId, locale], name: "uq_publication_translations_locale")
  @@index([locale, status], name: "idx_publication_translations_locale_status")
  @@map("publication_translations")
}

// 5. INCUBATION PROGRAMS & SCHEMES
model Program {
  id             String               @id @default(uuid()) @db.Uuid
  slug           String               @unique @db.VarChar(100)
  type           ProgramType          @default(CORE_PROGRAM)
  stage          String               @db.VarChar(100)
  duration       String               @db.VarChar(50)
  trlLevel       String               @map("trl_level") @db.VarChar(50)
  status         ProgramStatus        @default(ACTIVE_INTAKE)
  applicationUrl String               @map("application_url") @db.VarChar(255)
  currentVersion Int                  @default(1) @map("current_version")
  createdAt      DateTime             @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt      DateTime             @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  translations   ProgramTranslation[]

  @@index([type], name: "idx_programs_type")
  @@index([status], name: "idx_programs_status")
  @@map("programs")
}

model ProgramTranslation {
  id               String        @id @default(uuid()) @db.Uuid
  programId        String        @map("program_id") @db.Uuid
  locale           String        @db.VarChar(5)
  name             String        @db.VarChar(150)
  tagline          String        @db.VarChar(255)
  summary          String        @db.Text
  audience         Json          @db.JsonB
  offerings        Json          @db.JsonB
  eligibility      Json          @db.JsonB
  selectionProcess Json          @map("selection_process") @db.JsonB
  fundingScope     String        @map("funding_scope") @db.VarChar(255)
  status           ContentStatus @default(DRAFT)
  publishedAt      DateTime?     @map("published_at") @db.Timestamptz(6)
  archivedAt       DateTime?     @map("archived_at") @db.Timestamptz(6)
  createdAt        DateTime      @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt        DateTime      @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  program          Program       @relation(fields: [programId], references: [id], onDelete: Cascade)

  @@unique([programId, locale], name: "uq_program_translations_locale")
  @@index([locale, status], name: "idx_program_translations_locale_status")
  @@map("program_translations")
}

// 6. TESTING FACILITIES & INFRASTRUCTURE
model Facility {
  id             String                @id @default(uuid()) @db.Uuid
  slug           String                @unique @db.VarChar(100)
  accreditation  String?               @db.VarChar(100) // e.g., NABL TC-8241
  equipmentList  Json                  @map("equipment_list") @db.JsonB
  contactOfficer String                @map("contact_officer") @db.VarChar(150)
  contactEmail   String                @map("contact_email") @db.VarChar(255)
  contactPhone   String                @map("contact_phone") @db.VarChar(20)
  heroAssetId    String?               @map("hero_asset_id") @db.Uuid
  currentVersion Int                   @default(1) @map("current_version")
  createdAt      DateTime              @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt      DateTime              @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  heroImage      MediaAsset?           @relation("FacilityHero", fields: [heroAssetId], references: [id], onDelete: SetNull)
  translations   FacilityTranslation[]

  @@map("facilities")
}

model FacilityTranslation {
  id           String        @id @default(uuid()) @db.Uuid
  facilityId   String        @map("facility_id") @db.Uuid
  locale       String        @db.VarChar(5)
  name         String        @db.VarChar(150)
  tagline      String        @db.VarChar(255)
  description  String        @db.Text
  keyFeatures  Json          @map("key_features") @db.JsonB
  bookingRules String        @map("booking_rules") @db.Text
  status       ContentStatus @default(DRAFT)
  publishedAt  DateTime?     @map("published_at") @db.Timestamptz(6)
  archivedAt   DateTime?     @map("archived_at") @db.Timestamptz(6)
  createdAt    DateTime      @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt    DateTime      @updatedAt @map("updated_at") @db.Timestamptz(6)

  // Relationships
  facility     Facility      @relation(fields: [facilityId], references: [id], onDelete: Cascade)

  @@unique([facilityId, locale], name: "uq_facility_translations_locale")
  @@index([locale, status], name: "idx_facility_translations_locale_status")
  @@map("facility_translations")
}

// ------------------------------------------------------------------------------
// GOVERNANCE, VERSIONING & AUDIT TRAILS
// ------------------------------------------------------------------------------

model ContentRevision {
  id            String   @id @default(uuid()) @db.Uuid
  entityType    String   @map("entity_type") @db.VarChar(50)
  entityId      String   @map("entity_id") @db.Uuid
  versionNumber Int      @map("version_number")
  locale        String   @db.VarChar(5)
  dataSnapshot  Json     @map("data_snapshot") @db.JsonB
  authorId      String   @map("author_id") @db.Uuid
  changeSummary String   @map("change_summary") @db.VarChar(255)
  createdAt     DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  // Relationships
  author        User     @relation("AuthoredRevisions", fields: [authorId], references: [id], onDelete: Restrict)
  reviewRecords ReviewRecord[]

  @@index([entityType, entityId], name: "idx_content_revisions_entity")
  @@index([authorId], name: "idx_content_revisions_author")
  @@map("content_revisions")
}

model ReviewRecord {
  id          String         @id @default(uuid()) @db.Uuid
  entityType  String         @map("entity_type") @db.VarChar(50)
  entityId    String         @map("entity_id") @db.Uuid
  locale      String         @db.VarChar(5)
  revisionId  String         @map("revision_id") @db.Uuid
  reviewerId  String         @map("reviewer_id") @db.Uuid
  decision    ReviewDecision
  reviewNotes String?        @map("review_notes") @db.Text
  createdAt   DateTime       @default(now()) @map("created_at") @db.Timestamptz(6)

  // Relationships
  revision    ContentRevision @relation(fields: [revisionId], references: [id], onDelete: Cascade)
  reviewer    User            @relation("ReviewerDecisions", fields: [reviewerId], references: [id], onDelete: Restrict)

  @@index([entityType, entityId], name: "idx_review_records_entity")
  @@index([reviewerId], name: "idx_review_records_reviewer")
  @@map("review_records")
}

model AuditLog {
  id         String   @id @default(uuid()) @db.Uuid
  userId     String?  @map("user_id") @db.Uuid
  action     String   @db.VarChar(100)
  resource   String   @db.VarChar(100)
  resourceId String?  @map("resource_id") @db.VarChar(255)
  ipAddress  String?  @map("ip_address") @db.VarChar(45)
  userAgent  String?  @map("user_agent") @db.Text
  metadata   Json?    @db.JsonB
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  // Relationships
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId], name: "idx_audit_logs_user_id")
  @@index([action], name: "idx_audit_logs_action")
  @@index([resource, resourceId], name: "idx_audit_logs_resource")
  @@index([createdAt(sort: Desc)], name: "idx_audit_logs_created_at")
  @@map("audit_logs")
}

model SystemSetting {
  key         String   @id @db.VarChar(100)
  value       Json     @db.JsonB
  description String?  @db.VarChar(255)
  isPublic    Boolean  @default(false) @map("is_public")
  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)

  @@map("system_settings")
}
```

---

## 3. Migration Roadmap & Zero Data Loss Guarantee

The transition from Phase 3 foundation to Phase 5 CMS proceeds via standard Prisma migration tooling:

1. **Safety Verification:** The migration adds new tables and foreign key relations. Existing tables (`users`, `audit_logs`, `system_settings`) retain 100% of their schema and existing rows without dropping columns or tables.
2. **Draft Generation Command:**
   ```bash
   pnpm --filter @aic/api exec prisma migrate dev --name add_cms_domain_models --create-only
   ```
3. **Execution Verification:** Once reviewed, the migration is applied in development via `pnpm --filter @aic/api prisma:migrate:dev`.
