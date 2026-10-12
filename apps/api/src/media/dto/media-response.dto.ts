import { DocumentType, MediaType, MediaVisibility } from '@prisma/client';

export class MediaUploaderResponseDto {
  id: string;
  fullName: string;
  email: string;
}

export class MediaAssetResponseDto {
  id: string;
  originalName: string;
  storageKey: string;
  publicUrl: string | null;
  mimeType: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  fileExtension: string;
  checksumSha256: string;
  mediaType: MediaType;
  visibility: MediaVisibility;
  width: number | null;
  height: number | null;
  altTextEn: string | null;
  altTextMr: string | null;
  caption: string | null;
  attribution: string | null;
  documentType: DocumentType | null;
  reportingPeriod: string | null;
  isStatutory: boolean;
  usageCount: number;
  uploaderId: string | null;
  uploader?: MediaUploaderResponseDto | null;
  createdAt: string;
  updatedAt: string;
}

export class PaginatedMediaResponseDto {
  items: MediaAssetResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
