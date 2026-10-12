import { beforeEach, describe, expect, it } from 'vitest';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { DocumentType, MediaVisibility, Role } from '@prisma/client';
import { MediaService } from './media.service.js';
import type { IStorageService, StorageUploadInput, StorageUploadResult } from './storage/storage.interface.js';
import { Readable } from 'node:stream';

class MockStorageService implements IStorageService {
  public files = new Map<string, Buffer>();

  async uploadFile(input: StorageUploadInput): Promise<StorageUploadResult> {
    this.files.set(input.storageKey, input.buffer);
    return {
      storageKey: input.storageKey,
      storagePath: `/mock/storage/${input.storageKey}`,
      publicUrl: input.visibility === MediaVisibility.PUBLIC ? `/uploads/public/${input.storageKey}` : null,
    };
  }

  async getFileStream(storagePath: string): Promise<Readable> {
    const key = storagePath.replace('/mock/storage/', '');
    const buf = this.files.get(key) || Buffer.from('mock content');
    return Readable.from(buf);
  }

  async deleteFile(storagePath: string): Promise<boolean> {
    const key = storagePath.replace('/mock/storage/', '');
    this.files.delete(key);
    return true;
  }

  async fileExists(storagePath: string): Promise<boolean> {
    const key = storagePath.replace('/mock/storage/', '');
    return this.files.has(key);
  }

  getPublicUrl(storageKey: string, visibility: MediaVisibility): string | null {
    return visibility === MediaVisibility.PUBLIC ? `/uploads/public/${storageKey}` : null;
  }
}

describe('MediaService', () => {
  let mediaService: MediaService;
  let mockStorage: MockStorageService;

  const mockUser = {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'editor@aic-adt.org',
    fullName: 'Content Editor',
    role: Role.CONTENT_EDITOR,
    status: 'ACTIVE',
    permissions: [],
  };

  const samplePngBuffer = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
    0x00, 0x00, 0x00, 0x0d, // IHDR length (13)
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x03, 0x20, // Width: 800
    0x00, 0x00, 0x02, 0x58, // Height: 600
    0x08, 0x02, 0x00, 0x00, 0x00,
    0x90, 0x77, 0x53, 0xde,
  ]);

  const samplePdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF');

  beforeEach(() => {
    mockStorage = new MockStorageService();
    // PrismaService mock with disconnected state for unit tests
    const mockPrisma = {
      connected: false,
      mediaAsset: {},
      auditLog: {},
      newsArticle: {},
      event: {},
    } as any;

    mediaService = new MediaService(mockPrisma, mockStorage);
  });

  it('uploads a valid public PNG image and extracts dimensions', async () => {
    const file = {
      fieldname: 'file',
      originalname: 'annual-symposium.png',
      encoding: '7bit',
      mimetype: 'image/png',
      size: samplePngBuffer.length,
      buffer: samplePngBuffer,
    };

    const result = await mediaService.upload(
      file,
      {
        altTextEn: 'Annual Innovation Symposium Banner',
        altTextMr: 'वार्षिक नवोपक्रम परिषद बॅनर',
        visibility: MediaVisibility.PUBLIC,
      },
      mockUser,
    );

    expect(result.id).toBeDefined();
    expect(result.originalName).toBe('annual-symposium.png');
    expect(result.mimeType).toBe('image/png');
    expect(result.width).toBe(800);
    expect(result.height).toBe(600);
    expect(result.visibility).toBe(MediaVisibility.PUBLIC);
    expect(result.publicUrl).toContain('/uploads/public/');
    expect(result.altTextEn).toBe('Annual Innovation Symposium Banner');
  });

  it('uploads a private PDF document without public URL', async () => {
    const file = {
      fieldname: 'file',
      originalname: 'Q3_Financial_Audit.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      size: samplePdfBuffer.length,
      buffer: samplePdfBuffer,
    };

    const result = await mediaService.upload(
      file,
      {
        documentType: DocumentType.FINANCIAL_AUDIT,
        reportingPeriod: '2025-Q3',
        isStatutory: true,
        visibility: MediaVisibility.PRIVATE,
      },
      mockUser,
    );

    expect(result.id).toBeDefined();
    expect(result.mimeType).toBe('application/pdf');
    expect(result.visibility).toBe(MediaVisibility.PRIVATE);
    expect(result.publicUrl).toBeNull();
    expect(result.documentType).toBe(DocumentType.FINANCIAL_AUDIT);
    expect(result.isStatutory).toBe(true);
  });

  it('lists and filters media assets with pagination', async () => {
    // Seed 2 files
    await mediaService.upload(
      {
        fieldname: 'file',
        originalname: 'image1.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: samplePngBuffer.length,
        buffer: samplePngBuffer,
      },
      { altTextEn: 'Featured Image' },
      mockUser,
    );

    await mediaService.upload(
      {
        fieldname: 'file',
        originalname: 'report.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: samplePdfBuffer.length,
        buffer: samplePdfBuffer,
      },
      { visibility: MediaVisibility.PRIVATE },
      mockUser,
    );

    const listAll = await mediaService.findAll({});
    expect(listAll.total).toBe(2);
    expect(listAll.items).toHaveLength(2);

    const imagesOnly = await mediaService.findAll({ mediaType: 'IMAGE' as any });
    expect(imagesOnly.total).toBe(1);
    expect(imagesOnly.items[0].originalName).toBe('image1.png');

    const searchResult = await mediaService.findAll({ search: 'Featured' });
    expect(searchResult.total).toBe(1);
  });

  it('updates metadata and transitions visibility', async () => {
    const created = await mediaService.upload(
      {
        fieldname: 'file',
        originalname: 'draft_doc.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: samplePdfBuffer.length,
        buffer: samplePdfBuffer,
      },
      { visibility: MediaVisibility.PRIVATE },
      mockUser,
    );

    expect(created.publicUrl).toBeNull();

    const updated = await mediaService.update(
      created.id,
      {
        altTextEn: 'Approved Document',
        visibility: MediaVisibility.PUBLIC,
      },
      mockUser,
    );

    expect(updated.altTextEn).toBe('Approved Document');
    expect(updated.visibility).toBe(MediaVisibility.PUBLIC);
    expect(updated.publicUrl).toContain('/uploads/public/');
  });

  it('blocks deletion when media asset is referenced by content', async () => {
    const created = await mediaService.upload(
      {
        fieldname: 'file',
        originalname: 'referenced_logo.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: samplePngBuffer.length,
        buffer: samplePngBuffer,
      },
      {},
      mockUser,
    );

    // Simulate reference by incrementing usageCount in store
    const storeItem = (mediaService as any).inMemoryStore.get(created.id);
    storeItem.usageCount = 2;

    await expect(mediaService.delete(created.id, mockUser)).rejects.toThrow(
      ConflictException,
    );
  });

  it('deletes unreferenced media asset from storage and repository', async () => {
    const created = await mediaService.upload(
      {
        fieldname: 'file',
        originalname: 'orphan.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: samplePngBuffer.length,
        buffer: samplePngBuffer,
      },
      {},
      mockUser,
    );

    const deleteResult = await mediaService.delete(created.id, mockUser);
    expect(deleteResult.success).toBe(true);

    await expect(mediaService.findOne(created.id)).rejects.toThrow(NotFoundException);
  });
});
