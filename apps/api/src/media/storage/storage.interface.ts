import type { Readable } from 'node:stream';
import { MediaVisibility } from '@prisma/client';

export interface StorageUploadInput {
  storageKey: string;
  buffer: Buffer;
  mimeType: string;
  visibility: MediaVisibility;
}

export interface StorageUploadResult {
  storageKey: string;
  storagePath: string;
  publicUrl: string | null;
}

export const STORAGE_SERVICE_TOKEN = Symbol('STORAGE_SERVICE_TOKEN');

export interface IStorageService {
  /**
   * Persist a verified buffer to storage with appropriate visibility segregation.
   */
  uploadFile(input: StorageUploadInput): Promise<StorageUploadResult>;

  /**
   * Stream a stored file by its physical or logical storage path.
   */
  getFileStream(storagePath: string): Promise<Readable>;

  /**
   * Delete a stored file from storage.
   */
  deleteFile(storagePath: string): Promise<boolean>;

  /**
   * Check if a file exists in storage.
   */
  fileExists(storagePath: string): Promise<boolean>;

  /**
   * Resolve public URL for an asset based on visibility.
   */
  getPublicUrl(storageKey: string, visibility: MediaVisibility): string | null;
}
