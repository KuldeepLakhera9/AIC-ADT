export interface PublicStartupDto {
  id: string;
  slug: string;
  name: string;
  sector: string;
  incubationYear: number;
  cohort: string;
  stage: string;
  websiteUrl: string | null;
  logoAssetId: string | null;
  oneLiner: string;
  briefProfile: string;
  founders: string[];
  headquarters: string;
}

export interface PaginatedPublicStartupsDto {
  data: PublicStartupDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
