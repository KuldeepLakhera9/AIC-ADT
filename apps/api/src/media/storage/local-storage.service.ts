import fs from 'node:fs';
import path from 'node:path';
import type { Readable } from 'node:stream';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MediaVisibility } from '@prisma/client';
import { AppLoggerService } from '../../common/logger/app-logger.service.js';
import type {
  IStorageService,
  StorageUploadInput,
  StorageUploadResult,
} from './storage.interface.js';

@Injectable()
export class LocalStorageService implements IStorageService {
  private readonly logger = new AppLoggerService('LocalStorageService');
  private readonly publicRoot: string;
  private readonly privateRoot: string;

  constructor(private readonly configService: ConfigService) {
    // Monorepo root is 2 levels up from apps/api
    const workspaceRoot = path.resolve(process.cwd(), '../../');
    this.publicRoot = path.resolve(
      workspaceRoot,
      this.configService.get<string>('STORAGE_PUBLIC_DIR', 'storage/public'),
    );
    this.privateRoot = path.resolve(
      workspaceRoot,
      this.configService.get<string>('STORAGE_PRIVATE_DIR', 'storage/private'),
    );

    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist(): void {
    try {
      if (!fs.existsSync(this.publicRoot)) {
        fs.mkdirSync(this.publicRoot, { recursive: true, mode: 0o755 });
      }
      if (!fs.existsSync(this.privateRoot)) {
        fs.mkdirSync(this.privateRoot, { recursive: true, mode: 0o700 });
      }
    } catch (err) {
      this.logger.error(
        `Failed to initialize local storage directories: ${err instanceof Error ? err.message : 'Unknown error'}`,
        undefined,
        'LocalStorageService',
      );
    }
  }

  private getRootForVisibility(visibility: MediaVisibility): string {
    return visibility === MediaVisibility.PUBLIC
      ? this.publicRoot
      : this.privateRoot;
  }

  private resolveSafePath(storageKey: string, visibility: MediaVisibility): string {
    const root = this.getRootForVisibility(visibility);
    const resolved = path.resolve(root, storageKey);

    // Path traversal verification
    if (!resolved.startsWith(root)) {
      throw new InternalServerErrorException(
        'Critical security violation: Storage key resolves outside designated storage root directory.',
      );
    }
    return resolved;
  }

  async uploadFile(input: StorageUploadInput): Promise<StorageUploadResult> {
    const targetPath = this.resolveSafePath(input.storageKey, input.visibility);
    const parentDir = path.dirname(targetPath);

    try {
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      await fs.promises.writeFile(targetPath, input.buffer);

      const publicUrl = this.getPublicUrl(input.storageKey, input.visibility);

      return {
        storageKey: input.storageKey,
        storagePath: targetPath,
        publicUrl,
      };
    } catch (err) {
      this.logger.error(
        `Error writing file to local storage at ${targetPath}: ${err instanceof Error ? err.message : 'Unknown error'}`,
        undefined,
        'LocalStorageService',
      );
      throw new InternalServerErrorException('Failed to persist file in storage.');
    }
  }

  async getFileStream(storagePath: string): Promise<Readable> {
    const exists = await this.fileExists(storagePath);
    if (!exists) {
      throw new NotFoundException('Requested media file does not exist on storage volume.');
    }
    return fs.createReadStream(storagePath);
  }

  async deleteFile(storagePath: string): Promise<boolean> {
    try {
      if (fs.existsSync(storagePath)) {
        await fs.promises.unlink(storagePath);
        return true;
      }
      return false;
    } catch (err) {
      this.logger.error(
        `Error deleting file from storage at ${storagePath}: ${err instanceof Error ? err.message : 'Unknown error'}`,
        undefined,
        'LocalStorageService',
      );
      return false;
    }
  }

  async fileExists(storagePath: string): Promise<boolean> {
    return fs.existsSync(storagePath);
  }

  getPublicUrl(storageKey: string, visibility: MediaVisibility): string | null {
    if (visibility !== MediaVisibility.PUBLIC) {
      return null;
    }
    return `/uploads/public/${storageKey}`;
  }
}
