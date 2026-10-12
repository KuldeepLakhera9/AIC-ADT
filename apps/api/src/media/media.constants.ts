export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
] as const;

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
] as const;

export const ALL_ALLOWED_MIME_TYPES = [
  ...ALLOWED_IMAGE_MIME_TYPES,
  ...ALLOWED_DOCUMENT_MIME_TYPES,
] as const;

export type AllowedMimeType = (typeof ALL_ALLOWED_MIME_TYPES)[number];

export const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'application/pdf': '.pdf',
};

export const EXTENSION_TO_MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

export const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_DOCUMENT_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export const ALLOWED_MEDIA_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'originalName',
  'fileSizeBytes',
] as const;

export type AllowedMediaSortField = (typeof ALLOWED_MEDIA_SORT_FIELDS)[number];

export const DEFAULT_MEDIA_PAGE = 1;
export const DEFAULT_MEDIA_LIMIT = 20;
export const MAX_MEDIA_LIMIT = 100;

export interface UploadedMediaFile {
  fieldname?: string;
  originalname: string;
  encoding?: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

