import { describe, it, expect, beforeEach } from 'vitest';
import { EventService } from './event.service.js';
import { PrismaService } from '../../database/prisma.service.js';
import { AuthenticatedUser, Permission, Role, UserStatus } from '../../auth/auth.types.js';
import { EventCategory, EventStatus, VenueType, ContentStatus } from '@prisma/client';
import {
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

describe('EventService', () => {
  let service: EventService;
  let prismaMock: Partial<PrismaService>;

  const adminUser: AuthenticatedUser = {
    id: 'admin-uuid-1',
    email: 'admin@aic-adt.org',
    fullName: 'Super Admin',
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    permissions: Object.values(Permission),
  };

  const editorUser: AuthenticatedUser = {
    id: 'editor-uuid-2',
    email: 'editor@aic-adt.org',
    fullName: 'Event Coordinator',
    role: Role.CONTENT_EDITOR,
    status: UserStatus.ACTIVE,
    permissions: [
      Permission.DASHBOARD_READ,
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
      Permission.CONTENT_UPDATE,
      Permission.CONTENT_SUBMIT_REVIEW,
    ],
  };

  const otherEditor: AuthenticatedUser = {
    id: 'other-uuid-3',
    email: 'other@aic-adt.org',
    fullName: 'Other Coordinator',
    role: Role.CONTENT_EDITOR,
    status: UserStatus.ACTIVE,
    permissions: [
      Permission.CONTENT_READ,
      Permission.CONTENT_UPDATE,
    ],
  };

  beforeEach(() => {
    prismaMock = {
      connected: false,
    };
    service = new EventService(prismaMock as PrismaService);
  });

  it('creates a new draft event and translation with validated dates and author context', async () => {
    const created = await service.createEvent(
      {
        slug: 'agri-drone-workshop-2026',
        category: EventCategory.TECHNICAL_WORKSHOP,
        eventStatus: EventStatus.UPCOMING,
        startDate: '2026-11-15T09:30:00.000Z',
        endDate: '2026-11-16T17:00:00.000Z',
        timeRange: '09:30 AM - 05:00 PM IST',
        venueType: VenueType.IN_PERSON,
        organizer: 'Centre for Precision Agriculture, AIC-ADT',
        locale: 'en',
        title: 'Precision Agricultural Drone Flight and Multispectral Mapping Workshop',
        shortDescription: 'Hands-on flight calibration and sensor telemetry workshop on Baramati farms.',
        fullDescription: ['Day 1 covers DGCA regulations.', 'Day 2 covers live farm flight.'],
        venueName: 'Centre of Excellence in Dairy & Smart Farming',
        venueAddress: 'Sharadanagar, Baramati, Maharashtra 413115',
        targetAudience: ['Agritech Startups', 'Drone Pilots'],
        agendaHighlights: ['Flight Planning', 'Multispectral Analysis'],
      },
      editorUser,
    );

    expect(created.id).toBeDefined();
    expect(created.slug).toBe('agri-drone-workshop-2026');
    expect(created.category).toBe(EventCategory.TECHNICAL_WORKSHOP);
    expect(created.authorId).toBe(editorUser.id);
    expect(created.translations).toHaveLength(1);
    expect(created.translations[0].status).toBe(ContentStatus.DRAFT);
    expect(created.translations[0].title).toContain('Precision Agricultural Drone');
    expect(created.computedScheduleStatus).toBe('UPCOMING');
  });

  it('rejects event creation when end date precedes start date', async () => {
    await expect(
      service.createEvent(
        {
          slug: 'invalid-dates-event',
          category: EventCategory.TECHNICAL_WORKSHOP,
          startDate: '2026-11-20T10:00:00.000Z',
          endDate: '2026-11-18T10:00:00.000Z', // Before start
          timeRange: '10:00 AM - 04:00 PM',
          venueType: VenueType.IN_PERSON,
          organizer: 'AIC-ADT Test',
          title: 'Invalid Date Range Workshop',
          shortDescription: 'This should fail validation due to reversed dates.',
          venueName: 'Main Auditorium',
          venueAddress: 'Baramati Campus',
        },
        editorUser,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects event creation when registration deadline is after the end date', async () => {
    await expect(
      service.createEvent(
        {
          slug: 'late-deadline-event',
          category: EventCategory.INTAKE_DEADLINE,
          startDate: '2026-11-01T10:00:00.000Z',
          endDate: '2026-11-05T18:00:00.000Z',
          registrationDeadline: '2026-11-10T18:00:00.000Z', // After end date!
          timeRange: '10:00 AM - 06:00 PM',
          venueType: VenueType.ONLINE,
          organizer: 'AIC-ADT Admissions',
          title: 'Cohort Application Review',
          shortDescription: 'Application review period.',
          venueName: 'Virtual Portal',
          venueAddress: 'Online',
        },
        editorUser,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('enforces unique slug and rejects duplicates with ConflictException', async () => {
    await service.createEvent(
      {
        slug: 'bio-fertilizer-conclave',
        category: EventCategory.ECOSYSTEM_CONCLAVE,
        startDate: '2026-12-01T09:00:00.000Z',
        endDate: '2026-12-02T18:00:00.000Z',
        timeRange: '09:00 AM - 06:00 PM',
        venueType: VenueType.HYBRID,
        organizer: 'AIC-ADT Biotechnology Wing',
        title: 'National Bio-Fertilizer and Soil Health Conclave',
        shortDescription: 'Bringing together industry researchers and soil scientists.',
        venueName: 'Baramati Convention Hall',
        venueAddress: 'Baramati Campus',
      },
      editorUser,
    );

    await expect(
      service.createEvent(
        {
          slug: 'bio-fertilizer-conclave', // Duplicate slug!
          category: EventCategory.ECOSYSTEM_CONCLAVE,
          startDate: '2026-12-05T09:00:00.000Z',
          endDate: '2026-12-06T18:00:00.000Z',
          timeRange: '09:00 AM - 06:00 PM',
          venueType: VenueType.HYBRID,
          organizer: 'Another Organizer',
          title: 'Duplicate Event Title',
          shortDescription: 'Duplicate event description.',
          venueName: 'Baramati Convention Hall',
          venueAddress: 'Baramati Campus',
        },
        editorUser,
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('updates event content while preserving workflow status to prevent mass-assignment', async () => {
    const created = await service.createEvent(
      {
        slug: 'smart-irrigation-demo',
        category: EventCategory.FIELD_SHOWCASE,
        startDate: '2026-12-10T09:00:00.000Z',
        endDate: '2026-12-10T17:00:00.000Z',
        timeRange: '09:00 AM - 05:00 PM',
        venueType: VenueType.IN_PERSON,
        organizer: 'AIC-ADT Water Lab',
        title: 'Smart IoT Drip Irrigation Live Field Demo',
        shortDescription: 'Demonstration of sub-surface sensor control.',
        venueName: 'Field Plot 4',
        venueAddress: 'KVK Farm, Baramati',
      },
      editorUser,
    );

    const updated = await service.updateEvent(
      created.id,
      {
        title: 'Updated Smart IoT Drip Irrigation Live Field Demonstration',
        organizer: 'AIC-ADT Water Tech & Precision Division',
      },
      editorUser,
    );

    expect(updated.translations[0].title).toBe('Updated Smart IoT Drip Irrigation Live Field Demonstration');
    expect(updated.organizer).toBe('AIC-ADT Water Tech & Precision Division');
    expect(updated.translations[0].status).toBe(ContentStatus.DRAFT); // Preserved!
    expect(updated.currentVersion).toBe(2);
  });

  it('prevents unauthorized users from modifying an event authored by another user', async () => {
    const created = await service.createEvent(
      {
        slug: 'hydroponics-masterclass',
        category: EventCategory.TRAINING_BOOTCAMP,
        startDate: '2026-12-15T09:00:00.000Z',
        endDate: '2026-12-16T17:00:00.000Z',
        timeRange: '09:00 AM - 05:00 PM',
        venueType: VenueType.IN_PERSON,
        organizer: 'AIC-ADT Horticulture Dept',
        title: 'Commercial Hydroponics & Vertical Farming Masterclass',
        shortDescription: 'Intensive nutrient film technique training.',
        venueName: 'Protected Cultivation Polyhouse',
        venueAddress: 'Baramati Campus',
      },
      editorUser, // Authored by editorUser
    );

    // otherEditor tries to update
    await expect(
      service.updateEvent(
        created.id,
        {
          title: 'Hacked Hydroponics Masterclass',
        },
        otherEditor,
      ),
    ).rejects.toThrow(ForbiddenException);

    // Admin CAN update
    const adminUpdated = await service.updateEvent(
      created.id,
      {
        title: 'Admin Verified Hydroponics & Vertical Farming Masterclass',
      },
      adminUser,
    );
    expect(adminUpdated.translations[0].title).toContain('Admin Verified');
  });

  it('submits a DRAFT event for review, transitioning to IN_REVIEW', async () => {
    const created = await service.createEvent(
      {
        slug: 'review-target-event',
        category: EventCategory.TECHNICAL_WORKSHOP,
        startDate: '2026-12-20T09:00:00.000Z',
        endDate: '2026-12-20T17:00:00.000Z',
        timeRange: '09:00 AM - 05:00 PM',
        venueType: VenueType.IN_PERSON,
        organizer: 'AIC-ADT Review Desk',
        title: 'Workshop Ready For Governance Review',
        shortDescription: 'Completed draft submitted for committee vetting.',
        venueName: 'Seminar Hall B',
        venueAddress: 'Baramati Campus',
      },
      editorUser,
    );

    const submitted = await service.submitForReview(
      created.id,
      'en',
      'Please verify speaker list and venue booking confirmation.',
      editorUser,
    );

    expect(submitted.translations[0].status).toBe(ContentStatus.IN_REVIEW);
    expect(submitted.translations[0].reviewerNotes).toBe(
      'Please verify speaker list and venue booking confirmation.',
    );

    // Cannot resubmit while already IN_REVIEW
    await expect(
      service.submitForReview(created.id, 'en', 'Resubmitting', editorUser),
    ).rejects.toThrow(BadRequestException);
  });

  it('archives a published event and restores an archived event', async () => {
    const created = await service.createEvent(
      {
        slug: 'archive-target-event',
        category: EventCategory.FIELD_SHOWCASE,
        startDate: '2026-12-25T09:00:00.000Z',
        endDate: '2026-12-25T17:00:00.000Z',
        timeRange: '09:00 AM - 05:00 PM',
        venueType: VenueType.IN_PERSON,
        organizer: 'AIC-ADT Field Ops',
        title: 'Event for Archival Lifecycle Test',
        shortDescription: 'Testing archival and restoration lifecycle.',
        venueName: 'Field 1',
        venueAddress: 'Baramati Campus',
      },
      adminUser,
    );

    // Simulate approval and publication
    created.translations[0].status = ContentStatus.PUBLISHED;
    (service as any).memoryEvents.get(created.id).translations[0].status = ContentStatus.PUBLISHED;

    // Archive
    const archived = await service.archiveEvent(created.id, 'en', adminUser);
    expect(archived.translations[0].status).toBe(ContentStatus.ARCHIVED);
    expect(archived.translations[0].archivedAt).toBeDefined();

    // Restore
    const restored = await service.restoreEvent(created.id, 'en', adminUser);
    expect(restored.translations[0].status).toBe(ContentStatus.DRAFT);
  });

  it('accurately computes schedule status across date lifecycles', () => {
    const pastStart = new Date(Date.now() - 1000 * 60 * 60 * 48); // 2 days ago
    const pastEnd = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
    const futureStart = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day from now
    const futureEnd = new Date(Date.now() + 1000 * 60 * 60 * 48); // 2 days from now

    // Concluded by date
    expect(service.computeScheduleStatus(pastStart, pastEnd, EventStatus.UPCOMING)).toBe('COMPLETED');

    // Ongoing by date
    expect(service.computeScheduleStatus(pastStart, futureEnd, EventStatus.UPCOMING)).toBe('ONGOING');

    // Upcoming by date
    expect(service.computeScheduleStatus(futureStart, futureEnd, EventStatus.UPCOMING)).toBe('UPCOMING');

    // Overridden by explicit status
    expect(service.computeScheduleStatus(futureStart, futureEnd, EventStatus.CANCELLED)).toBe('CANCELLED');
    expect(service.computeScheduleStatus(futureStart, futureEnd, EventStatus.POSTPONED)).toBe('POSTPONED');
  });
});
