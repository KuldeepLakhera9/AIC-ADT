export interface PublicPublicationDto {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publicationType: string;
  reportingPeriod: string;
  publishDate: string;
  isStatutory: boolean;
  fileSizeBytes: number;
  fileExtension: string;
  downloadUrl: string;
}

export interface PaginatedPublicPublicationsDto {
  data: PublicPublicationDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
