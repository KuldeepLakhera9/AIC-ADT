export interface PublicEventDto {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: unknown;
  venueName: string;
  venueAddress: string;
  category: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string | null;
  registrationUrl: string | null;
  bannerAssetId: string | null;
  capacity: number | null;
  targetAudience: string[];
  agendaHighlights?: Array<{ time: string; session: string; speaker?: string }>;
  locale: string;
  isAvailableInLocale: boolean;
}

export interface PaginatedPublicEventsDto {
  data: PublicEventDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
