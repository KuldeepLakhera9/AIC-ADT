import crypto from 'node:crypto';
import type { Readable } from 'node:stream';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DocumentType, MediaType, MediaVisibility } from '@prisma/client';
import { PrismaService } from '../database/prisma.service.js';
import { AppLoggerService } from '../common/logger/app-logger.service.js';
import type { AuthUserDto } from '../auth/dto/auth-user.dto.js';
import {
  DEFAULT_MEDIA_LIMIT,
  DEFAULT_MEDIA_PAGE,
  type UploadedMediaFile,
} from './media.constants.js';
import { validateUploadedFile } from './utils/file-validator.util.js';
import { extractImageDimensions } from './utils/image-inspector.util.js';
import {
  STORAGE_SERVICE_TOKEN,
  type IStorageService,
} from './storage/storage.interface.js';
import type { UploadMediaDto } from './dto/upload-media.dto.js';
import type { UpdateMediaDto } from './dto/update-media.dto.js';
import type { QueryMediaDto } from './dto/query-media.dto.js';
import type {
  MediaAssetResponseDto,
  PaginatedMediaResponseDto,
} from './dto/media-response.dto.js';

interface InMemoryMediaAsset {
  id: string;
  originalName: string;
  storageKey: string;
  storagePath: string;
  publicUrl: string | null;
  mimeType: string;
  fileSizeBytes: number;
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
  uploader?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MediaService {
  private readonly logger = new AppLoggerService('MediaService');
  private readonly inMemoryStore = new Map<string, InMemoryMediaAsset>();

  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
  ) {}

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  private mapToResponseDto(
    asset: InMemoryMediaAsset | (Record<string, unknown> & { id: string }),
  ): MediaAssetResponseDto {
    const a = asset as unknown as InMemoryMediaAsset;
    return {
      id: a.id,
      originalName: a.originalName,
      storageKey: a.storageKey,
      publicUrl: a.publicUrl,
      mimeType: a.mimeType,
      fileSizeBytes: a.fileSizeBytes,
      fileSizeFormatted: this.formatFileSize(a.fileSizeBytes),
      fileExtension: a.fileExtension,
      checksumSha256: a.checksumSha256,
      mediaType: a.mediaType,
      visibility: a.visibility,
      width: a.width ?? null,
      height: a.height ?? null,
      altTextEn: a.altTextEn ?? null,
      altTextMr: a.altTextMr ?? null,
      caption: a.caption ?? null,
      attribution: a.attribution ?? null,
      documentType: a.documentType ?? null,
      reportingPeriod: a.reportingPeriod ?? null,
      isStatutory: Boolean(a.isStatutory),
      usageCount: a.usageCount ?? 0,
      uploaderId: a.uploaderId ?? null,
      uploader: a.uploader
        ? {
            id: a.uploader.id,
            fullName: a.uploader.fullName,
            email: a.uploader.email,
          }
        : null,
      createdAt: (a.createdAt instanceof Date
        ? a.createdAt
        : new Date(a.createdAt)
      ).toISOString(),
      updatedAt: (a.updatedAt instanceof Date
        ? a.updatedAt
        : new Date(a.updatedAt)
      ).toISOString(),
    };
  }

