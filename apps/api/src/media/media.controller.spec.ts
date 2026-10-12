import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { MediaVisibility, Role } from '@prisma/client';
import { MediaController, type UploadedMediaFile } from './media.controller.js';
import type { MediaService } from './media.service.js';
import { Readable } from 'node:stream';

describe('MediaController', () => {
  let controller: MediaController;
  let mockMediaService: Partial<MediaService>;

  const mockUser = {
    id: 'user-uuid-1',
    email: 'admin@aic-adt.org',
    fullName: 'System Admin',
    role: Role.ADMIN,
    status: 'ACTIVE',
    permissions: [],
  };

  beforeEach(() => {
    mockMediaService = {
      findAll: vi.fn().mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 1,
      }),
      findOne: vi.fn().mockResolvedValue({
        id: 'media-uuid-1',
        originalName: 'test.png',
      } as any),
      upload: vi.fn().mockResolvedValue({
        id: 'media-uuid-1',
        originalName: 'test.png',
        visibility: MediaVisibility.PUBLIC,
      } as any),
      update: vi.fn().mockResolvedValue({
        id: 'media-uuid-1',
        originalName: 'test.png',
        altTextEn: 'Updated Alt',
      } as any),
      delete: vi.fn().mockResolvedValue({
        success: true,
        message: 'Deleted successfully',
      }),
      getFileStreamForDownload: vi.fn().mockResolvedValue({
        stream: Readable.from(Buffer.from('file-bytes')),
        filename: 'test.png',
        mimeType: 'image/png',
        fileSizeBytes: 10,
        visibility: MediaVisibility.PUBLIC,
      }),
    };

    controller = new MediaController(mockMediaService as MediaService);
  });

  it('delegates findAll to service', async () => {
    const res = await controller.findAll({ page: 1, limit: 10 });
    expect(res.total).toBe(0);
    expect(mockMediaService.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });

  it('delegates findOne to service', async () => {
    const res = await controller.findOne('media-uuid-1');
    expect(res.id).toBe('media-uuid-1');
    expect(mockMediaService.findOne).toHaveBeenCalledWith('media-uuid-1');
  });

  it('throws BadRequestException if no file is provided on upload', async () => {
    await expect(
      controller.upload(undefined, {}, mockUser),
    ).rejects.toThrow(BadRequestException);
  });

  it('delegates upload to service when file is present', async () => {
    const file: UploadedMediaFile = {
      fieldname: 'file',
      originalname: 'test.png',
      encoding: '7bit',
      mimetype: 'image/png',
      size: 10,
      buffer: Buffer.from('test'),
    };

    const res = await controller.upload(file, { altTextEn: 'Alt' }, mockUser);
    expect(res.id).toBe('media-uuid-1');
    expect(mockMediaService.upload).toHaveBeenCalledWith(file, { altTextEn: 'Alt' }, mockUser);
  });

  it('delegates update to service', async () => {
    const res = await controller.update('media-uuid-1', { altTextEn: 'Updated Alt' }, mockUser);
    expect(res.altTextEn).toBe('Updated Alt');
    expect(mockMediaService.update).toHaveBeenCalledWith('media-uuid-1', { altTextEn: 'Updated Alt' }, mockUser);
  });

  it('delegates delete to service', async () => {
    const res = await controller.remove('media-uuid-1', mockUser);
    expect(res.success).toBe(true);
    expect(mockMediaService.delete).toHaveBeenCalledWith('media-uuid-1', mockUser);
  });

  it('pipes file stream with appropriate headers on download', async () => {
    const headers: Record<string, string | number> = {};
    const mockRes = {
      setHeader: vi.fn((k: string, v: string | number) => {
        headers[k] = v;
      }),
      on: vi.fn(),
      once: vi.fn(),
      emit: vi.fn(),
      write: vi.fn(),
      end: vi.fn(),
    } as any;

    await controller.download('media-uuid-1', mockRes);

    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'image/png');
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Length', 10);
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      'attachment; filename="test.png"',
    );
  });
});
