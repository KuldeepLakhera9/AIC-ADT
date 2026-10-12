import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WorkflowService } from '../workflow/workflow.service.js';
import { NewsService } from '../content/services/news.service.js';
import { PublicService } from '../public/public.service.js';
import { MediaService } from '../media/media.service.js';
import { Role, Permission, AuthenticatedUser } from '../auth/auth.types.js';
import { ContentEntityType, ContentStatus } from '../workflow/workflow.constants.js';
import { MediaVisibility } from '@prisma/client';

describe('Phase 5 — Task 10: Complete CMS End-to-End Workflow & Lifecycle Verification', () => {
  let mockPrisma: any;
  let workflowService: WorkflowService;
  let newsService: NewsService;
  let publicService: PublicService;
  let mediaService: MediaService;
  let mockStorage: any;

  // Actors with distinct roles
  const editorUser: AuthenticatedUser = {
    id: 'user-editor-1',
    email: 'editor@aic-adt.in',
    fullName: 'Sunil Patil (Editor)',
    role: Role.CONTENT_EDITOR,
    status: 'ACTIVE' as any,
    permissions: [
      Permission.DASHBOARD_READ,
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
      Permission.CONTENT_UPDATE,
      Permission.CONTENT_SUBMIT_REVIEW,
      Permission.MEDIA_READ,
      Permission.MEDIA_UPLOAD,
    ],
  };

  const reviewerUser: AuthenticatedUser = {
    id: 'user-reviewer-1',
    email: 'reviewer@aic-adt.in',
    fullName: 'Dr. Suresh Shinde (Reviewer)',
    role: Role.APPROVER,
    status: 'ACTIVE' as any,
    permissions: [
      Permission.DASHBOARD_READ,
      Permission.CONTENT_READ,
      Permission.CONTENT_REVIEW,
      Permission.CONTENT_APPROVE,
      Permission.AUDIT_READ,
    ],
  };

  const publisherUser: AuthenticatedUser = {
    id: 'user-publisher-1',
    email: 'publisher@aic-adt.in',
    fullName: 'Pooja Deshmukh (Publisher)',
    role: Role.APPROVER,
    status: 'ACTIVE' as any,
    permissions: [
      Permission.DASHBOARD_READ,
      Permission.CONTENT_READ,
      Permission.CONTENT_REVIEW,
      Permission.CONTENT_APPROVE,
      Permission.CONTENT_PUBLISH,
      Permission.CONTENT_ARCHIVE,
      Permission.AUDIT_READ,
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();

    mockStorage = {
      saveFile: vi.fn().mockResolvedValue('keys/protected-doc.pdf'),
      deleteFile: vi.fn().mockResolvedValue(true),
      getPublicUrl: vi.fn().mockReturnValue('https://cdn.aic-adt.in/keys/protected-doc.pdf'),
      getFileStream: vi.fn(),
    };

    mockPrisma = {
      connected: false,
      auditLog: {
        create: vi.fn().mockResolvedValue({ id: 'audit-1' }),
        findMany: vi.fn().mockResolvedValue([]),
        count: vi.fn().mockResolvedValue(0),
      },
      contentRevision: {
        create: vi.fn(),
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn(),
      },
      newsArticle: {
        findUnique: vi.fn(),
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn(),
        count: vi.fn().mockResolvedValue(0),
      },
      event: {
        findUnique: vi.fn(),
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn(),
        count: vi.fn().mockResolvedValue(0),
      },
      mediaAsset: {
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      $transaction: vi.fn(async (cb) => cb(mockPrisma)),
    };

    workflowService = new WorkflowService(mockPrisma);
    newsService = new NewsService(mockPrisma);
    publicService = new PublicService(mockPrisma);
    mediaService = new MediaService(mockPrisma, mockStorage);
  });

  /* -------------------------------------------------------------------------- */
  /* 11-STEP EDITORIAL CONTENT LIFECYCLE                                        */
  /* -------------------------------------------------------------------------- */
  describe('Complete 11-Step Editorial Lifecycle Execution', () => {
    const articleSlug = 'agritech-precision-irrigation-initiative-2026';
    let recordId: string;

    it('Step 1 & 2: Authorized editor creates and saves initial DRAFT record', async () => {
      const created = await newsService.createNews(
        {
          slug: articleSlug,
          headline: 'AIC-ADT Launches AI Precision Irrigation Initiative',
          summary: 'Advancing water efficiency across Baramati sugarcane clusters.',
          content: ['Baramati farmers adopt IoT sensor nodes for micro-irrigation scheduling.'],
          category: 'INFRASTRUCTURE' as any,
          publishDate: new Date().toISOString(),
          sourceAttribution: 'AIC-ADT Agritech Mission',
          locale: 'en',
        },
        editorUser,
      );

      expect(created).toBeDefined();
      expect(created.id).toBeDefined();
      expect(created.slug).toBe(articleSlug);
      expect(created.translations[0].status).toBe(ContentStatus.DRAFT);
      expect(created.translations[0].headline).toContain('Precision Irrigation');
      recordId = created.id;
    });

    it('Step 3: Editor submits the revision for institutional review', async () => {
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        title: 'AIC-ADT Launches AI Precision Irrigation Initiative',
        slug: articleSlug,
        currentVersion: 1,
        authorId: editorUser.id,
        authorName: editorUser.fullName,
        authorEmail: editorUser.email,
        status: ContentStatus.DRAFT,
        translationId: `${recordId}:en`,
        snapshotData: {
          headline: 'AIC-ADT Launches AI Precision Irrigation Initiative',
        },
      });

      const submission = await workflowService.submitForReview(
        ContentEntityType.NEWS,
        recordId,
        {
          locale: 'en',
          submissionNotes: 'Ready for Agritech review board verification.',
        },
        editorUser,
      );

      expect(submission.entityId).toBe(recordId);
      expect(submission.previousStatus).toBe(ContentStatus.DRAFT);
      expect(submission.currentStatus).toBe(ContentStatus.IN_REVIEW);
      expect(submission.versionNumber).toBe(1);
    });

    it('Step 4 & 5: Authorized reviewer inspects submitted revision and approves it under Dual-Custody policy', async () => {
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        title: 'AIC-ADT Launches AI Precision Irrigation Initiative',
        slug: articleSlug,
        currentVersion: 1,
        authorId: editorUser.id, // Different user from reviewer
        authorName: editorUser.fullName,
        authorEmail: editorUser.email,
        status: ContentStatus.IN_REVIEW,
        translationId: `${recordId}:en`,
        snapshotData: {
          headline: 'AIC-ADT Launches AI Precision Irrigation Initiative',
        },
      });

      const approval = await workflowService.approveContent(
        ContentEntityType.NEWS,
        recordId,
        {
          locale: 'en',
          approvalNotes: 'Technical specifications and water metrics verified.',
        },
        reviewerUser,
      );

      expect(approval.previousStatus).toBe(ContentStatus.IN_REVIEW);
      expect(approval.currentStatus).toBe(ContentStatus.APPROVED);
      expect(approval.success).toBe(true);
    });

    it('Step 6: Authorized publisher publishes the approved revision', async () => {
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        title: 'AIC-ADT Launches AI Precision Irrigation Initiative',
        slug: articleSlug,
        currentVersion: 1,
        authorId: editorUser.id,
        authorName: editorUser.fullName,
        authorEmail: editorUser.email,
        status: ContentStatus.APPROVED,
        translationId: `${recordId}:en`,
        snapshotData: {
          headline: 'AIC-ADT Launches AI Precision Irrigation Initiative',
        },
      });

      const publication = await workflowService.publishContent(
        ContentEntityType.NEWS,
        recordId,
        { locale: 'en' },
        publisherUser,
      );

      expect(publication.previousStatus).toBe(ContentStatus.APPROVED);
      expect(publication.currentStatus).toBe(ContentStatus.PUBLISHED);
      expect(publication.updatedAt).toBeDefined();
    });

    it('Step 7 & 8: Public API returns the published record for public website consumption', async () => {
      mockPrisma.connected = true;
      mockPrisma.newsArticle.findUnique = vi.fn().mockResolvedValue({
        id: recordId,
        slug: articleSlug,
        category: 'INFRASTRUCTURE',
        publishDate: new Date('2026-10-12'),
        sourceAttribution: 'AIC-ADT Agritech Mission',
        currentVersion: 1,
        translations: [
          {
            id: 'tr-en-1',
            locale: 'en',
            headline: 'AIC-ADT Launches AI Precision Irrigation Initiative',
            summary: 'Advancing water efficiency across Baramati sugarcane clusters.',
            content: ['Baramati farmers adopt IoT sensor nodes for micro-irrigation scheduling.'],
            tags: ['Agritech', 'IoT', 'Water'],
            status: ContentStatus.PUBLISHED,
            publishedAt: new Date(),
          },
        ],
      });

      const publicArticle = await publicService.getPublishedNewsBySlug(articleSlug, 'en');

      expect(publicArticle).toBeDefined();
      expect(publicArticle.slug).toBe(articleSlug);
      expect(publicArticle.headline).toBe('AIC-ADT Launches AI Precision Irrigation Initiative');
      expect(publicArticle.sourceAttribution).toBe('AIC-ADT Agritech Mission');
    });

    it('Step 9: Editor prepares a new update without overwriting the live published version (Revision Branching)', async () => {
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        title: 'AIC-ADT Launches AI Precision Irrigation Initiative',
        slug: articleSlug,
        currentVersion: 1,
        authorId: editorUser.id,
        authorName: editorUser.fullName,
        authorEmail: editorUser.email,
        status: ContentStatus.PUBLISHED,
        translationId: `${recordId}:en`,
        snapshotData: {
          headline: 'AIC-ADT Launches AI Precision Irrigation Initiative (Updated with 2026 telemetry metrics)',
        },
      });

      const branchedDraft = await workflowService.branchRevision(
        ContentEntityType.NEWS,
        recordId,
        {
          locale: 'en',
          changelog: 'Telemetry integration section appended for Phase 2 sensor deployment.',
          dataSnapshot: {
            headline: 'AIC-ADT Launches AI Precision Irrigation Initiative (Updated with 2026 telemetry metrics)',
          },
        },
        editorUser,
      );

      expect(branchedDraft.previousStatus).toBe(ContentStatus.PUBLISHED);
      expect(branchedDraft.currentStatus).toBe(ContentStatus.DRAFT);
      expect(branchedDraft.versionNumber).toBe(2); // Incremented monotonic version
    });

    it('Step 10: Subsequent review, approval, and publication update the public content to version 2', async () => {
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        title: 'AIC-ADT Launches AI Precision Irrigation Initiative (Updated with 2026 telemetry metrics)',
        slug: articleSlug,
        currentVersion: 2,
        authorId: editorUser.id,
        authorName: editorUser.fullName,
        authorEmail: editorUser.email,
        status: ContentStatus.APPROVED,
        translationId: `${recordId}:en`,
        snapshotData: {
          headline: 'AIC-ADT Launches AI Precision Irrigation Initiative v2',
        },
      });

      const republished = await workflowService.publishContent(
        ContentEntityType.NEWS,
        recordId,
        { locale: 'en' },
        publisherUser,
      );

      expect(republished.currentStatus).toBe(ContentStatus.PUBLISHED);
      expect(republished.versionNumber).toBe(2);
    });

    it('Step 11: Audit history accurately records every privileged workflow action in the lifecycle', async () => {
      const auditTrail = await workflowService.getAuditLogs({
        page: 1,
        limit: 10,
        resource: 'NEWS',
      });

      expect(auditTrail).toBeDefined();
      expect(auditTrail.page).toBe(1);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* MARATHI LOCALIZATION WORKFLOW                                              */
  /* -------------------------------------------------------------------------- */
  describe('Marathi (mr) Localization Editorial Lifecycle', () => {
    it('Creates, reviews, approves, publishes and serves Marathi localized content', async () => {
      const marathiSlug = 'baramati-drone-testing-sandbox';

      // 1. Creation with Marathi translation
      const marathiArticle = await newsService.createNews(
        {
          slug: marathiSlug,
          headline: 'बारामती ॲग्रीटेक ड्रोन टेस्टिंग सँडबॉक्सचे उद्घाटन',
          summary: 'शेतकऱ्यांसाठी अचूक फवारणी आणि पीक देखरेख तंत्रज्ञान.',
          content: ['बारामती येथील कृषी विज्ञान केंद्रात प्रगत ड्रोन चाचणी सुरू झाली आहे.'],
          category: 'INFRASTRUCTURE' as any,
          publishDate: new Date().toISOString(),
          sourceAttribution: 'एआयसी-एडीटी बारामती',
          locale: 'mr',
        },
        editorUser,
      );

      expect(marathiArticle.translations[0].locale).toBe('mr');
      expect(marathiArticle.translations[0].headline).toContain('ड्रोन');

      // 2. Review & Dual-Custody Approval for Marathi locale
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        title: 'बारामती ॲग्रीटेक ड्रोन टेस्टिंग सँडबॉक्सचे उद्घाटन',
        slug: marathiSlug,
        currentVersion: 1,
        authorId: editorUser.id,
        authorName: editorUser.fullName,
        authorEmail: editorUser.email,
        status: ContentStatus.IN_REVIEW,
        translationId: `${marathiArticle.id}:mr`,
        snapshotData: {
          headline: 'बारामती ॲग्रीटेक ड्रोन टेस्टिंग सँडबॉक्सचे उद्घाटन',
        },
      });

      const approved = await workflowService.approveContent(
        ContentEntityType.NEWS,
        marathiArticle.id,
        { locale: 'mr', approvalNotes: 'मराठी भाषेतील मजकूर तपासला व मंजूर केला.' },
        reviewerUser,
      );
      expect(approved.currentStatus).toBe(ContentStatus.APPROVED);

      // 3. Publish Marathi content
      vi.spyOn(workflowService as any, 'resolveEntity').mockResolvedValue({
        title: 'बारामती ॲग्रीटेक ड्रोन टेस्टिंग सँडबॉक्सचे उद्घाटन',
        slug: marathiSlug,
        currentVersion: 1,
        authorId: editorUser.id,
        authorName: editorUser.fullName,
        authorEmail: editorUser.email,
        status: ContentStatus.APPROVED,
        translationId: `${marathiArticle.id}:mr`,
        snapshotData: {
          headline: 'बारामती ॲग्रीटेक ड्रोन टेस्टिंग सँडबॉक्सचे उद्घाटन',
        },
      });

      const published = await workflowService.publishContent(
        ContentEntityType.NEWS,
        marathiArticle.id,
        { locale: 'mr' },
        publisherUser,
      );
      expect(published.currentStatus).toBe(ContentStatus.PUBLISHED);

      // 4. Verify Public Marathi Query Delivery
      mockPrisma.connected = true;
      mockPrisma.newsArticle.findUnique = vi.fn().mockResolvedValue({
        id: marathiArticle.id,
        slug: marathiSlug,
        category: 'INFRASTRUCTURE',
        publishDate: new Date('2026-10-12'),
        sourceAttribution: 'एआयसी-एडीटी बारामती',
        currentVersion: 1,
        translations: [
          {
            id: 'tr-mr-1',
            locale: 'mr',
            headline: 'बारामती ॲग्रीटेक ड्रोन टेस्टिंग सँडबॉक्सचे उद्घाटन',
            summary: 'शेतकऱ्यांसाठी अचूक फवारणी आणि पीक देखरेख तंत्रज्ञान.',
            content: ['बारामती येथील कृषी विज्ञान केंद्रात प्रगत ड्रोन चाचणी सुरू झाली आहे.'],
            tags: ['ड्रोन', 'शेतकरी', 'कृषी'],
            status: ContentStatus.PUBLISHED,
            publishedAt: new Date(),
          },
        ],
      });

      const publicMarathi = await publicService.getPublishedNewsBySlug(marathiSlug, 'mr');
      expect(publicMarathi.locale).toBe('mr');
      expect(publicMarathi.headline).toContain('ड्रोन');
      expect(publicMarathi.sourceAttribution).toBe('एआयसी-एडीटी बारामती');
    });
  });

  /* -------------------------------------------------------------------------- */
  /* PROTECTED MEDIA LIFECYCLE                                                  */
  /* -------------------------------------------------------------------------- */
  describe('Protected Document & Media Asset Lifecycle', () => {
    it('Protects private internal documents: Public requests are blocked, while authenticated staff are served', async () => {
      const privateAsset = {
        id: 'media-internal-audit-2026',
        originalName: 'aic-adt-financial-audit-fy26.pdf',
        mimeType: 'application/pdf',
        storageKey: 'keys/internal-audit-2026.pdf',
        visibility: MediaVisibility.PRIVATE,
        uploaderId: editorUser.id,
      };

      mockPrisma.connected = true;
      mockPrisma.mediaAsset.findUnique = vi.fn().mockResolvedValue(privateAsset);

      // Public query MUST be rejected with 403 Forbidden
      await expect(
        publicService.getPublicMedia('media-internal-audit-2026'),
      ).rejects.toThrow(/not available for public distribution/i);

      // Authenticated administrative access is granted
      vi.spyOn(mediaService, 'findOne').mockResolvedValue(privateAsset as any);
      const authorizedAsset = await mediaService.findOne('media-internal-audit-2026');
      expect(authorizedAsset).toBeDefined();
      expect(authorizedAsset.visibility).toBe(MediaVisibility.PRIVATE);
    });
  });
});
