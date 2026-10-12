import { ContentStatus, EventCategory, EventStatus, VenueType } from '@prisma/client';

export class EventTranslationResponseDto {
  id!: string;
  eventId!: string;
  locale!: string;
  title!: string;
  shortDescription!: string;
  fullDescription!: unknown;
  venueName!: string;
  venueAddress!: string;
  targetAudience!: string[];
  agendaHighlights?: string[];
  status!: ContentStatus;
  reviewerNotes?: string | null;
  publishedAt?: string | null;
  archivedAt?: string | null;
  createdAt!: string;
  updatedAt!: string;
}

export class EventResponseDto {
  id!: string;
  slug!: string;
  category!: EventCategory;
  eventStatus!: EventStatus;
  startDate!: string;
  endDate!: string;
  timeRange!: string;
  venueType!: VenueType;
  organizer!: string;
  registrationUrl?: string | null;
  registrationDeadline?: string | null;
  isExternal!: boolean;
  bannerAssetId?: string | null;
  currentVersion!: number;
  authorId?: string | null;
  author?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  translations!: EventTranslationResponseDto[];
  computedScheduleStatus?: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
  createdAt!: string;
  updatedAt!: string;
}

export class PaginatedEventResponseDto {
  items!: EventResponseDto[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}
