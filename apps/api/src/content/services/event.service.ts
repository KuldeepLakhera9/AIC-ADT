import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../database/prisma.service.js';
import { AppLoggerService } from '../../common/logger/app-logger.service.js';
import { AuthenticatedUser, Role, Permission } from '../../auth/auth.types.js';
import { CreateEventDto } from '../dto/create-event.dto.js';
import { UpdateEventDto } from '../dto/update-event.dto.js';
import { QueryEventDto } from '../dto/query-event.dto.js';
import {
  EventResponseDto,
  PaginatedEventResponseDto,
  EventTranslationResponseDto,
} from '../dto/event-response.dto.js';
import {
  ALLOWED_EVENT_SORT_FIELDS,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from '../content.constants.js';
import { ContentStatus, EventCategory, EventStatus, VenueType } from '@prisma/client';

interface InMemoryEvent {
  id: string;
  slug: string;
  category: EventCategory;
  eventStatus: EventStatus;
  startDate: Date;
  endDate: Date;
  timeRange: string;
  venueType: VenueType;
  organizer: string;
  registrationUrl?: string | null;
  registrationDeadline?: Date | null;
  isExternal: boolean;
  bannerAssetId?: string | null;
  currentVersion: number;
  authorId?: string | null;
  author?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  translations: InMemoryEventTranslation[];
  createdAt: Date;
  updatedAt: Date;
}

interface InMemoryEventTranslation {
  id: string;
  eventId: string;
  locale: string;
  title: string;
  shortDescription: string;
  fullDescription: unknown;
  venueName: string;
  venueAddress: string;
  targetAudience: string[];
  agendaHighlights?: string[];
  status: ContentStatus;
  reviewerNotes?: string | null;
  publishedAt?: Date | null;
  archivedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class EventService {
  private readonly logger = new AppLoggerService('EventService');
  private readonly memoryEvents = new Map<string, InMemoryEvent>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Computes dynamic operational schedule status based on current time and date boundaries.
   */
  computeScheduleStatus(
    startDate: Date,
    endDate: Date,
    eventStatus: EventStatus,
  ): 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED' {
    if (eventStatus === EventStatus.CANCELLED) return 'CANCELLED';
    if (eventStatus === EventStatus.POSTPONED) return 'POSTPONED';

    const now = new Date();
    if (now > endDate) return 'COMPLETED';
    if (now >= startDate && now <= endDate) return 'ONGOING';
    return 'UPCOMING';
  }

  /**
   * Paginated listing of events with search, filters, and allowlisted sorting.
   */
  async listEvents(query: QueryEventDto): Promise<PaginatedEventResponseDto> {
    const page = query.page || DEFAULT_PAGE;
    const limit = query.limit || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    const locale = query.locale || 'en';
    const sortBy = ALLOWED_EVENT_SORT_FIELDS.includes(query.sortBy as any)
      ? (query.sortBy as string)
      : 'startDate';
    const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';

    try {
      if (this.prisma.connected) {
        const where: any = {};

        if (query.category) {
          where.category = query.category;
        }

        if (query.eventStatus) {
          where.eventStatus = query.eventStatus;
        }

        if (query.venueType) {
          where.venueType = query.venueType;
        }

        if (query.status) {
          where.translations = {
            some: {
              locale,
              status: query.status,
            },
          };
        }

        if (query.search) {
          const searchLower = query.search.trim();
          where.OR = [
            { slug: { contains: searchLower, mode: 'insensitive' } },
            { organizer: { contains: searchLower, mode: 'insensitive' } },
            {
              translations: {
                some: {
                  locale,
                  OR: [
                    { title: { contains: searchLower, mode: 'insensitive' } },
                    { shortDescription: { contains: searchLower, mode: 'insensitive' } },
                    { venueName: { contains: searchLower, mode: 'insensitive' } },
                  ],
                },
              },
            },
          ];
        }

        const [events, total] = await Promise.all([
          this.prisma.event.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
            include: {
              translations: true,
              author: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                },
              },
            },
          }),
          this.prisma.event.count({ where }),
        ]);

        return {
          items: events.map((e) => this.mapToEventResponse(e)),
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        };
      }
    } catch (err) {
      this.logger.warn(`Failed to query database for events, falling back to memory store: ${(err as Error).message}`);
    }

    // In-memory fallback
    const all = Array.from(this.memoryEvents.values());
    let filtered = all.filter((e) => {
      if (query.category && e.category !== query.category) return false;
      if (query.eventStatus && e.eventStatus !== query.eventStatus) return false;
      if (query.venueType && e.venueType !== query.venueType) return false;
      if (query.status) {
        const hasStatus = e.translations.some(
          (t) => t.locale === locale && t.status === query.status,
        );
        if (!hasStatus) return false;
      }
      if (query.search) {
        const s = query.search.toLowerCase();
        const matchesSlug = e.slug.toLowerCase().includes(s);
        const matchesOrg = e.organizer.toLowerCase().includes(s);
        const matchesTr = e.translations.some(
          (t) =>
            t.locale === locale &&
            (t.title.toLowerCase().includes(s) ||
              t.shortDescription.toLowerCase().includes(s) ||
              t.venueName.toLowerCase().includes(s)),
        );
        if (!matchesSlug && !matchesOrg && !matchesTr) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      let valA: any = (a as any)[sortBy];
      let valB: any = (b as any)[sortBy];
      if (valA instanceof Date) valA = valA.getTime();
      if (valB instanceof Date) valB = valB.getTime();
      if (sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

    const paginated = filtered.slice(skip, skip + limit);
    return {
      items: paginated.map((e) => this.mapToEventResponse(e)),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit) || 1,
    };
  }

  /**
   * Retrieves single event by ID.
   */
  async getEventById(id: string): Promise<EventResponseDto> {
    try {
      if (this.prisma.connected) {
        const event = await this.prisma.event.findUnique({
          where: { id },
          include: {
            translations: true,
            author: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        });
        if (!event) {
          throw new NotFoundException(`Event with ID "${id}" does not exist.`);
        }
        return this.mapToEventResponse(event);
      }
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      this.logger.warn(`Failed to query database for event ID ${id}: ${(err as Error).message}`);
    }

    const mem = this.memoryEvents.get(id);
    if (!mem) {
      throw new NotFoundException(`Event with ID "${id}" does not exist.`);
    }
    return this.mapToEventResponse(mem);
  }

  /**
   * Retrieves single event by slug and locale with public access rules.
   */
  async getEventBySlug(
    slug: string,
    locale: string = 'en',
    user?: AuthenticatedUser,
  ): Promise<EventResponseDto> {
    try {
      if (this.prisma.connected) {
        const event = await this.prisma.event.findUnique({
          where: { slug },
          include: {
            translations: true,
            author: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        });

        if (!event) {
          throw new NotFoundException(`Event with slug "${slug}" not found.`);
        }

        const translation = event.translations.find((t) => t.locale === locale);
        const isStaff =
          user &&
          (user.role === Role.ADMIN ||
            user.role === Role.APPROVER ||
            user.role === Role.CONTENT_EDITOR ||
            user.role === Role.PROGRAM_MANAGER ||
            user.role === Role.REVIEWER);

        if (!isStaff && (!translation || translation.status !== ContentStatus.PUBLISHED)) {
          throw new NotFoundException(`Event with slug "${slug}" is not publicly published.`);
        }

        return this.mapToEventResponse(event);
      }
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      this.logger.warn(`Database error fetching event by slug "${slug}": ${(err as Error).message}`);
    }

    const mem = Array.from(this.memoryEvents.values()).find((e) => e.slug === slug);
    if (!mem) {
      throw new NotFoundException(`Event with slug "${slug}" not found.`);
    }

    const translation = mem.translations.find((t) => t.locale === locale);
    const isStaff =
      user &&
      (user.role === Role.ADMIN ||
        user.role === Role.APPROVER ||
        user.role === Role.CONTENT_EDITOR ||
        user.role === Role.PROGRAM_MANAGER ||
        user.role === Role.REVIEWER);

    if (!isStaff && (!translation || translation.status !== ContentStatus.PUBLISHED)) {
      throw new NotFoundException(`Event with slug "${slug}" is not publicly published.`);
    }

    return this.mapToEventResponse(mem);
  }

  /**
   * Creates a new Event draft with initial translation and audit trail.
   */
  async createEvent(
    dto: CreateEventDto,
    user: AuthenticatedUser,
  ): Promise<EventResponseDto> {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Event start and end dates must be valid ISO 8601 strings.');
    }

    if (endDate < startDate) {
      throw new BadRequestException('Event end date must be on or after start date.');
    }

    let regDeadline: Date | undefined;
    if (dto.registrationDeadline) {
      regDeadline = new Date(dto.registrationDeadline);
      if (isNaN(regDeadline.getTime())) {
        throw new BadRequestException('Registration deadline must be a valid ISO 8601 string.');
      }
      if (regDeadline > endDate) {
        throw new BadRequestException('Registration deadline cannot be after the event end date.');
      }
    }

    const locale = dto.locale || 'en';
    const eventId = randomUUID();
    const translationId = randomUUID();

    try {
      if (this.prisma.connected) {
        const existing = await this.prisma.event.findUnique({
          where: { slug: dto.slug },
        });
        if (existing) {
          throw new ConflictException(`An event with slug "${dto.slug}" already exists.`);
        }

        const result = await this.prisma.$transaction(async (tx) => {
          const event = await tx.event.create({
            data: {
              id: eventId,
              slug: dto.slug,
              category: dto.category,
              eventStatus: dto.eventStatus || EventStatus.UPCOMING,
              startDate,
              endDate,
              timeRange: dto.timeRange,
              venueType: dto.venueType,
              organizer: dto.organizer,
              registrationUrl: dto.registrationUrl || null,
              registrationDeadline: regDeadline || null,
              isExternal: dto.isExternal ?? false,
              authorId: user.id,
              currentVersion: 1,
            },
          });

          const translation = await tx.eventTranslation.create({
            data: {
              id: translationId,
              eventId: event.id,
              locale,
              title: dto.title,
              shortDescription: dto.shortDescription,
              fullDescription: dto.fullDescription || [],
              venueName: dto.venueName,
              venueAddress: dto.venueAddress,
              targetAudience: dto.targetAudience || [],
              agendaHighlights: dto.agendaHighlights || [],
              status: ContentStatus.DRAFT,
            },
          });

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'EVENT_CREATE',
              resource: 'Event',
              resourceId: event.id,
              metadata: {
                slug: event.slug,
                locale,
                category: event.category,
                eventStatus: event.eventStatus,
              },
            },
          });

          return { ...event, translations: [translation], author: { id: user.id, fullName: user.fullName, email: user.email } };
        });

        return this.mapToEventResponse(result);
      }
    } catch (err) {
      if (err instanceof ConflictException || err instanceof BadRequestException) {
        throw err;
      }
      this.logger.warn(`Prisma error during event creation, saving to in-memory store: ${(err as Error).message}`);
    }

    // In-memory fallback
    const exists = Array.from(this.memoryEvents.values()).some((e) => e.slug === dto.slug);
    if (exists) {
      throw new ConflictException(`An event with slug "${dto.slug}" already exists.`);
    }

    const now = new Date();
    const newTr: InMemoryEventTranslation = {
      id: translationId,
      eventId,
      locale,
      title: dto.title,
      shortDescription: dto.shortDescription,
      fullDescription: dto.fullDescription || [],
      venueName: dto.venueName,
      venueAddress: dto.venueAddress,
      targetAudience: dto.targetAudience || [],
      agendaHighlights: dto.agendaHighlights || [],
      status: ContentStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    };

    const newEvent: InMemoryEvent = {
      id: eventId,
      slug: dto.slug,
      category: dto.category,
      eventStatus: dto.eventStatus || EventStatus.UPCOMING,
      startDate,
      endDate,
      timeRange: dto.timeRange,
      venueType: dto.venueType,
      organizer: dto.organizer,
      registrationUrl: dto.registrationUrl || null,
      registrationDeadline: regDeadline || null,
      isExternal: dto.isExternal ?? false,
      currentVersion: 1,
      authorId: user.id,
      author: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      translations: [newTr],
      createdAt: now,
      updatedAt: now,
    };

    this.memoryEvents.set(eventId, newEvent);
    return this.mapToEventResponse(newEvent);
  }

  /**
   * Updates an existing Event and its translation without allowing direct status tampering.
   */
  async updateEvent(
    id: string,
    dto: UpdateEventDto,
    user: AuthenticatedUser,
  ): Promise<EventResponseDto> {
    const locale = dto.locale || 'en';

    let startDate: Date | undefined;
    let endDate: Date | undefined;
    if (dto.startDate) {
      startDate = new Date(dto.startDate);
      if (isNaN(startDate.getTime())) throw new BadRequestException('Invalid start date.');
    }
    if (dto.endDate) {
      endDate = new Date(dto.endDate);
      if (isNaN(endDate.getTime())) throw new BadRequestException('Invalid end date.');
    }

    try {
      if (this.prisma.connected) {
        const existing = await this.prisma.event.findUnique({
          where: { id },
          include: { translations: true },
        });

        if (!existing) {
          throw new NotFoundException(`Event with ID "${id}" does not exist.`);
        }

        // Record-level authorization
        const isAuthor = existing.authorId === user.id;
        const hasManagePermission =
          user.role === Role.ADMIN ||
          user.role === Role.APPROVER ||
          user.permissions.includes(Permission.CONTENT_PUBLISH);

        if (!isAuthor && !hasManagePermission) {
          throw new ForbiddenException('You are not authorized to modify an event authored by another user.');
        }

        // Date consistency
        const effectiveStart = startDate || existing.startDate;
        const effectiveEnd = endDate || existing.endDate;
        if (effectiveEnd < effectiveStart) {
          throw new BadRequestException('Event end date must be on or after start date.');
        }

        // Slug uniqueness check if updating slug
        if (dto.slug && dto.slug !== existing.slug) {
          const slugConflict = await this.prisma.event.findUnique({
            where: { slug: dto.slug },
          });
          if (slugConflict && slugConflict.id !== id) {
            throw new ConflictException(`An event with slug "${dto.slug}" already exists.`);
          }
        }

        const result = await this.prisma.$transaction(async (tx) => {
          const eventUpdateData: any = {
            currentVersion: { increment: 1 },
          };
          if (dto.slug) eventUpdateData.slug = dto.slug;
          if (dto.category) eventUpdateData.category = dto.category;
          if (dto.eventStatus) eventUpdateData.eventStatus = dto.eventStatus;
          if (startDate) eventUpdateData.startDate = startDate;
          if (endDate) eventUpdateData.endDate = endDate;
          if (dto.timeRange) eventUpdateData.timeRange = dto.timeRange;
          if (dto.venueType) eventUpdateData.venueType = dto.venueType;
          if (dto.organizer) eventUpdateData.organizer = dto.organizer;
          if (dto.registrationUrl !== undefined) eventUpdateData.registrationUrl = dto.registrationUrl;
          if (dto.registrationDeadline) {
            eventUpdateData.registrationDeadline = new Date(dto.registrationDeadline);
          }
          if (dto.isExternal !== undefined) eventUpdateData.isExternal = dto.isExternal;

          await tx.event.update({
            where: { id },
            data: eventUpdateData,
          });

          // Translation update: preserve existing status!
          const existingTr = existing.translations.find((t) => t.locale === locale);
          if (existingTr) {
            const trUpdateData: any = {};
            if (dto.title) trUpdateData.title = dto.title;
            if (dto.shortDescription) trUpdateData.shortDescription = dto.shortDescription;
            if (dto.fullDescription !== undefined) trUpdateData.fullDescription = dto.fullDescription;
            if (dto.venueName) trUpdateData.venueName = dto.venueName;
            if (dto.venueAddress) trUpdateData.venueAddress = dto.venueAddress;
            if (dto.targetAudience) trUpdateData.targetAudience = dto.targetAudience;
            if (dto.agendaHighlights) trUpdateData.agendaHighlights = dto.agendaHighlights;

            await tx.eventTranslation.update({
              where: { id: existingTr.id },
              data: trUpdateData,
            });
          } else if (dto.title && dto.shortDescription && dto.venueName && dto.venueAddress) {
            await tx.eventTranslation.create({
              data: {
                eventId: id,
                locale,
                title: dto.title,
                shortDescription: dto.shortDescription,
                fullDescription: dto.fullDescription || [],
                venueName: dto.venueName,
                venueAddress: dto.venueAddress,
                targetAudience: dto.targetAudience || [],
                agendaHighlights: dto.agendaHighlights || [],
                status: ContentStatus.DRAFT,
              },
            });
          }

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'EVENT_UPDATE',
              resource: 'Event',
              resourceId: id,
              metadata: {
                updatedFields: Object.keys(dto),
                locale,
              },
            },
          });

          return tx.event.findUnique({
            where: { id },
            include: {
              translations: true,
              author: {
                select: { id: true, fullName: true, email: true },
              },
            },
          });
        });

        if (!result) throw new NotFoundException(`Event not found.`);
        return this.mapToEventResponse(result);
      }
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof ForbiddenException ||
        err instanceof ConflictException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      this.logger.warn(`Database update error for event ${id}: ${(err as Error).message}`);
    }

    // In-memory fallback
    const mem = this.memoryEvents.get(id);
    if (!mem) throw new NotFoundException(`Event with ID "${id}" does not exist.`);

    const isAuthor = mem.authorId === user.id;
    const hasManagePermission =
      user.role === Role.ADMIN ||
      user.role === Role.APPROVER ||
      user.permissions.includes(Permission.CONTENT_PUBLISH);

    if (!isAuthor && !hasManagePermission) {
      throw new ForbiddenException('You are not authorized to modify an event authored by another user.');
    }

    if (dto.slug && dto.slug !== mem.slug) {
      const exists = Array.from(this.memoryEvents.values()).some((e) => e.slug === dto.slug && e.id !== id);
      if (exists) throw new ConflictException(`An event with slug "${dto.slug}" already exists.`);
      mem.slug = dto.slug;
    }

    const effStart = startDate || mem.startDate;
    const effEnd = endDate || mem.endDate;
    if (effEnd < effStart) {
      throw new BadRequestException('Event end date must be on or after start date.');
    }

    if (startDate) mem.startDate = startDate;
    if (endDate) mem.endDate = endDate;
    if (dto.category) mem.category = dto.category;
    if (dto.eventStatus) mem.eventStatus = dto.eventStatus;
    if (dto.timeRange) mem.timeRange = dto.timeRange;
    if (dto.venueType) mem.venueType = dto.venueType;
    if (dto.organizer) mem.organizer = dto.organizer;
    if (dto.registrationUrl !== undefined) mem.registrationUrl = dto.registrationUrl;
    if (dto.registrationDeadline) mem.registrationDeadline = new Date(dto.registrationDeadline);
    if (dto.isExternal !== undefined) mem.isExternal = dto.isExternal;

    mem.currentVersion += 1;
    mem.updatedAt = new Date();

    let tr = mem.translations.find((t) => t.locale === locale);
    if (tr) {
      if (dto.title) tr.title = dto.title;
      if (dto.shortDescription) tr.shortDescription = dto.shortDescription;
      if (dto.fullDescription !== undefined) tr.fullDescription = dto.fullDescription;
      if (dto.venueName) tr.venueName = dto.venueName;
      if (dto.venueAddress) tr.venueAddress = dto.venueAddress;
      if (dto.targetAudience) tr.targetAudience = dto.targetAudience;
      if (dto.agendaHighlights) tr.agendaHighlights = dto.agendaHighlights;
      tr.updatedAt = new Date();
    } else if (dto.title && dto.shortDescription && dto.venueName && dto.venueAddress) {
      tr = {
        id: randomUUID(),
        eventId: id,
        locale,
        title: dto.title,
        shortDescription: dto.shortDescription,
        fullDescription: dto.fullDescription || [],
        venueName: dto.venueName,
        venueAddress: dto.venueAddress,
        targetAudience: dto.targetAudience || [],
        agendaHighlights: dto.agendaHighlights || [],
        status: ContentStatus.DRAFT,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mem.translations.push(tr);
    }

    return this.mapToEventResponse(mem);
  }

  /**
   * Submits an event draft for editorial review.
   */
  async submitForReview(
    id: string,
    locale: string = 'en',
    notes?: string,
    user?: AuthenticatedUser,
  ): Promise<EventResponseDto> {
    try {
      if (this.prisma.connected) {
        const event = await this.prisma.event.findUnique({
          where: { id },
          include: { translations: true },
        });

        if (!event) throw new NotFoundException(`Event with ID "${id}" does not exist.`);

        if (user) {
          const isAuthor = event.authorId === user.id;
          const hasManagePermission =
            user.role === Role.ADMIN ||
            user.role === Role.APPROVER ||
            user.permissions.includes(Permission.CONTENT_PUBLISH);

          if (!isAuthor && !hasManagePermission) {
            throw new ForbiddenException('You are not authorized to submit this event for review.');
          }
        }

        const translation = event.translations.find((t) => t.locale === locale);
        if (!translation) {
          throw new NotFoundException(`Translation for locale "${locale}" not found.`);
        }

        if (translation.status !== ContentStatus.DRAFT) {
          throw new BadRequestException(`Only DRAFT events can be submitted for review. Current status: ${translation.status}`);
        }

        const updated = await this.prisma.$transaction(async (tx) => {
          await tx.eventTranslation.update({
            where: { id: translation.id },
            data: {
              status: ContentStatus.IN_REVIEW,
              reviewerNotes: notes || null,
            },
          });

          if (user) {
            await tx.auditLog.create({
              data: {
                userId: user.id,
                action: 'EVENT_SUBMIT_REVIEW',
                resource: 'Event',
                resourceId: id,
                metadata: { locale, notes },
              },
            });
          }

          return tx.event.findUnique({
            where: { id },
            include: {
              translations: true,
              author: {
                select: { id: true, fullName: true, email: true },
              },
            },
          });
        });

        if (!updated) throw new NotFoundException('Event not found.');
        return this.mapToEventResponse(updated);
      }
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof ForbiddenException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      this.logger.warn(`Database error submitting review for event ${id}: ${(err as Error).message}`);
    }

    // In-memory fallback
    const mem = this.memoryEvents.get(id);
    if (!mem) throw new NotFoundException(`Event with ID "${id}" does not exist.`);

    if (user) {
      const isAuthor = mem.authorId === user.id;
      const hasManagePermission =
        user.role === Role.ADMIN ||
        user.role === Role.APPROVER ||
        user.permissions.includes(Permission.CONTENT_PUBLISH);
      if (!isAuthor && !hasManagePermission) {
        throw new ForbiddenException('You are not authorized to submit this event for review.');
      }
    }

    const tr = mem.translations.find((t) => t.locale === locale);
    if (!tr) throw new NotFoundException(`Translation for locale "${locale}" not found.`);

    if (tr.status !== ContentStatus.DRAFT) {
      throw new BadRequestException(`Only DRAFT events can be submitted for review. Current status: ${tr.status}`);
    }

    tr.status = ContentStatus.IN_REVIEW;
    tr.reviewerNotes = notes || null;
    tr.updatedAt = new Date();

    return this.mapToEventResponse(mem);
  }

  /**
   * Archives a published event.
   */
  async archiveEvent(
    id: string,
    locale: string = 'en',
    user: AuthenticatedUser,
  ): Promise<EventResponseDto> {
    try {
      if (this.prisma.connected) {
        const event = await this.prisma.event.findUnique({
          where: { id },
          include: { translations: true },
        });

        if (!event) throw new NotFoundException(`Event with ID "${id}" does not exist.`);

        const translation = event.translations.find((t) => t.locale === locale);
        if (!translation) throw new NotFoundException(`Translation for locale "${locale}" not found.`);

        if (translation.status !== ContentStatus.PUBLISHED) {
          throw new BadRequestException(`Only PUBLISHED events can be archived. Current status: ${translation.status}`);
        }

        const now = new Date();
        const updated = await this.prisma.$transaction(async (tx) => {
          await tx.eventTranslation.update({
            where: { id: translation.id },
            data: {
              status: ContentStatus.ARCHIVED,
              archivedAt: now,
            },
          });

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'EVENT_ARCHIVE',
              resource: 'Event',
              resourceId: id,
              metadata: { locale },
            },
          });

          return tx.event.findUnique({
            where: { id },
            include: {
              translations: true,
              author: {
                select: { id: true, fullName: true, email: true },
              },
            },
          });
        });

        if (!updated) throw new NotFoundException('Event not found.');
        return this.mapToEventResponse(updated);
      }
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      this.logger.warn(`Database error archiving event ${id}: ${(err as Error).message}`);
    }

    const mem = this.memoryEvents.get(id);
    if (!mem) throw new NotFoundException(`Event with ID "${id}" does not exist.`);

    const tr = mem.translations.find((t) => t.locale === locale);
    if (!tr) throw new NotFoundException(`Translation for locale "${locale}" not found.`);

    if (tr.status !== ContentStatus.PUBLISHED) {
      throw new BadRequestException(`Only PUBLISHED events can be archived. Current status: ${tr.status}`);
    }

    tr.status = ContentStatus.ARCHIVED;
    tr.archivedAt = new Date();
    tr.updatedAt = new Date();

    return this.mapToEventResponse(mem);
  }

  /**
   * Restores an archived event back to DRAFT.
   */
  async restoreEvent(
    id: string,
    locale: string = 'en',
    user: AuthenticatedUser,
  ): Promise<EventResponseDto> {
    try {
      if (this.prisma.connected) {
        const event = await this.prisma.event.findUnique({
          where: { id },
          include: { translations: true },
        });

        if (!event) throw new NotFoundException(`Event with ID "${id}" does not exist.`);

        const translation = event.translations.find((t) => t.locale === locale);
        if (!translation) throw new NotFoundException(`Translation for locale "${locale}" not found.`);

        if (translation.status !== ContentStatus.ARCHIVED) {
          throw new BadRequestException(`Only ARCHIVED events can be restored. Current status: ${translation.status}`);
        }

        const updated = await this.prisma.$transaction(async (tx) => {
          await tx.eventTranslation.update({
            where: { id: translation.id },
            data: {
              status: ContentStatus.DRAFT,
              archivedAt: null,
            },
          });

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'EVENT_RESTORE',
              resource: 'Event',
              resourceId: id,
              metadata: { locale },
            },
          });

          return tx.event.findUnique({
            where: { id },
            include: {
              translations: true,
              author: {
                select: { id: true, fullName: true, email: true },
              },
            },
          });
        });

        if (!updated) throw new NotFoundException('Event not found.');
        return this.mapToEventResponse(updated);
      }
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      this.logger.warn(`Database error restoring event ${id}: ${(err as Error).message}`);
    }

    const mem = this.memoryEvents.get(id);
    if (!mem) throw new NotFoundException(`Event with ID "${id}" does not exist.`);

    const tr = mem.translations.find((t) => t.locale === locale);
    if (!tr) throw new NotFoundException(`Translation for locale "${locale}" not found.`);

    if (tr.status !== ContentStatus.ARCHIVED) {
      throw new BadRequestException(`Only ARCHIVED events can be restored. Current status: ${tr.status}`);
    }

    tr.status = ContentStatus.DRAFT;
    tr.archivedAt = null;
    tr.updatedAt = new Date();

    return this.mapToEventResponse(mem);
  }

  private mapToEventResponse(event: any): EventResponseDto {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    const translations: EventTranslationResponseDto[] = (event.translations || []).map((t: any) => ({
      id: t.id,
      eventId: t.eventId,
      locale: t.locale,
      title: t.title,
      shortDescription: t.shortDescription,
      fullDescription: t.fullDescription,
      venueName: t.venueName,
      venueAddress: t.venueAddress,
      targetAudience: Array.isArray(t.targetAudience) ? t.targetAudience : [],
      agendaHighlights: Array.isArray(t.agendaHighlights) ? t.agendaHighlights : [],
      status: t.status,
      reviewerNotes: t.reviewerNotes,
      publishedAt: t.publishedAt ? new Date(t.publishedAt).toISOString() : null,
      archivedAt: t.archivedAt ? new Date(t.archivedAt).toISOString() : null,
      createdAt: new Date(t.createdAt).toISOString(),
      updatedAt: new Date(t.updatedAt).toISOString(),
    }));

    return {
      id: event.id,
      slug: event.slug,
      category: event.category,
      eventStatus: event.eventStatus,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timeRange: event.timeRange,
      venueType: event.venueType,
      organizer: event.organizer,
      registrationUrl: event.registrationUrl,
      registrationDeadline: event.registrationDeadline
        ? new Date(event.registrationDeadline).toISOString()
        : null,
      isExternal: event.isExternal ?? false,
      bannerAssetId: event.bannerAssetId,
      currentVersion: event.currentVersion,
      authorId: event.authorId,
      author: event.author
        ? {
            id: event.author.id,
            fullName: event.author.fullName,
            email: event.author.email,
          }
        : null,
      translations,
      computedScheduleStatus: this.computeScheduleStatus(startDate, endDate, event.eventStatus),
      createdAt: new Date(event.createdAt).toISOString(),
      updatedAt: new Date(event.updatedAt).toISOString(),
    };
  }
}
