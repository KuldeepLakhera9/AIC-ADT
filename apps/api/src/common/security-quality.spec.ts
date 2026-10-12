import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExecutionContext, UnauthorizedException, ForbiddenException, ConflictException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { PermissionsGuard } from '../auth/guards/permissions.guard.js';
import { SessionService } from '../auth/session.service.js';
import { NewsService } from '../content/services/news.service.js';
import { WorkflowService } from '../workflow/workflow.service.js';
import { PublicService } from '../public/public.service.js';
import { MediaService } from '../media/media.service.js';
import { validateUploadedFile, detectMimeTypeFromBuffer, sanitizeFilename } from '../media/utils/file-validator.util.js';
import { Role, Permission, AuthenticatedUser } from '../auth/auth.types.js';
import { ContentStatus, MediaVisibility, ContentEntityType } from '@prisma/client';

describe('Phase 5 — Task 9: CMS Security, Integration and Quality Assurance', () => {
  let mockPrisma: any;
  let sessionService: SessionService;
  let reflector: Reflector;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockPrisma = {
      connected: false,
      session: {
        create: vi.fn(),
        findUnique: vi.fn(),
        delete: vi.fn(),
      },
      auditLog: {
        create: vi.fn().mockResolvedValue({ id: 'audit-1' }),
      },
      newsArticle: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn().mockResolvedValue(0),
      },
      event: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn().mockResolvedValue(0),
      },
      mediaAsset: {
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      $transaction: vi.fn(async (cb) => cb(mockPrisma)),
    };

    sessionService = new SessionService(mockPrisma);
    reflector = new Reflector();
  });

  /* -------------------------------------------------------------------------- */
  /* 1. AUTHENTICATION & AUTHORIZATION HARDENING                                */
  /* -------------------------------------------------------------------------- */
  describe('1. Authentication & Authorization Security', () => {
    it('SessionAuthGuard blocks unauthenticated direct access when no cookie or bearer header exists', async () => {
      const guard = new SessionAuthGuard(reflector, sessionService);

      const mockContext = {
        getHandler: vi.fn(),
        getClass: vi.fn(),
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
          }),
        }),
      } as unknown as ExecutionContext;

      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

      await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
    });

    it('SessionService terminates and invalidates expired sessions', async () => {
      const { rawToken } = await sessionService.createSession('user-1', '127.0.0.1', 'Vitest');

      // Manipulate expiry to past
      const tokenHash = (sessionService as any).hashToken(rawToken);
      const session = (sessionService as any).memorySessions.get(tokenHash);
      session.expiresAt = new Date(Date.now() - 10000);

      await expect(sessionService.validateSession(rawToken)).rejects.toThrow(
        /Session expired/i,
      );
    });

    it('SessionService immediately blocks disabled or inactive user accounts', async () => {
      mockPrisma.connected = true;
      mockPrisma.session.findUnique.mockResolvedValue({
        id: 'sess-1',
        tokenHash: 'hashed',
        expiresAt: new Date(Date.now() + 100000),
        user: {
          id: 'user-disabled',
          email: 'disabled@aic-adt.in',
          fullName: 'Deactivated User',
          role: Role.CONTENT_EDITOR,
          status: 'SUSPENDED',
        },
      });

      await expect(sessionService.validateSession('test-token')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('PermissionsGuard blocks users lacking required granular permissions', () => {
      const guard = new PermissionsGuard(reflector);

      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([
        Permission.USERS_MANAGE,
        Permission.AUDIT_READ,
      ]);

      const mockContext = {
        getHandler: vi.fn(),
        getClass: vi.fn(),
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              id: 'editor-1',
              role: Role.CONTENT_EDITOR,
              permissions: [Permission.CONTENT_READ, Permission.CONTENT_CREATE],
            },
          }),
        }),
      } as unknown as ExecutionContext;

      expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
    });

    it('Prevents cross-user modification: Editor cannot modify an article authored by another user', async () => {
      const newsService = new NewsService(mockPrisma);

      const authorUser: AuthenticatedUser = {
        id: 'author-alice',
        email: 'alice@aic-adt.in',
        fullName: 'Alice Author',
        role: Role.CONTENT_EDITOR,
        status: 'ACTIVE' as any,
        permissions: [Permission.CONTENT_CREATE, Permission.CONTENT_UPDATE],
      };

      const attackerUser: AuthenticatedUser = {
        id: 'author-bob',
        email: 'bob@aic-adt.in',
        fullName: 'Bob Attacker',
        role: Role.CONTENT_EDITOR,
        status: 'ACTIVE' as any,
        permissions: [Permission.CONTENT_CREATE, Permission.CONTENT_UPDATE],
      };

      const created = await newsService.createNews(
        {
          slug: 'alice-exclusive-announcement',
          headline: 'Alice Research Breakout',
          summary: 'Original research article',
          content: ['Paragraph 1'],
          category: 'INFRASTRUCTURE' as any,
          publishDate: new Date().toISOString(),
          sourceAttribution: 'AIC-ADT Communications',
          locale: 'en',
        },
        authorUser,
      );

      // Bob tries to update Alice's article
      await expect(
        newsService.updateNews(
          created.id,
          {
            headline: 'Bob Hijacked Headline',
          },
          attackerUser,
        ),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 2. WORKFLOW & INTEGRITY ASSURANCE                                          */
  /* -------------------------------------------------------------------------- */
  describe('2. Workflow & Editorial Governance Integrity', () => {
    it('Dual-Custody enforcement: Author cannot self-approve their own submission without Admin role', async () => {
      const workflowService = new WorkflowService(mockPrisma);

      const editorUser: AuthenticatedUser = {
        id: 'editor-10',
        email: 'editor@aic-adt.in',
        fullName: 'Editor Jane',
        role: Role.APPROVER,
        status: 'ACTIVE' as any,
        permissions: [Permission.CONTENT_APPROVE],
      };

      // Mock entity where author is editor-10
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        id: 'entity-1',
        entityType: ContentEntityType.NEWS,
        status: ContentStatus.IN_REVIEW,
        currentVersion: 1,
        authorId: 'editor-10', // Self author
        snapshotData: {},
      });

      await expect(
        workflowService.approveContent(
          ContentEntityType.NEWS,
          'entity-1',
          { approvalNotes: 'Self approved', locale: 'en' },
          editorUser,
        ),
      ).rejects.toThrow(/INSTITUTIONAL GOVERNANCE VIOLATION: Self-approval is strictly prohibited/);
    });

    it('Rejects invalid status transitions (e.g. DRAFT -> PUBLISHED without approval)', async () => {
      const workflowService = new WorkflowService(mockPrisma);

      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        id: 'draft-item',
        entityType: ContentEntityType.NEWS,
        status: ContentStatus.DRAFT,
        currentVersion: 1,
        authorId: 'user-1',
        snapshotData: {},
      });

      const approverUser: AuthenticatedUser = {
        id: 'approver-1',
        email: 'approver@aic-adt.in',
        fullName: 'Approver Lead',
        role: Role.APPROVER,
        status: 'ACTIVE' as any,
        permissions: [Permission.CONTENT_PUBLISH],
      };

      // Cannot publish from DRAFT directly
      await expect(
        workflowService.publishContent(
          ContentEntityType.NEWS,
          'draft-item',
          { locale: 'en' },
          approverUser,
        ),
      ).rejects.toThrow(/Cannot transition record/i);
    });

    it('Enforces unique slugs and rejects duplicate creation attempts', async () => {
      const newsService = new NewsService(mockPrisma);
      const user: AuthenticatedUser = {
        id: 'admin-1',
        email: 'admin@aic-adt.in',
        fullName: 'Super Admin',
        role: Role.ADMIN,
        status: 'ACTIVE' as any,
        permissions: [Permission.CONTENT_CREATE],
      };

      await newsService.createNews(
        {
          slug: 'unique-symposium-2026',
          headline: 'First Symposium',
          summary: 'Summary 1',
          content: ['Paragraph 1'],
          category: 'INFRASTRUCTURE' as any,
          publishDate: new Date().toISOString(),
          sourceAttribution: 'AIC-ADT Communications',
          locale: 'en',
        },
        user,
      );

      // Duplicate slug
      await expect(
        newsService.createNews(
          {
            slug: 'unique-symposium-2026',
            headline: 'Second Duplicate Symposium',
            summary: 'Summary 2',
            content: ['Paragraph 2'],
            category: 'INFRASTRUCTURE' as any,
            publishDate: new Date().toISOString(),
            sourceAttribution: 'AIC-ADT Communications',
            locale: 'en',
          },
          user,
        ),
      ).rejects.toThrow(ConflictException);
    });

    it('PublicService strictly excludes draft, archived, and private records', async () => {
      const publicService = new PublicService(mockPrisma);

      // News in DRAFT status
      mockPrisma.connected = true;
      mockPrisma.newsArticle.findFirst = vi.fn().mockResolvedValue(null);

      await expect(
        publicService.getPublishedNewsBySlug('draft-internal-release', 'en'),
      ).rejects.toThrow(/not found/i);

      // Private media asset
      mockPrisma.mediaAsset.findUnique = vi.fn().mockResolvedValue({
        id: 'private-doc-1',
        visibility: MediaVisibility.PRIVATE,
      });

      await expect(
        publicService.getPublicMedia('private-doc-1'),
      ).rejects.toThrow(/not available for public distribution/i);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 3. FILE & MEDIA SECURITY                                                   */
  /* -------------------------------------------------------------------------- */
  describe('3. File & Media Security Hardening', () => {
    it('Defends against path traversal attacks in filenames', () => {
      const traversalInput = '../../../../etc/passwd.jpg';
      const sanitized = sanitizeFilename(traversalInput);

      expect(sanitized).not.toContain('..');
      expect(sanitized).not.toContain('/');
      expect(sanitized).toBe('passwd.jpg');
    });

    it('Detects and blocks MIME-type spoofing (executable renamed to image)', () => {
      // EXE header MZ
      const fakeImageBuffer = Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03]);
      const detected = detectMimeTypeFromBuffer(fakeImageBuffer);

      expect(detected).toBeNull();

      expect(() =>
        validateUploadedFile({
          buffer: fakeImageBuffer,
          originalname: 'malware.jpg',
          mimetype: 'image/jpeg',
          size: fakeImageBuffer.length,
        }),
      ).toThrow(BadRequestException);
    });

    it('Enforces file size limits (rejects oversized uploads)', () => {
      // Valid JPEG header but exceeds 10MB limit
      const oversizedBuffer = Buffer.alloc(15 * 1024 * 1024);
      oversizedBuffer[0] = 0xff;
      oversizedBuffer[1] = 0xd8;
      oversizedBuffer[2] = 0xff;

      expect(() =>
        validateUploadedFile({
          buffer: oversizedBuffer,
          originalname: 'huge.jpg',
          mimetype: 'image/jpeg',
          size: oversizedBuffer.length,
        }),
      ).toThrow(/exceeds maximum limit/i);
    });

    it('Blocks deletion of media assets referenced by live content', async () => {
      const mockStorage = {
        saveFile: vi.fn(),
        deleteFile: vi.fn(),
        getPublicUrl: vi.fn(),
        getFileStream: vi.fn(),
      } as any;

      const mediaService = new MediaService(mockPrisma, mockStorage);

      const user: AuthenticatedUser = {
        id: 'admin-1',
        email: 'admin@aic-adt.in',
        fullName: 'Admin',
        role: Role.ADMIN,
        status: 'ACTIVE' as any,
        permissions: [Permission.MEDIA_DELETE],
      };

      vi.spyOn(mediaService, 'findOne').mockResolvedValue({
        id: 'referenced-logo-1',
        originalName: 'aic-logo.png',
        visibility: MediaVisibility.PUBLIC,
      } as any);

      vi.spyOn(mediaService, 'checkReferences').mockResolvedValue({
        isReferenced: true,
        referencedBy: ['1 News Article(s)'],
      });

      await expect(
        mediaService.delete('referenced-logo-1', user as any),
      ).rejects.toThrow(ConflictException);
    });
  });
});
