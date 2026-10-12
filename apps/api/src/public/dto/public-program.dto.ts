export interface PublicProgramDto {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  focusAreas: string[];
  eligibilityCriteria: string[];
  supportOfferings: string[];
  durationMonths: number;
  applicationStatus: 'OPEN' | 'UPCOMING' | 'CLOSED';
  cohortSchedule?: string;
  bannerAssetId?: string | null;
  locale: string;
}

export interface PaginatedPublicProgramsDto {
  data: PublicProgramDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