  async upload(
    file: UploadedMediaFile,
    dto: UploadMediaDto,
    currentUser: AuthUserDto,
  ): Promise<MediaAssetResponseDto> {
    // 1. Rigorous server-side validation
    const meta = validateUploadedFile(file);

    // 2. Classify media type
    const mediaType = meta.isImage ? MediaType.IMAGE : MediaType.DOCUMENT;

    // 3. Extract image dimensions
    const dimensions = meta.isImage
      ? extractImageDimensions(file.buffer, meta.verifiedMimeType)
      : { width: null, height: null };

    // 4. Generate stable storage key and UUID
    const id = crypto.randomUUID();
    const visibility = dto.visibility || MediaVisibility.PUBLIC;
    const storageKey = `${id}${meta.extension}`;

    // 5. Store file using pluggable storage adapter
    const uploadResult = await this.storageService.uploadFile({
      storageKey,
      buffer: file.buffer,
      mimeType: meta.verifiedMimeType,
      visibility,
    });

    const now = new Date();
    const record: InMemoryMediaAsset = {
      id,
      originalName: meta.sanitizedFilename,
      storageKey: uploadResult.storageKey,
      storagePath: uploadResult.storagePath,
      publicUrl: uploadResult.publicUrl,
      mimeType: meta.verifiedMimeType,
      fileSizeBytes: meta.fileSizeBytes,
      fileExtension: meta.extension,
      checksumSha256: meta.checksumSha256,
      mediaType,
      visibility,
      width: dimensions.width,
      height: dimensions.height,
      altTextEn: dto.altTextEn?.trim() || null,
      altTextMr: dto.altTextMr?.trim() || null,
      caption: dto.caption?.trim() || null,
      attribution: dto.attribution?.trim() || null,
      documentType: dto.documentType || null,
      reportingPeriod: dto.reportingPeriod?.trim() || null,
      isStatutory: Boolean(dto.isStatutory),
      usageCount: 0,
      uploaderId: currentUser.id,
      uploader: {
        id: currentUser.id,
        fullName: currentUser.fullName,
        email: currentUser.email,
      },
      createdAt: now,
      updatedAt: now,
    };

    if (this.prisma.connected) {
      try {
        await this.prisma.mediaAsset.create({
          data: {
            id: record.id,
            originalName: record.originalName,
            storageKey: record.storageKey,
            storagePath: record.storagePath,
            publicUrl: record.publicUrl,
            mimeType: record.mimeType,
            fileSizeBytes: record.fileSizeBytes,
            fileExtension: record.fileExtension,
            checksumSha256: record.checksumSha256,
            mediaType: record.mediaType,
            visibility: record.visibility,
            width: record.width,
            height: record.height,
            altTextEn: record.altTextEn,
            altTextMr: record.altTextMr,
            caption: record.caption,
            attribution: record.attribution,
            documentType: record.documentType,
            reportingPeriod: record.reportingPeriod,
            isStatutory: record.isStatutory,
            usageCount: record.usageCount,
            uploaderId: record.uploaderId,
          },
        });

        await this.prisma.auditLog.create({
          data: {
            userId: currentUser.id,
            action: 'MEDIA_UPLOADED',
            resource: 'media_asset',
            resourceId: id,
            metadata: {
              originalName: record.originalName,
              mimeType: record.mimeType,
              fileSizeBytes: record.fileSizeBytes,
              visibility: record.visibility,
            },
          },
        });
      } catch (err) {
        this.logger.error(
          `Database persistence error for media ${id}: ${err instanceof Error ? err.message : 'Unknown error'}`,
          undefined,
          'MediaService',
        );
        this.inMemoryStore.set(id, record);
      }
    } else {
      this.inMemoryStore.set(id, record);
    }

    this.logger.log(
      `Media asset ${id} (${record.originalName}) successfully uploaded and registered.`,
      'MediaService',
    );

    return this.mapToResponseDto(record);
  }

  async findAll(query: QueryMediaDto): Promise<PaginatedMediaResponseDto> {
    const page = query.page || DEFAULT_MEDIA_PAGE;
    const limit = query.limit || DEFAULT_MEDIA_LIMIT;
    const skip = (page - 1) * limit;

    if (this.prisma.connected) {
      try {
        const where: Record<string, unknown> = {};

        if (query.mediaType) {
          where.mediaType = query.mediaType;
        }
        if (query.visibility) {
          where.visibility = query.visibility;
        }
        if (query.documentType) {
          where.documentType = query.documentType;
        }
        if (query.search) {
          where.OR = [
            { originalName: { contains: query.search, mode: 'insensitive' } },
            { altTextEn: { contains: query.search, mode: 'insensitive' } },
            { altTextMr: { contains: query.search, mode: 'insensitive' } },
            { caption: { contains: query.search, mode: 'insensitive' } },
          ];
        }

        const sortBy = query.sortBy || 'createdAt';
        const sortOrder = query.sortOrder || 'desc';

        const [items, total] = await Promise.all([
          this.prisma.mediaAsset.findMany({
            where,
            include: {
              uploader: {
                select: { id: true, fullName: true, email: true },
              },
            },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit,
          }),
          this.prisma.mediaAsset.count({ where }),
        ]);

        return {
          items: items.map((item) => this.mapToResponseDto(item as unknown as InMemoryMediaAsset)),
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        };
      } catch (err) {
        this.logger.warn(
          `Prisma query failed, falling back to in-memory store: ${err instanceof Error ? err.message : 'Unknown error'}`,
          'MediaService',
        );
      }
    }

    // In-memory filter & sort fallback
    let items = Array.from(this.inMemoryStore.values());

    if (query.mediaType) {
      items = items.filter((item) => item.mediaType === query.mediaType);
    }
    if (query.visibility) {
      items = items.filter((item) => item.visibility === query.visibility);
    }
    if (query.documentType) {
      items = items.filter((item) => item.documentType === query.documentType);
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.originalName.toLowerCase().includes(q) ||
          item.altTextEn?.toLowerCase().includes(q) ||
          item.altTextMr?.toLowerCase().includes(q) ||
          item.caption?.toLowerCase().includes(q),
      );
    }

    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'desc';

