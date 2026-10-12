export interface PublicInstitutionalPageDto {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: unknown;
  sections?: Array<{
    id: string;
    heading: string;
    body: string;
  }>;
  locale: string;
  updatedAt: string;
}
