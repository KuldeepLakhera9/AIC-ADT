import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventController } from './event.controller.js';
import { EventService } from '../services/event.service.js';
import { AuthUserDto } from '../../auth/dto/auth-user.dto.js';
import { Role } from '@prisma/client';
import { Permission } from '../../auth/auth.types.js';
import { EventCategory, EventStatus, VenueType, ContentStatus } from '@prisma/client';

describe('EventController', () => {
  let controller: EventController;
  let serviceMock: Partial<EventService>;

  const mockUser: AuthUserDto = {
    id: 'user-1',
    email: 'coordinator@aic-adt.org',
    fullName: 'Test Coordinator',
    role: Role.CONTENT_EDITOR,
    status: 'ACTIVE',
    permissions: [
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
      Permission.CONTENT_UPDATE,
      Permission.CONTENT_SUBMIT_REVIEW,
    ],
  };

  const sampleEvent = {
    id: 'event-uuid-1',
    slug: 'precision-agri-hackathon',
    category: EventCategory.TECHNICAL_WORKSHOP,
    eventStatus: EventStatus.UPCOMING,
    startDate: new Date('2026-11-20T09:00:00Z').toISOString(),
    endDate: new Date('2026-11-21T18:00:00Z').toISOString(),
    timeRange: '09:00 AM - 06:00 PM',
    venueType: VenueType.IN_PERSON,
    organizer: 'AIC-ADT Tech Hub',
    isExternal: false,
    currentVersion: 1,
    translations: [
      {
        id: 'trans-uuid-1',
        eventId: 'event-uuid-1',
        locale: 'en',
        title: 'Precision Agri Hackathon 2026',
        shortDescription: 'National agritech hackathon at Baramati.',
        fullDescription: ['Build IoT solutions for farmers.'],
        venueName: 'Incubation Centre Auditorium',
        venueAddress: 'Baramati Campus',
        targetAudience: ['Developers', 'Students'],
        status: ContentStatus.DRAFT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    computedScheduleStatus: 'UPCOMING' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    serviceMock = {
      listEvents: vi.fn().mockResolvedValue({
        items: [sampleEvent],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      }),
      getEventById: vi.fn().mockResolvedValue(sampleEvent),
      createEvent: vi.fn().mockResolvedValue(sampleEvent),
      updateEvent: vi.fn().mockResolvedValue({
        ...sampleEvent,
        translations: [
          {
            ...sampleEvent.translations[0],
            title: 'Updated Hackathon Title',
          },
        ],
      }),
      submitForReview: vi.fn().mockResolvedValue({
        ...sampleEvent,
        translations: [
          {
            ...sampleEvent.translations[0],
            status: ContentStatus.IN_REVIEW,
          },
        ],
      }),
      archiveEvent: vi.fn().mockResolvedValue({
        ...sampleEvent,
        translations: [
          {
            ...sampleEvent.translations[0],
            status: ContentStatus.ARCHIVED,
          },
        ],
      }),
      restoreEvent: vi.fn().mockResolvedValue(sampleEvent),
    };

    controller = new EventController(serviceMock as EventService);
  });

  it('lists events with query parameters', async () => {
    const result = await controller.listEvents({
      page: 1,
      limit: 10,
      search: 'hackathon',
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].slug).toBe('precision-agri-hackathon');
    expect(serviceMock.listEvents).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      search: 'hackathon',
    });
  });

  it('creates an event draft with authenticated user context', async () => {
    const result = await controller.createEvent(
      {
        slug: 'precision-agri-hackathon',
        category: EventCategory.TECHNICAL_WORKSHOP,
        startDate: '2026-11-20T09:00:00Z',
        endDate: '2026-11-21T18:00:00Z',
        timeRange: '09:00 AM - 06:00 PM',
        venueType: VenueType.IN_PERSON,
        organizer: 'AIC-ADT Tech Hub',
        title: 'Precision Agri Hackathon 2026',
        shortDescription: 'National agritech hackathon at Baramati.',
        venueName: 'Incubation Centre Auditorium',
        venueAddress: 'Baramati Campus',
      },
      mockUser,
    );

    expect(result.slug).toBe('precision-agri-hackathon');
    expect(serviceMock.createEvent).toHaveBeenCalled();
  });

  it('submits an event for review with author context', async () => {
    const result = await controller.submitForReview(
      'event-uuid-1',
      'en',
      { submissionNotes: 'Ready for editorial review' },
      mockUser,
    );

    expect(result.translations[0].status).toBe(ContentStatus.IN_REVIEW);
    expect(serviceMock.submitForReview).toHaveBeenCalledWith(
      'event-uuid-1',
      'en',
      'Ready for editorial review',
      mockUser,
    );
  });
});