    items.sort((a, b) => {
      let valA: unknown = a[sortBy];
      let valB: unknown = b[sortBy];
      if (valA instanceof Date) valA = valA.getTime();
      if (valB instanceof Date) valB = valB.getTime();

      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (sortOrder === 'asc') {
        return valA > valB ? 1 : -1;
      }
      return valA < valB ? 1 : -1;
    });

    const total = items.length;
    const paginatedItems = items.slice(skip, skip + limit);

    return {
      items: paginatedItems.map((item) => this.mapToResponseDto(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async findOne(id: string): Promise<MediaAssetResponseDto> {
    if (this.prisma.connected) {
      try {
        const asset = await this.prisma.mediaAsset.findUnique({
          where: { id },
          include: {
            uploader: {
              select: { id: true, fullName: true, email: true },
            },
          },
        });
        if (asset) {
          return this.mapToResponseDto(asset as unknown as InMemoryMediaAsset);
        }
      } catch (err) {
        this.logger.warn(
          `Prisma findOne error: ${err instanceof Error ? err.message : 'Unknown error'}`,
          'MediaService',
        );
      }
    }

    const memoryItem = this.inMemoryStore.get(id);
    if (!memoryItem) {
      throw new NotFoundException(`Media asset with ID '${id}' was not found.`);
    }
    return this.mapToResponseDto(memoryItem);
  }

  async update(
    id: string,
    dto: UpdateMediaDto,
    currentUser: AuthUserDto,
  ): Promise<MediaAssetResponseDto> {
    const existing = await this.findOne(id);

    const newVisibility = dto.visibility || existing.visibility;
    const publicUrl = this.storageService.getPublicUrl(
      existing.storageKey,
      newVisibility,
    );

    const updateData = {
      altTextEn: dto.altTextEn !== undefined ? dto.altTextEn?.trim() || null : existing.altTextEn,
      altTextMr: dto.altTextMr !== undefined ? dto.altTextMr?.trim() || null : existing.altTextMr,
      caption: dto.caption !== undefined ? dto.caption?.trim() || null : existing.caption,
      attribution: dto.attribution !== undefined ? dto.attribution?.trim() || null : existing.attribution,
      visibility: newVisibility,
      documentType: dto.documentType !== undefined ? dto.documentType : existing.documentType,
      reportingPeriod: dto.reportingPeriod !== undefined ? dto.reportingPeriod?.trim() || null : existing.reportingPeriod,
      isStatutory: dto.isStatutory !== undefined ? dto.isStatutory : existing.isStatutory,
      publicUrl,
      updatedAt: new Date(),
    };

    if (this.prisma.connected) {
      try {
        const updated = await this.prisma.mediaAsset.update({
          where: { id },
          data: updateData,
          include: {
            uploader: {
              select: { id: true, fullName: true, email: true },
            },
          },
        });

        await this.prisma.auditLog.create({
          data: {
            userId: currentUser.id,
            action: 'MEDIA_METADATA_UPDATED',
            resource: 'media_asset',
            resourceId: id,
            metadata: JSON.parse(JSON.stringify(dto)),
          },
        });

        return this.mapToResponseDto(updated as unknown as InMemoryMediaAsset);
      } catch (err) {
        this.logger.warn(
          `Prisma update failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
          'MediaService',
        );
      }
    }

    const memoryItem = this.inMemoryStore.get(id);
    if (!memoryItem) {
      throw new NotFoundException(`Media asset with ID '${id}' was not found.`);
    }

    Object.assign(memoryItem, updateData);
    this.inMemoryStore.set(id, memoryItem);

    return this.mapToResponseDto(memoryItem);
  }

  async checkReferences(id: string): Promise<{ isReferenced: boolean; referencedBy: string[] }> {
    const referencedBy: string[] = [];

    if (this.prisma.connected) {
      try {
        const [newsCount, eventCount] = await Promise.all([
          this.prisma.newsArticle.count({
            where: { thumbnailAssetId: id },
          }),
          this.prisma.event.count({
            where: { bannerAssetId: id },
          }),
        ]);

        if (newsCount > 0) {
          referencedBy.push(`${newsCount} News Article(s)`);
        }
        if (eventCount > 0) {
          referencedBy.push(`${eventCount} Event(s)`);
        }
      } catch {
        // Continue with reference check fallback
      }
    }

    const memoryItem = this.inMemoryStore.get(id);
    if (memoryItem && memoryItem.usageCount > 0) {
      referencedBy.push(`${memoryItem.usageCount} Content Item(s)`);
    }

    return {
      isReferenced: referencedBy.length > 0,
      referencedBy,
    };
  }

  async delete(
    id: string,
    currentUser: AuthUserDto,
  ): Promise<{ success: boolean; message: string }> {
    // 1. Check if asset exists
    const asset = await this.findOne(id);

    // 2. Reference guard — prevent deleting media if referenced by content
    const { isReferenced, referencedBy } = await this.checkReferences(id);
    if (isReferenced) {
      throw new ConflictException(
        `Cannot delete media asset '${asset.originalName}': It is currently referenced by ${referencedBy.join(', ')}. Unlink the asset from content or set its visibility to ARCHIVED.`,
      );
    }

    // 3. Delete from physical storage
    let storagePath = '';
    if (this.inMemoryStore.has(id)) {
      storagePath = this.inMemoryStore.get(id)!.storagePath;
    } else if (this.prisma.connected) {
      const dbRecord = await this.prisma.mediaAsset.findUnique({
        where: { id },
        select: { storagePath: true },
      });
      if (dbRecord) storagePath = dbRecord.storagePath;
    }

    if (storagePath) {
      await this.storageService.deleteFile(storagePath);
    }

    // 4. Delete database record
    if (this.prisma.connected) {
      try {
        await this.prisma.mediaAsset.delete({ where: { id } });

        await this.prisma.auditLog.create({
          data: {
            userId: currentUser.id,
            action: 'MEDIA_DELETED',
            resource: 'media_asset',
            resourceId: id,
            metadata: {
              originalName: asset.originalName,
              storageKey: asset.storageKey,
            },
          },
        });
      } catch (err) {
        this.logger.warn(
          `Prisma delete failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
          'MediaService',
        );
      }
    }

    this.inMemoryStore.delete(id);

    this.logger.log(
      `Media asset ${id} (${asset.originalName}) successfully deleted.`,
      'MediaService',
    );

    return {
      success: true,
      message: `Media asset '${asset.originalName}' was successfully deleted from repository and storage.`,
    };
  }

  async getFileStreamForDownload(id: string): Promise<{
    stream: Readable;
    filename: string;
    mimeType: string;
    fileSizeBytes: number;
    visibility: MediaVisibility;
  }> {
    let storagePath = '';
    let filename = '';
    let mimeType = '';
    let fileSizeBytes = 0;
    let visibility: MediaVisibility = MediaVisibility.PUBLIC;

    if (this.prisma.connected) {
      const dbRecord = await this.prisma.mediaAsset.findUnique({
        where: { id },
      });
      if (dbRecord) {
        storagePath = dbRecord.storagePath;
        filename = dbRecord.originalName;
        mimeType = dbRecord.mimeType;
        fileSizeBytes = dbRecord.fileSizeBytes;
        visibility = dbRecord.visibility;
      }
    }

    if (!storagePath && this.inMemoryStore.has(id)) {
      const mem = this.inMemoryStore.get(id)!;
      storagePath = mem.storagePath;
      filename = mem.originalName;
      mimeType = mem.mimeType;
      fileSizeBytes = mem.fileSizeBytes;
      visibility = mem.visibility;
    }

    if (!storagePath) {
      throw new NotFoundException(`Media asset with ID '${id}' was not found.`);
    }

    const stream = await this.storageService.getFileStream(storagePath);

    return {
      stream,
      filename,
      mimeType,
      fileSizeBytes,
      visibility,
    };
  }
}
